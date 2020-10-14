(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .component('expressActivityCreator', {
      controller: 'expressActivityCreatorCtrl as $ctrl',
      templateUrl: 'app/ux-component/shared/express-activity-creator/express-activity-creator-template.html',
      bindings: {
        acronym: '<',
        categories: '<',
        types: '<',
        participant: '<'
      }
    }).controller('expressActivityCreatorCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;

    /* Public methods */
    self.saveActivity = saveActivity;


    function saveActivity() {
      alert("call saveActivity")
    }
  }



}())