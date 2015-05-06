(function () {
    'use strict';

    angular.module('ciberModule').factory('dialogsService', dialogsService);

    dialogsService.$inject = ['$modal'];

    function dialogsService($modal) {
        var service = {
            confirm: confirm,
            login: login
        };

        return service;

        function confirm(message, title, buttons){
            var modalInstance = $modal.open({
                templateUrl: '/app/modal/confirm-modal.html',
                controller: 'ModalCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    data: function() {
                        return {
                            message: message,
                            title: title,
                            buttons: buttons
                        };
                    }
                },
                size: 'sm'
            });

            return modalInstance.result;
        }

        function login( title, buttons){
            var modalInstance = $modal.open({
                templateUrl: '/app/modal/login-modal.html',
                controller: 'ModalCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    data: function() {
                        return {
                            title: title,
                            buttons: buttons
                        };
                    }
                },
                size: 'sm'
            });

            return modalInstance.result;
        }
    }
})();