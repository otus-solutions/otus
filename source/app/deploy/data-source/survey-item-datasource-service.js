(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.SurveyItemDatasourceService', service);

  service.$inject = [
    '$q',
    'otusjs.utils.DatasourceService',
    'otusjs.deploy.SurveyItemRestService'
  ];

  function service($q, DatasourceService, SurveyItemRestService) {
    var self = this;

    /* Public Interface */
    self.up = up;

    function up() {
      var defer = $q.defer();
      SurveyItemRestService.initialize();
      defer.resolve(true);
      return defer.promise;
    }

  }
}());
