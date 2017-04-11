(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.InstallerState', Provider);

  Provider.$inject = [
    'STATE'
  ];

  function Provider(STATE) {
    var self = this;

    self.$get = [provider];

    function provider() {
      return self;
    }

    self.state = {
      name: STATE.INSTALLER,
      url: '/' + STATE.INSTALLER,
      templateUrl: 'app/ux-component/installer/initial-config.html',
      controller: 'otusjs.otus.uxComponent.InitialConfigController as controller',
      data: {
        redirect: _redirect
      }
    };

    function _redirect($q, InstallerRestService) {
      var deferred = $q.defer();

      InstallerRestService.ready(function(response) {
        if (!response.data) {
          deferred.resolve();
        } else {
          deferred.resolve(STATE.LOGIN);
        }
      });

      return deferred.promise;
    }

    _redirect.$inject = [
      '$q',
      'otusjs.deploy.InstallerRestService'
    ];
  }
}());
