(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityList', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-manager-list/activity-manager-list-template.html',
      require: {
        otusActivityManager: '^otusActivityManager'
      }
    });

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.activity.core.EventService',
    'otusjs.otus.uxComponent.ActivityItemFactory',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory',
    '$q'
  ];

  function Controller(ActivityService, EventService, ActivityItemFactory, LoadingScreenService, DynamicTableSettingsFactory) {
    var self = this;

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
        //.setActivities(activities)
      //header, flex, align, ordinationPriorityIndex
        .addHeader('NOME', '25', '', 1)
        //property, formatType
        .addColumnProperty('name')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('ACRÔNIMO', '15', 'center center', 2)
        //property, formatType
        .addColumnProperty('acronym')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('MODO', '10', '', 3)
        .addIconWithFunction(function (element) {
          var structureIcon = { icon: "md-svg-icon", class: "", tooltip: "" };
          var OnLineStructure = {
            icon: "equalizer",
            class: "activity-item-icon md-avatar-icon",
            tooltip: "On line",
            //orderValue: "warning"
          };
          var paperStructure = {
            icon: 'description',
            class: "activity-item-icon md-avatar-icon",
            tooltip: "Em papel",
            //orderValue: "done"
          };

          if(element.mode.name === "Em papel"){
            structureIcon = paperStructure;
          } else {
            structureIcon = OnLineStructure;
          }
          return structureIcon;
        })
        // .addColumnProperty('mode.name')
        .addHeader('REALIZAÇÃO', '15', 'center center', 4)
        //property, formatType
        .addColumnProperty('realizationDate', 'DATE')
        .setFormatData("'dd/MM/yy")
        //icon, tooltip, classButton, successMsg,
        //buttonFunction, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback

        .addHeader('STATUS', '20', '', 5)
        //property, formatType
        .addColumnProperty('status')

        .addHeader('CATEGORIA', '15', '', 6)
        //property, formatType
        .addColumnProperty('category')
        .setCallbackAfterChange(self.dynamicDataTableChange)
        .setCheckbox(true)
        //.setSelectUnselectFunction()
        //.setElementsArray(self.activities)
         //.setTitle('Lista de Participantes')
        // .setCallbackAfterChange(self.dynamicDataTableChange)
        //Don't use with Service, in this case pass Service as attribute in the template
        // .setTableUpdateFunction(AliquotTransportationService.dynamicDataTableFunction.updateDataTable)
        /*
          //Optional Config's
          .setFilter(true)
          .setReorder(true)
          .setPagination(true)
          .setSelectedColor()
          .setHoverColor()
        */
        .getSettings();
    }

    function dynamicDataTableChange(change) {
      if (change.type === 'select' || change.type === 'deselect') {
        self.selectActivity(change.element);
      }
    }
  }
}());
