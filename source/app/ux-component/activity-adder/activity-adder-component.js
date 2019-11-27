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
    var self = this;
    // var _selectedActivities = [];
    var _exitDialog;

    let confirmDeletePreActivities;
    let confirmSavePreActivities;
    let invalidPreActivities;

    self.surveys = [];
    self.selectedSurveys = [];

    //self.selectedActivities = [];
    self.statePreview = false;
    self.mode = "ONLINE";
    self.selectType = "activityUnit";
    self.iconMode = "";
    self.configuration = {};
    self.paperActivityCheckerData = null;
    self.activityDtos = [];
    self.selectionOptions = [];

    /* Public methods */
    //self.addActivities = addActivities;
    //self.catchActivity = catchActivity;

    self.addActivityDtos = addActivityDtos;
    self.saveActivities = saveActivities;
    self.surveyQuerySearch = surveyQuerySearch;
    self.resetActivityDtos = resetActivityDtos;
    self.selectAction = selectAction;
    self.clearSearchTerm = clearSearchTerm;
    self.addActivitiesGroup = addActivitiesGroup;
    self.disabledGroups = disabledGroups;
    self.displayGrid = displayGrid;

    self.$onInit = onInit;

    function onInit() {
      // _exitDialog = {
      //     dialogToTitle: 'Alerta',
      //     titleToText: 'ATENÇÃO!',
      //     textDialog: 'Você deve selecionar ao menos uma atividade.',
      //     ariaLabel: 'Alerta de Erro',
      //     buttons: [
      //         {
      //             message: 'Fechar',
      //             action: function () {
      //                 $mdDialog.hide()
      //             },
      //             class: 'md-raised md-no-focus'
      //         }
      //     ]
      // };
      self.selectionOptions.push(option);
      LoadingScreenService.start();
      _buildDialogs();
      _loadCategories();
      _loadSurveys();
      _loadSurveysGroup();
      _loadActivityDtosfromStorage();
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
      GroupActivityService.getSurveyGroupsByUser().then(function (data) {
        self.surveysGroups = data;
        self.groupList = self.surveysGroups.getGroupNames();
        self.selectionOptions = self.selectionOptions.concat(self.groupList);
      });
    }

    function displayGrid() {
      if (window.innerWidth == 1366) {
        return '1:1.7';
      }
      return '1:1.05';
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
      if (!self.selectedGroups.length) {
        self.activities = angular.copy(self.surveys);
      }
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
      self.selectedGroupsResult = item.includes(option) ? self.groupList.slice(0) : item;

      _groupsFilter();

      self.activities.forEach(activity => {
        addActivityDtos(activity);
      });
    }

    // function addActivities() {
    //     if (_selectedActivities.length > 0) {
    //         _selectedActivities = [];
    //         ApplicationStateService.activateActivityCategories();
    //     } else {
    //         DialogService.showDialog(_exitDialog);
    //     }
    // }

    // function addActivities() {
    //     if (_selectedActivities.length > 0) {
    //         self.selectedActivities = [];
    //         ApplicationStateService.activateActivityCategories();
    //     } else {
    //         DialogService.showDialog(_exitDialog);
    //     }
    // }

    // function catchActivity(activity) {
    //     var activityIndex = _selectedActivities.indexOf(activity.acronym);
    //     if (activityIndex !== -1) {
    //         _selectedActivities.splice(activityIndex, 1);
    //         window.sessionStorage.setItem('selectedActivities', JSON.stringify(_selectedActivities));
    //     } else {
    //         _selectedActivities.push(activity.acronym);
    //         window.sessionStorage.setItem('selectedActivities', JSON.stringify(_selectedActivities));
    //     }
    // }

    // function catchActivity(activity) {
    //     var activityIndex = self.selectedActivities.indexOf(activity.acronym);
    //     console.log(activity);
    //     if (activityIndex !== -1) {
    //         self.selectedActivities.splice(activityIndex, 1);
    //         window.sessionStorage.setItem('selectedActivities', JSON.stringify(self.selectedActivities));
    //     } else {
    //         self.selectedActivities.push(activity.acronym);
    //         window.sessionStorage.setItem('selectedActivities', JSON.stringify(self.selectedActivities));
    //     }
    //     console.log(self.selectedActivities)
    // }

    function addActivityDtos(survey) {
      let dto = ParticipantActivityService.createActivityDto(survey, self.configuration, self.mode, self.paperActivityCheckerData);
      self.activityDtos.push(dto);
      self.searchText = '';
      _saveInSessionStorage();
    }

    function _loadCategories() {
      ParticipantActivityService
        .listAllCategories()
        .then(function (response) {
          self.categories = response;
        });
    }

    function _loadSurveys() {
      ParticipantActivityService.listAvailables()
        .then(function (surveys) {
          self.surveys = angular.copy(surveys);
          self.AllSurveys = angular.copy(self.surveys);
          if (surveys.length) {
            self.isListEmpty = false;
          }
        }).then(LoadingScreenService.finish());
    }

    function surveyQuerySearch(query) {
      var results = query ? self.surveys.filter(_activityCreateFilterFor(query)) : self.surveys;
      var deferred = $q.defer();

      $timeout(function () {
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

    function _loadActivityDtosfromStorage() {
      let resultFromStorage = JSON.parse(window.sessionStorage.getItem('activityDtos'));
      if (resultFromStorage) {
        let _activitiesFromStorage = []
        resultFromStorage.forEach(result => {
          let survey = ParticipantActivityService.getSurveyFromJson(result.surveyForm);
          _activitiesFromStorage.push(ParticipantActivityService.createActivityDto(survey, result.configuration, result.mode, result.paperActivityCheckerData));
        });
        if (_activitiesFromStorage) {
          self.activityDtos = _activitiesFromStorage;
        }
      }
    }

    function _saveInSessionStorage() {
      window.sessionStorage.removeItem('activityDtos');
      window.sessionStorage.setItem('activityDtos', JSON.stringify(self.activityDtos));
    }

    function resetActivityDtos() {
      self.activityDtos = [];
      window.sessionStorage.removeItem('activityDtos');
    }

    function resetActivityDtos() {
      DialogService.showDialog(confirmDeletePreActivities).then(() => {
        self.activityDtos = [];
        window.sessionStorage.removeItem('activityDtos');
      });
    }

    function saveActivities() {
      self.activityDtos.every(_checkFilledInput) ?
        DialogService.showDialog(confirmSavePreActivities).then(() => ParticipantActivityService.saveActivities(self.activityDtos)):
        DialogService.showDialog(invalidPreActivities);
    }

    function _checkFilledInput(dto) {
      console.log(dto);
      if(!dto.surveyForm.isRequiredExternalID()) dto.preActivityValid = true;
      return dto.preActivityValid === true;
    }


    //Lógica feita para validação dos inputs dos cards
    // function isFormInvalid() {
    //     let invalidFormState = true;
    //     if (!self.activityDtos.length) invalidFormState = true;
    //     else {
    //         self.activityDtos.every(_checkFilledInput) ? invalidFormState = false : invalidFormState = true;
    //     }
    //     console.log(invalidFormState);
    //     return invalidFormState;
    // }

    //function _checkFilledInput(dto) {
    // switch (dto.mode) {
    // 	case "ONLINE": {
    // 		if (dto.surveyForm.isRequiredExternalID()) return dto.externalID !== undefined;
    // 		break;
    // 	}
    // 	case "PAPER": {
    // 		console.log(dto)
    // 		if (dto.surveyForm.isRequiredExternalID()) {
    // 			return dto.paperActivityData !== undefined && dto.externalID !== undefined;
    // 			break;
    // 		}
    // 		else {
    // 			return dto.paperActivityData !== undefined;
    // 			break;
    // 		}
    // 	}
    // }
    //}


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
        dialogToTitle: 'Aviso',
        titleToText: 'Existem Formulários inválidos',
        textDialog: 'Solicitamos que retorne para lista e preencha os campos dos formulários incompletos',
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

//clean
///home/fabiano/ccem/otus/source/app/deploy/state/activity/paper-activity-initializer-state-provider.js
//source/app/ux-component/paper-activity-initializer/paper-activity-initializer-component.js
//source/app/ux-component/activity-category-adder/activity-category-adder-component.js

//statusHistory.newInitializedOfflineRegistry(paperActivityData);

//fetchChances
//source/app/ux-component/laboratory/control-panel/control-panel-component.js
