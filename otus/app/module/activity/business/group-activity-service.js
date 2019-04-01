(function () {
  'use strict';

  angular
    .module('otusjs.activity.business')
    .service('otusjs.activity.business.GroupActivityService', Service);

  Service.$inject = [
    'otusjs.activity.repository.SurveyRepositoryService',
    'otusjs.survey.GroupManagerFactory',
    '$q'
  ];

  function Service(SurveyRepositoryService, GroupManagerFactory, $q) {
    var self = this;

    /* Public methods */
     self.getSurveyGroupsByUser = getSurveyGroupsByUser;

    function getSurveyGroupsByUser() {
      var deferred = $q.defer();
      SurveyRepositoryService.getSurveyGroupsByUser().then(function (groupList) {
        deferred.resolve(GroupManagerFactory.create(groupList));
      }).catch(function (err) {
        deferred.reject(err);
      })

      return deferred.promise;
    }


  }
}());
