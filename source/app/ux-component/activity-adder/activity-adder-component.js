(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityAdder', {
      controller: 'otusActivityAdderCtrl as $ctrl',
      templateUrl: 'app/ux-component/activity-adder/activity-adder-template.html',
      bindings: {
        checkers: '<'
      }
    }).controller('otusActivityAdderCtrl', Controller);

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.activity.business.GroupActivityService',
    '$mdDialog',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.deploy.LoadingScreenService',
    '$q',
    '$timeout',
    '$element'
  ];

  function Controller(ParticipantActivityService, ApplicationStateService, GroupActivityService, $mdDialog, DialogService, LoadingScreenService, $q, $timeout, $element) {
    const option = "Todos";

    let self = this;
    let confirmCancelPreActivities;
    let confirmSavePreActivities;
    let invalidPreActivities;

    self.surveys = [];
    self.activities = [];
    self.selectedSurveys = [];
    self.statePreview = false;
    self.processing = true;
    self.mode = "ONLINE";
    self.selectType = "activityList";
    self.iconMode = "";
    self.optionModes = [];
    self.configuration = {};
    self.paperActivityCheckerData = null;
    self.preActivities = [];
    self.selectionOptions = [];
    self.btnAddPreActivitiesDisable = true;

    /* Public methods */
    self.addPreActivities = addPreActivities;
    self.saveActivities = saveActivities;
    self.surveyQuerySearch = surveyQuerySearch;
    self.resetPreActivities = resetPreActivities;
    self.selectAction = selectAction;
    self.clearSearchTerm = clearSearchTerm;
    self.addPreActivitiesGroup = addPreActivitiesGroup;
    self.disabledGroups = disabledGroups;
    self.displayGridLarge = displayGridLarge;
    self.displayGridSmall = displayGridSmall;
    self.monitoringSearchTextChange = monitoringSearchTextChange;
    self.selectedItemChange = selectedItemChange;

    self.$onInit = onInit;

    function onInit() {
      LoadingScreenService.start();
      _buildDialogs();
      _loadCategories();
      _loadOptionModes();
      _loadSurveys();
      _loadSurveysGroup();
      $element.find('#search').on('keydown', function (ev) {
        ev.stopPropagation();
      });
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

        if (self.groupList.length > 0) {
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
      } else if (!self.selectedGroups.includes(option) && index == 0 && !self.searchTerm) {
        disabledResult = true;
      } else {
        disabledResult = false;
      }
      return disabledResult;
    }

    function addPreActivitiesGroup(item) {
      self.activities = [];
      self.selectedGroups = [];
      self.selectedGroupsResult = [];
      self.selectedGroupsResult = item.includes(option) ? self.groupList.slice(0) : item;
      self.processing = false;

      _groupsFilter();

      $timeout(() => {
        self.processing = true;
      }, 2000);

      self.activities.forEach(activity => {
        addPreActivities(activity);
      });
    }

    function addPreActivities(survey) {
      let preActivity = ParticipantActivityService.createPreActivity(
        survey,
        angular.copy(self.configuration),
        angular.copy(self.mode),
        angular.copy(self.paperActivityCheckerData));

      self.preActivities.unshift(preActivity);
      self.searchText = '';
      self.btnAddPreActivitiesDisable = true;

    }

    function _loadOptionModes() {
      self.optionModes = [
        { mode: 'ONLINE',
          label: 'Online'
        },
        { mode: 'PAPER',
        label: 'Em papel'
        },
        { mode: 'AUTOFILL',
        label: 'Auto Preenchimento'
        }
      ]
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
      DialogService.showDialog(confirmCancelPreActivities).then(() => {
        self.preActivities = [];
        ApplicationStateService.activateParticipantActivities();
      });
    }

    function saveActivities() {
      self.preActivities.every(_checkFilledInput) ?
        DialogService.showDialog(confirmSavePreActivities).then(() => ParticipantActivityService.saveActivities(self.preActivities)) :
        DialogService.showDialog(invalidPreActivities);
    }

    function _checkFilledInput(preActivity) {
      if (preActivity.mode === "ONLINE" && !preActivity.surveyForm.isRequiredExternalID()) preActivity.preActivityValid = true;
      return preActivity.preActivityValid === true;
    }

    function monitoringSearchTextChange(state) {
      self.addStateValid = state;
    }

    function selectedItemChange(item) {
      if (item) self.btnAddPreActivitiesDisable = false;
    }

    function _buildDialogs() {
      confirmCancelPreActivities = {
        dialogToTitle: 'Confirmação',
        titleToText: 'Cancelamento da Lista de Formulários',
        textDialog: 'Deseja sair do Gerenciador de Atividades ?',
        ariaLabel: 'Confirmação de cancelamento',
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
            message: 'Ok',
            action: function () {
              $mdDialog.hide()
            },
            class: 'md-raised md-primary'
          },
          {
            message: 'Voltar',
            action: function () {
              $mdDialog.cancel()
            },
            class: 'md-raised md-no-focus'
          }
        ]
      }
    }
  }
}());
