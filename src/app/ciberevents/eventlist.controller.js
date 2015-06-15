( function (){
    'use strict';

    angular.module('ciberModule').controller('CiberEventsCtrl',CiberEventsCtrl);
    CiberEventsCtrl.$inject = ['initialData', 'eventService', 'dialogsService', 'loaddataService', 'utilService'];

    function CiberEventsCtrl(initialData, eventService, dialogsService, loaddataService, utilService) {
        var ctrl = this;

        ctrl.events = initialData.events;
        ctrl.locations = initialData.locations;
        ctrl.locations.push({});
        ctrl.deleteItem = deleteItem;
        ctrl.unregister = unregister;
        ctrl.register = register;
        ctrl.paginate = paginate;
        ctrl.registrationEventMap = {};
        ctrl.search = search;
        ctrl.open = openDatePicker;


        ctrl.calendarConfig = {
            height : 400
        };

        activate();

        function activate() {
            ctrl.events = initialData.events;
            var calendarEvents = _.map(ctrl.events, mapEventForCalendar);
            ctrl.eventSources = [calendarEvents];

            if (!angular.isUndefined(ctrl.events)){
                ctrl.totalItems = ctrl.events.length;
                ctrl.currentPage = 1;
                ctrl.numPerPage = 3;
            }

            _.forEach(ctrl.events, function(event){
                ctrl.registrationEventMap[event.id] = false;

                _.forEach(event.users, function(user){
                   if (user.id == loaddataService.getLoggedInUser().id) {
                        ctrl.registrationEventMap[event.id] = true;
                    }
                });
            });
        }

        function openDatePicker($event) {
            ctrl.opened=true;
        }

        function search(){
            ctrl.events = initialData.events;
            var locationSelected = !angular.equals(ctrl.Location, {});
            var dateSelected = !angular.isUndefined(ctrl.startDate) ;
            if (locationSelected || dateSelected) {
                var requestedEvents = [];
                _.forEach(ctrl.events, function (event) {
                    if (locationSelected && dateSelected &&
                            (event.location.id == ctrl.Location.id) && (event.startDate >= ctrl.startDate)){
                                requestedEvents.push(event);
                    }
                    if (locationSelected && (!dateSelected) &&(event.location.id == ctrl.Location.id)) {
                        requestedEvents.push(event);
                    }
                    if ((!locationSelected) && dateSelected && event.startDate >= ctrl.startDate){
                        requestedEvents.push(event);
                    }
                });
                ctrl.events = requestedEvents;
            }
        }

        function mapEventForCalendar(event){
            return {
                id: event.id,
                start: formatDataForCalendar(event.startDate),
                title: event.name,
                allDay: false,
                end: formatDataForCalendar(event.endDate)
            };
        }

        function paginate(value) {
            return utilService.paginate(value, ctrl.currentPage, ctrl.numPerPage, ctrl.events);
        }

        function deleteItem(id) {
            dialogsService.confirm('Er du sikker at du vil slette denne eventen?', 'Slett?', ['Slett', 'Avbryt'])
                .then(function () {
                    eventService.deleteEvent(id).then(function (data) {
                        _.remove(ctrl.events, {'id': id});
                    });
                });
        }

        function unregister(id) {
            if (loaddataService.getLoggedInUser() != null) {
                eventService.getEvent(id).then(function (data) {
                    data.users.forEach(function (user, index) {
                        if (user.id == loaddataService.getLoggedInUser().id) {
                            data.users.splice(index, 1);
                        }
                    });
                    eventService.saveEvent(data).then(function (data) {
                        ctrl.registrationEventMap[id] = false;
                    });
                });
            }
        }

        function register(id) {
            if (loaddataService.getLoggedInUser() != null) {
                eventService.getEvent(id).then(function (data) {
                    data.users.push(loaddataService.getLoggedInUser());
                    eventService.saveEvent(data).then(function (data) {
                        ctrl.registrationEventMap[id] = true;
                    });
                });
            }
        }

        function formatDataForCalendar(date){
            return moment(date).format('YYYY-MM-DDTHH:mm:ssZ');
        }
    }
})();


