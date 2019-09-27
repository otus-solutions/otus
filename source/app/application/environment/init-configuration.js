(function() {
  'use strict';

  angular
    .module('otusjs.application.environment')
    .run(Run);

  Run.$inject = [
    '$window',
    'OtusRestResourceService'
  ];

  function Run(
    $window,
    OtusRestResourceService,
    InstallerProxyService)
  {
    // Configure Otus Rest Client to use the correct back-end server URL
    var __env = $window.__env;
    OtusRestResourceService.setUrl(__env.apiUrl);

    // InstallerProxyService.ready(function(response) {
    //   ApplicationStateService.activateInstaller();
    // });
  }

}());
