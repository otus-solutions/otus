(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('activititySharingDialogShowController', Controller);

  function Controller(data) {
    var vm = this;
    var DEFAULT_DIMENSIONS = {'min-height':'200px', 'min-width':'300px'};

    vm.titleToDialog = data.dialogToTitle;
    vm.title =  data.titleToText;
    vm.text = data.textDialog;


  }
}());