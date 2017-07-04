// "use strict";

// import angular from "angular";
// import ngCookies from "angular-cookies";

// class AuthService{
//     private currentUser = null;
//     constructor(
//         private $q:angular.IQService,
//         private $http:angular.IHttpService,
//         private $cookies:angular.cookies.ICookiesService    
//     ) {

//     }

//     login(user) {
//         return this.$http.post("/auth/local", {
//             email: user.email,
//             password: user.password
//         })
//         .then((res:any) => {
//             this.$cookies.put("token", res.data.token);
//             this.currentUser = User.get();
//             return this.currentUser.$promise;
//         })
//     }
// }