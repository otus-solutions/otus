(function (){
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.UserActivityPendencyRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService){
    const UNINITIALIZED_REST_ERROR_MESSAGE = 'REST resource is not initialized.';
    const self = this;
    let _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.createUserActivityPendency = createUserActivityPendency;
    self.getPendencyByActivityId = getPendencyByActivityId;
    self.updateUserActivityPendency = updateUserActivityPendency;
    self.deleteUserActivityPendency = deleteUserActivityPendency;
    self.getAllUserActivityPendenciesToReceiver = getAllUserActivityPendenciesToReceiver;
    self.getOpenedUserActivityPendenciesToReceiver = getOpenedUserActivityPendenciesToReceiver;
    self.getDoneUserActivityPendenciesToReceiver = getDoneUserActivityPendenciesToReceiver;
    self.getAllPendencies = getAllPendencies;

    function initialize() {
      _rest = OtusRestResourceService.getUserActivityPendencyResource();
    }

    function createUserActivityPendency (jsonPendency){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.create(jsonPendency).$promise;
    }

    function getPendencyByActivityId(id) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getByActivityId({activityId: id}).$promise;
    }

    function updateUserActivityPendency(foundPendencyId, jsonUpdatedPendency){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.update({id: foundPendencyId}, jsonUpdatedPendency).$promise;
    }

    function deleteUserActivityPendency(foundPendencyId){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.delete({id: foundPendencyId}).$promise;
    }

    function getAllUserActivityPendenciesToReceiver(){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getAllPendenciesToReceiver().$promise;
    }

    function getOpenedUserActivityPendenciesToReceiver(){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getOpenedPendenciesToReceiver().$promise;
    }

    function getDoneUserActivityPendenciesToReceiver(){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getDonePendenciesToReceiver().$promise;
    }

    function getAllPendencies(searchSettings) {
      console.log(searchSettings);
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getAllPendencies(searchSettings).$promise;
    }

  }

}());