(function () {
   'use strict';

    angular
        .module('ciberModule')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'authenticationService', '$window'];
    function LoginController($location, authenticationService, $window) {
        var ctrl = this;
        ctrl.login = login;

        function login() {
             ctrl.dataLoading = true;
             authenticationService.login(ctrl.username, ctrl.password, function (response) {
                 if (response.success) {
                     authenticationService.setCredentials(response.user[0], ctrl.password);
                     $location.path('/');
                     $window.location.reload();
                 } else {
                     ctrl.error = response.message;
                     ctrl.dataLoading = false;
                 }
             }
             );
         }
    }
 })();
