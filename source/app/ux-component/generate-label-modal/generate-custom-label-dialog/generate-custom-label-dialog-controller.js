
(function () {
  'use strict';
  angular
    .module('otusjs.otus.uxComponent')
    .controller('generateCustomLabelDialogCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    '$scope',
    '$location',
    'otusjs.otus.uxComponent.Publisher',
  ];

  function Controller($mdToast, $mdDialog, $scope, $location, Publisher) {
    var self = this;
    self.DialogController = DialogController;
    self.showAdvanced = showAdvanced



    function showAdvanced(ev) {
      $mdDialog.show({
        controller: DialogController,
        controllerAs: 'ctrl',
        templateUrl: 'app/ux-component/generate-label-modal/generate-label-modal-template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          data: {
            participantButton: self.participantButton,
            kitButton: self.kitButton,
            kitId: self.kitId ? self.kitId : "",
            bioMaterialButton: self.bioMaterialButton,
            labelData: self.labelData ? self.labelData : "",
            publisher: Publisher
          }
        },
        fullscreen: false
      }).then(function (answer) {
        self.status = '';
      }, function () {
        self.status = '';
      });
    };


    function DialogController($scope,
                              $mdDialog,
                              $location,
                              data) {
      var ctrl = this;
      ctrl.dialogData = data;
      self.hide = hide;
      $scope.cancel = cancel
      $scope.activateMaterialLabelDashboard = activateMaterialLabelDashboard

      _publishPrintStructure()
      _subscribeLabels()

      function hide() {
        $mdDialog.hide();
      }

      function cancel() {
        $mdDialog.cancel();
      }

      function activateMaterialLabelDashboard() {
        $location.path('material-label-dashboard')
        self.hide()
      }

      function _labelToPrint(callback) {
        callback(
          data.labelData
        )
      }

      function _subscribeLabels() {
        data.publisher.unsubscribe('label-to-print')
        data.publisher.subscribe('label-to-print', _labelToPrint)
      }

      function _publishPrintStructure() {
        data.publisher.publish("default-print-structure", (defaultPrintStructure) => {
          data.labelData.printStructure = defaultPrintStructure
        })
      }
    }

  }
}());