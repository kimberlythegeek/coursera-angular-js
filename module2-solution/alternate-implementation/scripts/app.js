(function(){
    'use strict';

    // var buyList = [
    //     "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"
    // ];
    //
    // var boughtList = [];

    angular.module('ShoppingListCheckOff', [])
    .controller('ShoppingListAddController', ShoppingListAddController)
    .controller('ShoppingListShowController', ShoppingListShowController)
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ShoppingListAddController.$inject = ['ShoppingListCheckOffService'];
    function ShoppingListAddController(ShoppingListCheckOffService) {
        var itemAdder = this;

        itemAdder.itemName = '';
        itemAdder.itemQuantity = '';
        itemAdder.addItem = function() {
            ShoppingListCheckOffService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
        };
    }

    ShoppingListShowController.$inject = ['ShoppingListCheckOffService'];
    function ShoppingListShowController(ShoppingListCheckOffService) {
      var showList = this;

      showList.items = ShoppingListCheckOffService.getItems();

    }

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var showToBuyList = this;

        showToBuyList.items = ShoppingListCheckOffService.getToBuyItems();

        showToBuyList.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
    function AlreadyBoughtController($scope, ShoppingListCheckOffService){
        var boughtList = this;

        boughtList.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        // List of Shopping Items
        var items = [];
        // Add item with name & quantity, set as UNbought
        service.addItem = function (itemName, itemQuantity) {
            var item = {
                name: itemName,
                quantity: itemQuantity,
                bought: false
            };
            items.push(item);
            console.log(items);
        };

        // Mark item on To Buy list as Bought
        service.buyItem = function (itemIndex) {
            var item = items[itemIndex];
            item.bought = true;
        };

        service.getItems = function() {
            return items;
        };

        service.getToBuyItems = function () {
            return items.filter(function(item) {
                return !item.bought;
            });
        };

        service.getBoughtItems = function () {
            // Create empty array for purchased items
            var boughtItems = [];
            // Search list of items
            for(var i=0; i<items.length; i++){
                // Select current item
                var item = items[i];
                // Push to new array ONLY if item is already bought
                if (item.bought == true) boughtItems.push(item);
            }
            // Return list of UNbought items
            return boughtItems;
        };

    }

})();
