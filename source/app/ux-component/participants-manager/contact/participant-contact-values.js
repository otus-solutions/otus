(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .value('ParticipantContactValues', {
      fields: {
        'main': 'Principal',
        'second': 'Segundo',
        'third': 'Terceiro',
        'fourth': 'Quarto',
        'fifth': 'Quinto',
        'contact': 'Contato'
      },
      keys: {
        'email': {},
        'address':{},
        'phone':{translatedTitle: "Telefones" }
      }

    });
}());