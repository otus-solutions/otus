(function() {
  'use strict';

  angular
    .module('otusjs.user.access.service')
    .service('otusjs.user.access.service.LogoutService', Service);

  Service.$inject = [
    '$mdDialog',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.user.access.service.LogoutServiceService'
  ];

  function Service($mdDialog, DialogService, ApplicationStateService, LogoutService) {
    var self = this;
    var _confirmLogout;

    self.logout = logout;
    self.forceLogout = forceLogout;

    function logout() {
      _showModal();
    }

    function forceLogout(title, message) {
      _confirmLogout = {
        dialogToTitle:title,
        textDialog:message,
        ariaLabel:'Sair',
        buttons: [
          {
            message:'Ok',
            action:function() {
              LogoutService
                .logout()
                .then(function() {
                  $mdDialog.hide();
                  ApplicationStateService.activateLogin();
                });
            },
            class:'md-raised md-primary'
          }
        ]
      };

      DialogService.showDialog(_confirmLogout);

    }

    function _showModal() {
      _confirmLogout = {
        dialogToTitle:'Sair',
        textDialog:'Você tem certeza que deseja sair do sistema?',
        ariaLabel:'Sair',
        buttons: [
           {
            message:'Ok',
            action:function() {
              LogoutService
                .logout()
                .then(function() {
                  $mdDialog.hide();
                  ApplicationStateService.activateLogin();
                });
            },
            class:'md-raised md-primary'
          },
          {
            message:'Cancelar',
            action:function(){$mdDialog.hide()},
            class:'md-raised md-no-focus'
          },
        ]
      };

      DialogService.showDialog(_confirmLogout);
    }
  }

  // --------------------------------------------------------------------------

  angular
    .module('otusjs.user.access.service')
    .service('otusjs.user.access.service.LogoutServiceService', LogoutService);

  LogoutService.$inject = [
    'otusjs.deploy.user.AuthenticationRestService',
    'otusjs.user.access.core.EventService'
  ];

  function LogoutService(LogoutProxyService, EventService) {
    var self = this;

    /* Public methods */
    self.logout = logout;

    function logout() {
      return LogoutProxyService
        .invalidate()
        .then(function() {
          EventService.fireLogout();
        });
    }
  }
}());
