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
    '$scope',
    'otusjs.participantManager.contact.ParticipantContactService',
    'ParticipantContactValues',
    'otusjs.participant.core.EventService'
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
    $scope,
    ParticipantContactService,
    ParticipantContactValues,
    EventService) {
    var self = this;

    mdcDefaultParams({
      lang: 'pt-br',
      cancelText: 'cancelar',
      todayText: 'hoje',
      okText: 'ok'
    });

    self.isValid = false;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.$onDestroy = onDestroy;

    /* Public methods */
    self.saveParticipant = saveParticipant;
    self.dashboardParticipant = dashboardParticipant;
    self.onFilter = onFilter;
    self.loadParticipantContact = loadParticipantContact;
    self.createParticipantContact = createParticipantContact;
    self.deleteParticipantContact = deleteParticipantContact;
    self.validFields = validFields;

    $scope.$watch('$ctrl.birthdate', function (newValue) {
      if (newValue) {
        self.onFilter();
      }
    });

    function onInit() {
      try {
        _loadSelectedParticipant();
        EventService.onParticipantSelected(_loadSelectedParticipant);
        self.ParticipantContactValues = ParticipantContactValues;

        if (self.isIdentified) {
          self.birthdate = new Date(self.participant.birthdate.value)
        } else {
          self.birthdate = null;
          self.participant.birthdate = { value: null };
        }
        self.minDate = new Date('01/01/1930')
        self.maxDate = new Date();
        self.centers = {};
        _loadAllCenters();
        console.info(self.permissions);
      } catch (e) {
        console.error(e);
      }
    }

    function onDestroy() {
      delete self.participant;
    }

    function _loadSelectedParticipant() {
      var participantData = JSON.parse(sessionStorage.getItem("participant_context")).selectedParticipant;
      if (participantData) {
        self.participant = ParticipantFactory.fromJson(participantData);
      } else {
        participantData = ParticipantManagerService.getSelectedParticipant();
        self.participant = ParticipantFactory.fromJson(participantData);
      }


      self.isEmpty = false;
      self.isIdentified = self.participant.toJSON().identified;
      loadParticipantContact();

      if (self.isIdentified) {
        delete self.birthdate;
        self.birthdate = new Date(angular.copy(self.participant.birthdate.value));
      } else {
        self.birthdate = null;
        self.participant.birthdate = { value: null };
      }

      self.ParticipantContactValues = ParticipantContactValues;
      self.minDate = new Date('01/01/1930')
      self.maxDate = new Date();
      delete self.centers;
      delete self.centerFilter;
      _loadAllCenters();

      if (self.loadParticipantData) {
        self.loadParticipantData(angular.copy(self.participant));
      }
    }

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

    function validFields() {
      if (!self.birthdate) {
        self.participant.birthdate.value = null;
      }
      self.isValid = !!(self.participant.recruitmentNumber && self.participant.name && self.participant.sex &&
        self.participant.birthdate.value && self.participant.fieldCenter);
    }

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
        ParticipantMessagesService.showToast(ParticipantContactValues.msg.contactFound);
      }
    }

    function loadParticipantContact() {
      ParticipantContactService.getParticipantContactByRecruitmentNumber(self.participant.recruitmentNumber)
        .then((data) => ParticipantContactService.participantContactFactoryJson(data))
        .then((resultFactory) => self.contact = resultFactory)
        .catch(() => self.contact = null);
    }

    function createParticipantContact() {
      let contact = ParticipantContactService.participantContactFactoryCreate({ recruitmentNumber: self.participant.recruitmentNumber });
      ParticipantContactService.createParticipantContact(contact)
        .then(() => loadParticipantContact())
        .then(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.contactFound))
        .catch(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.contactFail));
    }

    function deleteParticipantContact() {
      ParticipantContactService.showDeleteDialog()
        .then(() => {
          ParticipantContactService.deleteParticipantContact(self.contact._id)
            .then(() => loadParticipantContact())
            .then(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.contactDelete))
            .catch(() => ParticipantMessagesService.showToast(ParticipantContactValues.msg.contactFail))
        });
    }

  }
}());
