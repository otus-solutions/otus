(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusFollowUpEventCtrl', Controller);

  Controller.$inject = [
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory'
  ];

  function Controller(DynamicTableSettingsFactory) {
    var self = this;

    self.$onInit = onInit;
    self.translatedStatus = {
      ACCOMPLISHED: "finalizado"
    };

    function onInit() {
      _buildDynamicTableSettings();
    }

    self.dynamicDataTableChange = dynamicDataTableChange;
    function dynamicDataTableChange(change) {
      if (change.type === 'select' || change.type === 'deselect') {
        self.selectActivity(change.element);
      }
    }

    function _buildDynamicTableSettings() {
      self.dynamicTableSettings = DynamicTableSettingsFactory.create()
        .setElementsArray(self.eventData.participantEvents)
        .addHeader('DATA', '50', '', 2)
        .addColumnProperty('name')
        .addHeader('STATUS', '50', '', 1)
        .addColumnProperty('acronym')
        .setCallbackAfterChange(self.dynamicDataTableChange)
        .setFilter(false)
        .setTitle("Eventos criados")
        .setCheckbox(false)
        .getSettings();
    }
  }
}());

