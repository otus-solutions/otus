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
      parent: STATE.PARTICIPANT_DASHBOARD,
      name: STATE.PAPER_ACTIVITY_INITIALIZER,
      url: '/' + STATE.PAPER_ACTIVITY_INITIALIZER,
      template: '<otus-paper-activity-initializer checkers="$resolve.listCheckers" layout="column" flex></otus-paper-activity-initializer>',
      onEnter: _onEnter,
      resolve:{
        listCheckers: _listCheckers
      }

    };

    function _onEnter(ParticipantContextService, ActivityContextService, Application) {
      Application
        .isDeployed()
        .then(function() {
          try {
            ParticipantContextService.restore();
            ActivityContextService.restore();
          } catch (e) {
            ActivityContextService.begin();
          }
        });
    }

    function _listCheckers(ActivityService, CheckerItemFactory, Application) {
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
      'otusjs.application.core.ModuleService'
    ]

    _onEnter.$inject = [
      'otusjs.participant.core.ContextService',
      'otusjs.activity.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
