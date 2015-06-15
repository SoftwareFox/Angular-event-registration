(function () {
    'use strict';

    angular.module('ciberModule').factory('eventService', eventService);

    eventService.$inject = ['httpService'];

    function eventService(httpService) {
        var requestUrl ='/events';

        var service = {
            getEvents: getEvents,
            getEvent: getEvent,
            addEvent: addEvent,
            deleteEvent: deleteEvent,
            saveEvent: saveEvent
        };

        return service;

        function getEvent(id){
            return httpService.getItem(requestUrl, id);
        }

        function getEvents(){
            return httpService.getItems(requestUrl);
        }

        function addEvent(event){
            return httpService.addItem(requestUrl, event);
        }

        function deleteEvent(id){
            return httpService.deleteItem(requestUrl, id);
        }

        function saveEvent(event){
            return httpService.saveItem(requestUrl, event.id, event);
        }
    }
})();
