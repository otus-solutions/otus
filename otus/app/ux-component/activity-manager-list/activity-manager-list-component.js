(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityList', {
      controller: 'otusActivityListCtrl as $ctrl',
      templateUrl: 'app/ux-component/activity-manager-list/activity-manager-list-template.html',
      require: {
        otusActivityManager: '^otusActivityManager'
      }
    })
    .controller('otusActivityListCtrl', Controller);

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.activity.core.EventService',
    'otusjs.otus.uxComponent.ActivityItemFactory',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory',
    '$scope',
    '$element',
    'otusjs.survey.GroupManagerFactory'
  ];

  function Controller(ActivityService, EventService, ActivityItemFactory, LoadingScreenService, DynamicTableSettingsFactory, $scope, $element, GroupManagerFactory) {
    var self = this;

    var GROUP_LIST = {
      "CI": ["ACTA"],
      "CD": ["AMAC"]
    };

    self.selectedSurveys = [];
    var _selectedActivities = [];
    // self.activities = [];
    self.isListEmpty = true;
    self.orderByField = 'name';
    self.reverseSort = false;
    self.finalPage = false;


    //TODO: REFATORAR
    self.groupList = Object.keys(GROUP_LIST);
    self.selectedGroups = angular.copy(self.groupList);


    /* Public methods */
    self.selectActivity = selectActivity;
    self.update = update;
    self.changeSort = changeSort;
    self.dynamicDataTableChange = dynamicDataTableChange;
    self.toggleGroup = toggleGroup;
    self.existsGroup = existsGroup;
    self.isIndeterminateGroups = isIndeterminateGroups;
    self.isCheckedGroup = isCheckedGroup;
    self.toggleAllGroups = toggleAllGroups;
    self.clearSearchTerm = clearSearchTerm;

    $scope.$watch("$ctrl.selectedGroups", function () {
      $scope.$$postDigest(function () {
        if(self.AllActivities && self.activities){
          if(self.AllActivities.length && Array.isArray(self.activities))  _groupsFilter();
        }
      });
    });


    /* Lifecycle hooks */
    self.$onInit = onInit;

    function selectActivity(activityItem) {
      var activityIndex = _selectedActivities.indexOf(activityItem.activity);
      if (activityIndex > -1) {
        _selectedActivities.splice(activityIndex, 1);
        activityItem.isSelected = false;
      } else {
        _selectedActivities.push(activityItem.activity);
        activityItem.isSelected = true;
      }
      ActivityService.selectActivities(_selectedActivities);
    }

    function update() {
      _loadActivities();
      _buildDynamicTableSettings();
    }

    function onInit() {

      EventService.onParticipantSelected(_loadActivities);
      self.isListEmpty = true;
      self.otusActivityManager.listComponent = self;
      _loadActivities();
      _buildDynamicTableSettings();
      $element.find('#searchBlock').on('keydown', function(ev) {
        ev.stopPropagation();
      });
    }

    function _loadActivities() {
      LoadingScreenService.start();
      ActivityService
        .listAll()
        .then(function(activities) {
          self.activities = activities
            .filter(_onlyNotDiscarded)
            .map(ActivityItemFactory.create);
          self.AllActivities = angular.copy(self.activities);
          _groupsFilter();
          self.updateDataTable(self.activities);
          self.isListEmpty = !self.activities.length;
          _selectedActivities = [];
          ActivityService.selectActivities(_selectedActivities);
          LoadingScreenService.finish();
        });
    }

    function _onlyNotDiscarded(activity) {
      return !activity.isDiscarded;
    }

    function changeSort(field,order) {
      self.orderByField = field;
      self.reverseSort = order;
    }

    function _buildDynamicTableSettings() {
      self.dynamicTableSettings = DynamicTableSettingsFactory.create()
        .addHeader('NOME', '25', '', 1)
        .addColumnProperty('name')
        .addHeader('ACRÔNIMO', '15', 'center center', 2)
        .addColumnProperty('acronym')
        .addHeader('MODO', '10', '', 3)
        .addIconWithFunction(function (element) {
          var structureIcon = { icon: "md-svg-icon", class: "", tooltip: "" };
          var OnLineStructure = {
            icon: "equalizer",
            class: "activity-item-icon md-avatar-icon",
            tooltip: "On line",
          };
          var paperStructure = {
            icon: 'description',
            class: "activity-item-icon md-avatar-icon",
            tooltip: "Em papel",
          };

          if(element.mode.name === "Em papel"){
            structureIcon = paperStructure;
          } else {
            structureIcon = OnLineStructure;
          }
          return structureIcon;
        })
        .addHeader('REALIZAÇÃO', '15', 'center center', 4)
        .addColumnProperty('realizationDate', 'DATE')
        .setFormatData("'dd/MM/yy")
        .addHeader('STATUS', '20', '', 5)
        .addColumnProperty('status')
        .addHeader('CATEGORIA', '15', '', 6)
        .addColumnProperty('category')
        .setCallbackAfterChange(self.dynamicDataTableChange)
        .setCheckbox(true)
        .getSettings();
    }

    function dynamicDataTableChange(change) {
      if (change.type === 'select' || change.type === 'deselect') {
        self.selectActivity(change.element);
      }
    }

    function _activitiesFilter() {
      self.activities = self.AllActivities.filter(function (activity) {
        return self.selectedSurveys.includes(activity.acronym)
      });
      //TODO: REMOVER
      if(!self.selectedGroups.length) {
        self.activities = angular.copy(self.AllActivities);
      }
    }

    function _surveysFilter(){
      self.selectedSurveys = [];
      self.selectedGroups.forEach(block => {
        self.selectedSurveys = self.selectedSurveys.concat(GROUP_LIST[block])
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

    function toggleGroup(item) {
      var idx = self.selectedGroups.indexOf(item);
      if (idx > -1) {
        self.selectedGroups.splice(idx, 1);
      }
      else {
        self.selectedGroups.push(angular.copy(item));
      }
      _groupsFilter()
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
