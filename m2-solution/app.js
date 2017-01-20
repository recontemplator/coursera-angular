(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getItemsToBuy();
  toBuy.buyClicked = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;
  alreadyBought.items = ShoppingListCheckOffService.getItemsAlreadyBought();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "20"
  },
  {
    name: "Cookies",
    quantity: "30"
  },
  {
    name: "Candies",
    quantity: "50"
  },
  {
    name: "Ice creams",
    quantity: "3"
  },
  {
    name: "Chocolate",
    quantity: "5"
  }
  ];
  var itemsBought=[]

  service.buyItem = function (itemIndex) {
  	itemsBought.push(itemsToBuy[itemIndex]);
  	itemsToBuy.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };
  service.getItemsAlreadyBought = function () {
    return itemsBought;
  };
}
})();
