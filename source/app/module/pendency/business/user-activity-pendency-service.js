(function(){
  'use strict';

  angular
    .module('otusjs.pendency.business')
    .service('otusjs.pendency.business.UserActivityPendencyService', Service);

  Service.$inject = [
    'otusjs.pendency.repository.UserActivityPendencyRepositoryService'
  ];

  function Service (UserActivityPendencyRepositoryService){
    const self = this;

    self.createUserActivityPendency = createUserActivityPendency;
    self.getPendencyByActivityId = getPendencyByActivityId;
    self.updateUserActivityPendency = updateUserActivityPendency;
    self.deleteUserActivityPendency = deleteUserActivityPendency;

    function createUserActivityPendency(userActivityPendency) {
      return UserActivityPendencyRepositoryService.createUserActivityPendency(userActivityPendency)
    }

    function getPendencyByActivityId(id) {
      return UserActivityPendencyRepositoryService.getPendencyByActivityId(id);
    }

    function updateUserActivityPendency(foundPendencyId, updatedPendency) {
      return UserActivityPendencyRepositoryService.updateUserActivityPendency(foundPendencyId, updatedPendency)
    }

    function deleteUserActivityPendency(foundPendencyId){
      return UserActivityPendencyRepositoryService.deleteUserActivityPendency(foundPendencyId);
    }
  }

}());