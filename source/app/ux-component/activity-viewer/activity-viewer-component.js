(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityViewer', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-viewer/activity-viewer-template.html'
    });

  Controller.$inject = [];

  function Controller() {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {

    }
  }
}());
