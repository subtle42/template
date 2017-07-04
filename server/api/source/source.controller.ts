import {IModels} from "IModels";
import {IMongooseModels} from "IMongooseModels";
import Source from "./source.model";
import {MongoClient, Db, Server} from "mongodb";
import * as express from "express";
import * as fs from "fs";
var csv = require("fast-csv");

export class SourceController {
    private static parseCSV(req:express.Request):Promise<Array<Array<string>>> {
        return new Promise((resolve:Function, reject:Function) => {
            var response = [];

            var stream = fs.createReadStream(req.file.path);
            var csvStream = csv.parse({
                ignoreEmpty:true,
                trim:true
            })
            .on("data", (data:Array<string>) => response.push(data))
            .on("end", () => resolve(response));

            stream.pipe(csvStream);
        });
    }

    private static rowsToColumns(rows:Array<Array<string>>):Promise<Array<Array<string>>> {
        return new Promise((resolve:Function) => {
            var response:Array<Array<string>> = [];

            rows.forEach(row => response.push([]));
            rows.forEach((row) => {
                row.forEach((entry:string, index:number) => {
                    response[index].push(entry);
                });
            });

            resolve(response);
        });
    }

    private static getColumnTypes(data:Array<Array<string>>):Promise<Array<IModels.columnType>> {
        return new Promise((resolve:Function) => {
            var calls:Array<Promise<string>> = [];
            data.forEach(column => calls.push(this.getSingleColumnType(column)));
            Promise.all(calls)
            .then(columnTypes => resolve(columnTypes));
        });
    }

    private static getSingleColumnType(data:Array<any>):Promise<IModels.columnType> {
        return new Promise((resolve:Function) => {
            var number = 0;
            var group = 0;
            var date = 0;
            var groupCounts = {};
            var response:IModels.columnType;

            data.forEach(entry => {
                if(!isNaN(entry)) {
                    number++
                }
                else {
                    groupCounts[entry] = groupCounts[entry] ? groupCounts[entry] + 1 : 1;
                }
            });

            if(number === data.length) {
                response = "number";
            }
            else if (Object.keys(groupCounts).length/data.length < 1) {
                response = "group";
            }
            else {
                response = "text";
            }

            resolve(response);
        });
    }

    private static importData(rows:Array<Array<any>>, columnTypes:Array<IModels.columnType>):Promise<string> {
        var headers:Array<string> = [];
        var name = "mean_" + new Date().getTime();
        var myDb = new Db("mean-data", new Server("localhost", 27017));
        return myDb.open()
        .then(db => {
            var myCollection = db.collection(name);
            var batch = myCollection.initializeUnorderedBulkOp();

            rows.forEach(row => {
                row.forEach((entry, index) => {
                    row[index] = entry.replace("$", "");
                    if (columnTypes[index] === "number") {
                        row[index] = parseInt(entry);
                    }
                });
                batch.insert(row)
            });

            return batch.execute()
        })
        .then(bulkResult => {
            myDb.close();
            if (bulkResult.nInserted !== rows.length) {
                throw `Only ${bulkResult.nInserted} out of ${rows.length} in collection ${name}`;
            }
            return name;
        })
        .catch(err => {
            try {myDb.close();}
            catch(myerr) {}
            throw err;
        });
    }

    private static buildSourceObject(req:express.Request, headers:Array<string>, columnTypes:Array<IModels.columnType>, location:string, rowCount:number):Promise<IMongooseModels.ISourceModel> {
        return new Promise((resolve, reject) => {
            var myColumns:Array<IModels.ISourceColumn> = [];

            columnTypes.forEach((type, index) => {
                myColumns.push({
                    ref: index.toString(),
                    title: headers[index],
                    type: type
                });
            });

            var mySource:IMongooseModels.ISourceModel = new Source({
                title: req.file.filename,
                location: location,
                size: req.file.size,
                rowCount: rowCount,
                columns: myColumns,
                owner: req.user._id
            });

            mySource.validate()
            .then(pass => resolve(mySource))
            .catch(err => reject(err));
        });
    }

    public static create(req:express.Request, res:express.Response):void {
        var fileData:Array<Array<string>> = [];
        var headers:Array<string> = [];
        var columnTypes:Array<IModels.columnType> = [];

        this.parseCSV(req)
        .then(data => {
            headers = data[0];
            fileData = data;
            fileData.splice(0, 1);
            return data;
        })
        .then(data => this.rowsToColumns(data))
        .then(data => this.getColumnTypes(data))
        .then(colTypes => {
            columnTypes = colTypes;
            return this.importData(fileData, colTypes);
        })
        .then(collectionName => this.buildSourceObject(req, headers, columnTypes, collectionName, fileData.length))
        .then(mySource => Source.create(mySource))
        .then(newSource => {
            fs.unlink("./" + req.file.path, () => {
                res.json(newSource)
            });
        })
        .catch(err => {
            fs.unlink("./" + req.file.path, () => {
                res.status(500).json(err)
            });
        });
    }
}