(function () {
    'use strict';
    var app = angular.module('ciberModule', [
        'ui.bootstrap',
        'ui.calendar',
        'ui.router',
        'uiGmapgoogle-maps',
        'ngCookies',
        'angular-md5'
    ]);

    app.config(['$stateProvider','$urlRouterProvider','uiGmapGoogleMapApiProvider', configRoutes ]);

    function configRoutes($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            v:'3.17'
        });

        $stateProvider
            .state('home', {
                url:'/',
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'ctrl'
            })
            .state('ciberusers', {
                url:'/ciberusers',
                templateUrl: 'app/ciberusers/userList.html',
                controller: 'CiberUsersCtrl',
                controllerAs: 'ctrl',
                resolve:{
                    initialData: ['loaddataService', function (loaddataService) {
                        return loaddataService.getUsers();
                    }]
                }
            })
            . state('addciberuser', {
                url:'/addciberuser',
                templateUrl: 'app/ciberusers/addUser.html',
                controller: 'CiberUsersCtrl',
                controllerAs: 'ctrl',
                resolve:{
                    initialData: ['loaddataService', function (loaddataService) {
                        return loaddataService.getUsers();
                    }]
                }
            })
            . state('editciberuser', {
                url:'/editciberuser/:id',
                templateUrl: 'app/ciberusers/editUser.html',
                controller: 'CiberUsersCtrl',
                controllerAs: 'ctrl',
                resolve:{
                    initialData:['$stateParams','loaddataService', function($stateParams, loaddataService){
                        return loaddataService.getUsers();
                    }]
                }
            })
            .state('ciberlocationdetails', {
                url:'/ciberlocationdetails/:id',
                templateUrl: 'app/ciberlocations/locationDetails.html',
                controller: 'CiberLocationCtrl',
                controllerAs: 'ctrl',
                resolve:{
                    initialData:['$stateParams','locationService', function($stateParams, locationService){
                        return locationService.getLocation($stateParams.id);
                    }],
                    maps: ['uiGmapGoogleMapApi', function(uiGmapGoogleMapApi){
                        return uiGmapGoogleMapApi;
                    }],
                    currentPosition: ['$q', function($q){
                        var deferred = $q.defer();
                        navigator.geolocation.getCurrentPosition(function(position){
                            deferred.resolve(position);
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state('ciberlocations', {
                url:'/ciberlocations',
                templateUrl: 'app/ciberlocations/locationList.html',
                controller: 'CiberLocationsCtrl',
                controllerAs: 'ctrl',
                resolve:{
                    initialData: ['loaddataService', function (loaddataService) {
                        return loaddataService.getLocations();
                    }],
                    maps: ['uiGmapGoogleMapApi', function(uiGmapGoogleMapApi){
                        return uiGmapGoogleMapApi;
                    }]
                }
            })
            . state('addciberlocation', {
                url:'/addciberlocation',
                templateUrl: 'app/ciberlocations/addLocation.html',
                controller: 'CiberLocationCtrl',
                controllerAs: 'ctrl',
                resolve:{
                    initialData: [ function () {
                        return {}
                    }],
                    maps: ['uiGmapGoogleMapApi', function(uiGmapGoogleMapApi){
                        return uiGmapGoogleMapApi;
                    }],
                    currentPosition: ['$q', function($q){
                        var deferred = $q.defer();
                        navigator.geolocation.getCurrentPosition(function(position){
                            deferred.resolve(position);
                        });
                        return deferred.promise;
                    }]
                }
            })
            . state('editciberlocation', {
                url:'/editciberlocation/:id',
                templateUrl: 'app/ciberlocations/editLocation.html',
                controller: 'CiberLocationCtrl',
                controllerAs: 'ctrl',
                resolve:{
                    initialData:['$stateParams','locationService', function($stateParams, locationService){
                        return locationService.getLocation($stateParams.id);
                    }],
                    maps: ['uiGmapGoogleMapApi', function(uiGmapGoogleMapApi){
                        return uiGmapGoogleMapApi;
                    }],
                    currentPosition: ['$q', function($q){
                        var deferred = $q.defer();
                        navigator.geolocation.getCurrentPosition(function(position){
                            deferred.resolve(position);
                        });
                        return deferred.promise;
                    }]
                }
            })
            . state('ciberevents', {
                url:'/ciberevents',
                templateUrl: 'app/ciberevents/eventList.html',
                controller: 'CiberEventsCtrl',
                controllerAs: 'ctrl',
                resolve:{
                    initialData: ['loaddataService', function (loaddataService) {
                        return loaddataService.getData();
                    }]
                }
            })
            . state('addciberevent', {
                url:'/addciberevent',
                templateUrl: 'app/ciberevents/addEvent.html',
                controller: 'CiberEventCtrl',
                controllerAs: 'ctrl',
                resolve:{
                    initialData: ['loaddataService', function (loaddataService) {
                        return loaddataService.getLocations();
                    }]
                }
            })
            . state('editciberevent', {
                url:'/editciberevent/:id',
                templateUrl: 'app/ciberevents/editEvent.html',
                controller: 'CiberEventCtrl',
                controllerAs: 'ctrl',
                resolve:{
                    initialData:['$stateParams','loaddataService', function($stateParams, loaddataService){
                        return loaddataService.getEventAndLocations($stateParams.id);
                    }]
                }
            })
            . state('cibereventdetails', {
                url:'/cibereventdetails/:id',
                templateUrl: 'app/ciberevents/eventDetails.html',
                controller: 'CiberEventDetailsCtrl',
                controllerAs: 'ctrl',
                resolve:{
                    initialData:['$stateParams','loaddataService', function($stateParams, loaddataService){
                        return loaddataService.getEventAndLocations($stateParams.id);
                    }],
                    maps: ['uiGmapGoogleMapApi', function(uiGmapGoogleMapApi){
                        return uiGmapGoogleMapApi;
                    }]
                }
            })
            . state('cibercalendar', {
                    url:'/cibercalendar',
                    templateUrl: 'app/ciberevents/eventCalendar.html',
                    controller: 'CiberEventsCtrl',
                    controllerAs: 'ctrl',
                resolve:{
                    initialData: ['loaddataService', function (loaddataService) {
                        return loaddataService.getData();
                    }]
                }
                })
            . state('login', {
                url:'/login',
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'ctrl'
            })
            .state('addResult',{
                url:'/addResult',
                templateUrl:'app/result/addResult.html',
                controller:'ResultController',
                controllerAs:'ctrl',
                resolve:{
                    initialData: ['loaddataService', function (loaddataService) {
                        return loaddataService.getData();
                    }]
                }
            });

        $urlRouterProvider.otherwise('/login');
    }

    app.run(['$state','$rootScope','$location', '$cookieStore',
        function ($state, $rootScope, $location, $cookieStore) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login']) == -1;
            var loggedIn = $rootScope.globals.currentUser;
            if ( !loggedIn && restrictedPage) {
                $location.path('/login');
            }
        });
        }]);
})();
