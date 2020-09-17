(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDisplayToken', {
      controller: Controller,
      templateUrl: 'app/ux-component/display-token/display-token-template.html',
      transclude: true
    });

  Controller.$inject = [
    'otusjs.deploy.TokenRestService',
    '$mdToast'
  ];

  function Controller(TokenRestService, $mdToast) {
    var self = this;

    /* Public methods */

    self.copyToClipboard = copyToClipboard;
    self.getKey = getKey;
    self.key = false;
    self.token = null;
    self.$onInit = onInit;


    function onInit() {
      TokenRestService.initialize();
      TokenRestService.getExtractionToken().then(function(response) {
        self.token = response.data;
        self.key = _hasToken();
      });
    }

    function _hasToken() {
      return !!self.token;
    }

    function copyToClipboard() {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val(self.token).select();
      document.execCommand("copy");
      $temp.remove();
      showToast("Token copiado!", 3000);
    }

    function getKey() {
      self.key = true;
    }

    function showToast(msg, delay) {
      $mdToast.show(
        $mdToast.simple()
        .position("bottom right")
        .textContent(msg)
        .hideDelay(delay)
      );
    }
  }
}());
