(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('customizedDialogShowController',DialogController);

  function DialogController(data) {
    const self = this;
    self.cancel = data.cancel;
    self.data = data;
  }
}());