(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.UserCommentAboutParticipantState', Provider);

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
      name: STATE.USER_COMMENT_ABOUT_PARTICIPANT,
      url: '/' + STATE.USER_COMMENT_ABOUT_PARTICIPANT,
      template: '<otus-user-comment-about-participant-list layout="column" flex></otus-user-comment-about-participant-list>',
      data: {
        redirect: _redirect
      },
      resolve: {
        loadStateData: _loadStateData
      }
    };

    function _redirect($q, Application, UserAccessPermissionService) {
      var deferred = $q.defer();
      UserAccessPermissionService.getCheckingParticipantPermission().then(permission => {
        Application
          .isDeployed()
          .then(function () {
            try {
              if (!permission.participantListAccess) {
                deferred.resolve(STATE.DASHBOARD);
                return;
              }
              deferred.resolve();
            } catch (e) {
              deferred.resolve(STATE.LOGIN);
            }
          });
      });

      return deferred.promise;
    }

    _redirect.$inject = [
      '$q',
      'otusjs.application.core.ModuleService',
      'otusjs.user.business.UserAccessPermissionService'
    ];

    function _loadStateData(ParticipantContextService, SessionContextService, Application) {
      Application
        .isDeployed()
        .then(function () {
          try {
            ParticipantContextService.restore();
            SessionContextService.restore();
          } catch (e) {
            console.log(e);
          }
        });
    }
    _loadStateData.$inject = [
      'otusjs.participant.core.ContextService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
