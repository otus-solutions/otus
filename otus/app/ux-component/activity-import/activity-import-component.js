(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityImport', {
      controller: "otusActivityImportCtrl as $ctrl",
      templateUrl: 'app/ux-component/activity-import/activity-import-template.html',
      bindings: {
        user: '<'
      }
    }).controller("otusActivityImportCtrl", Controller);

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.model.activity.ActivityImportService',
    '$scope',
    '$mdToast',
    'otusjs.activity.business.ActivityImportService',
    'otusjs.deploy.LoadingScreenService',
    '$timeout',
    '$interval'
  ];

  function Controller(ActivityService, ActivityImportService, $scope, $mdToast, ImportService, LoadingScreenService, $timeout, $interval) {
    var self = this;

    self.$onInit = onInit;
    self.upload = upload;
    self.validateAnswers = validateAnswers;
    self.saveActivitiesAnswered = saveActivitiesAnswered;
    self.receivedAnswer = [];
    self.countActivities = 0;
    self.ActivitiesAnswered = [];
    var fr = new FileReader();

    function onInit() {
      fr.onload = _receivedText;
      self.receivedJSON = [];
      _loadActivities();
      delete self.user.token;

      self.input = $(document.querySelector('#fileInput'));

      self.input.on('change', function (e) {
        self.receivedJSON = [];
        self.nameFile = $(document.querySelector('#nameFile'));
        if (_typeIsValid(e.target.files[0].type)) {
          self.nameFile.val(e.target.files[0].name);
          if (e.target.files[0]) {
            fr.readAsText(e.target.files[0]);
          } else {
            _showMessage('Não foi possível reconhecer o arquivo!');
          }
        }
      });
    }

    self.getValids = function () {
      return self.receivedAnswer.filter(function (answer) {
        return answer.isValid == true;
      }).length;
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
      var isValid = true;
      if(Array.isArray(answers)){
        answers.forEach(result => {
          if (isValid) {
            isValid = result.hasOwnProperty("id") &&
              result.hasOwnProperty("acronym") &&
              result.hasOwnProperty("participant") &&
              result.hasOwnProperty("user") &&
              result.hasOwnProperty("status") &&
              result.hasOwnProperty("mode") &&
              result.hasOwnProperty("activityConfiguration") &&
              result.hasOwnProperty("answers") &&
              result.hasOwnProperty("offlineData");
          }
        });
      } else {
        isValid = false;
      }
      return isValid;
    }

    function _getStructureList(activity) {
      try {
        return {
          rn: activity.participantData,
          acronym: activity.surveyForm.surveyTemplate.identity.acronym,
          name: activity.surveyForm.surveyTemplate.identity.name,
          error: activity.error,
          isValid: activity.isValid
        };
      } catch (e) {
        return {
          rn: '',
          acronym: '',
          name: '',
          error: '',
          isValid: false
        };
      }

    }

    function validateAnswers() {
      LoadingScreenService.start();
      $timeout(function () {
        var _dataActivity;
        var _limit = 100;
        var _pages = self.receivedJSON.length / _limit;
        var _count = 0;
        _pages = _pages.toFixed(0) * 1 + 1;
        // for (let i = 0; i < _pages; i++) {
          $interval(function () {
            self.ActivitiesAnswered = ActivityImportService.execute(self.selectedActivity, self.receivedJSON.slice(_count,_count + 100), self.user);
            self.ActivitiesAnswered.forEach(function (activity) {
              activity.error = !activity.isValid ? "Respostas inválidas!" : "";
              _dataActivity = _getStructureList(activity);
              self.receivedAnswer.push(_dataActivity);
            });
            _count = _count + 100;
            self.countActivities = (_count / self.receivedJSON.length) * 100;
            // $scope.$apply();
          },1000,_pages, true);
        // }
        // self.receivedAnswer = ActivityImportService.execute(self.selectedActivity, self.receivedJSON.slice(0,500), self.user);
        // self.ActivitiesAnswered = ActivityImportService.execute(self.selectedActivity, self.receivedJSON.slice(0,300), self.user);
        // self.ActivitiesAnswered.forEach(function (activity) {
        //   activity.error = !activity.isValid ? "Respostas inválidas!" : "";
        //   _dataActivity = _getStructureList(activity);
        //   self.receivedAnswer.push(_dataActivity);
        // });
        // delete self.receivedJSON;
        LoadingScreenService.finish();

      }, 2000)

    }

    function _receivedText(e) {
      var _selectAcronym;
      var fileLines = e.target.result;
      var resultJSON;
      if (_isJSONValid(fileLines)) {
        resultJSON = JSON.parse(fileLines);
        if (!_fileIsEmpty(resultJSON) && _JSONContainsPropertyOfActivity(resultJSON)) {
          _selectAcronym = resultJSON[0].acronym;

          if (_selectAcronym) {
            self.selectedActivity = self.activities.find(activity => {
              return activity.surveyTemplate.identity.acronym === _selectAcronym;
            })
          } else {
            _showMessage("Não foi possível identificar a atividade!");
          }

          if(!self.selectedActivity) _showMessage("Não foi possível identificar a atividade!");
          self.receivedJSON = resultJSON;
          $scope.$apply();
        } else {
          _showMessage("Arquivo inválido para importação!")
        }
      } else {
        _showMessage("Tipo de arquivo inválido!");
      }
    }

    function saveActivitiesAnswered() {
      ImportService.importActivities(ActivityImportService.getValidActivities(), self.selectedActivity.version).then(function (response) {

      });
    }

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

    function _showMessage(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .position("bottom right")
          .hideDelay(3000)
      );
    }


  }
}());
