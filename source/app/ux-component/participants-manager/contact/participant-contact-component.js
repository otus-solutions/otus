(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusParticipantContact', {
      controller: 'participantContactCtrl as $ctrl',
      templateUrl: 'app/ux-component/participants-manager/contact/participant-contact-template.html',
      bindings: {
        permissions: '='
      }
    }).controller('participantContactCtrl', Controller);

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
    'otusjs.participant.business.ParticipantMessagesService',
    'otusjs.otus.dashboard.service.DashboardService',
    '$scope',
    'otusjs.participantManager.contact.ParticipantContactService'
  ];

  function Controller(
    $element,
    ImmutableDate,
    mdcDateTimeDialog,
    ApplicationStateService,
    mdcDefaultParams,
    ParticipantFactory,
    ProjectFieldCenterService,
    dashboardContextService,
    ParticipantManagerService,
    ParticipantMessagesService,
    DashboardService,
    $scope,
    ParticipantContactService) {
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
    self.dashboardParticipant = dashboardParticipant;
    self.onFilter = onFilter;
    self.getParticipantContact = getParticipantContact;

    $scope.$watch('$ctrl.birthdate', function (newValue) {
      if (newValue) self.onFilter();
    });


    function onInit() {
      try {
        self.participant = ParticipantFactory.fromJson(JSON.parse(sessionStorage.getItem("participant_context")).selectedParticipant);
        self.isIdentified = self.participant.toJSON().identified;
        if (self.isIdentified) {
          self.birthdate = new Date(self.participant.birthdate.value)
        } else {
          self.birthdate = null;
        }
        if (!self.birthdate) self.participant.birthdate = {value: null};
        self.maxDate = new Date();
        self.centers = {};
        _loadAllCenters();
      } catch (e) {
        alert(66)
      }

    }

    self.$onDestroy = function () {
      delete self.participant;
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
              return center.acronym === userData.fieldCenter.acronym;
            });
            self.centerFilterselectedIndex = self.centers.indexOf(self.centerFilter) >= 0 ? self.centers.indexOf(self.centerFilter) : 0;
            self.centerFilterDisabled = userData.fieldCenter.acronym ? "disabled" : "";
            self.centerFilter = angular.copy(self.centerFilter.acronym);
          }
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
      self.validFields();
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
    }

    function _loadAllCenters() {
      self.centers = [];
      ProjectFieldCenterService.loadCenters().then(function (result) {
        self.centers = angular.copy(result);
        setUserFieldCenter();
      });
    }

    self.isValid = false;

    self.validFields = function () {
      if (!self.birthdate) self.participant.birthdate.value = null;
      if (self.participant.recruitmentNumber && self.participant.name && self.participant.sex && self.participant.birthdate.value && self.participant.fieldCenter) {
        self.isValid = true;
      } else {
        self.isValid = false;
      }
    };

    function _fieldsValidate() {
      var _valid = true;
      if (!self.participant) {
        self.participant = ParticipantFactory.fromJson(JSON.parse(sessionStorage.getItem("participant_context")));
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
        if (self.identified) {
          $element.find('#centerIdentifield').focus();
        } else {
          $element.find('#center').focus();
        }
        _valid = false;
      }

      return _valid;
    }


    function dashboardParticipant() {
      ApplicationStateService.activateParticipantDashboard();
    }

    function saveParticipant() {
      if (_fieldsValidate()) {
        ParticipantMessagesService.showUpdateDialog()
          .then(function () {
            self.onFilter();
            var _participant = ParticipantFactory.fromJson(self.participant);
            ParticipantManagerService.update(_participant)
              .then(function (response) {
                var p = ParticipantFactory.fromJson(response).toJSON();
                ParticipantManagerService.selectParticipant(p);
                ParticipantMessagesService.showUpdateParticipant(p).then(function () {
                  self.dashboardParticipant();
                })

              })
              .catch(function (err) {
                ParticipantMessagesService.showNotSave(err.data.MESSAGE || "");
              });

          });
      } else {
        ParticipantMessagesService.showToast("Favor, preencha todos os campos!");
      }
    }

    function getParticipantContact() {
      return ParticipantContactService.getParticipantContact();
    }
  }
}());

// if (ApplicationStateService.getCurrentState() == STATE.PENDENCY_VIEWER && item) {
