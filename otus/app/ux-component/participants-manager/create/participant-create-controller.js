(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusParticipantCreateCtrl', Controller);

  Controller.$inject = [
    '$element',
    'mdcDateTimeDialog',
    'otusjs.application.state.ApplicationStateService',
    'mdcDefaultParams',
    'otusjs.model.participant.ParticipantFactory',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.deploy.ParticipantDataSourceService',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.participant.business.ParticipantMessagesService'
  ];

  function Controller($element, mdcDateTimeDialog, ApplicationStateService, mdcDefaultParams, ParticipantFactory, ProjectFieldCenterService, dashboardContextService, ParticipantDataSourceService, ParticipantManagerService, ParticipantMessagesService) {
    var self = this;


    mdcDefaultParams({lang: 'pt-br', cancelText: 'cancelar', todayText: 'hoje', okText: 'ok'});

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    self.saveParticipant = saveParticipant;
    self.clearParticipant = clearParticipant;
    self.listParticipants = listParticipants;
    self.centers = {}
    self.participant = {};



    function onInit() {
      self.maxDate = new Date();
      _loadAllCenters();
    }

    self.$onChanges = function(obj) {
      console.log(obj);
      if(!self.permission){
        ApplicationStateService.activateParticipantsList();
      }
    };

    function setUserFieldCenter() {
      dashboardContextService
        .getLoggedUser()
        .then(function (userData) {
          if (userData.fieldCenter.acronym) {
            self.centerFilter = self.centers.find(function (center) {
              return center.acronym === userData.fieldCenter.acronym;
            });
            self.centerFilterselectedIndex = self.centers.indexOf(self.centerFilter) >= 0 ? self.centers.indexOf(self.centerFilter) : 0;
            self.centerFilterDisabled = userData.fieldCenter.acronym ? "disabled" : "";
            self.centerFilter = angular.copy(self.centerFilter)
          }
        });
    }

    function _showDialogBirthdate() {
      mdcDateTimeDialog.show({
        maxDate: self.maxDate,
        time: false
      }).then(function (date) {
        self.birthdate = date;
      });
    }

    function _setBirthdate(date) {
      var _date = new ImmutableDate(date);
      _date.resetTime();
      self.participant.birthdate = _date.toJSON();
    }

    self.onFilter = function () {

      if (self.birthdate) {
        _setBirthdate(self.birthdate);
      }
      if (self.recruitmentNumber) {
        self.participant.recruitmentNumber = parseInt(self.recruitmentNumber);
      }
      if (self.centerFilter) {
        self.participant.fieldCenter = {"acronym": self.centerFilter};
      }
    }

    function _loadAllCenters() {
      ProjectFieldCenterService.loadCenters().then(function (result) {
        self.centers = angular.copy(result);
        setUserFieldCenter();
      });
    }

    function _fieldsValidate() {
      const MSG = "Favor, preencha todos os campos!";
      if (!self.participant.recruitmentNumber){
        $element.find('#rn').focus();
        ParticipantMessagesService.showToast(MSG, 3000);
        return false;
      }
      if (!self.participant.name) {
        $element.find('#name').focus();
        ParticipantMessagesService.showToast(MSG, 3000);
        return false;
      }
      if (!self.participant.sex){
        $element.find('#sex').focus();
        ParticipantMessagesService.showToast(MSG, 3000);
        return false;
      }
      if (!self.participant.birthdate){
        ParticipantMessagesService.showToast(MSG, 3000);
        _showDialogBirthdate();
        return false;
      }
      if (!self.participant.fieldCenter){
        $element.find('#center').focus();
        ParticipantMessagesService.showToast(MSG, 3000);
        return false;
      }
      if (self.participant.late === undefined) {
        self.participant.late = false
      }

      ParticipantManagerService.getAllowNewParticipants()
        .then(function(response) {
          return response.participantRegistration;
        });
    }

    function clearParticipant() {
      ParticipantMessagesService.showClearDialog()
        .then(function () {
          _setClear();
        });
    }

    function _setClear() {
      delete self.participant;
      delete self.birthdate;
      delete self.recruitmentNumber;
      delete self.centerFilter;
    }

    function listParticipants() {
      ApplicationStateService.activateParticipantsList();
    }

    function saveParticipant() {
      ParticipantMessagesService.showSaveDialog()
        .then(function () {
          self.onFilter();
          if(_fieldsValidate()){
            var _participant = ParticipantFactory.create(self.participant);
            ParticipantManagerService.create(_participant)
              .then(function (response) {
                if(response.recruitmentNumber === self.participant.recruitmentNumber){
                  _setClear();
                  ParticipantMessagesService.showToast("Participante salvo com sucesso!", 3000);
                }
              })
              .catch(function (err) {
                if(err.data.MESSAGE){
                  ParticipantMessagesService.showNotSave(err.data.MESSAGE);
                }
              });
          } else {
            ParticipantMessagesService.showNotSave("Sistema não habilitado para cadastros de participantes!");
            self.listParticipants();
          }
        });

    }


  }
}());
