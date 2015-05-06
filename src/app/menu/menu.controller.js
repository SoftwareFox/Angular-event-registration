(function () {
    'use strict';

    angular.module('ciberModule').controller('MenuCtrl', MenuCtrl);
    MenuCtrl.$inject = ['$rootScope', 'loaddataService', 'authenticationService', '$window'];

    function MenuCtrl($rootScope, loaddataService, authenticationService, $window) {
        var ctrl = this;
        ctrl.loggedInUser = loaddataService.getLoggedInUser();
        ctrl.logout = logout;
        ctrl.showSpinner = false;
        ctrl.spinnerMessage = 'Henting data...';

        ctrl.spinnerOptions = {
            radius: 40,
            lines: 8,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#428bca'
        };

        activate();

        function activate() {
            ctrl.loggedInUser = loaddataService.getLoggedInUser();
        }

        function logout(){
            authenticationService.clearCredentials();
            $window.location.reload();
        }

        $rootScope.$on('spinner.toggle', function (event, args) {
            ctrl.showSpinner = args.show;
            if (args.message) {
                ctrl.spinnerMessage = args.message;
            }
        });
    }
})();
