(function () {
  'use strict'

  angular
    .module('otusjs.pendency.repository')
    .service('otusjs.pendency.repository.UserActivityPendencyRepositoryService', Service);

  Service.$inject = [];

  function Service() {
    const self = this

    self.saveUserActivityPendency = saveUserActivityPendency;

    function saveUserActivityPendency(userActivityPendency) {
      return userActivityPendency;
      }

  }
}());



