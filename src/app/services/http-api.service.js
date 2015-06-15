(function () {
    'use strict';

    angular.module('ciberModule').factory('httpService', httpService);

    httpService.$inject = ['$http', 'appSpinner'];

       function httpService($http, appSpinner) {
           var baseUrl = 'https://ciber-event-aggregator.herokuapp.com';

           var myMicroserviceUrl = 'http://localhost:3000/microservice';

           var requestConfig = {
               headers: {
                   'Content-Type': 'application/json'
               }
           };

            var service = {
                getItems:getItems,
                getItem: getItem,
                addItem:addItem,
                saveItem: saveItem,
                deleteItem: deleteItem,
                httpGet: httpGet,
                addResult: addResult
            };

            return service;

           function getItems(requestUrl) {
               return httpGet(requestUrl+'?max=100');
           }

           function getItem(requestUrl, id){
               return httpGet(requestUrl+'/' + id);
           }

           function addItem(requestUrl, item){
               return httpPost(requestUrl, item);
           }

           function deleteItem(requestUrl, id){
               return httpDelete(requestUrl+'/'+ id);
           }

           function saveItem(requestUrl, item){
               return httpPut(requestUrl+'/'+ item.id, item);
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

           function addResult(requestUrl, reresult){
               return $http.post(myMicroserviceUrl + requestUrl, reresult);
           }
    }
})();
