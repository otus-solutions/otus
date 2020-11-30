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
    'otusjs.application.dialog.DialogShowService',
    'otusjs.deploy.LoadingScreenService',
    '$q',
    '$timeout',
    '$element',
    'ACTIVITY_MANAGER_LABELS'
  ];

  function Controller(ParticipantActivityService, ApplicationStateService, GroupActivityService, DialogService, LoadingScreenService, $q, $timeout, $element, ACTIVITY_MANAGER_LABELS) {
    const ALL_OPTION = "Todos";

    let self = this;

    self.surveys = [];
    self.activities = [];
    self.selectedSurveys = [];
    self.statePreview = false;
    self.processing = true;
    self.mode = ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.ONLINE.name;
    self.selectSingleActivity = false;
    self.iconMode = "";
    self.optionModes = [];
    self.configuration = {};
    self.paperActivityCheckerData = null;
    self.preActivities = [];
    self.selectionOptions = [];
    self.btnAddPreActivitiesDisable = true;
    self.stage = null;
    self.optionStages = [];

    /* Public methods */
    self.addPreActivities = addPreActivities;
    self.saveActivities = saveActivities;
    self.surveyQuerySearch = surveyQuerySearch;
    self.resetPreActivities = resetPreActivities;
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
      _loadCategories();
      _loadOptionModes();
      _loadSurveys();
      _loadSurveysGroup();
      _loadStages();
      $element.find('#search').on('keydown', function (ev) {
        ev.stopPropagation();
      });
    }

    function clearSearchTerm() {
      self.searchTerm = '';
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
          self.selectionOptions.push(ALL_OPTION);
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

    function _groupsFilter() {
      _surveysFilter();
      _activitiesFilter();
    }

    function _surveysFilter() {
      if(!self.stage){
        DialogService.showWarningDialog(
          'Pendência de Informações',
          'Nenhuma etapa selecionada',
          'Selecione uma etapa.',
          'Aviso de etapa nao selecionada');
        return;
      }

      self.selectedSurveys = [];
      self.selectedGroupsResult.forEach(groupName => {
        self.selectedSurveys = self.selectedSurveys.concat(self.surveysGroups.getGroupSurveys(groupName));
      });
      self.selectedSurveys = self.selectedSurveys.filter(function (item, position) {
        return self.stage.surveyAcronyms.includes(item) && self.selectedSurveys.indexOf(item) === position;
      });
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
      } else if (self.selectedGroups.includes(ALL_OPTION) && index > 0) {
        disabledResult = true
      } else {
        disabledResult = (!self.selectedGroups.includes(ALL_OPTION) && index === 0 && !self.searchTerm);
      }
      return disabledResult;
    }

    function addPreActivitiesGroup(item) {
      self.activities = [];
      self.selectedGroups = [];
      self.selectedGroupsResult = [];
      self.selectedGroupsResult = item.includes(ALL_OPTION) ? self.groupList.slice(0) : item;
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
        angular.copy(self.paperActivityCheckerData),
        angular.copy(self.stage)
      );

      self.preActivities.unshift(preActivity);
      self.searchText = '';
      self.btnAddPreActivitiesDisable = true;
    }

    function _loadOptionModes() {
      self.optionModes = [
        {
          mode: ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.ONLINE.name,
          label: ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.ONLINE.label
        },
        {
          mode: ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.PAPER.name,
          label: ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.PAPER.label
        },
        {
          mode: ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.AUTOFILL.name,
          label: ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.AUTOFILL.label
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

    function _loadStages(){
      //TODO
      self.optionStages = [
        {
          _id: "5f7ca9654ac6a6555b363664",
          name: "Onda 4",
          surveyAcronyms : [
            "FRC",
            "MEDC",
            "ACTA"
          ]
        },
        {
          _id: "5f7ca9654ac6a6555b363663",
          name: "Onda 3",
          "surveyAcronyms" : [
            "RETCLQ",
            "IMT",
            "CISE",
            "FCOC",
            "ANTC",
            "PASC",
            "VOPC",
            "BIOC",
            "ACTDC",
            "CSJ"
          ]
        },
        {
          _id: "5f7ca9654ac6a6555b363665",
          name: "Onda COVID",
          surveyAcronyms: []
        }
      ];
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
      DialogService.showConfirmationDialog(
        'Cancelamento da Lista de Formulários',
        'Deseja sair do Gerenciador de Atividades ?',
        'Confirmação de cancelamento')
        .then(() => self.preActivities = [])
        .then(() => ApplicationStateService.activateParticipantActivities());
    }

    function saveActivities() {
      if (allActivitiesAreValid()) {
        DialogService.showConfirmationDialog(
          'Salvar Lista de Formulários',
          'Deseja adicionar os itens ao participante?',
          'Confirmação de exclusão')
          .then(() => ParticipantActivityService.saveActivities(self.preActivities))
          .then(() => ApplicationStateService.activateActivityAdder())
      } else {
        DialogService.showWarningDialog(
          'Pendência de Informações',
          'Detecção de Formulários Incompletos',
          'Retorne para lista e preencha os campos obrigatórios',
          'Aviso de formulários inválidos'
        );
      }
    }

    function allActivitiesAreValid() {
      return self.preActivities.every(_checkFilledInput);
    }

    function _checkFilledInput(preActivity) {
      return preActivity.preActivityValid = preActivity.preActivityValid ||
        preActivity.mode === ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.AUTOFILL.name ||
        (preActivity.mode === ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.ONLINE.name && !preActivity.surveyForm.isRequiredExternalID());
    }

    function monitoringSearchTextChange(state) {
      self.addStateValid = state;
    }

    function selectedItemChange(item) {
      if (item) {
        self.btnAddPreActivitiesDisable = false;
      }
    }

  }
}());
