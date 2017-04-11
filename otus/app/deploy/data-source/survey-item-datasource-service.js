(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.SurveyItemDatasourceService', service);

  service.$inject = [
         '$q',
         'otusjs.utils.DatasourceService',
         'otusjs.deploy.SurveyItemRestService',
         'otusjs.activity.storage.ActivityLocalStorageService'
      ];

  function service($q, DatasourceService, SurveyItemRestService, ActivityLocalStorageService) {
    var self = this;

    /* Public Interface */
    self.up = up;
    self.setupDatasources = setupDatasources;


    function up() {
      var defer = $q.defer();
      SurveyItemRestService.initialize();
      defer.resolve(true);
      return defer.promise;
    }

    function setupDatasources(dsDefsArray) {
      var defer = $q.defer();
      getDatasources(dsDefsArray)
        .then(function(dsMap) {
          dsDefsArray.forEach(function(dsDef){
             dsMap[dsDef.getID()].bindedItems = dsDef.getBindedItems();
          });
          var getAddress = ActivityLocalStorageService.registerDatasource(dsMap);
          DatasourceService.provideDatasourcesAddress(getAddress);
          defer.resolve(true);
        });
      return defer.promise;
    }


    function getDatasources(dsDefsArray) {
      var defer = $q.defer();
      var dsMap = {};
      _getAll(dsDefsArray)
        .then(function(promiseArray) {
          promiseArray.forEach(function(promise) {
            dsMap[promise.data.id] = promise.data;
          });
          defer.resolve(dsMap);
        });
      return defer.promise;
    }

    function _getAll(dsDefsArray) {
      var dsArr = [];
      dsDefsArray.forEach(function(ds) {
        dsArr.push(getDatasourcesByID(ds.getID()));
      });
      return $q.all(dsArr);
    }

    function getDatasourcesByID(id) {
      return SurveyItemRestService.getByID(id);
    }
  }
}());
