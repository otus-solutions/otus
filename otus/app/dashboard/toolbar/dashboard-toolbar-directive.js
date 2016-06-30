(function() {
    'use strict';

    angular
        .module('otus.dashboard')
        .directive('otusToolbar', otusToolbar);

    function otusToolbar() {
        var ddo = {
            templateUrl: 'app/dashboard/toolbar/dashboard-toolbar.html',
            retrict: 'E',
            controller: 'OtusDashboardToolbar',
            controllerAs: 'dashboardToolbar'
        };

        return ddo;
    }

}());
