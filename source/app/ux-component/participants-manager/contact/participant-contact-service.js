(function(){
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .service('otusjs.participantManager.contact.ParticipantContactService', Service);

  Service.$inject = [];


  function Service() {
    const self = this;
    let Mock = {};


    self.getParticipantContact = getParticipantContact;


    function getParticipantContact(RecruitNumber) {
      /*Tratar uma promisse solicitado do repository
      solicitando a factory do model
      */
      console.log(Mock.participantContacts);
      return Mock.participantContacts;
    }


    Mock.participantContacts = {
      _id: "5e6a45dd2273ad0a40d4050b",
      objectType: 'ParticipantContacts',
      phoneNumbers: {
        main: {
          number: '+55 011-1406',
          contact: 'fulano de tal'
        },
        second: {
          number: '0800-0000',
          contact: 'suport'
        },
        third: {
          number: '0800-1000',
          contact: 'teleMarketing'
        },
        fourth: null,
        fifth: null
      },
      emails: {
        main: 'new_1_@mail.com',
        second: 'new_2_@mail.com',
        third: null,
        fourth: null,
        fifth: null
      },
      address: {
        main: {
          postalCode: "90010-907",
          street: 'Rua Um',
          streetNumber: '2',
          complements: 'Ap. 3',
          neighbourhood: 'Bairro Quatro',
          city: 'Cidade Cinco',
          country: 'Sexto país',
          observations: 'Ao lado do pórtico da cidade'
        },
        second:
          {
            postalCode: "90010-907",
            street: 'Rua dos Bobos',
            streetNumber: 0,
            complements: 'Feita com muito esmero!',
            neighbourhood: 'Centro',
            city: 'Porto Alegre',
            country: 'Brasil',
            observations: 'Casa da vizinha da minha tia.'
          },

        third: {
          postalCode: "H3500COA",
          street: 'Avenida Las Heras',
          streetNumber: 727,
          complements: 'Facultad de Ingeniería, segundo piso.',
          neighbourhood: 'Centro',
          city: 'Resistencia',
          country: 'Argentina',
          observations: 'Universidad Nacional del Nordeste.'
        },
        fourth: null,
        fifth: null
      }
    };
  }


}());