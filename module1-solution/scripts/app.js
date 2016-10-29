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
          // Check if Item is empty or contains only whitespace
          if ( itemList[i] == '' || /^\s*$/.test(itemList[i]) ) {
            itemList.splice(i,1); //remove blank item
            i--;                  //lower loop iterator so next item is not skipped
          }
        }
        $scope.feedback = itemList.length < 4 ? 'Enjoy!' : 'Too Much Food!';
      }

    }
  };

  function separateItems(lunchItems){
    return lunchItems.split(',');
  }

})();
