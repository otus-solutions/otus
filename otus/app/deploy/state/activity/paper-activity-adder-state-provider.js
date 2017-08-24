(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.PaperActivityAdderState', Provider);

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
      name: STATE.PAPER_ACTIVITY_ADDER,
      url: '/' + STATE.PAPER_ACTIVITY_ADDER,
      template: '<otus-paper-activity-adder layout="column" flex></otus-paper-activity-adder>',
      onEnter: _onEnter,
      resolve:{
        loadStateData: _loadStateData
      }
    };

    function _onEnter(ParticipantContextService, ActivityContextService, Application, SessionContextService) {
      Application
        .isDeployed()
        .then(function() {
          try {
            ActivityContextService.restore();
            ParticipantContextService.restore();
            SessionContextService.restore();
            ActivityContextService.restore();
          } catch (e) {
            ActivityContextService.begin();
          }
        });
    }

    function _loadStateData(Application, SessionContextService) {
      Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.restore();
          } catch (e) {
            console.log(e);
          }
        });
    }

    _loadStateData.$inject = [
      'otusjs.application.core.ModuleService',
      'otusjs.application.session.core.ContextService'
    ];

    _onEnter.$inject = [
      'otusjs.participant.core.ContextService',
      'otusjs.activity.core.ContextService',
      'otusjs.application.core.ModuleService',
      'otusjs.application.session.core.ContextService'
    ];
  }
}());
