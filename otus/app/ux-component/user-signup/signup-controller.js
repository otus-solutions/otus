(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusjs.otus.uxComponent.SignupController', Controller);

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService',
    'otusjs.user.access.service.SignupService',
    'otusjs.deploy.LoadingScreenService',
    '$mdToast'
  ];

  function Controller(ApplicationStateService, SignupService, LoadingScreenService, $mdToast) {
    var INTERNAL_ERROR_MESSAGE = "Houve um erro ao realizar o cadastro. Informe a equipe de desenvolvimento";
    var self = this;

    /* Public methods */
    self.signup = signup;
    self.back = back;
    self.agree = agree;
    self.resetEmailValidation = resetEmailValidation;


    function signup(user) {
      // self.isWaiting = true;
      LoadingScreenService.start();

      SignupService
        .executeSignup(user)
        .then(function(response) {
          if (response.data) {
            LoadingScreenService.finish();
            ApplicationStateService.activateSignupResult();

          } else {LoadingScreenService.finish();
             _showErrorMessage(response);
             LoadingScreenService.finish();
          }
       }, function(err){
          LoadingScreenService.finish();
          _showErrorMessage(err);
       });
    }

    function _showErrorMessage(response) {
      switch (response.statusText) {
        case 'Conflict':
          _showAlreadyExistError();
          break;
        default:
          _showInternalError();
          break;
      }
    }

    function _showAlreadyExistError() {
      self.signupForm.email.$setValidity('emailInUse', false);
      self.isWaiting = false;
    }

    function _showInternalError() {
      $mdToast.show(
        $mdToast.simple()
        .textContent(INTERNAL_ERROR_MESSAGE)
      );
    }

    function resetEmailValidation() {
      self.signupForm.email.$setValidity('emailInUse', true);
      self.signupForm.$setValidity('emailInUse', true);
    }

    function back() {
      ApplicationStateService.activateLogin();
    }

    function agree() {
      ApplicationStateService.activateLogin();
    }
  }

}());
