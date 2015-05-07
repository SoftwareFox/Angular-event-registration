(function () {
    'use strict';

    angular.module('ciberModule').controller('HomeCtrl', HomeCtrl);
    HomeCtrl.$inject=['loaddataService'];

    function HomeCtrl(loaddataService) {
        var ctrl = this;

        ctrl.loggedInUser = loaddataService.getLoggedInUser();

        activate();
        function activate() {
        }
    }
})();