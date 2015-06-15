( function (){
    'use strict';

    angular.module('ciberModule').controller('ResultController',ResultController);
    ResultController.$inject = ['initialData', 'resultService'];

    function ResultController(initialData, resultService) {
        var ctrl = this;
        ctrl.events = initialData.events;
        ctrl.users = initialData.users;
        console.log(initialData);

        ctrl.addResult = addResult;
        ctrl.cancel = cancel;

        activate();

        function activate() {

        }

        function cancel(){

        }

        function addResult(){
            var result = {
                userId : ctrl.User.id,
                eventId : ctrl.Event.id,
                result : ctrl.result,
                position: ctrl.position
            };
            resultService.addResult(result).then(function(data){
               // $location.path('');
            });
        }
    }
})();

