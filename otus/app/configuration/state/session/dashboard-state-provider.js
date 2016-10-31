(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.state')
    .provider('otusjs.otus.configuration.state.DashboardState', Provider);

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
      parent: STATE.SESSION,
      name: STATE.DASHBOARD,
      url: '/' + STATE.DASHBOARD,
      templateUrl: 'app/session/dashboard/home/main-home-content-template.html',
      views: {
        'session-wrap': {
          templateUrl: 'app/session/dashboard/home/main-home-content-template.html'
        },
        'dashboard-menu@dashboard': {
          templateUrl: 'app/session/dashboard/menu/dashboard-menu.html',
          controller: 'OtusDashboardMenu as dashboardMenu'
        }
      }
    };
  }
}());
