(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityAdderList', {
      controller: "otusActivityAdderListCtrl as $ctrl",
      templateUrl: 'app/ux-component/activity-adder-list/activity-adder-list-template.html',
      bindings: {
        onActivitySelection: '&'
      }
    })
    .controller('otusActivityAdderListCtrl', Controller);

  Controller.$inject = [
    'otusjs.survey.GroupManagerFactory',
    'otusjs.activity.business.GroupActivityService',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory',
    '$scope',
    'otusjs.deploy.LoadingScreenService',
    '$element'
  ];

  function Controller(GroupManagerFactory, GroupActivityService, ActivityService, DynamicTableSettingsFactory, $scope, LoadingScreenService, $element) {
    var self = this;
    self.activities = [];
    self.isListEmpty = true;
    self.orderByField = 'surveyTemplate.identity.name';
    self.reverseSort = false;
    self.searchTerm = '';
    self.selectedGroups = [];

    /* Public methods */
    self.getType = getType;
    self.selectActivity = selectActivity;
    self.changeSort = changeSort;
    self.existsGroup = existsGroup;
    self.isIndeterminateGroups = isIndeterminateGroups;
    self.isCheckedGroup = isCheckedGroup;
    self.toggleAllGroups = toggleAllGroups;
    self.clearSearchTerm = clearSearchTerm;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    $scope.$watch("$ctrl.selectedGroups", function () {
      $scope.$$postDigest(function () {
        if(self.AllActivities && self.activities){
          if(self.AllActivities.length && Array.isArray(self.activities) && typeof self.updateDataTable === "function")  _groupsFilter();
        }
      });
    });

    function onInit() {
      self.isListEmpty = true;
      LoadingScreenService.start();
      GroupActivityService.listSurveysGroups().then(function (response) {
        //TODO: FALTA O MODEL
        // self.surveysGroups = GroupManagerFactory.create(response.map(group => {return group.name}));
        self.surveysGroups = angular.copy(response);
        self.groupList = self.surveysGroups.map(function (group) {
          return group.name;
        });
      });
      _loadActivities();
      _buildDynamicTableSettings(self.activities);
      $element.find('#searchBlock').on('keydown', function(ev) {
        ev.stopPropagation();
      });
    }

    $scope.$watch('$ctrl.ready', function() {
      if(typeof self.updateDataTable === "function") {
        _groupsFilter();
        LoadingScreenService.finish();
      }
    });

    $scope.$watch('$ctrl.isListEmpty', function() {
      if(!self.isListEmpty){
        self.ready = true;
      }
    });

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

    self.dynamicDataTableChange = dynamicDataTableChange;
    function dynamicDataTableChange(change) {
      if (change.type === 'select' || change.type === 'deselect') {
        self.selectActivity(change.element);
      }
    }

    function _buildDynamicTableSettings() {
      self.dynamicTableSettings = DynamicTableSettingsFactory.create()
        .addHeader('NOME', '50', '', 1)
        .addColumnProperty('surveyTemplate.identity.name')
        .addHeader('ACRÔNIMO', '15', 'center center', 2)
        .addColumnProperty('surveyTemplate.identity.acronym')
        .addHeader('Tipo', '35', '', 6)
        .addColumnProperty('surveyFormType')
        .setCallbackAfterChange(self.dynamicDataTableChange)
        .setCheckbox(true)
        .getSettings();
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

    function selectActivity(activity) {
      self.onActivitySelection({
        activity: activity
      });
    }

    function changeSort(field,order) {
      self.orderByField = field;
      self.reverseSort = order;
    }

    function _activitiesFilter() {
      self.activities = self.AllActivities.filter(function (activity) {
        return self.selectedSurveys.includes(activity.surveyTemplate.identity.acronym)
      });
      if(!self.selectedGroups.length) {
        self.activities = angular.copy(self.AllActivities);
      }
    }

    function _surveysFilter(){
      self.selectedSurveys = [];
      self.selectedGroups.forEach(groupName => {
        self.selectedSurveys = self.selectedSurveys.concat(self.surveysGroups.find(function (group) {
          return group.name == groupName;
        }).surveyAcronyms);
      });
      self.selectedSurveys = self.selectedSurveys.filter(function (item, position) {
        return self.selectedSurveys.indexOf(item) == position;
      });
    }

    function _groupsFilter(){
      _surveysFilter();
      _activitiesFilter();
      self.updateDataTable(self.activities);
    }

    function existsGroup(item) {
      return self.selectedGroups.indexOf(item) > -1;
    }

    function isIndeterminateGroups() {
      return (self.selectedGroups.length !== 0 &&
        self.selectedGroups.length !== self.groupList.length);
    }

    function isCheckedGroup() {
      return self.selectedGroups.length === self.groupList.length;
    }

    function toggleAllGroups() {
      if (self.selectedGroups.length === self.groupList.length) {
        self.selectedGroups = [];
      } else if (self.selectedGroups.length === 0 || self.selectedGroups.length > 0) {
        self.selectedGroups = self.groupList.slice(0);
      }
      _groupsFilter();
    }

    function clearSearchTerm() {
      self.searchTerm = '';
    }
  }
}());
