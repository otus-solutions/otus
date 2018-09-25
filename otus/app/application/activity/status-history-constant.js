(function() {
  'use strict';

  angular
    .module('otusjs.application.activity')
    .constant('ACTIVITY', {
      'STATUS': [
        {
          name: 'CREATED',
          label: 'Criado',
          color: '#595959',
          icon: 'fiber_new'
        },
        {
          name: 'FINALIZED',
          label: 'Finalizado',
          color: '#009688',
          icon: 'check_circle'
        },
        {
          name: 'SAVED',
          label: 'Salvo',
          color: '#ae8323',
          icon: 'save'
        }
      ]
    });

}())