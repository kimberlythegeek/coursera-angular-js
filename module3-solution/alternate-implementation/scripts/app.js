(function () {

    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .directive('foundItems', foundItems)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");

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
            narrow.error = "";
            narrow.found = [];
            // If searchTerm is not set, return an empty array instead of all menu items
            if (searchTerm === '' || searchTerm === undefined) {
                narrow.error = "Your search return no results.";
            }
            else {
                var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

                promise.then(function (response) {
                    // If no results found, or searchTerm was empty, display error
                    if (response.length < 1) {
                        narrow.error = "Your search return no results.";
                    }
                    // Else, set found to array of found items
                    else narrow.found = response.sort(function(a, b){
                        if(a.name < b.name) return -1;
                        if(a.name > b.name) return 1;
                        return 0;
                    });

                }, function (error) {
                    console.log('An error has occurred.');
                });
            }
        }

        narrow.removeItem = function (index) {
            narrow.found.splice(index,1);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService ($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {

            return $http({url: ApiBasePath}).then (function (result) {
                // Process If API call Successful
                var menu = result.data.menu_items;
                // Filter menu_items array with those matching searchTerm
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
