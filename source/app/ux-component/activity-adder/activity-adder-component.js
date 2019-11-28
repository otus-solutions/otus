(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityAdder', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-adder/activity-adder-template.html',
      bindings: {
        checkers: '<'
      }
    });

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.activity.business.GroupActivityService',
    '$mdDialog',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.deploy.LoadingScreenService',
    '$q',
    '$timeout'
  ];

  function Controller(ParticipantActivityService, ApplicationStateService, GroupActivityService, $mdDialog, DialogService, LoadingScreenService, $q, $timeout) {
    const option = "Todos";

    let self = this;
    let confirmDeletePreActivities;
    let confirmSavePreActivities;
    let invalidPreActivities;

    self.surveys = [];
    self.activities = [];
    self.selectedSurveys = [];
    self.statePreview = false;
    self.processing = true;
    self.mode = "ONLINE";
    self.selectType = "activityUnit";
    self.iconMode = "";
    self.configuration = {};
    self.paperActivityCheckerData = null;
    self.preActivities = [];
    self.selectionOptions = [];

    /* Public methods */
    self.addPreActivities = addPreActivities;
    self.saveActivities = saveActivities;
    self.surveyQuerySearch = surveyQuerySearch;
    self.resetPreActivities = resetPreActivities;
    self.selectAction = selectAction;
    self.clearSearchTerm = clearSearchTerm;
    self.addActivitiesGroup = addActivitiesGroup;
    self.disabledGroups = disabledGroups;
    self.displayGridLarge = displayGridLarge;
    self.displayGridSmall = displayGridSmall;

    self.$onInit = onInit;

    function onInit() {
      LoadingScreenService.start();
      _buildDialogs();
      _loadCategories();
      _loadSurveys();
      _loadSurveysGroup();
    }

    function clearSearchTerm() {
      self.searchTerm = '';
    }

    function selectAction() {
      return (self.selectType === 'activityUnit') ? false : true;
    }

    function _loadSurveysGroup() {
      self.selectedGroups = [];
      self.selectedGroupsResult = [];
      self.groupList = [];
      self.selectionOptions = [];
      GroupActivityService.getSurveyGroupsByUser().then(function (data) {
        self.surveysGroups = data;
        self.groupList = self.surveysGroups.getGroupNames();

        if(self.groupList.length > 0){
          self.selectionOptions.push(option);
        }

        self.selectionOptions = self.selectionOptions.concat(self.groupList);
      });
    }

    function displayGridLarge() {
      if (window.innerWidth < 1400) {
        return '1:1.5';
      }
      return '1:1.05';
    }

    function displayGridSmall() {
      if (window.innerWidth < 680) {
        return '1:1.7';
      }
      return '3:4';
    }

    function _surveysFilter() {
      self.selectedSurveys = [];
      self.selectedGroupsResult.forEach(groupName => {
        self.selectedSurveys = self.selectedSurveys.concat(self.surveysGroups.getGroupSurveys(groupName));
      });
      self.selectedSurveys = self.selectedSurveys.filter(function (item, position) {
        return self.selectedSurveys.indexOf(item) == position;
      });
    }

    function _groupsFilter() {
      _surveysFilter();
      _activitiesFilter();
    }

    function _activitiesFilter() {
      self.activities = self.surveys.filter(function (activity) {
        return self.selectedSurveys.includes(activity.acronym)
      });
    }

    function disabledGroups(index) {
      let disabledResult;
      if (!self.selectedGroups.length) {
        disabledResult = false;
      } else if (self.selectedGroups.includes(option) && index > 0) {
        disabledResult = true
      } else if (!self.selectedGroups.includes(option) && index == 0) {
        disabledResult = true;
      }
      return disabledResult;
    }

    function addActivitiesGroup(item) {
      self.activities = [];
      self.selectedGroups = [];
      self.selectedGroupsResult = [];
      self.selectedGroupsResult = item.includes(option) ? self.groupList.slice(0) : item;
      self.processing = false;

      _groupsFilter();

      $timeout(() => {
        self.processing = true;
      },3000);

      self.activities.forEach(activity => {
        addPreActivities(activity);
      });
    }

    function addPreActivities(survey) {
      let dto = ParticipantActivityService.createPreActivity(survey, self.configuration, self.mode, self.paperActivityCheckerData);
      self.preActivities.push(dto);
      self.searchText = '';
    }

    function _loadCategories() {
      ParticipantActivityService
        .listAllCategories()
        .then(response => self.categories = response);
    }

    function _loadSurveys() {
      ParticipantActivityService.listAvailables()
        .then(surveys => {
          self.surveys = angular.copy(surveys);
          if (surveys.length) {
            self.isListEmpty = false;
          }
        }).then(LoadingScreenService.finish());
    }

    function surveyQuerySearch(query) {
      var results = [];
      var deferred = $q.defer();

      self.selectedGroupsResult = self.selectedGroupsResult.concat(self.groupList);
      _groupsFilter();

      results = query ? self.activities.filter(_activityCreateFilterFor(query)) : self.activities;

      $timeout(() => {
        deferred.resolve(results);
      }, Math.random() * 1000, false);

      return deferred.promise;
    }

    function _activityCreateFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(survey) {
        return survey.name.toLowerCase().indexOf(lowercaseQuery) > -1 ||
          survey.acronym.toLowerCase().indexOf(lowercaseQuery) > -1;
      };
    }

    function resetPreActivities() {
      DialogService.showDialog(confirmDeletePreActivities).then(() => {
        self.preActivities = [];
      });
    }

    function saveActivities() {
      self.preActivities.every(_checkFilledInput) ?
        DialogService.showDialog(confirmSavePreActivities).then(() => ParticipantActivityService.saveActivities(self.preActivities)):
        DialogService.showDialog(invalidPreActivities);
    }

    function _checkFilledInput(dto) {
      if(dto.mode === "ONLINE" && !dto.surveyForm.isRequiredExternalID()) dto.preActivityValid = true;
      return dto.preActivityValid === true;
    }

    function _buildDialogs() {
      confirmDeletePreActivities = {
        dialogToTitle: 'Confirmação',
        titleToText: 'Exclusão da Lista de Formulários',
        textDialog: 'Deseja excluir os itens adicionados?',
        ariaLabel: 'Confirmação de exclusão',
        buttons: _prepareButtons()
      };

      confirmSavePreActivities = {
        dialogToTitle: 'Confirmação',
        titleToText: 'Salvar Lista de Formulários',
        textDialog: 'Deseja adicionar os itens ao participante?',
        ariaLabel: 'Confirmação de exclusão',
        buttons: _prepareButtons()
      };

      invalidPreActivities = {
        dialogToTitle: 'Pendência de Informações',
        titleToText: 'Detecção de Formulários Incompletos',
        textDialog: 'Retorne para lista e preencha os campos obrigatórios',
        ariaLabel: 'Aviso de formulários inválidos',
        buttons: [{
          message: 'Voltar',
          action: function () {
            $mdDialog.cancel()
          },
          class: 'md-raised md-no-focus'
        }]
      };


      function _prepareButtons() {
        return [
          {
            message: 'Voltar',
            action: function () {
              $mdDialog.cancel()
            },
            class: 'md-raised md-no-focus'
          },
          {
            message: 'Ok',
            action: function () {
              $mdDialog.hide()
            },
            class: 'md-raised md-primary'
          }
        ]
      }
    }
  }
}());
