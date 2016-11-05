(function(){
    'use strict';

    var buyList = [
    {
        name: "Sriracha Sauce",
        quantity: 1
    },
    {
        name: "Beef, 1 lb.",
        quantity: 3
    },
    {
        name: "Soy Sauce",
        quantity: 300
    },
    {
        name: "Ginger",
        quantity: 1
    },
    {
        name: "Gochujang, 16 oz.",
        quantity: 2
    },
    {
        name: "Kimchi, 32 oz.",
        quantity: 2000
    }
    ];

    var boughtList = [];

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var showToBuyList = this;

        showToBuyList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

        showToBuyList.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
    function AlreadyBoughtController($scope, ShoppingListCheckOffService){
        var boughtList = this;

        boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = buyList;
        var boughtItems = boughtList;

        // Mark item on To Buy list as Bought
        service.buyItem = function (itemIndex) {
            var boughtItem = toBuyItems.splice(itemIndex,1);
            boughtItems.push(boughtItem[0]);
        };

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };

    }

})();
