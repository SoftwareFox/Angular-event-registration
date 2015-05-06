(function () {
    'use strict';

    angular.module('ciberModule').factory('httpService', httpService);

    httpService.$inject = ['$http', 'appSpinner'];

       function httpService($http, appSpinner) {
            var service = {
                getCiberEvents: getCiberEvents,
                getCiberEvent: getCiberEvent,
                addCiberEvent: addCiberEvent,
                getCiberLocations: getCiberLocations,
                deleteCiberEvent: deleteCiberEvent,
                saveCiberEvent: saveCiberEvent,
                getCiberUsers: getCiberUsers,
                addCiberUser: addCiberUser,
                getCiberUserByEmail: getCiberUserByEmail,
                deleteCiberUser: deleteCiberUser,
                getCiberUser: getCiberUser,
                saveCiberUser: saveCiberUser,
                getCiberLocation: getCiberLocation,
                addCiberLocation: addCiberLocation,
                deleteCiberLocation: deleteCiberLocation,
                saveCiberLocation: saveCiberLocation
            };

           var baseUrl = 'https://ciber-event-aggregator.herokuapp.com';

            var requestConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

        return service;

       function getCiberEvent(id){
           return httpGet('/events/' + id);
       }
        function getCiberEvents() {
           return httpGet('/events?max=100');
       }

       function getCiberLocations() {
           return httpGet('/locations?max=100');
       }

       function addCiberEvent(event){
          return httpPost('/events', event);
       }
       function deleteCiberEvent(id){
           return httpDelete('/events/' + id);
       }
       function saveCiberEvent(event){
           return httpPut('/events/' + event.id, event);
        }

       function getCiberUsers() {
           return httpGet('/users?max=100');
       }
       function addCiberUser(user){
           return httpPost('/users', user);
       }

       function getCiberUserByEmail(email){
           return httpGet('/users/search/findByEmail?email='+email);
       }

       function getCiberUser(id){
           return httpGet('/users/' + id);
       }
       function saveCiberUser(user){
           return httpPut('/users/' + user.id, user);
       }

       function deleteCiberUser(id){
           return httpDelete('/users/'+ id);
       }

       function getCiberLocation(id){
           return httpGet('/locations/' + id);
       }
       function addCiberLocation(location){
           console.log(location);
           return httpPost('/locations', location);
       }
       function deleteCiberLocation(id){
           return httpDelete('/locations/'+ id);
       }
       function saveCiberLocation(location){
           return httpPut('/locations/'+ location.id, location);
       }
        function httpExecute(requestUrl, method, data){
               appSpinner.showSpinner();
               return $http({
                   url: baseUrl +requestUrl,
                   method: method,
                   data: data,
                   headers: requestConfig.headers

               }).then(function(response){
                   appSpinner.hideSpinner();
                   return response.data;
               });
        }

        function httpGet(url){
            return httpExecute(url, 'GET');
        }

       function httpPut(url, data){
           return httpExecute(url, 'PUT', data);
       }

        function httpPost( url, data){
            return httpExecute(url, 'POST', data);
        }

        function httpDelete(url){
           return httpExecute(url, 'DELETE');
        }
    }
})();
