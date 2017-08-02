(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-toolbar/sample-transportation-manager-toolbar-template.html',
    });


  function Controller() {
    var self = this;

    self.showChangeButton = true;
    self.showInfoButton = true;
    self.$onInit = onInit;

    function onInit() {
    }

    function _updateComponent(selectedActivities) {
      if (selectedLots.length <= 0) {
        self.showChangeButton = false;
        self.showInfoButton = false;
      } else if (selectedLots.length === 1) {
        self.showChangeButton = true;
        self.showInfoButton = true;
      } else {
        self.showChangeButton = false;
        self.showInfoButton = false;
      }
    }
  }
}());
