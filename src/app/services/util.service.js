(function () {
    'use strict';

    angular.module('ciberModule').factory('utilService', utilService);

    utilService.$inject = [];

    function utilService() {

        var service = {
            paginate: paginate
        };

        return service;

        function paginate(value, currentPage, numPerPage, objectList) {
            var begin, end, index;
            begin = (currentPage - 1) * numPerPage;
            end = begin + numPerPage;
            index = objectList.indexOf(value);
            return (begin <= index && index < end);
        }
    }
})();
