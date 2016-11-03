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
      template: '<otus-dashboard layout="column" flex></otus-dashboard>',
      resolve: {
        participantPreList: _participantPreList
      }
    };

    _participantPreList.$inject = [
      '$http',
      'otusjs.otus.participant.context.ParticipantContextService'
    ];

    function _participantPreList($http, ParticipantContextService) {
      $http.get('app/assets/static-resources/participants_dummy.json').success(function(data) {
        ParticipantContextService.setPreList(data);
      });
    }
  }
}());
