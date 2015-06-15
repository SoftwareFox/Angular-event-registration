(function () {
    'use strict';

    angular.module('ciberModule').factory('userService', userService);

    userService.$inject = ['httpService'];

    function userService(httpService) {
        var requestUrl ='/users';

        var service = {
            getUsers: getUsers,
            addUser: addUser,
            getUserByEmail: getUserByEmail,
            deleteUser: deleteUser,
            getUser: getUser,
            saveUser: saveUser
        };

        return service;

        function getUsers(){
            return httpService.getItems(requestUrl);
        }

        function addUser(user){
            return httpService.addItem(requestUrl, user);
        }

        function getUserByEmail(email){
            return httpService.httpGet(requestUrl+'/search/findByEmail?email='+email);
        }

        function getUser(id){
            return httpService.getItem(requestUrl, id);
        }

        function saveUser(user){
            return httpService.saveItem(requestUrl, user.id, user);
        }

        function deleteUser(id){
            return httpService.deleteItem(requestUrl, id);
        }
    }
})();
