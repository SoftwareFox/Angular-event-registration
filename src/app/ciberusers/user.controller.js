( function (){
    'use strict';

    angular.module('ciberModule').controller('CiberUsersCtrl',CiberUsersCtrl);
    CiberUsersCtrl.$inject = ['initialData', 'userService','$location', 'dialogsService', 'utilService', 'md5','$stateParams'];

    function CiberUsersCtrl(initialData, userService, $location, dialogsService, utilService, md5, $stateParams) {
        var ctrl = this;

        ctrl.addUser = addUser;
        ctrl.saveUser = saveUser;
        ctrl.deleteUser = deleteUser;
        ctrl.cancel = cancel;
        ctrl.paginate = paginate;
        ctrl.emailhashList =[];

        if (!angular.isUndefined(initialData) && !angular.isUndefined(initialData.users)) {
            ctrl.users = initialData.users;
        }

        activate();

        function activate() {
            if (!angular.isUndefined($stateParams.id) && angular.isUndefined(ctrl.user)){
                userService.getUser($stateParams.id).then(function(results){
                    ctrl.user = results;
                });
            }

            if (!angular.isUndefined(ctrl.users)){
                ctrl.totalItems = ctrl.users.length;
                ctrl.currentPage = 1;
                ctrl.numPerPage = 4;
            }
            buildEmailhashList()
        }

        function paginate(value) {
            return utilService.paginate(value, ctrl.currentPage, ctrl.numPerPage, ctrl.users);
        };

        function buildEmailhashList(){
            if(ctrl.users!=[]){
                _.forEach(ctrl.users, function (user) {
                    ctrl.emailhashList[user.id] = md5.createHash(user.email);
                });
            }
        }

        function addUser(){
           var user = {
                email : ctrl.email,
                firstname : ctrl.firstname,
                lastname : ctrl.lastname,
                interests: []
            };
            userService.addUser(user).then(function(data){
               $location.path('/ciberusers');
            });
        }

        function saveUser(user){
           userService.saveUser(user).then(
                function(data){
                    $location.path('/ciberusers');
                }, function(reason) {
                    console.log('Failed to save data ' + reason);
                });
        }

        function deleteUser(id) {
            dialogsService.confirm('Er du sikker at du vil slette denne brukeren?', 'Slett?', ['Slett', 'Avbryt'])
                .then(function () {
                    userService.deleteUser(id).then(function (data) {
                        _.remove(ctrl.users, {'id': id});
                    });
                });
        }

        function cancel(){
            $location.path('/ciberusers');
        }
    }
})();

