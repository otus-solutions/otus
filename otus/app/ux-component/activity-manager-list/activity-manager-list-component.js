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
    '$scope'
  ];
//TODO: Implementar métodos de filtragem por blocks (tiago)
  function Controller(ActivityService, EventService, ActivityItemFactory, LoadingScreenService, DynamicTableSettingsFactory, $scope) {
    var self = this;

    var BLOCKS_LIST = {
      "CI": ["ACTA"],
      "A": ["ACTA"],
      "B": ["ACTA"],
      "C": ["ACTA"],
      "D": ["ACTA"],
      "E": ["ACTA"],
      "F": ["ACTA"],
      "G": ["ACTA"],
      "H": ["ACTA"],
      "J": ["ACTA"],
      "K": ["ACTA"],
      "CD": ["AMAC"]
    };
    self.selectedSurveys = [];
    var _selectedActivities = [];
    self.activities = [];
    self.isListEmpty = true;
    self.orderByField = 'name';
    self.reverseSort = false;
    self.finalPage = false;

    /* Public methods */
    self.selectActivity = selectActivity;
    self.update = update;
    self.changeSort = changeSort;
    self.dynamicDataTableChange = dynamicDataTableChange;


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
      _buildDynamicTableSettings(self.activities);
    }

    function onInit() {
      EventService.onParticipantSelected(_loadActivities);
      self.isListEmpty = true;
      self.otusActivityManager.listComponent = self;
      _loadActivities();
      _buildDynamicTableSettings();
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
          _blocksFilter();
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
      if(!self.selectedBlocks.length) {
        self.activities = angular.copy(self.AllActivities);

      }
    }

    function _surveysFilter(){
      self.selectedSurveys = [];
      self.selectedBlocks.forEach(block => {
        self.selectedSurveys = self.selectedSurveys.concat(BLOCKS_LIST[block])
      });
       self.selectedSurveys = self.selectedSurveys.filter(function (item, position) {
        return self.selectedSurveys.indexOf(item) == position;
      });

    }

    function _blocksFilter(){
      _surveysFilter();
      _activitiesFilter();
      self.updateDataTable(self.activities);
    }

    //TODO: REFATORAR (TIAGO)
    self.blocksList = Object.keys(BLOCKS_LIST);

    self.selectedBlocks = angular.copy(self.blocksList);
    // _blocksFilter();

    self.toggleBlock = function (item) {
      var idx = self.selectedBlocks.indexOf(item);
      if (idx > -1) {
        self.selectedBlocks.splice(idx, 1);
      }
      else {
        self.selectedBlocks.push(item);
      }
      _blocksFilter()
    };

    self.existsBlock = function (item) {
      return self.selectedBlocks.indexOf(item) > -1;
    };

    self.isIndeterminateBlocks = function() {
      return (self.selectedBlocks.length !== 0 &&
        self.selectedBlocks.length !== self.blocksList.length);
    };

    self.isCheckedBlocks = function() {
      return self.selectedBlocks.length === self.blocksList.length;
    };

    self.toggleAllBlocks = function() {
      if (self.selectedBlocks.length === self.blocksList.length) {
        self.selectedBlocks = [];
      } else if (self.selectedBlocks.length === 0 || self.selectedBlocks.length > 0) {
        self.selectedBlocks = self.blocksList.slice(0);
      }
      _blocksFilter();
    };
  }
}());
