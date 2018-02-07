(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.ParticipantExamWidgetFactory', factory);


  factory.$inject = [
    '$q'
  ];

  function factory() {
    var self = this;

    self.name = 'Hemograma';
    self.isAvailable = null;
    self.hasBeenDelivered = false;
    self.requestList = [];
    self.statusColor = 'red';


    $q.all(self.requestList)
      .then(function (data) {
        self.isAvailable = true
      })
      .catch(function (data) {
        self.isAvailable = false;
      });
  }
}());