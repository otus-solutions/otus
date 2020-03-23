(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .service('otusjs.participantManager.contact.ParticipantContactService', Service);

  Service.$inject = [
    '$http',
    'otusjs.model.participantContact.ParticipantContactFactory',
    'otusjs.participant.business.ParticipantManagerService'
  ];

  function Service($http, ParticipantContactFactory, ParticipantManagerService) {
    const self = this;
    const MessageError = 'Model factory is not initialized.';
    let Mock = {};

    self.createParticipantContact = createParticipantContact;
    self.getParticipantContact = getParticipantContact;
    self.getParticipantContactByRecruitmentNumber = getParticipantContactByRecruitmentNumber;
    self.addNonMainEmail = addNonMainEmail;
    self.addNonMainAddress = addNonMainAddress;
    self.addNonMainPhoneNumber = addNonMainPhoneNumber;
    self.updateEmail = updateEmail;
    self.updateAddress = updateAddress;
    self.updatePhoneNumber = updatePhoneNumber;
    self.swapMainContact = swapMainContact;
    self.deleteParticipantContact = deleteParticipantContact;
    self.deleteNonMainContact = deleteNonMainContact;
    self.participantContactFactoryJson = participantContactFactoryJson;
    self.participantContactFactoryCreate = participantContactFactoryCreate;
    self.getAddressByCep = getAddressByCep;

    function createParticipantContact(participantContact) {
      return ParticipantManagerService.createParticipantContact(participantContact);
    }

    function getParticipantContact(id) {
      return ParticipantManagerService.getParticipantContact(id);
    }

    function getParticipantContactByRecruitmentNumber(recruitmentNumber) {
      return ParticipantManagerService.getParticipantContactByRecruitmentNumber(recruitmentNumber);
    }

    function addNonMainEmail(participantContact) {
      return ParticipantManagerService.addNonMainEmail(participantContact);
    }

    function addNonMainAddress(participantContact) {
      return ParticipantManagerService.addNonMainAddress(participantContact);
    }

    function addNonMainPhoneNumber(participantContact) {
      return ParticipantManagerService.addNonMainPhoneNumber(participantContact);
    }

    function updateEmail(participantContact) {
      return ParticipantManagerService.updateEmail(participantContact);
    }

    function updateAddress(participantContact) {
      return ParticipantManagerService.updateAddress(participantContact);
    }

    function updatePhoneNumber(participantContact) {
      return ParticipantManagerService.updatePhoneNumber(participantContact);
    }

    function swapMainContact(participantContact) {
      return ParticipantManagerService.swapMainContact(participantContact);
    }

    function deleteParticipantContact(id) {
      return ParticipantManagerService.deleteParticipantContact(id);
    }

    function deleteNonMainContact(participantContact) {
      return ParticipantManagerService.deleteNonMainContact(participantContact);
    }

    function participantContactFactoryCreate(participantContact) {
        try {
          return ParticipantContactFactory.create(participantContact)
        } catch (e) {
          throw new Error(MessageError);
        }
    }

    function participantContactFactoryJson(participantContact) {
        try {
          return ParticipantContactFactory.fromJson("", participantContact);
        } catch (e) {
          throw new Error(MessageError);
        }
    }

    function getAddressByCep(cep) {
      let formatedCep = cep.replace(/\D/g, '');
      let viaCepUrl = `https://viacep.com.br/ws/${formatedCep}/json/`;
      return $http.get(viaCepUrl);
    }


  //inicio  bloco Adonis
  //pra validar tenho que o getParticipantContactByRecruitmentNumber retorne o 404 e fazer um catch?
  //o catch tem q ser criado no controle para criar o modelo do model

  //fim bloco Adonis





  }
}());

//TODO: excluir modelo ao fim do OTUS-641

// Mock.participantContacts = {
//   _id: "5e74c4ac04978a757f79761c",
//   objectType: 'ParticipantContacts',
//   recruitmentNumber: 888,
//   email: {
//     main: {value: {content: 'owail@otussolutions.com'}, observation: 'Trabalho'},
//     second: {value: {content: 'medico@elsabrasil.com'}, observation: 'Hospital'},
//     third: null,
//     fourth: null,
//     fifth: null
//   },
//
//   address: {
//     main: {
//       value: {
//         postalCode: "90010-907",
//         street: 'Rua Um',
//         streetNumber: '2',
//         complements: 'Ap. 3',
//         neighbourhood: 'Bairro Quatro',
//         city: 'Cidade Cinco',
//         country: 'Sexto país'
//       },
//       observation: 'Ao lado do pórtico da cidade'
//     },
//     second: {
//       value:
//         {
//           postalCode: "90010-907",
//           street: 'Rua dos Bobos',
//           streetNumber: 0,
//           complements: 'Feita com muito esmero!',
//           neighbourhood: 'Centro',
//           city: 'Porto Alegre',
//           country: 'Brasil'
//         },
//       observation: 'Casa da vizinha da minha tia.'
//     },
//
//     third:{
//       value:{
//         postalCode: "H3500COA",
//         street: 'Avenida Las Heras',
//         streetNumber: 727,
//         complements: 'Facultad de Ingeniería, segundo piso.',
//         neighbourhood: 'Centro',
//         city: 'Resistencia',
//         country: 'Argentina',
//       },
//       observation: 'Universidad Nacional del Nordeste.'
//     },
//     fourth: null,
//     fifth: null
//   },
//
//   phoneNumber: {
//     main: {value:{content: '+55 011-1406'}, observation: 'fulano de tal'},
//     second: {value:{content: '0800-0000'}, observation: 'suport'},
//     third: {value:{content:'0800-1000'}, observation: 'teleMarketing'},
//     fourth: null,
//     fifth: null
//   },
// };