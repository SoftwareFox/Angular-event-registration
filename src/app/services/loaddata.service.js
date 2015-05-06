(function () {
    'use strict';

    angular.module('ciberModule').factory('loaddataService', loaddataService);

    loaddataService.$inject = ['$q', 'httpService', '$rootScope'];

    function loaddataService($q, httpService, $rootScope) {

        var service = {
            getLoggedInUser: getLoggedInUser,
            getCiberEventAndLocations: getCiberEventAndLocations,
            getCiberData: getCiberData,
            getCiberUsers: getCiberUsers,
            getCiberLocations: getCiberLocations
        };

        return service;

        function getCiberLocations(){
            return $q.all([
                httpService.getCiberLocations()
            ]).then(function(results){
                return {
                    locations: results[0]
                };
            });
        }

        function getCiberUsers(){
            return $q.all([
                httpService.getCiberUsers()
            ]).then(function(results){
                return {
                    users: results[0]
                };
            });
        }

        function getCiberData() {
            return $q.all([
                httpService.getCiberEvents(),
                httpService.getCiberLocations()
            ]).then(function(results){
                return {
                    events: results[0],
                    locations: results[1]
                };
            });
        }
        function getCiberEventAndLocations(id) {
            return $q.all([
                httpService.getCiberEvent(id),
                httpService.getCiberLocations()
            ]).then(function(results){
                return {
                    event: results[0],
                    locations:results[1]
                };
            });
        }

        function getLoggedInUser() {
            if( $rootScope.globals.currentUser) {
                return $rootScope.globals.currentUser.user;
            }
        }
    }
})();