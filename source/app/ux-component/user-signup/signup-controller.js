(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusjs.otus.uxComponent.SignupController', Controller);

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService',
    'otusjs.user.access.service.SignupService',
    'otusjs.deploy.LoadingScreenService',
    '$mdToast',
    'THEME_CONSTANTS'
  ];

  function Controller(ApplicationStateService, SignupService, LoadingScreenService, $mdToast, THEME_CONSTANTS) {
    const INTERNAL_ERROR_MESSAGE = "Houve um erro ao realizar o cadastro. Informe a equipe de desenvolvimento";
    const self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.signup = signup;
    self.back = back;
    self.agree = agree;
    self.resetEmailValidation = resetEmailValidation;

    function onInit() {
      self.bannerURL = THEME_CONSTANTS.imageURLs.banner;
    }

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
      if (response.statusText === 'Conflict') {
        _showAlreadyExistError();
      } else {
        _showInternalError();
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
