(function() {
  'use strict';

  angular
    .module('otusjs.otus', [
      'otusjs.activity',
      'otusjs.participant',
      'otusjs.user',
      'otusjs.user.access',
      'otusjs.otus.installer',
      'otusjs.otus.laboratory',
      'otusjs.otus.report',
      'otusjs.otus.monitoring',
      'otusjs.otus.dashboard',
      'otusjs.otus.uxComponent',
      'otusjs.otus.pendency',
      'otusjs.otus.project.communication',
      'otusjs.application',
      'otusjs.deploy',
      'ngSanitize'
    ])
    .component('otusMainCtrl', {
      controller: "otusMainCtrl as $ctrl",
      templateUrl: 'app/index.html'
    })
    .controller("mainCtrl", Controller);


  Controller.$inject = [
    '$scope',
    'THEME_CONSTANTS'
  ];

  function Controller($scope, THEME_CONSTANTS) {
    const self = this;

    /* Public methods */
    self.$onInit = onInit;

    function onInit() {
      $scope.title = THEME_CONSTANTS.projectName;
      $scope.faviconURL = THEME_CONSTANTS.imageURLs.favicon;
    }

  }

}());
