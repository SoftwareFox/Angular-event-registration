( function (){
    'use strict';

    angular.module('ciberModule').controller('CiberLocationsCtrl',CiberLocationsCtrl);
    CiberLocationsCtrl.$inject = ['initialData', 'httpService', 'dialogsService', 'utilService'];

    function CiberLocationsCtrl(initialData, httpService, dialogsService, utilService) {
        var ctrl = this;
        ctrl.activate = activate;
        ctrl.locations = initialData.locations;
        ctrl.deleteLocation = deleteLocation;
        ctrl.paginate = paginate;

        activate();

        function activate() {
            if (!angular.isUndefined(ctrl.locations)){
                ctrl.totalItems = ctrl.locations.length;
                ctrl.currentPage = 1;
                ctrl.numPerPage = 4;
            }
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

