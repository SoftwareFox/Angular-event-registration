( function (){
    'use strict';

    angular.module('ciberModule').controller('CiberEventsCtrl',CiberEventsCtrl);
    CiberEventsCtrl.$inject = ['initialData', 'httpService', 'dialogsService', 'loaddataService', 'utilService'];

    function CiberEventsCtrl(initialData, httpService, dialogsService, loaddataService, utilService) {
        var ctrl = this;

        ctrl.events = initialData.events;
        ctrl.locations = initialData.locations;
        ctrl.deleteItem = deleteItem;
        ctrl.unregister = unregister;
        ctrl.register = register;
        ctrl.paginate = paginate;
        ctrl.registrationEventMap = {};

        ctrl.calendarConfig = {
            height : 400
        };

        activate();

        function activate() {
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
                    httpService.deleteCiberEvent(id).then(function (data) {
                        _.remove(ctrl.events, {'id': id});
                    });
                });
        }

        function unregister(id) {
            if (loaddataService.getLoggedInUser() != null) {
                httpService.getCiberEvent(id).then(function (data) {
                    data.users.forEach(function (user, index) {
                        if (user.id == loaddataService.getLoggedInUser().id) {
                            data.users.splice(index, 1);
                        }
                    });
                    httpService.saveCiberEvent(data).then(function (data) {
                        ctrl.registrationEventMap[id] = false;
                    });
                });
            }
        }

        function register(id) {
            if (loaddataService.getLoggedInUser() != null) {
                httpService.getCiberEvent(id).then(function (data) {
                    data.users.push(loaddataService.getLoggedInUser());
                    httpService.saveCiberEvent(data).then(function (data) {
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


