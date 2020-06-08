(function () {
  'use strict';

  angular
    .module('otusjs.application.dialog')
    .service('otusjs.application.dialog.DialogShowService', DialogService);

  DialogService.$inject = [
    '$mdDialog'
  ];

  function DialogService($mdDialog){
    var self = this;

    self.showDialog = showDialog;
    self.showCustomizedDialog = showCustomizedDialog;

    function showDialog(data) {
      self.data = data;
      self.data.cancel = cancel;

      return $mdDialog.show({
        controller: 'dialogShowController',
        locals: { data: self.data },
        templateUrl: 'app/ux-component/dialog-show/dialog-show-template.html',
        parent: angular.element(document.body),
        controllerAs:"$ctrl",
        clickOutsideToClose: true
      });
    }

    function showCustomizedDialog(data, templateUrl, fullscreen=true) {
      self.data = data;
      self.data.cancel = cancel;

      return $mdDialog.show({
        controller: 'customizedDialogShowController',
        controllerAs: "$ctrl",
        locals: { data: self.data },
        templateUrl: templateUrl,
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: fullscreen
      });
    }

    function cancel() {
      $mdDialog.cancel();
    }
  }
}());

