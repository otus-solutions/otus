(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .constant('ACTIVITY_MANAGER_LABELS', {
      ACTIVITY_ATTRIBUTES: {
        MODE: {
          ONLINE: {
            name: 'ONLINE',
            label: 'Online',
            icon: 'signal_cellular_alt'
          },
          AUTOFILL: {
            name: 'AUTOFILL',
            label: 'Auto Preenchimento',
            icon: 'home_work'
          },
          PAPER: {
            name: 'PAPER',
            label: 'Em papel',
            icon: 'description'
          },
          OFFLINE: {
            name: 'OFFLINE',
          }
        },
        STATUS: {
          CREATED: {
            name: 'CREATED',
            label: 'Criado',
            color: '#595959',
            icon: 'fiber_new'
          },
          OPENED: {
            name: 'OPENED',
            label: 'Aberto',
            color: '#0091ea',
            icon: 'visibility'
          },
          FINALIZED: {
            name: 'FINALIZED',
            label: 'Finalizado',
            color: '#009688',
            icon: 'check_circle'
          },
          SAVED: {
            name: 'SAVED',
            label: 'Salvo',
            color: '#ae8323',
            icon: 'save'
          },
          INITIALIZED_OFFLINE: {
            name: 'INITIALIZED_OFFLINE',
            label: 'Realizado em Papel',
            color: '#886430',
            icon: 'description'
          },
          INITIALIZED_ONLINE: {
            name: 'INITIALIZED_ONLINE',
            label: 'Iniciado Online',
            color: '#513c1c',
            icon: 'edit'
          },
          REOPENED: {
            name: 'REOPENED',
            label: 'Reaberto',
            color: '#595959',
            icon: 'cached'
          }
        }
      },
      ATTRIBUTES_MESSAGE: {
        SCENE: {
          DIALOG: {
            confirmDelete: {
              dialogToTitle: 'Confirmar exclusão de atividade:',
              titleToText: 'A atividade será excluida.',
              textDialog: 'Confirmação de exclusão',
              ariaLabel: 'Confirmação de exclusão',
              button: { confirm: 'Ok', cancel: 'Voltar' }
            }
          },
          TOAST: {
            ERROR: {
              errorFind: 'Erro na busca das atividades'
            },
            SUCCESS: {
              delete: "Removido com sucesso!"
            },
          }
        }
      }
    });
}());
