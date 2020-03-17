(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .value('ParticipantContactValues', {
      fields: {
        main: 'Principal',
        second: 'Segundo',
        third: 'Terceiro',
        fourth: 'Quarto',
        fifth: 'Quinto',
        comments: 'Observações'
      },
      keys: {
        email: {translatedTitle: 'Emails'},
        address:{translatedTitle: 'Endereços'},
        phoneNumber:{translatedTitle: 'Telefones'}
      },
      icons:{
        addContact:{
          icon:'add_circle_outline',
          translatedTitle: 'Adicionar Contato'
        },
        edit:{
          icon:'create',
          translatedTitle: 'Editar'
        }
      }
    });
}());