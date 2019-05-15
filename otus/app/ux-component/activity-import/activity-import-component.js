(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityImport', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-import/activity-import-template.html'
    });

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    '$element'
  ];

  function Controller(ActivityService, $element) {
    var self = this;

    self.$onInit = onInit;
    self.getType = getType;
    self.upload = upload;
    var fr = new FileReader();

    function onInit() {
      _loadActivities();

      self.input = $($element[0].querySelector('#fileInput'));
      self.nameFile = $($element[0].querySelector('#nameFile'));
      self.input.on('change', function (e) {
        self.nameFile.val(e.target.files[0].name);
        if(e.target.files[0]){
          // fr.readAsText(e.target.files[0]);
        }
      });
    }
    function upload() {
      self.input.click();
    }


    function _loadActivities() {
      ActivityService
        .listAvailables()
        .then(function(activities) {
          activities.forEach(function (activity) {
            activity.surveyFormType = self.getType(activity);
          });
          self.activities = angular.copy(activities);
          self.AllActivities = angular.copy(self.activities);
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

  }
}());
