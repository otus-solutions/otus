(function () {
  'use strict'

  angular
    .module('otusjs.pendency.repository')
    .service('otusjs.pendency.repository.UserActivityPendencyRepositoryService', Service);

  Service.$inject = [
    'otusjs.pendency.repository.UserActivityPendencyCollectionService'
  ];

  function Service(UserActivityPendencyCollectionService) {
    const self = this

    self.saveUserActivityPendency = saveUserActivityPendency;
    self.getPendencyByActivityId = getPendencyByActivityId;

    function saveUserActivityPendency(userActivityPendency) {
      return UserActivityPendencyCollectionService.saveUserActivityPendency(userActivityPendency);
    }

    function getPendencyByActivityId(id){
      return UserActivityPendencyCollectionService.getPendencyByActivityId(id);
    }

  }
}());



