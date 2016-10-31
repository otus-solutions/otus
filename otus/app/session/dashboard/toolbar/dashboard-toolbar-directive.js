(function() {
    'use strict';

    angular
        .module('otusjs.otus.dashboard')
        .directive('otusToolbar', otusToolbar);

    function otusToolbar() {
        var ddo = {
            templateUrl: 'app/session/dashboard/toolbar/dashboard-toolbar.html',
            retrict: 'E',
            controller: 'OtusDashboardToolbar',
            controllerAs: 'dashboardToolbar'
        };

        return ddo;
    }

}());
