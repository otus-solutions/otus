(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.PaperActivityInitializerState', Provider);

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
      name: STATE.PAPER_ACTIVITY_INITIALIZER,
      url: '/' + STATE.PAPER_ACTIVITY_INITIALIZER,
      template: '<otus-paper-activity-initializer layout="column" flex></otus-paper-activity-initializer>',
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
