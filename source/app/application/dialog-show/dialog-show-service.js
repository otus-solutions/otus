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
    self.showConfirmationDialog = showConfirmationDialog;
    self.showCustomizedDialog = showCustomizedDialog;
    self.showActivitySharingDialog = showActivitySharingDialog;

    function showDialog(data) {
      self.data = data;
      self.data.cancel = cancel;

      return $mdDialog.show({
        controller: 'dialogShowController',
        locals: { data: self.data },
        templateUrl: 'app/ux-component/dialog-show/dialog-show-template.html',
        parent: angular.element(document.body),
        controllerAs:"$ctrl",
        bindToController: true,
        clickOutsideToClose: true
      });
    }

    function showConfirmationDialog(titleToText, textDialog, ariaLabel) {
      self.data = {
        dialogToTitle: 'Confirmação',
        titleToText: titleToText,
        textDialog: textDialog,
        ariaLabel: ariaLabel,
        buttons: _getConfirmationDialogButtons()
      };
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

    function _getConfirmationDialogButtons() {
      return [
        {
          message: 'Ok',
          action: function () {
            $mdDialog.hide()
          },
          class: 'md-raised md-primary'
        },
        {
          message: 'Voltar',
          action: function () {
            $mdDialog.cancel()
          },
          class: 'md-raised md-no-focus'
        }
      ]
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

    function showActivitySharingDialog(selectedActivity) {
      self.data = {
        activity: selectedActivity,
        cancel: cancel
      }

      return $mdDialog.show({
        controller: 'activititySharingDialogShowController',
        bindToController: true,
        locals: { data: self.data },
        templateUrl: 'app/ux-component/dialog-show/activity-sharing/activity-sharing-dialog-show-template.html',
        parent: angular.element(document.body),
        controllerAs:"$ctrl",
        // clickOutsideToClose: true
      });
    }

    function cancel() {
      $mdDialog.cancel();
    }

  }
}());

