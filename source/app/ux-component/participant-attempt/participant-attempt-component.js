(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantAttempt', {
      controller: Controller,
      templateUrl: 'app/ux-component/participant-attempt/participant-attempt-template.html',
    });

  Controller.$inject = [
    '$mdToast',
    'otusjs.participant.repository.ParticipantContactAttemptService',
    'otusjs.participantManager.contact.ParticipantContactService',
    'otusjs.participant.core.EventService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.model.participant.ParticipantFactory',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller($mdToast,
                      AttemptService,
                      ParticipantContactService,
                      EventService,
                      ParticipantLaboratoryService,
                      ParticipantFactory,
                      DialogService) {
    var self = this;
    /*variables*/
    self.selectedAddress = {};
    self.selectedStatus = "";
    self.statusAddress = {};
    self.addresses = [];
    self.attemptAddresses = [];
    self.now = new Date();
    self.attemptDate = new Date();
    self.posLabels = ['main', 'second', 'third', 'fourth', 'fifth']
    self.translatedPos = {
      "main": () => "Principal",
      "second": () => "Segundo",
      "third": () => "Terceiro",
      "fourth": () => "Quarto",
      "fifth": () => "Quinto"
    }

    /*Methods*/
    self.$onInit = onInit;
    self.getAttempts = getAttempts;
    self.parseToDateWithTime = parseToDateWithTime;
    self.remove = remove;
    self.save = save;
    self.translatePosition = translatePosition;
    self.translateAddress = _addresObjToFullAddressString;

    function onInit() {
      _loadSelectedParticipant();
      EventService.onParticipantLoaded(_loadSelectedParticipant);
    }

    function save() {
      const attemptStructure = {
        objectType: 'address',
        recruitmentNumber: self.selectedParticipant.recruitmentNumber,
        address: { [self.selectedAddress.pos]: self.selectedAddress.address } ,
        attemptDateTime: self.attemptDate,
        attemptStatus: self.selectedStatus
      }
      if(_isLowerThanLimit()) {
        DialogService.showConfirmationDialog(
          'Confirmar',
          'Deseja salvar as alterações?',
          'Confirmação de finalização')
          .then(() => {
            AttemptService.create(attemptStructure)
              .then(res => {
                getAttempts();
                showToast('Registrado com sucesso!');
              })
              .catch(() => showToast('Ocorreu algum erro, tente novamente'))
          })
      } else {
        showToast('Limite de tentativas por endereço atingido');
      }
    }

    function remove(id) {
      DialogService.showConfirmationDialog(
        'Confirmar',
        'Deseja remover a tentativa selecionada?',
        'Confirmação de remoção')
        .then(res => {
          AttemptService
            .deleteContactAttempt(id.$oid)
            .then(() => {
              getAttempts();
              showToast('Tentativa de contato removida');
            })
            .catch(() => showToast('Ocorreu algum erro, tente novamente'))
        })
    }

    function _reverseAttemptList() {
      for(const attempt of self.attemptAddresses) {
        attempt.attemptList.reverse()
      }
    }

    function _getLastAttempts() {
      self.lastAttempts = [];
      var itemCount = 0;
      for(const [index, originalAttemptAddress] of self.attemptAddresses.entries()) {
        let attemptAddress = angular.copy(originalAttemptAddress);
        for(const attempt of attemptAddress.attemptList) {
          if(index > 0) {
            if(itemCount < self.addressConfiguration.numberOfAttempts) {
              itemCount = self.lastAttempts[index - 1].attemptList.length;
              if(itemCount < self.addressConfiguration.numberOfAttempts) {
                self.lastAttempts[index] =  {
                  address: attemptAddress.address,
                  attemptList: attemptAddress.attemptList.splice(0, (self.addressConfiguration.numberOfAttempts - itemCount)),
                  fullAddress: attemptAddress.fullAddress
                };
                itemCount += (self.addressConfiguration.numberOfAttempts - itemCount)
              }
            }
          } else {
            self.lastAttempts[index] = attemptAddress;
          }
        }
      }
    }

    function getAttempts() {
      AttemptService
        .findByRnByContactTypeByPosition(self.selectedParticipant.recruitmentNumber, 'address', self.selectedAddress.pos)
        .then(attempts => {
          self.attemptAddresses = attempts;
          _reverseAttemptList();
          _getLastAttempts();
        });
    }

    function _getAddresses(participant) {
      ParticipantContactService
        .getParticipantContactByRecruitmentNumber(participant.recruitmentNumber)
        .then(response => {
          self.posLabels.map(p => {
            var posExists = false
            self.addresses.map(addr => {
              if(addr.pos === p) posExists = true
            })
            if(!posExists && response.address[p] && response.address[p].value.street) self.addresses.push({
              address: response.address[p],
              pos: p
            })
          })
        })
    }

    function _getAddressStatusList() {
      AttemptService.findAttemptConfigurationByObjectType("AddressMetadata")
        .then(metadataObj => self.addressConfiguration = metadataObj);
    }

    function _loadSelectedParticipant(participant) {
      if (participant) {
        self.selectedParticipant = participant;
        self.attemptAddresses = [];
        self.addresses = [];
        self.statusAddress = "";
        self.addressConfiguration = "";
        _getAddresses(participant);
        _getAddressStatusList();
      } else {
        ParticipantLaboratoryService
          .getSelectedParticipant()
          .then(function (participant) {
            self.attemptAddresses = [];
            self.addresses = [];
            self.statusAddress = "";
            self.addressConfiguration = "";
            self.selectedParticipant = ParticipantFactory.fromJson(participant);
            _getAddresses(participant);
            _getAddressStatusList();
          });
      }
    }

    function _isLowerThanLimit() {
      const foundAttempt = self.attemptAddresses.find(attempt => {
        return attempt.fullAddress == _addresObjToFullAddressString(self.selectedAddress.address.value)
      })
      if(foundAttempt){
        return foundAttempt.attemptList.length < self.addressConfiguration.numberOfAttempts ? true : false;
      } else {
        return true;
      }
    }

    function _addresObjToFullAddressString(addressObj) {
      return `${addressObj.census ? addressObj.census : ''} - ${addressObj.street}, ${addressObj.streetNumber}${addressObj.complements ? ('/' + addressObj.complements) : ''} - ${addressObj.neighbourhood} - ${addressObj.postalCode} - ${addressObj.city}, ${addressObj.state}(${addressObj.country})`
    }

    function translatePosition(pos) {
      return self.translatedPos[pos]();
    }

    function parseToDateWithTime(dateString) {
      const toDate = new Date(dateString);
      const addZeros = (dateNum) => (dateNum > 0 && dateNum < 10) ? `0${dateNum}`: dateNum
      const localDate = `${addZeros(toDate.getDate())}/${addZeros(toDate.getMonth()+1)}/${toDate.getFullYear()}`;
      return localDate + " " +
        addZeros(toDate.getHours()) + ":" +
        addZeros(toDate.getMinutes()) + ':' +
        addZeros(toDate.getSeconds());
    }

    function showToast(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .position("right bottom")
          .hideDelay(3000)
      );
    }
  }
}());
