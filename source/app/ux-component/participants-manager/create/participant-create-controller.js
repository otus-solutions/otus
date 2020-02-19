(function () {
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
      self.participant = ParticipantFactory.create();
      self.identified = true;
      self.maxDate = new Date();
      self.centers = {};
      _loadAllCenters();
    }

    function _restoreFields() {
      var _restoreParticipant = JSON.parse(localStorage.getItem("newParticipant"));
      if (_restoreParticipant.recruitmentNumber) {
        self.recruitmentNumber = _restoreParticipant.recruitmentNumber;
      }
      if (_restoreParticipant.birthdate) {
        self.birthdate = _restoreParticipant.birthdate;
      }
      if (_restoreParticipant.fieldCenter) {
        self.centerFilter = self.centers.find(function (center) {
          return center.acronym === _restoreParticipant.fieldCenter.acronym;
        });
        self.centerFilterselectedIndex = self.centers.indexOf(self.centerFilter) >= 0 ? self.centers.indexOf(self.centerFilter) : -1;
      }
      self.participant = _restoreParticipant;
    }

    self.$onChanges = function () {
      if (!self.permissions.participantRegistration) {
        ApplicationStateService.activateParticipantsList();
      }
    };

    self.$onDestroy = function () {
      localStorage.removeItem("newParticipant");
    };

    function _getCenterCode(acronym) {
      var center = self.centers.filter(function (center) {
        if (center.acronym === acronym) {
          return center.code;
        }
      });
      return center[0].code;
    }

    function setUserFieldCenter() {
      dashboardContextService
        .getLoggedUser()
        .then(function (userData) {
          if (userData.fieldCenter.acronym) {
            self.userCenter = userData.fieldCenter.acronym;
            self.centerFilter = self.centers.find(function (center) {
              return center.acronym == self.userCenter;
            });
            self.centerFilterselectedIndex = self.centers.indexOf(self.centerFilter) >= 0 ? self.centers.indexOf(self.centerFilter) : -1;
            self.centerFilterDisabled = userData.fieldCenter.acronym ? true : false;
            self.centerFilter = angular.copy(self.centerFilter.acronym);
          } else {
            self.centerFilter = "";
          }
          _restoreFields();
        });
    }

    function _showDialogBirthdate() {
      mdcDateTimeDialog.show({
        maxDate: self.maxDate,
        time: false
      }).then(function (date) {
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
        self.participant.recruitmentNumber = parseInt(self.centerCode + self.recruitmentNumber);
      }
      if (self.centerFilter) {
        self.centerCode = _getCenterCode(self.centerFilter);
        self.participant.fieldCenter = {
          "acronym": self.centerFilter,
          "code": self.centerCode
        };
      }
      if (!self.participant.late) {
        self.participant.late = false;
      }
      localStorage.setItem("newParticipant", JSON.stringify(self.participant));
    }

    function _loadAllCenters() {
      self.centers = [];
      ProjectFieldCenterService.loadCenters().then(function (result) {
        self.centers = angular.copy(result);
        setUserFieldCenter();
      });
    }

    function _fieldsValidate() {
      var _valid = true;
      if (!self.participant){
        self.participant = ParticipantFactory.create();
      }
      if (!self.participant.recruitmentNumber && !self.permissions.autoGenerateRecruitmentNumber) {
        $element.find('#rn').focus();
        _valid = false;
      } else if (!self.participant.name && self.identified) {
        $element.find('#name').focus();
        _valid = false;
      } else if (!self.participant.sex && self.identified) {
        $element.find('#sex').focus();
        _valid = false;
      } else if (!self.participant.birthdate && self.identified) {
        _showDialogBirthdate();
        _valid = false;
      } else if (!self.participant.fieldCenter) {
        if (self.identified){
          $element.find('#centerIdentifield').focus();
        } else {
          $element.find('#center').focus();
        }
        _valid = false;
      }

      return _valid;
    }

    function clearParticipant() {
      ParticipantMessagesService.showClearDialog()
        .then(function () {
          _setClear();
        });
    }

    function _setClear() {
      localStorage.removeItem("newParticipant");
      delete self.participant;
      delete self.birthdate;
      delete self.recruitmentNumber;
      self.userCenter ? self.userCenter : delete self.centerFilter;
      self.participant = ParticipantFactory.create();
    }

    function listParticipants() {
      ApplicationStateService.activateParticipantsList();
    }

    function saveParticipant() {
      if (_fieldsValidate()) {
        ParticipantMessagesService.showSaveDialog()
          .then(function () {
            self.onFilter();
            if (self.permissions.participantRegistration) {
              var _participant = _getParticipantData();
              if (self.permissions.autoGenerateRecruitmentNumber) delete _participant.recruitmentNumber;
              ParticipantManagerService.create(_participant)
                .then(function (response) {
                  if (!self.permissions.autoGenerateRecruitmentNumber) {
                    if (response.recruitmentNumber === self.participant.recruitmentNumber) {
                      _setClear();
                      ParticipantMessagesService.showToast("Participante salvo com sucesso!");
                      self.listParticipants();
                    }
                  } else {
                    ParticipantMessagesService.showRecruitmentNumberGenerated(ParticipantFactory.fromJson(response).toJSON()).then(function () {
                      _setClear();
                    })
                  }
                })
                .catch(function (err) {
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

    function _getParticipantData() {
      if(self.identified) {
        self.participant.identified = true;
        return ParticipantFactory.fromJson(self.participant).toJSON();
      } else {
        self.participant.identified = false;
        let _participantData = ParticipantFactory.fromJson(self.participant).toJSON();
        if (_participantData.recruitmentNumber) {
          return {recruitmentNumber: _participantData.recruitmentNumber, fieldCenter: _participantData.fieldCenter, identified: false };
        } else {
          return {fieldCenter: ParticipantFactory.fromJson(self.participant).fieldCenter, identified: false };
        }
      }
    }


    self.updateMode = function () {
      self.identified = !self.identified;
      _setClear();
    }


  }
}());