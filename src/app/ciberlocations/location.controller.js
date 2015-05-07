//controller used by
// addLocation,
// editLocation
// locationDetails
( function (){
    'use strict';
    angular.module('ciberModule').controller('CiberLocationCtrl',CiberLocationCtrl);
    CiberLocationCtrl.$inject = ['initialData', 'httpService','$location', '$timeout', 'maps', 'currentPosition'];

    function CiberLocationCtrl(initialData, httpService, $location, $timeout, maps, currentPosition) {
        var ctrl = this;
        ctrl.location = initialData;

        ctrl.addLocation = addLocation;
        ctrl.saveLocation = saveLocation;
        ctrl.cancel = cancel;
        ctrl.loadMapWithAddress = loadMapWithAddress;
        var geocoder = new maps.Geocoder();
        var pause = 0;

        activate();

        function activate() {
            pause = 0;
            if (!angular.equals({}, ctrl.location)){
                loadMapWithCoordinates(ctrl.location.latitude, ctrl.location.longitude );
            }else{
                ctrl.map = {
                    center: {
                        latitude: currentPosition.coords.latitude,
                        longitude: currentPosition.coords.longitude
                    },
                    zoom:12
                };
                ctrl.marker = {
                    coords: currentPosition.coords,
                    id:1
                };
            }
        }

        function loadMapWithCoordinates(latitudeValue, longitudeValue) {
            var latlng = new maps.LatLng(latitudeValue, longitudeValue);
            geocoder.geocode({'latLng' : latlng}, function (result, status) {
                $timeout( function(){
                    if (status == maps.GeocoderStatus.OK) {
                        var coordinates = result[0].geometry.location;
                        ctrl.address = result[0].formatted_address;
                        updateMap(coordinates);
                    }else {
                         pause = +10;
                         loadMapWithCoordinates(latitudeValue, longitudeValue);
                        }
                }, pause);
            });
        }

        function updateMap(coordinates) {
            ctrl.map = {
                center : {
                    latitude: coordinates.lat(),
                    longitude: coordinates.lng()
                    },
                zoom:12
                };
            ctrl.marker = {
                id: 1,
                coords: {
                    latitude: ctrl.map.center.latitude,
                    longitude: ctrl.map.center.longitude
                }
            }
        }

        function loadMapWithAddress(locationAddress) {
            geocoder.geocode({address: locationAddress}, function (result, status) {
                $timeout( function() {
                    if (status == maps.GeocoderStatus.OK) {
                        var coordinates = result[0].geometry.location;
                        ctrl.latitude = coordinates.lat();
                        ctrl.longitude = coordinates.lng();
                        if (!angular.isUndefined(ctrl.location)) {
                            ctrl.location.latitude = coordinates.lat();
                            ctrl.location.longitude = coordinates.lng();
                        }
                        updateMap(coordinates);
                    }else{
                        pause=+10;
                        loadMapWithAddress(locationAddress);
                    }
                },pause);
            });
        }

        function addLocation(){
            loadMapWithAddress(ctrl.address);
            var location = {
                location : ctrl.name,
                latitude: ctrl.latitude,
                longitude: ctrl.longitude,
                description : ctrl.directions
            };
            httpService.addCiberLocation(location).then(function(data){
                $location.path('/ciberlocations');
            });
        }

        function saveLocation(location) {
            httpService.saveCiberLocation(location).then(
                function (data) {
                    $location.path('/ciberlocations');
                }, function (reason) {
                    console.log('Failed to save data ' + reason);
                });
        }

        function cancel(){
            $location.path('/ciberlocations');
        }
    }
})();

