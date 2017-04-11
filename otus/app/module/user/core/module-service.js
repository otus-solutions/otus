(function() {
  'use strict';

  angular
    .module('otusjs.user.core')
    .service('otusjs.user.core.ModuleService', Service);

  Service.$inject = [
    'otusjs.user.core.ContextService',
    'otusjs.user.core.EventService'
  ];

  function Service(ContextService, EventService) {
    var self = this;

    self.DataSource = {};
    self.Proxy = {};
    self.Service = {};

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.configureUserDataSource = configureUserDataSource;
    self.configureLoginProxy = configureLoginProxy;

    function configureContext(context) {
      ContextService.configureContext(context);
    }

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    }

    function configureUserDataSource(dataSource) {
      self.DataSource.User = dataSource;
    }

    function configureLoginProxy(proxy) {
      self.Proxy.LoginProxy = proxy;
      self.Proxy.LoginProxy.initialize();
    }
  }
}());
