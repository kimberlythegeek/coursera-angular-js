(function(){
    'use strict';

    var buyList = [];

    var boughtList = [];

    angular.module('ShoppingList', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListService', ShoppingListService);


    ToBuyController.$inject = ['ShoppingListService'];
    function ToBuyController(ShoppingListService){
        var toBuyList = this;

        toBuyList.toBuyItems = ShoppingListService.getToBuyItems();

        toBuyList.addItem = function() {
            ShoppingListService.addItem(toBuyList.itemName, toBuyList.itemQuantity);
        };

        toBuyList.removeItem = function () {
            ShoppingListService.removeItem(toBuyList.itemIndex);
        };

        toBuyList.buyItem = function (itemIndex) {
            ShoppingListService.buyItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['$scope', 'ShoppingListService'];
    function AlreadyBoughtController($scope, ShoppingListService){
        var boughtList = this;

        boughtList.boughtItems = ShoppingListService.getBoughtItems();

        boughtList.unBuyItem = function (itemIndex) {
            ShoppingListService.unBuyItem(itemIndex);
        };
    }

    function ShoppingListService() {
        var service = this;

        var toBuyItems = buyList;
        var boughtItems = boughtList;

        service.addItem = function (itemName, itemQuantity) {
            var item = {
                name: itemName,
                quantity: itemQuantity
            };
            toBuyItems.push(item);
        };

        service.removeItem = function (itemIndex) {
            toBuyItems.splice(itemIndex, 1);
        };

        // Mark item on To Buy list as Bought
        service.buyItem = function (itemIndex) {
            var boughtItem = toBuyItems.splice(itemIndex,1);
            boughtItems.push(boughtItem[0]);
        };

        // Undo "Buy Item" action
        service.unBuyItem = function (itemIndex) {
            var unBoughtItem = boughtItems.splice(itemIndex,1);
            toBuyItems.push(unBoughtItem[0]);
        }

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };

    }

})();
