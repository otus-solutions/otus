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
          name: 'OPENED',
          label: 'Aberto',
          color: '#0091ea',
          icon: 'visibility'
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
        },
        {
          name: 'INITIALIZED_OFFLINE',
          label: 'Realizado em Papel',
          color: '#886430',
          icon: 'edit'
        },
        {
          name: 'INITIALIZED_ONLINE',
          label: 'Iniciado Online',
          color: '#513c1c',
          icon: 'edit'
        }
      ]
    });

}())
