(function () {

    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .directive('foundItems', foundItems)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com/menu_items.json");

    // foundItems.$inject = ['NarrowItDownController'];
    function foundItems () {
        var ddo = {
            templateUrl: 'found-items.html'
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController (MenuSearchService){
        var narrow = this;

        narrow.logMenuItems = function (searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
            promise.then(function (response) {
                narrow.found = response;
                console.log(response);
            }, function (error) {
                console.log('An error has occurred.');
            });
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService ($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {

            return $http({url: ApiBasePath}).then (function (result) {
                // Process If API call Successful
                var menu = result.data.menu_items;
                return menu.filter(function(item) {
                    var name = item.name.toLowerCase();
                    return name.indexOf(searchTerm) >= 0;
                });

            }, function error(result) {
                console.log('An error has occurred.');
            });
        };
    }

})();
