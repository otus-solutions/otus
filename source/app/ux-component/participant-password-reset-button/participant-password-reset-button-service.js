(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.participantPasswordResetButton.ParticipantPasswordResetButtonService', Service);

  function Service() {
    const self = this;

    self.sayHello = sayHello;

    function sayHello() {
      console.log('Hello!');
    }

  }
}());