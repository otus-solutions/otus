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
    'otusjs.application.dialog.DialogShowService',
    '$timeout',
    '$interval'
  ];

  function Controller(ActivityService, ActivityImportService, $scope, $mdToast, ImportService, DialogShowService, $timeout, $interval) {
    var self = this;

    self.$onInit = onInit;
    self.upload = upload;
    self.validateAnswers = validateAnswers;
    self.saveActivitiesAnswered = saveActivitiesAnswered;
    self.cancel = cancel;
    self.getTotal = getTotal;
    self.showDialog = showDialog;
    self.ActivitiesInvalids = [];
    self.countActivities = 0;
    self.countActivitiesValids = 0;
    self.countActivitiesError = 0;
    self.ActivitiesAnswered = [];
    self.isLoading = false;

    var _interval;

    var fr = new FileReader();
    var stopUpload = false;


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

    function cancel() {
      stopUpload = true;
      $interval.cancel(_interval);
      self.isLoading = false;
    }

    function getTotal() {
      return self.countActivitiesValids + self.countActivitiesError;
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
      if (Array.isArray(answers)) {
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

    function validateAnswers() {
      stopUpload = false;
      self.isLoading = true;
      if(!self.ActivitiesAnswered) self.ActivitiesAnswered = [];
      if(!self.ActivitiesInvalids) self.ActivitiesInvalids = [];
      self.total = self.receivedJSON.length;
      var _count = 0;
      _interval = $interval(function () {
        if (stopUpload) return
        var _ActivityAnswered = ActivityImportService.create(self.selectedActivity, self.receivedJSON.pop(), self.user);
        _ActivityAnswered.error = !_ActivityAnswered.isValid ? "Respostas inválidas!" : "";
        var _dataActivity = ImportService.getAnsweredActivityError(_ActivityAnswered, self.selectedActivity.surveyTemplate.identity.acronym, self.selectedActivity.surveyTemplate.identity.name);
        if (_dataActivity) {
          self.ActivitiesInvalids.push(_dataActivity);
          self.countActivitiesError += 1;
        } else {
          self.ActivitiesAnswered.push(_ActivityAnswered);
          self.countActivitiesValids += 1;
        }
        _count += 1;
        self.countActivities = (_count / self.total) * 100;
        if (_count >= self.total) {
          self.isLoading = false;
          stopUpload = true;
        }
      }, 30, self.total, true);
    }

    function _receivedText(e) {
      stopUpload = false;
      delete self.selectedActivity;
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
          if (!self.selectedActivity) _showMessage("Não foi possível identificar a atividade!");
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
      if(self.ActivitiesAnswered.length > 0){
        ImportService.importActivities({activityList:self.ActivitiesAnswered.slice(0, 100)}, self.selectedActivity.surveyTemplate.identity.acronym, self.selectedActivity.version)
          .then(function (response) {
            let regex = /SurveyJumpMap not found/;
            if(regex.test(response.MESSAGE)){
              _showMessage("Mapa de atividade não encontrado!");
              return true;
            } else {
              self.ActivitiesAnswered.splice(0, 100);
              response.forEach(result => {
                self.ActivitiesInvalids.push(ImportService.getActivityError(result, self.selectedActivity));
                self.countActivitiesError += 1;
                self.countActivitiesValids -= 1;
              });
              self.saveActivitiesAnswered();

            }
        }).catch(function (e) {

          _showMessage("Não foi possível salvar as atividades! Tente novamente mais tarde.");
        });
      }
    }

    String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.split(search).join(replacement);
    };

    function showDialog(item) {
      var data = {
        dialogToTitle: "("+item.acronym+") "+item.name,
        textDialog: "<b>Participante:</b><br>"+item.rn+"<br><b>Categoria:</b><br> "+item.category+"<br><b>Problema:</b><br>"+item.error.replaceAll("! ", "!<br>"),
        buttons: []
      };

      DialogShowService.showDialog(data);
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
