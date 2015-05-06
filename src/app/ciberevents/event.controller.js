( function (){
    'use strict';

    angular.module('ciberModule').controller('CiberEventCtrl',CiberEventCtrl);
    CiberEventCtrl.$inject = ['initialData', 'httpService', '$location'];

    function CiberEventCtrl(initialData, httpService, $location) {
        var ctrl = this;
        ctrl.activate = activate;
        ctrl.event = initialData.event;
        ctrl.locations = initialData.locations;
        ctrl.saveEvent = saveEvent;
        ctrl.addEvent = addEvent;
        ctrl.cancel = cancel;

        ctrl.open = openDatePicker;
        ctrl.openedStartDate = false;
        ctrl.openedEndDate = false;
        ctrl.startTime = {};
        ctrl.endTime = {};

        ctrl.locationIndex = {};

        activate();

        function cancel(){
            $location.path('/ciberevents');
        }

        function activate() {
            if (ctrl.event == null) {
                ctrl.startTime = moment('08:00', 'HH:mm').toDate();
                ctrl.endTime = moment('08:00', 'HH:mm').toDate();
            } else {
                ctrl.startTime = ctrl.event.startDate;
                ctrl.endTime = ctrl.event.endDate;
            }
            //current location
            if (ctrl.event != null) {
            _.forEach(ctrl.locations, function (location, index) {
                if (location.id == ctrl.event.location.id) {
                    ctrl.locationIndex = index;
                }
            });
            }
        }

        function openDatePicker($event, opened) {
            $event.preventDefault();
            $event.stopPropagation();
            if (opened == 'openedStartDate') {
                ctrl.openedStartDate = true;
            }
            else {
                ctrl.openedEndDate = true;
            }
        }

        function saveEvent(event){
            event.startDate = getTime(event.startDate, ctrl.startTime);
            event.endDate = getTime(event.endDate, ctrl.endTime);
            event.location = ctrl.Location;
            httpService.saveCiberEvent(event).then(
                function(data){
                    $location.path('/ciberevents');
                }, function(reason) {
                    console.log('Failed to save data ' + reason);
                });
        }

        function addEvent(){
            var newEvent = {
                description : ctrl.description,
                name: ctrl.name,
                location: ctrl.Location,
                startDate: getTime(ctrl.eventStartDate, ctrl.startTime),
                endDate: getTime(ctrl.eventEndDate, ctrl.endTime),
                createdDate: Date.now(),
                users: []
            };

            httpService.addCiberEvent(newEvent).then(function(data){
                $location.path('/ciberevents');
            });
        }

        function getTime(date, time) {
            var dateString = moment(date).format('YYYY-MM-DD');
            var timeString = moment(time).format('HH:mm:ss');
            return new Date(moment(dateString + ' ' + timeString).format('YYYY-MM-DDTHH:mm:ssZ')).getTime();
        }
    }
})();

