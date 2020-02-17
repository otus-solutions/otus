(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('pendencyList', {
      controller: 'pendencyListCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list/pendency-list-template.html',
      bindings: {}
    }).controller('pendencyListCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;

    //TODO: (OTUS-645) service for get List of Pendencies
    self.pendencies = [
      {
        creationDate: new Date(),
        dueDate: new Date(),
        requester: ["fulano@detal"],
        receiver: ["detal@fulano"],
        acronym: "ABC",
        rn: 123567890,
        status : "FINALIZED"
      },

      {
        creationDate: new Date(),
        dueDate: new Date(),
        requester: ["fulano@detal"],
        receiver: ["detal@fulano"],
        acronym: "ABC",
        rn: 123567890,
        status : "FINALIZED"
      },

      {
        creationDate: new Date(),
        dueDate: new Date(),
        requester: ["fulano@detal"],
        receiver: ["detal@fulano"],
        acronym: "ABC",
        rn: 123567890,
        status : "FINALIZED"
      }
    ];

  }

}());