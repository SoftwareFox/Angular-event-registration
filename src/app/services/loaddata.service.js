(function () {
    'use strict';

    angular.module('ciberModule').factory('loaddataService', loaddataService);

    loaddataService.$inject = ['$q', 'userService','locationService', 'eventService', '$rootScope'];

    function loaddataService($q, userService, locationService, eventService, $rootScope) {

        var service = {
            getLoggedInUser: getLoggedInUser,
            getEventAndLocations: getEventAndLocations,
            getData: getData,
            getUsers: getUsers,
            getLocations: getLocations
        };

        return service;

        function getLocations(){
            return $q.all([
                locationService.getLocations()
            ]).then(function(results){
                return {
                    locations: results[0]
                };
            });
        }

        function getUsers(){
            return $q.all([
                userService.getUsers()
            ]).then(function(results){
                return {
                    users: results[0]
                };
            });
        }

        function getData() {
            return $q.all([
                eventService.getEvents(),
                locationService.getLocations(),
                userService.getUsers()
            ]).then(function(results){
                return {
                    events: results[0],
                    locations: results[1],
                    users: results[2]
                };
            });
        }

        function getEventAndLocations(id) {
            return $q.all([
                eventService.getEvent(id),
                locationService.getLocations()
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