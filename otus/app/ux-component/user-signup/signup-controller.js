(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusjs.otus.uxComponent.SignupController', Controller);

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService',
    'otusjs.user.access.service.SignupService',
    'otusjs.deploy.LoadingScreenService',
    '$scope',
    '$mdToast'
  ];

  function Controller(ApplicationStateService, SignupService, LoadingScreenService, $scope, $mdToast) {
    var INTERNAL_ERROR_MESSAGE = "Houve um erro ao realizar o cadastro. Informe a equipe de desenvolvimento";
    var self = this;

    /* Public methods */
    self.signup = signup;
    self.back = back;
    self.agree = agree;
    self.resetEmailValidation = resetEmailValidation;

    function signup(user) {
      self.isWaiting = true;
      LoadingScreenService.start();

      SignupService
        .executeSignup(user)
        .then(function(response) {
          if (response.data) {
            ApplicationStateService.activateSignupResult();
          } else {
            _showErrorMessage(response);
          }
          self.isWaiting = false;
          LoadingScreenService.finish();
        });
    }

    function _showErrorMessage(response) {
      switch (response.STATUS) {
        case 'CONFLICT':
          _showAlreadyExistError();
          break;
        default:
          _showInternalError();
          break;
      }
    }

    function _showAlreadyExistError() {
      $scope.signupForm.email.$setValidity('emailInUse', false);
      self.isWaiting = false;
    }

    function _showInternalError() {
      $mdToast.show(
        $mdToast.simple()
        .textContent(INTERNAL_ERROR_MESSAGE)
      );
    }

    function resetEmailValidation() {
      $scope.signupForm.email.$setValidity('emailInUse', true);
      $scope.signupForm.$setValidity('emailInUse', true);
    }

    function back() {
      ApplicationStateService.activateLogin();
    }

    function agree() {
      ApplicationStateService.activateLogin();
    }
  }

}());
