(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ActivityAdderState', Provider);

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
      parent: STATE.DASHBOARD,
      name: STATE.ACTIVITY_ADDER,
      url: '/' + STATE.ACTIVITY_ADDER,
      template: '<otus-activity-adder layout="column" flex></otus-activity-adder>',
      onEnter: _onEnter
    };

    function _onEnter(ActivityContextService, Application) {
      Application
        .isDeployed()
        .then(function() {
          try {
            ActivityContextService.restore();
          } catch (e) {
            ActivityContextService.begin();
          }
        });
    }

    _onEnter.$inject = [
      'otusjs.activity.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
