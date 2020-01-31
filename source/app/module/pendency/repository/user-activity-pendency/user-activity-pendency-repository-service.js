(function () {
  'use strict';

  angular
    .module('otusjs.pendency.repository')
    .service('otusjs.pendency.repository.UserActivityPendencyRepositoryService', Service);

  Service.$inject = [
    'otusjs.pendency.repository.UserActivityPendencyCollectionService'
  ];

  function Service(UserActivityPendencyCollectionService) {
    const self = this;

    self.createUserActivityPendency = createUserActivityPendency;
    self.getPendencyByActivityId = getPendencyByActivityId;
    self.updateUserActivityPendency = updateUserActivityPendency;
    self.deleteUserActivityPendency = deleteUserActivityPendency;
    self.getAllUserActivityPendenciesToReceiver = getAllUserActivityPendenciesToReceiver;
    self.getOpenedUserActivityPendenciesToReceiver = getOpenedUserActivityPendenciesToReceiver;
    self.getDoneUserActivityPendenciesToReceiver = getDoneUserActivityPendenciesToReceiver;

    function createUserActivityPendency(userActivityPendency) {
      return UserActivityPendencyCollectionService.createUserActivityPendency(userActivityPendency);
    }

    function getPendencyByActivityId(id){
      return UserActivityPendencyCollectionService.getPendencyByActivityId(id);
    }

    function updateUserActivityPendency(foundPendencyId, updatedPendency) {
      return UserActivityPendencyCollectionService.updateUserActivityPendency(foundPendencyId, updatedPendency);
    }

    function deleteUserActivityPendency(foundPendencyId){
      return UserActivityPendencyCollectionService.deleteUserActivityPendency(foundPendencyId);
    }

    function getAllUserActivityPendenciesToReceiver(){
      return UserActivityPendencyCollectionService.getAllUserActivityPendenciesToReceiver();
    }

    function getOpenedUserActivityPendenciesToReceiver(){
      return UserActivityPendencyCollectionService.getOpenedUserActivityPendenciesToReceiver();
    }

    function getDoneUserActivityPendenciesToReceiver(){
      return UserActivityPendencyCollectionService.getDoneUserActivityPendenciesToReceiver();
    }

  }
}());



