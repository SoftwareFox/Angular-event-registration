(function () {
    'use strict';

    angular.module('ciberModule').controller('ModalCtrl', ModalCtrl);

    ModalCtrl.$inject = ['$modalInstance', 'data'];

    function ModalCtrl($modalInstance, data) {
        var ctrl = this;

        ctrl.cancel = cancel;
        ctrl.ok = ok;
        ctrl.login = login;
        ctrl.properties = data;

        function cancel() {
            $modalInstance.dismiss();
        }

        function ok() {
            $modalInstance.close();
        }

        function login() {
            $modalInstance.close(ctrl.usermail, ctrl.password);
        }
    }
})();