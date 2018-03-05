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
        _selectedActivities = [];
        ApplicationStateService.activateActivityCategories();
      } else {
        $mdDialog.show(_exitDialog);
      }
    }
    //TODO Método de adicionar atividade para categorias
    function catchActivity(activity) {
      var activityIndex = _selectedActivities.indexOf(activity.surveyTemplate.identity.acronym);
      if (activityIndex !== -1) {
        _selectedActivities.splice(activityIndex, 1);
        window.sessionStorage.setItem('selectedActivities',JSON.stringify(_selectedActivities));
      } else {
        _selectedActivities.push(activity.surveyTemplate.identity.acronym);
        window.sessionStorage.setItem('selectedActivities',JSON.stringify(_selectedActivities));
      }
    }
  }
}());
