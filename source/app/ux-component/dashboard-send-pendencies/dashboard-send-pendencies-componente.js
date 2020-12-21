(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardSendPendencies', {
      templateUrl: 'app/ux-component/dashboard-send-pendencies/dashboard-send-pendencies-template.html',
      controller: Controller,
    }).controller('otusDashboardSendPendenciesCtrl', Controller);

  Controller.$inject = [
    'otusjs.application.session.core.ContextService',
    '$cookies',
    '$window'
  ]

  function Controller(ContextUserService, $cookies, $window) {
    var self = this;
    self.$onInit = onInit;
    self.pendentActivities = []
    self.showPendenciesList = showPendenciesList

    function onInit() {
        cookie
          .get('pendent-activities')
          .then(ck => self.pendentActivities = self.pendentActivities.concat(JSON.parse(decodeURIComponent(ck))))
    }

    function showPendenciesList() {
      $window.location.href = _getUrlPlayerHome();
    }

    function _getUrlPlayerHome() {
      var callback = angular.copy($window.location.href) || "";
      callback = callback.replace("#","HASHTAG");
      var url = $cookies.get('Player-Address');
      var token = ContextUserService.getToken();
      if (!url) return $window.location.href;
      if (_isValidUrl(url)){
        return url.concat("#/pendent").concat('?callback=').concat(callback).concat('&').concat('token=').concat(token);
      }
      return url.concat("#/pendent").concat('?callback=').concat(callback).concat('&').concat('token=').concat(token);
    }

    function _isValidUrl(url) {
      const regex = new RegExp(/\/$/g);
      return regex.test(url);
    }
  }

})();