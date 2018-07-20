(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusParticipantCreateCtrl', Controller);

  Controller.$inject = [
    'otusjs.deploy.LoadingScreenService',
    'mdcDefaultParams',
    'otusjs.model.participant.ParticipantFactory',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.deploy.ParticipantDataSourceService',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.participant.business.ParticipantMessagesService'
  ];

  function Controller(LoadingScreenService, mdcDefaultParams, ParticipantFactory, ProjectFieldCenterService, dashboardContextService, ParticipantDataSourceService, ParticipantManagerService, ParticipantMessagesService) {
    var self = this;


    mdcDefaultParams({lang: 'pt-br', cancelText: 'cancelar', todayText: 'hoje', okText: 'ok'});

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    self.saveParticipant = saveParticipant;
    self.clearParticipant = clearParticipant;
    self.centers = {}
    self.participant = {};
    const MESSAGE = "Cadastrando novo participante! Favor aguarde."


    function onInit() {
      LoadingScreenService.changeMessage(MESSAGE);
      _loadAllCenters();
    }

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
          }
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
      }
      self.participant.fieldCenter = {"acronym": self.centerFilter};

    }

    function _loadAllCenters() {
      ProjectFieldCenterService.loadCenters().then(function (result) {
        self.centers = angular.copy(result);
        setUserFieldCenter();
      });
    }

    function _fieldsValidate() {
      var _valid = true;
      if (!self.participant.recruitmentNumber) _valid = false;
      if (!self.participant.name) _valid = false;
      if (!self.participant.sex) _valid = false;
      if (!self.participant.birthdate) _valid = false;
      if (!self.participant.fieldCenter) _valid = false;
      if (self.participant.late === undefined) _valid = false;

      return _valid;
    }

    function clearParticipant() {
      ParticipantMessagesService.showClearDialog()
        .then(function () {
          self.participant = {};
          self.birthdate = null;
          self.recruitmentNumber = "";
        });
    }

    function saveParticipant() {
      ParticipantMessagesService.showSaveDialog()
        .then(function () {
          self.onFilter();
          self.participant.late = false;
          if(_fieldsValidate()){
            var _participant = ParticipantFactory.create(self.participant);
            ParticipantManagerService.create(_participant)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (err) {
                if(err.data.MESSAGE){
                  ParticipantMessagesService.showNotSave(err.data.MESSAGE);
                }
              });
            // LoadingScreenService.start();
            // ParticipantDataSourceService.up().then(function () {
            //   LoadingScreenService.finish();
            // });
          } else {
            ParticipantMessagesService.showToast("Favor, preencha todos os campos!", 3000);
          }
        });

    }


  }
}());
