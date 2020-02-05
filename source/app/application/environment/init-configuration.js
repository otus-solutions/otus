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
        OtusRestResourceService.setUrl($cookies.get('Backend-Address'));

        // InstallerProxyService.ready(function(response) {
        //   ApplicationStateService.activateInstaller();
        // });
    }

}());
