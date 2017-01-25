(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.ActivityStatusItemFactory', Factory);

  function Factory() {
    var self = this;

    /* Public methods */
    self.create = create;

    function create(data) {
      return new ActivityStatusItem(data);
    }

    return self;
  }

  function ActivityStatusItem(data) {
    var self = this;

    self.date = _getFormattedDate(data);
    self.user = data.user;
    self.user.name = data.user.name + ' ' + data.user.surname;
    self.status = _buildStatus(data);

    function _buildStatus(status) {
      var map = {
        CREATED: {
          label: 'Criado',
          color: '#595959',
          icon: 'fiber_new'
        },
        OPENED: {
          label: 'Aberto',
          color: '#0091ea',
          icon: 'visibility'
        },
        FINALIZED: {
          label: 'Finalizado',
          color: '#009688',
          icon: 'check_circle'
        },
        SAVED: {
          label: 'Salvo',
          color: '#ae8323',
          icon: 'save'
        },
        INITIALIZED_OFFLINE: {
          label: 'Realizado em Papel',
          color: '#886430',
          icon: 'edit'
        },
        INITIALIZED_ONLINE: {
          label: 'Iniciado Online',
          color: '#513c1c',
          icon: 'edit'
        }
      };

      return map[status.name];
    }

    function _getFormattedDate(status) {
      try {
        var formattedDate = new Date(status.date);
        return formattedDate.getDate() + '/' + (formattedDate.getMonth() + 1) + '/' + formattedDate.getFullYear();
      } catch (e) {
        return null;
      }
    }
  }
}());
