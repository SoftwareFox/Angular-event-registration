( function (){
    'use strict';

    angular.module('ciberModule').controller('CiberUsersCtrl',CiberUsersCtrl);
    CiberUsersCtrl.$inject = ['initialData', 'httpService','$location', 'dialogsService', 'utilService'];

    function CiberUsersCtrl(initialData, httpService, $location, dialogsService, utilService) {
        var ctrl = this;
        ctrl.user = initialData;
        ctrl.users = initialData.users;

        ctrl.addUser = addUser;
        ctrl.saveUser = saveUser;
        ctrl.deleteUser = deleteUser;
        ctrl.cancel = cancel;
        ctrl.paginate = paginate;

        activate();

        function activate() {
            if (!angular.isUndefined(ctrl.users)){
                ctrl.totalItems = ctrl.users.length;
                ctrl.currentPage = 1;
                ctrl.numPerPage = 4;
            }
        }

        function paginate(value) {
            return utilService.paginate(value, ctrl.currentPage, ctrl.numPerPage, ctrl.users);
        };

        function addUser(){
           var user = {
                email : ctrl.email,
                firstname : ctrl.firstname,
                lastname : ctrl.lastname,
                interests: []
            };
            httpService.addCiberUser(user).then(function(data){
               $location.path('/ciberusers');
            });
        }

        function saveUser(user){
           httpService.saveCiberUser(user).then(
                function(data){
                    $location.path('/ciberusers');
                }, function(reason) {
                    console.log('Failed to save data ' + reason);
                });
        }

        function deleteUser(id) {
            dialogsService.confirm('Er du sikker at du vil slette denne brukeren?', 'Slett?', ['Slett', 'Avbryt'])
                .then(function () {
                    httpService.deleteCiberUser(id).then(function (data) {
                        _.remove(ctrl.users, {'id': id});
                    });
                });
        }

        function cancel(){
            $location.path('/ciberusers');
        }
    }
})();

