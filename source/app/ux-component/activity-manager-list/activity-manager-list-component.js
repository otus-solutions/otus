(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityList', {
      controller: 'otusActivityListCtrl as $ctrl',
      templateUrl: 'app/ux-component/activity-manager-list/activity-manager-list-template.html',
      require: {
        otusActivityManager: '^otusActivityManager'
      },
      bindings: {
        testThree: '=?'
      }
    })
    .controller('otusActivityListCtrl', Controller);

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.activity.business.GroupActivityService',
    'otusjs.activity.core.EventService',
    'otusjs.otus.uxComponent.ActivityItemFactory',
    'otusjs.deploy.LoadingScreenService',
    '$scope',
    '$element'
  ];

  function Controller(ActivityService, GroupActivityService, EventService, ActivityItemFactory, LoadingScreenService, $scope, $element) {
    var self = this;

    var _selectedActivities = [];
    self.selectedSurveys = [];
    self.isListEmpty = true;
    self.orderByField = 'name';
    self.reverseSort = false;
    self.finalPage = false;
    self.selectedGroups = [];

    /* Public methods */
    self.selectActivity = selectActivity;
    self.update = update;
    self.changeSort = changeSort;
    self.griidDataChange = griidDataChange;
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
        Array.prototype.push.apply(_selectedActivities,[activityItem.activity]);
        activityItem.isSelected = true;
      }
      ActivityService.selectActivities(_selectedActivities);
    }

    function update() {
      _loadActivities();
    }

    function onInit() {
      self.ready = false;
      self.selectedGroups = [];
      self.groupList = [];
      GroupActivityService.getSurveyGroupsByUser().then(function (data) {
        self.surveysGroups = data;
        self.groupList = self.surveysGroups.getGroupNames();
      });

      EventService.onParticipantSelected(_loadActivities);
      self.isListEmpty = true;
      self.otusActivityManager.listComponent = self;
      _loadActivities();
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
            .map(ActivityItemFactory.create);
          self.AllActivities = angular.copy(self.activities);
          _groupsFilter();
          self.updateData(self.activities);
          self.isListEmpty = !self.activities.length;
          _selectedActivities = [];
          ActivityService.selectActivities(_selectedActivities);
          LoadingScreenService.finish();
          self.ready = true;
        });
    }

    function changeSort(field,order) {
      self.orderByField = field;
      self.reverseSort = order;
    }

    function griidDataChange(change) {
      if (change.type === 'select' || change.type === 'deselect') {
        self.selectActivity(change.element);
      }
      console.log(self.testOne);
      self.testThree = self.testOne;
    }

    function _activitiesFilter() {
      self.activities = self.AllActivities.filter(function (activity) {
        return self.selectedSurveys.includes(activity.acronym)
      });
      if(!self.selectedGroups.length) {
        self.activities = angular.copy(self.AllActivities);
      }
    }

    function _surveysFilter(){
      self.selectedSurveys = [];
      self.selectedGroups.forEach(groupName => {
        self.selectedSurveys = self.selectedSurveys.concat(self.surveysGroups.getGroupSurveys(groupName));
      });
      self.selectedSurveys = self.selectedSurveys.filter(function (item, position) {
        return self.selectedSurveys.indexOf(item) == position;
      });
    }

    function _groupsFilter(){
      _surveysFilter();
      _activitiesFilter();
      self.updateData(self.activities);
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

    function _testTwo() {
      return self.testOne;
    }
  }
}());
