xdescribe('otusjs.application.context', function() {

  var Mock = {};

  beforeEach(function() {
    defineServiceInjections();

    inject(function(SessionContextService, AccessContextService, ParticipantContextService, ActivityContextService) {
      Mock.SessionContextService = SessionContextService;
      Mock.AccessContextService = AccessContextService;
      Mock.ParticipantContextService = ParticipantContextService;
      Mock.ActivityContextService = ActivityContextService;
    });

  });

  it('should start logging service', function() {
    // console.log(Mock.SessionContextService);
  });

  function defineServiceInjections() {
    module('otusjs.application.context', function($provide, $injector) {
      var SessionContextService = $injector.get('otusjs.application.session.core.ContextService');
      var AccessContextService = $injector.get('otusjs.user.access.core.ContextService');
      var ParticipantContextService = $injector.get('otusjs.participant.core.ContextService');
      var ActivityContextService = $injector.get('otusjs.activity.core.ContextService');

      console.log(SessionContextService);

      $provide.value('SessionContextService', SessionContextService);
      $provide.value('AccessContextService', AccessContextService);
      $provide.value('ParticipantContextService', ParticipantContextService);
      $provide.value('ActivityContextService', ActivityContextService);
    });
  }

});
