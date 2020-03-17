(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .service('otusjs.participantManager.contact.ParticipantContactService', Service);

  Service.$inject = [
    'otusjs.model.participantContact.ParticipantContactFactory'
  ];


  function Service(ParticipantContactFactory) {
    const self = this;
    let Mock = {};

    self.getParticipantContact = getParticipantContact;


    function getParticipantContact(recruitmentNumber) {
      /*Tratar uma promisse solicitado do repository
      solicitando a factory do model
      */
      return ParticipantContactFactory.fromJson("", Mock.participantContacts);
      // return Mock.participantContacts;
    }

    Mock.participantContacts = {
      _id: "5e6a45dd2273ad0a40d4050b",
      objectType: 'ParticipantContacts',
      recruitmentNumber: 1234567,
      email: {
        main: {value: {content: 'owail@otussolutions.com'}, observation: 'Trabalho'},
        second: {value: {content: 'medico@elsabrasil.com'}, observation: 'Hospital'},
        third: null,
        fourth: null,
        fifth: null
      },

      address: {
        main: {
          value: {
            postalCode: "90010-907",
            street: 'Rua Um',
            streetNumber: '2',
            complements: 'Ap. 3',
            neighbourhood: 'Bairro Quatro',
            city: 'Cidade Cinco',
            country: 'Sexto país',
          },
          observation: 'Ao lado do pórtico da cidade'
        },
        second: {
          value:
            {
              postalCode: "90010-907",
              street: 'Rua dos Bobos',
              streetNumber: 0,
              complements: 'Feita com muito esmero!',
              neighbourhood: 'Centro',
              city: 'Porto Alegre',
              country: 'Brasil'
            },
          observation: 'Casa da vizinha da minha tia.'
        },

        third:{
          value:{
            postalCode: "H3500COA",
            street: 'Avenida Las Heras',
            streetNumber: 727,
            complements: 'Facultad de Ingeniería, segundo piso.',
            neighbourhood: 'Centro',
            city: 'Resistencia',
            country: 'Argentina',
          },
          observation: 'Universidad Nacional del Nordeste.'
        },
        fourth: null,
        fifth: null
      },

      phoneNumber: {
        main: {value:{content: '+55 011-1406'}, observation: 'fulano de tal'},
        second: {value:{content: '0800-0000'}, observation: 'suport'},
        third: {value:{content:'0800-1000'}, observation: 'teleMarketing'},
        fourth: null,
        fifth: null
      },
    };
  }


}());