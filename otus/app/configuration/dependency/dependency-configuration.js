(function() {
  'use strict';

  angular.module('otusjs.otus.configuration.dependency', [
    /* Angular modules */
    'ngMaterial',
    'ngMessages',
    'ngAnimate',
    /* 3rd-party modules */
    'ui.router',
    'ui.mask',
    'passwordControl',
    'lokijs',
    'indexedDB',
    /* Otus platform */
    'otus.client',
    'otus.domain.client'
  ]);

}());
