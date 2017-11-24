(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityAdder', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-adder/activity-adder-template.html'
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
    self.$onInit = onInit;

    function onInit() {
      _exitDialog = $mdDialog.alert()
        .title('ATENÇÃO!')
        .textContent('Você deve selecionar ao menos uma atividade.')
        .ariaLabel('Alerta de Erro')
        .ok('Fechar');
    }

    function addActivities() {
      if(_selectedActivities.length>0){
        ActivityService.setActivitiesSelection(_selectedActivities);
        _selectedActivities = [];
        ApplicationStateService.activateActivityCategories();
      } else {
        $mdDialog.show(_exitDialog);
      }
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
