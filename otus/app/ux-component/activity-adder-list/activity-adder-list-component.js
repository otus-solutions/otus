(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityAdderList', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-adder-list/activity-adder-list-template.html',
      bindings: {
        onActivitySelection: '&'
      }
    });

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory',
    '$scope',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller(ActivityService, DynamicTableSettingsFactory, $scope, LoadingScreenService) {
    var self = this;
    self.activities = [];
    self.isListEmpty = true;

    self.orderByField = 'surveyTemplate.identity.name';
    self.reverseSort = false;
    /* Public methods */
    self.getType = getType;
    self.selectActivity = selectActivity;
    self.changeSort = changeSort;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      self.isListEmpty = true;
      LoadingScreenService.start();
      _loadActivities();
      _buildDynamicTableSettings(self.activities);
    }

    $scope.$watch('$ctrl.ready', function() {
      if(typeof self.updateDataTable === "function") {
        self.updateDataTable(self.activities);
        LoadingScreenService.finish();
      }
    });

    $scope.$watch('$ctrl.isListEmpty', function() {
      if(!self.isListEmpty){
        self.ready = true;
      }
    });

    function _loadActivities() {
      ActivityService
        .listAvailables()
        .then(function(activities) {
          activities.forEach(function (activity) {
            activity.surveyFormType = self.getType(activity);
          });
          self.activities = angular.copy(activities)
          if (activities.length) {
            self.isListEmpty = false;

          }
        });
    }

    self.dynamicDataTableChange = dynamicDataTableChange;
    function dynamicDataTableChange(change) {
      if (change.type === 'select' || change.type === 'deselect') {
        self.selectActivity(change.element);
      }
    }

    function _buildDynamicTableSettings() {
      self.dynamicTableSettings = DynamicTableSettingsFactory.create()
        .addHeader('NOME', '50', '', 1)
        .addColumnProperty('surveyTemplate.identity.name')
        .addHeader('ACRÔNIMO', '15', 'center center', 2)
        .addColumnProperty('surveyTemplate.identity.acronym')
        .addHeader('Tipo', '35', '', 6)
        .addColumnProperty('surveyFormType')
        .setCallbackAfterChange(self.dynamicDataTableChange)
        .setCheckbox(true)
        .getSettings();
    }

    function getType(activity) {
      if ('FORM_INTERVIEW' === activity.surveyFormType || 'INTERVIEW' === activity.surveyFormType) {
        return 'Entrevista';
      }

      if ('PROFILE' === activity.surveyFormType) {
        return 'Perfil';
      }

      return '';
    }

    function selectActivity(activity) {
      self.onActivitySelection({
        activity: activity
      });
    }

    function changeSort(field,order) {
      self.orderByField = field;
      self.reverseSort = order;
    }
  }
}());
