(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusParticipantCreateCtrl', Controller);

  Controller.$inject = [
    '$element',
    'otusjs.utils.ImmutableDate',
    'mdcDateTimeDialog',
    'otusjs.application.state.ApplicationStateService',
    'mdcDefaultParams',
    'otusjs.model.participant.ParticipantFactory',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.participant.business.ParticipantMessagesService'
  ];

  function Controller($element, ImmutableDate, mdcDateTimeDialog, ApplicationStateService, mdcDefaultParams, ParticipantFactory, ProjectFieldCenterService, dashboardContextService, ParticipantManagerService, ParticipantMessagesService) {
    var self = this;


    mdcDefaultParams({
      lang: 'pt-br',
      cancelText: 'cancelar',
      todayText: 'hoje',
      okText: 'ok'
    });

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    self.saveParticipant = saveParticipant;
    self.clearParticipant = clearParticipant;
    self.listParticipants = listParticipants;
    self.onFilter = onFilter;



    function onInit() {
      self.maxDate = new Date();
      self.centers = {};
      _loadAllCenters();
    }

    function _restoreFields() {
      var _restoreParticipant = JSON.parse(localStorage.getItem("newParticipant")) || {};
      if (_restoreParticipant.recruitmentNumber) {
        self.recruitmentNumber = _restoreParticipant.recruitmentNumber;
      }
      if (_restoreParticipant.birthdate) {
        self.birthdate = _restoreParticipant.birthdate;
      }
      if (_restoreParticipant.fieldCenter) {
        self.centerFilter = self.centers.find(function(center) {
          return center.acronym === _restoreParticipant.fieldCenter.acronym;
        });
        self.centerFilterselectedIndex = self.centers.indexOf(self.centerFilter) >= 0 ? self.centers.indexOf(self.centerFilter) : 0;
      }
      self.participant = _restoreParticipant;
    }

    self.$onChanges = function() {
      if (!self.permissions.participantRegistration) {
        ApplicationStateService.activateParticipantsList();
      }
    };

    self.$onDestroy = function() {
      localStorage.removeItem("newParticipant");
    };

    function setUserFieldCenter() {
      dashboardContextService
        .getLoggedUser()
        .then(function(userData) {
          if (userData.fieldCenter.acronym) {
            self.userCenter = userData.fieldCenter.acronym;
            self.centerFilter = self.centers.find(function(center) {
              return center.acronym === userData.fieldCenter.acronym;
            });
            self.centerFilterselectedIndex = self.centers.indexOf(self.centerFilter) >= 0 ? self.centers.indexOf(self.centerFilter) : 0;
            self.centerFilterDisabled = userData.fieldCenter.acronym ? "disabled" : "";
            self.centerFilter = angular.copy(self.centerFilter.acronym);
          }
          _restoreFields();
        });
    }

    function _showDialogBirthdate() {
      mdcDateTimeDialog.show({
        maxDate: self.maxDate,
        time: false
      }).then(function(date) {
        self.birthdate = date;
        _setBirthdate(self.birthdate);
      });
    }

    function _setBirthdate(date) {
      var _date = ImmutableDate(date);
      _date.resetTime();
      self.participant.birthdate = _date.toJSON();
    }

    function onFilter() {
      if (self.birthdate) {
        _setBirthdate(self.birthdate);
      }
      if (self.recruitmentNumber) {
        self.participant.recruitmentNumber = parseInt(self.recruitmentNumber);
      }
      if (self.centerFilter) {
        self.participant.fieldCenter = {
          "acronym": self.centerFilter
        };
      }
      if (!self.participant.late) {
        self.participant.late = false;
      }
      localStorage.setItem("newParticipant", JSON.stringify(self.participant));
    }

    function _loadAllCenters() {
      ProjectFieldCenterService.loadCenters().then(function(result) {
        self.centers = angular.copy(result);
        setUserFieldCenter();
      });
    }

    function _fieldsValidate() {
      var _valid = true;

      if (!self.participant.recruitmentNumber && !self.permissions.autoGenerateRecruitmentNumber) {
        $element.find('#rn').focus();
        _valid = false;
      } else if (!self.participant.name) {
        $element.find('#name').focus();
        _valid = false;
      } else if (!self.participant.sex) {
        $element.find('#sex').focus();
        _valid = false;
      } else if (!self.participant.birthdate) {
        _showDialogBirthdate();
        _valid = false;
      } else if (!self.participant.fieldCenter) {
        $element.find('#center').focus();
        _valid = false;
      }

      return _valid;
    }

    function clearParticipant() {
      ParticipantMessagesService.showClearDialog()
        .then(function() {
          _setClear();
        });
    }

    function _setClear() {
      localStorage.removeItem("newParticipant");
      delete self.participant;
      delete self.birthdate;
      delete self.recruitmentNumber;
      self.userCenter ? self.userCenter : delete self.centerFilter;
      self.participant = {};
    }

    function listParticipants() {
      ApplicationStateService.activateParticipantsList();
    }

    function saveParticipant() {
      if (_fieldsValidate()) {
        ParticipantMessagesService.showSaveDialog()
          .then(function() {
            self.onFilter();
            if (self.permissions.participantRegistration) {
              var _participant = ParticipantFactory.create(self.participant);
              ParticipantManagerService.create(_participant)
                .then(function(response) {
                  if(!self.permissions.autoGenerateRecruitmentNumber){
                    if (response.recruitmentNumber === self.participant.recruitmentNumber) {
                      _setClear();
                      ParticipantMessagesService.showToast("Participante salvo com sucesso!");
                    }
                  } else {
                    ParticipantMessagesService.showRecruitmentNumberGenerated(response).
                      then(function () {
                      _setClear();
                    })
                  }
                })
                .catch(function(err) {
                  ParticipantMessagesService.showNotSave(err.data.MESSAGE || "");
                });
            } else {
              ParticipantMessagesService.showNotSave("Sistema não habilitado para cadastros de participantes!");
              self.listParticipants();
            }
          });
      } else {
        ParticipantMessagesService.showToast("Favor, preencha todos os campos!");
      }
    }


  }
}());
