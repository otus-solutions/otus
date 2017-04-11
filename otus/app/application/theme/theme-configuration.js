(function() {
  'use strict';

  angular
    .module('otusjs.application.theme')
    .config(Configuration);

  Configuration.$inject = [
    '$mdThemingProvider',
    '$mdIconProvider'
  ];

  function Configuration($mdThemingProvider, $mdIconProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal', {
        'default': '700',
        'hue-1': '500',
        'hue-2': '600',
        'hue-3': '800'
      })
      .accentPalette('light-blue', {
        'default': 'A700',
        'hue-2': 'A100',
        'hue-3': 'A400'
      })
      .warnPalette('red', {
        'default': 'A200',
        'hue-2': 'A100',
        'hue-3': 'A400'
      })
      .backgroundPalette('grey');

    /*Configuration icons*/
    /* 24 is the size default of icons */
    $mdIconProvider.defaultIconSet('app/static-resource/image/icons/mdi.svg', 24);
  }
}());
