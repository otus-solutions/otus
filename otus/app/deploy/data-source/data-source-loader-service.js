(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.DataSourceLoaderService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.ActivityDataSourceService',
    'otusjs.deploy.ParticipantDataSourceService',
    'otusjs.deploy.UserDataSourceService',
    'otusjs.deploy.SurveyItemDatasourceService'
  ];

  function Service($q, ActivityDataSourceService, ParticipantDataSourceService, UserDataSourceService, SurveyItemDatasourceService) {
    var self = this;
    var _deferred = $q.defer();
    var _dsLoaded = 0;
    var _dsToLoad = Service.$inject.length - 1;

    /* Public methods */
    self.initializeDataSources = initializeDataSources;

    function initializeDataSources() {
      ActivityDataSourceService.up().then(_checkDataSourceInitialization);
      ParticipantDataSourceService.up().then(_checkDataSourceInitialization);
      UserDataSourceService.up().then(_checkDataSourceInitialization);
      SurveyItemDatasourceService.up().then(_checkDataSourceInitialization);
      return _deferred.promise;
    }

    function _tryResolve() {
      if (_dsLoaded === _dsToLoad) {
        _deferred.resolve();
      }
    }

    function _checkDataSourceInitialization() {
      ++_dsLoaded;
      _tryResolve();
    }
  }
}());
