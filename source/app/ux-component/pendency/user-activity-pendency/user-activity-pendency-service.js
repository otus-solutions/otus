(function (){
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.otus.uxComponent.UserActivityPendencyService', Service);

  Service.$inject = [
    '$mdDialog',
    'otusjs.otus.uxComponent.UserActivityPendencyValue'
  ];

  function Service($mdDialog, VALUE) {
    const self = this;



    self.createUserActivityPendency = createUserActivityPendency;

    function createUserActivityPendency(activity) {
      self.activity = activity;


      $mdDialog.show({
        controller: _DialogController,
        templateUrl: 'app/ux-component/pendency/user-activity-pendency/user-activity-pendency-dialog-template.html',
        parent:angular.element(document.body),
        clickOutsideToClose: true
      })
    }

    function _DialogController($scope, $mdDialog){
      $scope.activity = self.activity;
      $scope.createButtonInfo = VALUE.CREATE_PENDENCY_BUTTON;
      $scope.cancelButtonInfo = VALUE.CANCEL_PENDENCY_BUTTON;

      $scope.cancel = function () {
        _cleanReference();
        $mdDialog.cancel();

      };

      function _cleanReference() {
        self.activity = {};
        $scope.activity = {};
      }
    }
  }

}());