(function() {
  'use strict';

  angular
    .module('otusjs.deploy', [
      'otus.client',
      'otus.domain.client',
      'otusjs',
      /* Player dependencies */
      'otusjs.player.core',
      'otusjs.player.component',
      /* LabelMaker dependencies */
      'otusjs.labelMaker.setupView',
      'otusjs.labelMaker.dataBuilder',
      'otusjs.labelMaker.labelBuilder',
      'otusjs.labelMaker.labelPage'
    ])
    .value('OtusLocalStorage', [
      'otusjs.activity.storage.ActivityLocalStorageService',
      'otusjs.laboratory.storage.ParticipantLaboratoryLocalStorageService',
      'otusjs.activity.storage.SurveyStorageService',
      'otusjs.participant.storage.ParticipantStorageService',
      'otusjs.user.storage.UserStorageService'
    ])
    .run(Runner);

  Runner.$inject = [
    '$injector',
    'otusjs.deploy.StorageLoaderService',
    'otusjs.deploy.OtusApiService',
    'otusjs.deploy.BootstrapService'
  ];

  function Runner($injector, StorageLoaderService, OtusApiService, BootstrapService) {
    OtusApiService.initializeOpenResources();
    _loadOtusDb(StorageLoaderService)
      .then(function() {
        BootstrapService.run();
        notifyModuleLoad($injector);
      });
  }

  function _loadOtusDb(StorageLoaderService) {
    var OTUS_DB = 'otus';

    StorageLoaderService.initializeSessionStorage();

    return StorageLoaderService.dbExists(OTUS_DB).then(function(dbExists) {
      if (dbExists) {
        return StorageLoaderService.loadIndexedStorage(OTUS_DB);
      } else {
        return StorageLoaderService.createIndexedStorage(OTUS_DB);
      }
    });
  }

  function notifyModuleLoad($injector) {
    var currentModule = angular.module('otusjs.deploy');
    var application = $injector.get('otusjs.application.core.ModuleService');
    application.notifyModuleLoad(currentModule.name);
    application.finalizeDeploy();
    console.info('Deploy module ready.');
  }
}());
