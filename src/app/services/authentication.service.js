(function () {
    'use strict';

    angular.module('ciberModule').factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$cookieStore', '$rootScope', '$timeout', 'httpService'];

    function authenticationService( $cookieStore, $rootScope, $timeout, httpService) {
        var service = {
            login: login,
            setCredentials: setCredentials,
            clearCredentials: clearCredentials
        };

        return service;

        function login(username, password, callback) {
            $timeout(function () {
                var response;
                httpService.getCiberUserByEmail(username)
                    .then(function (user) {
                        if (user != null ){//&& user.password === password) {
                            response = {success: true, user: user};
                        } else {                            
                            response = {success: false, message: 'Username or password is incorrect'};
                        }
                        callback(response);
                    }
                );
            }, 1000);
        }

        function setCredentials(user, password) {
            $rootScope.globals = {
                currentUser: {
                    user: user
                }
            };

            $cookieStore.put('globals', $rootScope.globals);
        }

        function clearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
        }
    }
})();
