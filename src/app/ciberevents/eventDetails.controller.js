( function (){
    'use strict';

    angular.module('ciberModule').controller('CiberEventDetailsCtrl', CiberEventDetailsCtrl);
    CiberEventDetailsCtrl.$inject = ['initialData', 'maps', '$timeout'];

    function CiberEventDetailsCtrl(initialData, maps, $timeout) {
        var ctrl = this;
        ctrl.activate = activate;
        ctrl.event = initialData.event;

        activate();
        ctrl.refreshMap = refreshMap;
        ctrl.map = {
            zoom: 12
        };

        ctrl.marker = {
            id: 1
        };

        function activate() {
            refreshMap();
        }

        function refreshMap() {
            var geocoder = new maps.Geocoder();
            var latlng = new maps.LatLng(ctrl.event.location.latitude, ctrl.event.location.longitude);
            geocoder.geocode({'latLng': latlng}, function (result) {
                if (result.length > 0) {
                    var locationValue = result[0].geometry.location;
                    ctrl.location_address=result[0].formatted_address;
                    $timeout( function(){
                        ctrl.map.center = {
                            latitude: locationValue.lat(),
                            longitude: locationValue.lng()
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
    }
})();

