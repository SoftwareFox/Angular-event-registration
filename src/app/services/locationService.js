(function () {
    'use strict';

    angular.module('ciberModule').factory('locationService', locationService);

    locationService.$inject = ['httpService'];

    function locationService(httpService) {

        var requestUrl ='/locations';

        var service = {
            getLocations: getLocations,
            getLocation: getLocation,
            addLocation: addLocation,
            deleteLocation: deleteLocation,
            saveLocation: saveLocation
        };
        return service;

        function getLocations() {
            return httpService.getItems(requestUrl);
        }

        function getLocation(id){
            return httpService.getItem(requestUrl, id);
        }

        function addLocation(location){
            return httpService.addItem(requestUrl, location);
        }

        function deleteLocation(id){
            return httpService.deleteItem(requestUrl, id);
        }

        function saveLocation(location){
            return httpService.saveItem(requestUrl, location.id, location);
        }
    }
})();

