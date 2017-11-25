(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ActivityCategoryState', Provider);

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
      parent: STATE.PARTICIPANT_DASHBOARD,
      name: STATE.ACTIVITY_CATEGORY_ADDER,
      url: '/' + STATE.ACTIVITY_CATEGORY_ADDER,
      template: '<otus-activity-category-adder layout="column" flex></otus-activity-category-adder>',
      resolve: {
        onEnter:_onEnter
      }

    };

    function _onEnter(ParticipantContextService, ActivityContextService, Application, SessionContextService) {
      Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.restore();
            ParticipantContextService.restore();
            ActivityContextService.restore();
          } catch (e) {
            ActivityContextService.begin();
          }
        });
    }


    _onEnter.$inject = [
      'otusjs.participant.core.ContextService',
      'otusjs.activity.core.ContextService',
      'otusjs.application.core.ModuleService',
      'otusjs.application.session.core.ContextService'
    ];

  }
}());
