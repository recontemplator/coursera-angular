(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    restrict: "E",
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'narrowDownCtrl',
    bindToController: true
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService,$http) {
  var ctrl = this;
  // ctrl.searchTerm='garlic';
  ctrl.narrowClicked = function () {
     // console.log('Clicked');
    MenuSearchService.getMatchedMenuItems(ctrl.searchTerm).then(function (result){
      // console.log('result'+result);
    ctrl.found=result;
    // console.log(result[0])
       // for (var i = 0; i < result.length; i++) {
       //    console.log(result[i].name);
       //  }
    });
  }
  ctrl.removeItem =function (index) {
    ctrl.found.splice(index, 1);
  };
}



MenuSearchService.$inject = ['$http','ApiBasePath'];

function MenuSearchService($http,ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
     // console.log('service: '+searchTerm);
    return $http({'url':(ApiBasePath+'/menu_items.json')}).then(function (result) {
    // process result and only keep items that match
    // console.log('result.data.menu_items:'+result.data.menu_items);
    var foundItems = result.data.menu_items.filter(function(item){ 
      return item.description && 
             searchTerm && 
             item.description.toLowerCase().indexOf(searchTerm.toLowerCase())!=-1});

    // return processed items
    // console.log('found items:');
    // console.log(foundItems);
    return foundItems;
});
  }

}
})();
