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
        .addHeader('NOME', '40', '', 1)
        //property, formatType
        .addColumnProperty('name')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('ACRÔNIMO', '20', '', 2)
        //property, formatType
        .addColumnProperty('acronym')
        //header, flex, align, ordinationPriorityIndex

        .addColumnIconButton(
          //TODO: OTUS-494 Encontrar forma dinâmica de passar o valor mode.icon no lugar estático do exemplo de icone description
          "description",'', "activity-item-icon md-avatar-icon", '',
          //self.selectParticipant, false, false, true, false, false
        )

        .addHeader('MODO', '20', '', 3)

        //cópia de uma configuração para os icones dinâmicos na  coluna de modo

        // .addIconWithFunction(function (element) {
        //   var structureIcon = { icon: "", class: "", tooltip: "" };
        //   var warningStructure = {
        //     icon: "{{ activity.mode.icon }}",
        //     class: "activity-item-icon md-avatar-icon",
        //     tooltip: "Alíquota não identificada no sistema",
        //     orderValue: "warning"
        //   };
        //   var doneStructure = {
        //     icon: "done",
        //     class: "md-primary",
        //     tooltip: "Alíquota identificada no sistema",
        //     orderValue: "done"
        //   };
        //
        //
        //   if (self.action === 'view') {
        //     if (element.aliquotValid){
        //       structureIcon = doneStructure;
        //     } else {
        //       structureIcon = warningStructure;
        //     }
        //   } else if (self.action === 'upload') {
        //     if (self.errorAliquots.length) {
        //       var error = self.errorAliquots.find(function (error) {
        //         if (error.aliquot === element.aliquotCode) {
        //           if (error.message.includes(ALIQUOT_DOES_MATCH_EXAM)) {
        //             structureIcon = {icon: "error", class: "md-warn", tooltip: "Alíquota não corresponde ao exame", orderValue: "error"};
        //           } else {
        //             structureIcon = warningStructure;
        //           }
        //           return error;
        //         }
        //       });
        //       if (!error){
        //         structureIcon = doneStructure;
        //       }
        //     } else {
        //       structureIcon = {icon: "query_builder", class: "", tooltip: "Aguardando", orderValue: "query_builder"};
        //     }}
        //   return structureIcon;
        // })
        // //property, formatType


        .addColumnProperty('mode.name')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('DATA DE REALIZAÇÃO', '25', '', 4)
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
