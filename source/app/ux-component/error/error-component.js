(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusError', {
      controller: Controller,
      templateUrl: 'app/ux-component/error/error-template.html'
    });

  Controller.$inject = [
    'THEME_CONSTANTS'
  ];

  function Controller(THEME_CONSTANTS) {
    const self = this;
    self.$onInit = onInit;

    function onInit(){
      self.title = THEME_CONSTANTS.projectName;;
      self.imageURL = THEME_CONSTANTS.iconLogoURL;
    }

  }

})();
