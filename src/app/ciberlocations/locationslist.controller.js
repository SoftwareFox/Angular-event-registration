( function (){
    'use strict';

    angular.module('ciberModule').controller('CiberLocationsCtrl', CiberLocationsCtrl);
    CiberLocationsCtrl.$inject = ['initialData', 'httpService', 'dialogsService', 'utilService', 'maps', '$timeout'];

    function CiberLocationsCtrl(initialData, httpService, dialogsService, utilService, maps, $timeout) {
        var ctrl = this;

        ctrl.locations = initialData.locations;
        ctrl.deleteLocation = deleteLocation;
        ctrl.paginate = paginate;
        ctrl.locationAddress = {};

        activate();
        var pause = 0;

        function activate() {
            geocoding(ctrl.locations[0], 0);

            if (!angular.isUndefined(ctrl.locations)){
                ctrl.totalItems = ctrl.locations.length;
                ctrl.currentPage = 1;
                ctrl.numPerPage = 4;
            }
        }

        function geocoding(location, index){
            var geocoder = new maps.Geocoder();
            var latlng = new maps.LatLng(location.latitude, location.longitude);
            geocoder.geocode({'latLng' : latlng}, function (results, status) {
                $timeout(function() {
                    if (status == maps.GeocoderStatus.OK) {
                        ctrl.locationAddress[location.id] = results[0].formatted_address;
                        if (index < ctrl.locations.length-1) {
                            geocoding(ctrl.locations[index + 1], index + 1);
                        }
                    }
                    else if (status == maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                        pause = +100;
                        geocoding(ctrl.locations[index], index);
                    }
                },pause);
            });
        }

        function paginate(value) {
            return utilService.paginate(value, ctrl.currentPage, ctrl.numPerPage, ctrl.locations);
        }

        function deleteLocation(id) {
            dialogsService.confirm('Er du sikker at du vil slette denne plasseringen?', 'Slett?', ['Slett', 'Avbryt'])
                .then(function () {
                    httpService.deleteCiberLocation(id).then(function (data) {
                        _.remove(ctrl.locations, {'id': id});
                    });
                });
        }
    }
})();

