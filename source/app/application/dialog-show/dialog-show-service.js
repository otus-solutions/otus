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
    self.cancel = cancel;

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

    function showCustomizedDialog(data, controller, templateUrl, clickOutsideToClose,
                                  controllerAs = '$ctrl',
                                  additionalOptions = {},
                                  fullscreen = true) {
      self.data = data;
      self.data.cancel = cancel;

      let dialogObject = {
        controller: controller,
        controllerAs: controllerAs,
        locals: { data: self.data },
        templateUrl: templateUrl,
        parent: angular.element(document.body),
        clickOutsideToClose: clickOutsideToClose,
        fullscreen: fullscreen
      };

      angular.extend(dialogObject, dialogObject, additionalOptions);

      return $mdDialog.show();
    }

    function showActivitySharingDialog(selectedActivity, fullscreen = true) {
      self.data = {
        activity: selectedActivity,
        cancel: cancel
      };

      return $mdDialog.show({
        controller: 'activititySharingDialogShowController',
        bindToController: true,
        locals: { data: self.data },
        templateUrl: 'app/ux-component/dialog-show/activity-sharing/activity-sharing-dialog-show-template.html',
        parent: angular.element(document.body),
        controllerAs:"$ctrl",
        fullscreen: fullscreen
      });
    }

    function cancel() {
      $mdDialog.cancel();
    }

  }
}());

