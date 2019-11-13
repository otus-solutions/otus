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
      parent: STATE.PARTICIPANT_DASHBOARD,
      name: STATE.ACTIVITY_ADDER,
      url: '/' + STATE.ACTIVITY_ADDER,
      template: '<otus-activity-adder checkers="$resolve.listCheckers" layout="column" flex></otus-activity-adder>',
      onEnter: _onEnter,
      resolve:{
        listCheckers: _listCheckers,
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


    function _listCheckers(ActivityService, CheckerItemFactory, Application, SessionContextService) {
      return Application
          .isDeployed()
          .then(function() {
            try {
              return ActivityService.listActivityCheckers().map(CheckerItemFactory.create);
            } catch (e) {
              console.log(e);
            }
          });
    }

    _listCheckers.$inject = [
      'otusjs.activity.business.ParticipantActivityService',
      'otusjs.otus.uxComponent.CheckerItemFactory',
      'otusjs.application.core.ModuleService',
      'otusjs.application.session.core.ContextService'
    ];

  }
}());
