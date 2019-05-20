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
    self.isLoading = false;
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

    var stopUpload = false;

    self.cancel = function(){
      stopUpload = true;
      delete self.total;
      delete self.countActivities;
      delete self.receivedJSON;
      // delete self.selectedActivity;
      self.isLoading = false;

    }

    self.getValids = function () {
      return self.ActivitiesAnswered.length;
    };

    self.getTotal = function () {
      return self.ActivitiesAnswered.length + self.receivedAnswer.length
    };

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
      if(!activity.isValid){
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
      } else {
        return false;
      }

    }

    function validateAnswers() {
      self.isLoading = true;

      //TODO: Tiago avaliar necessidade
      // LoadingScreenService.start();
      self.ActivitiesAnswered = [];
      self.receivedAnswer = [];
        self.total = self.receivedJSON.length;
        var _count = 0;
        $interval(function () {
          if(stopUpload) return
          self.ActivityAnswered = ActivityImportService.create(self.selectedActivity, self.receivedJSON.pop(), self.user);
          self.ActivityAnswered.error = !self.ActivityAnswered.isValid ? "Respostas inválidas!" : "";
          var _dataActivity = _getStructureList(self.ActivityAnswered);
          if(_dataActivity){
            self.receivedAnswer.push(_dataActivity);
          } else {
            self.ActivitiesAnswered.push(self.ActivityAnswered);
          }
          _count += 1;
          self.countActivities = (_count / self.total) * 100;
          if (_count == self.total) {
            //TODO: Tiago avaliar necessidade
            // LoadingScreenService.finish();
            self.isLoading = false;
          }

        },25,self.total);

    }

    function _receivedText(e) {
      stopUpload = false;
      delete self.selectedActivity;
      self.receivedJSON = [];
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
          Array.prototype.push.apply(self.receivedJSON, resultJSON);
          $scope.$apply();
        } else {
          _showMessage("Arquivo inválido para importação!");
          delete self.selectedActivity;
        }
      } else {
        _showMessage("Tipo de arquivo inválido!");
        delete self.selectedActivity;
      }
    }

    function saveActivitiesAnswered() {
      ImportService.importActivities(ActivityImportService.getValidActivities(), self.selectedActivity.version).then(function (response) {
        //TODO: Tiago aguardando o backend
        response.forEach(result =>{

        })

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
