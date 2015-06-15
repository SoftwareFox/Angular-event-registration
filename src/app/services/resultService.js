(function () {
    'use strict';

    angular.module('ciberModule').factory('resultService', resultService);

    resultService.$inject = ['httpService'];

    function resultService(httpService) {

        var requestUrl ='/results';

        var service = {
            addResult: addResult
        };

        return service;

        function addResult(result){
           // return httpService.addItem(requestUrl, result);
            return httpService.addResult(requestUrl, result);
        }
    }
})();
