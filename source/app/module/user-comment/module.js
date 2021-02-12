(function() {
  'use strict';

  angular
    .module('otusjs.otus.user.comment', [
      'otusjs.user.comment.business',
      'otusjs.user.comment.core',
      'otusjs.user.comment.repository'
    ])
    .run(Runner);

  Runner.$inject = [
    'otusjs.user.comment.core.ContextService',
    'otusjs.user.comment.core.EventService'
  ];

  function Runner(ContextService, EventService) {
    EventService.onLogout(ContextService.end);
  }

}());
