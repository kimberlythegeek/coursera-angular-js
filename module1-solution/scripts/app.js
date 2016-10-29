(function(){
  'use strict';

  angular.module('LunchCheck', [])

  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope){
    $scope.feedback = '';
    $scope.checkIfTooMuch = function() {

      if( $scope.lunchItems == '' || $scope.lunchItems == null ) $scope.feedback = 'Please enter food items.';
      else {
        var itemList = separateItems($scope.lunchItems);
        for(var i=0; i<itemList.length; i++){
          console.log(itemList[i]);
        }
        $scope.feedback = itemList.length < 4 ? 'Enjoy!' : 'Too Much Food!';
      }

    }
  };

  function separateItems(lunchItems){
    return lunchItems.split(',');
  }

})();
