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

    self.name = _getStatusName(data);
    self.date = _getFormattedDate(data);
    self.user = data.user;
    self.user.name = data.user.name + ' ' + data.user.surname;

    function _getStatusName(status) {
      if ('CREATED' === status.name) {
        return 'Criado';
      }
      if ('OPENED' === status.name) {
        return 'Aberto';
      }
      if ('FINALIZED' === status.name) {
        return 'Finalizado';
      }
      if ('SAVED' === status.name) {
        return 'Salvo';
      }
      if ('INITIALIZED_OFFLINE' === status.name) {
        return 'Realizado em Papel';
      }
      if ('INITIALIZED_ONLINE' === status.name) {
        return 'Iniciado Online';
      }
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
