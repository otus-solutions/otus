(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPendencyList', {
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
        creationDate: "17/02/2020",
        dueDate: "18/02/2020",
        requester: "supervisor@otus.com.br",
        receiver: "revisor@otus.com.br",
        acronym: "ELSA1",
        rn: 123567890,
        externalID : "XYZ789-ABC456",
        remainingDays: 1

      },

      {
        creationDate: "17/02/2020",
        dueDate: "27/02/2020",
        requester: "supervisor@otus.com.br",
        receiver: "revisor@otus.com.br",
        acronym: "ELSA2",
        rn: 9874563210,
        externalID : "XYZ789-ABC456",
        remainingDays: 10
      },

      {
        creationDate: "17/02/2020",
        dueDate: "03/03/2020",
        requester: "supervisor@otus.com.br",
        receiver: "revisor@otus.com.br",
        acronym: "ELSA3",
        rn: 4569871230,
        externalID : "XYZ789-ABC456",
        remainingDays: 15
      },


    ];

  }



}());

