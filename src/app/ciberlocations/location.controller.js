( function (){
    'use strict';

    angular.module('ciberModule').controller('CiberLocationCtrl',CiberLocationCtrl);
    CiberLocationCtrl.$inject = ['initialData', 'httpService','$location', '$timeout','maps', 'currentPosition'];

    function CiberLocationCtrl(initialData, httpService, $location, $timeout, maps, currentPosition) {
        var ctrl = this;
        ctrl.activate = activate;
        ctrl.location = initialData;
        ctrl.addLocation = addLocation;
        ctrl.saveLocation = saveLocation;
        ctrl.cancel = cancel;
        ctrl.loadMapWithAddress = loadMapWithAddress;
        var geocoder = new maps.Geocoder();

        ctrl.map = {
            center: {
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude
            },
            zoom: 12
        };

        ctrl.marker = {
            id: 1,
            coords: currentPosition.coords
        };

        activate();

        function activate() {
            if (angular.isUndefined(ctrl.location.locations)){
                loadMapWithCoordinates(ctrl.location.latitude, ctrl.location.longitude );
            }
        }

        function cancel(){
            $location.path('/ciberlocations');
        }

        function loadMapWithCoordinates(latitudeValue, longitudeValue) {
            var latlng = new maps.LatLng(latitudeValue, longitudeValue);
            geocoder.geocode({'latLng' : latlng}, function (result) {
                if (result.length > 0) {
                    var coordinates = result[0].geometry.location;
                    ctrl.address = result[0].formatted_address;
                    $timeout( function(){
                        ctrl.map.center = {
                            latitude: coordinates.lat(),
                            longitude: coordinates.lng()
                        };
                        ctrl.marker={
                            id:1,
                            coords: {
                                latitude: ctrl.map.center.latitude,
                                longitude: ctrl.map.center.longitude
                            }
                        };
                    },0);
                }
            });
        }

        function loadMapWithAddress(locationAddress) {
            geocoder.geocode({address: locationAddress}, function (result) {
                if (result.length > 0) {
                    var addrLocation = result[0].geometry.location;
                    ctrl.latitude = addrLocation.lat();//.toFixed(6);
                    ctrl.longitude = addrLocation.lng();//.toFixed(6);
                    if (!angular.isUndefined(ctrl.location)) {
                        ctrl.location.latitude = addrLocation.lat();//.toFixed(6);
                        ctrl.location.longitude = addrLocation.lng();//.toFixed(6);
                    }
                    $timeout( function(){
                        ctrl.map.center = {
                            latitude: addrLocation.lat(),
                            longitude: addrLocation.lng()
                        };
                        ctrl.marker={
                            id:1,
                            coords: {
                                latitude: ctrl.map.center.latitude,
                                longitude: ctrl.map.center.longitude
                            }
                        };
                    },0);
                }
            });
        }

        function setLatitudeAndLongitude(locationAddress) {
            geocoder.geocode({address: locationAddress}, function (result) {
                if (result.length > 0) {
                    var addrLocation = result[0].geometry.location;
                    ctrl.location.latitude = addrLocation.lat();//.toFixed(6);
                    ctrl.location.longitude = addrLocation.lng();//.toFixed(6);
                }
            });
        }

        function addLocation(){
            setLatitudeAndLongitude(ctrl.address);
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
    }
})();

