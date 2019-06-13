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
    self.downloadCSV = downloadCSV;
    self.ActivitiesInvalids = [];
    self.countActivities = 0;
    self.countActivitiesValids = 0;
    self.countActivitiesError = 0;
    self.ActivitiesAnswered = [];
    self.isLoading = false;
    self.isSaved = false;

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

    function _clearContent(){
      delete self.file;
      $(document.querySelector('#nameFile')).val('');
      self.input.val("");
      self.receivedJSON = [];
      delete self.selectedActivity;
      self.ActivitiesInvalids = [];
      self.countActivitiesError = 0;
      self.ActivitiesAnswered = [];
      self.countActivitiesValids = 0;
      self.countActivities = 0;
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
        return JSON.parse(file) instanceof Object;
      } catch (e) {
        return false;
      }
    }

    function _JSONContainsPropertyOfActivity(answers) {
      var isValid = true;
      if (Array.isArray(answers)) {
        isValid = answers.every(result => {
            return result.hasOwnProperty("id") &&
              result.hasOwnProperty("acronym") &&
              result.hasOwnProperty("participant") &&
              result.hasOwnProperty("user") &&
              result.hasOwnProperty("status") &&
              result.hasOwnProperty("mode") &&
              result.hasOwnProperty("activityConfiguration") &&
              result.hasOwnProperty("answers") &&
              result.hasOwnProperty("offlineData");
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
        if (stopUpload) return;

        var _ActivityAnswered = new ActivityImportService.create(self.selectedActivity, self.receivedJSON.shift(), self.user);
        var _dataActivity = ImportService.getAnsweredActivityError(_ActivityAnswered, self.selectedActivity.surveyTemplate.identity.acronym, self.selectedActivity.surveyTemplate.identity.name);
        if (_dataActivity) {
          _dataActivity.error = _dataActivity.error.replaceAll("{","");
          _dataActivity.error = _dataActivity.error.replaceAll("}","");
          _dataActivity.error = _dataActivity.error.replaceAll("!",". ");
          self.ActivitiesInvalids.push(angular.copy(_dataActivity));
          self.countActivitiesError += 1;
        } else {
          self.ActivitiesAnswered.push(angular.copy(_ActivityAnswered));
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
              return activity.surveyTemplate.identity.acronym == _selectAcronym;
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
            if(Array.isArray(response)){
              if(response.length == 0 && response.length < self.ActivitiesAnswered.slice(0, 100).length){
                self.isSaved = true;
                self.countActivitiesValids = self.countActivitiesValids - (self.ActivitiesAnswered.slice(0, 100).length - response.length)
              } else {
                response.forEach(result => {
                  var _dataActivity = ImportService.getActivityError(result, self.selectedActivity);
                  _dataActivity.error = _dataActivity.error.replaceAll("{","");
                  _dataActivity.error = _dataActivity.error.replaceAll("}","");
                  _dataActivity.error = _dataActivity.error.replaceAll("!",". ");
                  self.ActivitiesInvalids.push(_dataActivity);
                  self.countActivitiesError += 1;
                  self.countActivitiesValids -= 1;
                });
              }
            } else if (response){
              if(regex.test(response.MESSAGE)){
                _showMessage("Mapa de atividade não encontrado!");
                return true;
              }
            } else {
              _showMessage("Atividades inconsistentes!");
            }

            self.ActivitiesAnswered.splice(0, 100);
            self.saveActivitiesAnswered();

        }).catch(function (e) {
          _showMessage("Não foi possível salvar as atividades! Tente novamente mais tarde.");

        });
      } else {
        if(self.ActivitiesInvalids.length === 0){

          _clearContent();
        }
        if(self.isSaved) _showMessage("Atividades salvas com sucesso!");
        self.isSaved = false;
      }
    }

    String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.split(search).join(replacement);
    };

    function showDialog(item) {
      var data = {
        dialogToTitle: "("+item.acronym+") "+item.name,
        textDialog: "<p layout-padding><b>Participante:</b>"+item.rn+"</p><p layout-padding><b>Categoria:</b> "+item.category+"</p><br><p layout-padding><b>Erro(s):</b><br>"+item.error.replaceAll(". ", ".</br>")+"</p>",
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
          .hideDelay(4000)
      );
    }


    function downloadCSV() {
      if(self.ActivitiesInvalids.length){
        var headers = '[rn] AS [Participante], [acronym] AS [Acrônimo], [name] AS [Atividade], [category] AS [Categoria], [isValid] AS [Status], [error] AS [Problema]';
        var name = 'importação de atividade-'.concat(new Date().toLocaleDateString());
        alasql('SELECT ' + headers + ' INTO CSV("' + name + '.csv") FROM ? ', [self.ActivitiesInvalids]);
      }
    }
  }
}());
