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
    'otusjs.activity.business.ParticipantActivityManagementService'
  ];

  function Controller(ActivityService) {
    var self = this;
    self.activities = [];
    self.isListEmpty = true;

    /* Public methods */
    self.getType = getType;
    self.selectActivity = selectActivity;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      self.isListEmpty = true;
      _loadActivities();
    }

    function _loadActivities() {
      ActivityService
        .listAvailables()
        .then(function(activities) {
          self.activities = activities;
          if (activities.length) {
            self.isListEmpty = false;
          }
        });
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
  }
}());
