(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityAdderToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-adder-toolbar/activity-adder-toolbar-template.html',
      bindings: {
        activityType: '<',
        onAddActivities: '&',
        title: '@'
      }
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;

    self.dados = [{'Alíquota': '343449847','Sexo': 'Masculino','Data de Nascimento': '25/03/1989'}];
    self.campos = ['Alíquota', 'Sexo', 'Data de Nascimento'];
    /* Public methods */
    self.addActivities = addActivities;
    self.returnToParticipantActivities = returnToParticipantActivities;

    function addActivities() {
      self.onAddActivities();
    }

    function returnToParticipantActivities() {
      ApplicationStateService.activateParticipantActivities();
    }
  }
}());
