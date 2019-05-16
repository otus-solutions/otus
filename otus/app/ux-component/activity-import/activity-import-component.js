(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityImport', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-import/activity-import-template.html',
      bindings: {
        user: '<'
      }
    });

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    '$element',
    'otusjs.model.activity.ActivityImportService',
    '$scope',
    '$mdToast',
    'otusjs.activity.business.ActivityImportService'
  ];

  function Controller(ActivityService, $element, ActivityImportService, $scope, $mdToast, ImportService) {
    var self = this;

    self.$onInit = onInit;
    self.upload = upload;
    self.validateAnswers = validateAnswers;
    self.receivedAnswer = [];
    self.ActivitiesAnswered = [];
    var fr = new FileReader();

    function onInit() {
      fr.onload = _receivedText;
      self.receivedJSON = [];
      _loadActivities();
      delete self.user.token;

      self.input = $($element[0].querySelector('#fileInput'));

      self.input.on('change', function (e) {
        self.nameFile = $($element[0].querySelector('#nameFile'));
        if (_typeIsValid(e.target.files[0].type)) {
          self.nameFile.val(e.target.files[0].name);
          if (e.target.files[0]) {
            fr.readAsText(e.target.files[0]);
          } else {
            //TODO: Tiago fazer mensagem de erro Toast
          }

        }
      });
    }

    function upload() {
      self.input.click();
    }

    function _typeIsValid(type) {
      return type === "application/json";
    }

    function _fileIsEmpty(file) {
      try {
        return file ? false : true;
      } catch (e) {
        return true;
      }
    }

    function _isJSONValid(file) {
      try {
        return JSON.parse(file) instanceof Object
      } catch (e) {
        return false;
      }
    }

    function _JSONContainsPropertyOfActivity(answers) {
      let isValid = true;
      answers.forEach(result => {
        if (isValid) {
          isValid = result.hasOwnProperty("id") &&
            result.hasOwnProperty("participant") &&
            result.hasOwnProperty("user") &&
            result.hasOwnProperty("status") &&
            result.hasOwnProperty("mode") &&
            result.hasOwnProperty("activityConfiguration") &&
            result.hasOwnProperty("answers") &&
            result.hasOwnProperty("offlineData");
        }
      });
      return isValid;
    }

    function _getStructureList(activity) {
      return {
        rn: activity.participantData,
        acronym: activity.surveyForm.surveyTemplate.identity.acronym,
        name: activity.surveyForm.surveyTemplate.identity.name,
        error: activity.error,
        isValid: activity.isValid
      };
    }

    function validateAnswers() {
      var _dataActivity;
      self.ActivitiesAnswered = ActivityImportService.execute(self.selectedActivity, self.receivedJSON, self.user);
      self.ActivitiesAnswered.forEach(function (activity) {
        activity.error = !activity.isValid ? "Respostas inválidas!" : "";
        _dataActivity = _getStructureList(activity);
        self.receivedAnswer.push(_dataActivity);
      });
    }

    function _receivedText(e) {
      var _selectAcronym;
      var fileLines = e.target.result;
      var resultJSON;
      if (_isJSONValid(fileLines)) {
        resultJSON = JSON.parse(fileLines);
        if (!_fileIsEmpty(resultJSON) && _JSONContainsPropertyOfActivity(resultJSON)) {
          _selectAcronym = resultJSON[0].acronym;
          
          if(_selectAcronym){
            self.selectedActivity = self.activities.find(activity => {
              return activity.surveyTemplate.identity.acronym === _selectAcronym;
            })
          }
          self.receivedJSON = resultJSON;
          $scope.$apply();
        }
      }
    }
    
    self.saveActivitiesAnswered = function () {
      console.log(ActivityImportService.getValidActivities())
      console.log(self.selectedActivity.version)
      ImportService.importActivities(ActivityImportService.getValidActivities(), self.selectedActivity.version).then(function (response) {

      });
    };


    function _loadActivities() {
      ActivityService
        .listAvailables()
        .then(function (activities) {
          self.activities = angular.copy(activities);
          if (activities.length) {
            self.isListEmpty = false;
          }
        });
    }


  }
}());
