(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityCategoryAdder', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-category-adder/activity-category-adder-template.html'
    });

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.application.state.ApplicationStateService',
    '$mdDialog'
  ];

  function Controller(ActivityService, ApplicationStateService, $mdDialog) {
    var self = this;
    var _selectedActivities = [];
    var _exitDialog;


    /* Public methods */
    self.addActivities = addActivities;
    self.catchActivity = catchActivity;
    _init();

    function _init() {
      _exitDialog = $mdDialog.alert()
        .title('ATENÇÃO!')
        .textContent('Você deve selecionar ao menos uma atividade.')
        .ariaLabel('Alerta de Erro')
        .ok('Fechar');
    }

    function addActivities() {
        ActivityService.add();
        ApplicationStateService.activateParticipantActivities();

    }

    function catchActivity(activity) {
      var activityIndex = _selectedActivities.indexOf(activity);

      if (activityIndex !== -1) {
        _selectedActivities.splice(activityIndex, 1);
      } else {
        _selectedActivities.push(activity);
      }
    }
  }
}());
