(function(){
  'use strict'

  angular
    .module('otusjs.pendency.business')
    .service('otusjs.pendency.business.UserActivityPendencyService', Service)

  Service.$inject = [
    'otusjs.pendency.repository.UserActivityPendencyRepositoryService'
  ];

  function Service (UserActivityPendencyCollectionService){
    const self = this;

    self.saveUserActivityPendency = saveUserActivityPendency;

    function saveUserActivityPendency(userActivityPendency) {
      return UserActivityPendencyCollectionService.saveUserActivityPendency(userActivityPendency)
    }
  }

}());