(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function ($scope) {
  $scope.recomendation = "";
  $scope.class_state = "attention";
  $scope.checkIfTooMuch = function () {
    if ($scope.dishes && $scope.dishes.length>0){
    	var dishes_list=$scope.dishes.split(',').filter(function(d){return d&&d.trim().length>0 });
    	if (dishes_list.length>3){
   			$scope.recomendation = "Too much!"   
    	} else
 			$scope.recomendation = "Enjoy!"   
 	}else {
 		$scope.class_state = "attention";
 		$scope.recomendation = "Please enter data first";
 		$scope.class_state = "ok";
 	}
  };
});

})();
