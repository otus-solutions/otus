(function () {
    'use strict';

    angular
        .module('otusjs.application.environment')
        .run(Run);

    Run.$inject = [
        '$window',
        'OtusRestResourceService',
        '$cookies'
    ];

    function Run(
        $window,
        OtusRestResourceService,
        $cookies) {
        // Configure Otus Rest Client to use the correct back-end server URL
        var __env = $window.__env;
        OtusRestResourceService.setUrl("http://localhost:51002/otus-rest/v01");

        // InstallerProxyService.ready(function(response) {
        //   ApplicationStateService.activateInstaller();
        // });
    }

}());
