(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ActivityDataSourceService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.ActivityRestService',
    'otusjs.deploy.SurveyRestService',
    'otusjs.activity.storage.ActivityLocalStorageService',
    'otusjs.activity.storage.SurveyStorageService'
  ];

  function Service($q, ActivityRestService, SurveyRestService, ActivityStorageService, SurveyStorageService) {
    var self = this;
    var _loadingDefer = null;
    var _isSurveyDataReady = false;
    var _isActivityDataReady = false;

    /* Public methods */
    self.up = up;
    self.getActivityDataSet = getActivityDataSet;
    self.getSurveyDataSet = getSurveyDataSet;

    function up() {
      _loadingDefer = $q.defer();
      _initializeResources();
      _loadData();
      return _loadingDefer.promise;
    }

    function getActivityDataSet() {
      return {
        getData: function() {
          return ActivityStorageService.getCollection();
        },
        save: function() {
          ActivityStorageService.save();
          _synchronizeActivityData();
        }
      };
    }

    function getSurveyDataSet() {
      return {
        getData: function() {
          return SurveyStorageService.getCollection();
        },
        save: function() {
          SurveyStorageService.save();
        }
      };
    }

    function _initializeResources() {
      ActivityRestService.initialize();
      SurveyRestService.initialize();
    }

    function _loadData() {
      SurveyRestService
        .list()
        .then(function(response) {
          if (response.data && response.data.length) {
            SurveyStorageService.getCollection().clear();
            SurveyStorageService.getCollection().insert(response.data);
            SurveyStorageService.save();
          } else {
            console.log('Não foi possível atualizar o storage local.');
          }
          _isSurveyDataReady = true;
          if (_isSurveyDataReady && _isActivityDataReady) _loadingDefer.resolve();
        });

      ActivityRestService
        .list()
        .then(function(response) {
          if (response.data && response.data.length) {
            ActivityStorageService.getCollection().clear();
            ActivityStorageService.getCollection().insert(response.data);
            ActivityStorageService.save();
            console.log('Storage local de atividades atualizado com dados do servidor.');
          } else {
            console.log('Não foi possível atualizar o storage local.');
          }
          _isActivityDataReady = true;
          if (_isSurveyDataReady && _isActivityDataReady) _loadingDefer.resolve();
        });
    }

    function _synchronizeActivityData() {
      var localData = ActivityStorageService.getCollection().find();
      ActivityRestService
        .update(localData)
        .then(function(response) {
          console.log('Dados de atividade sincronizados.');
        })
        .catch(function(response) {
          console.log('Falha ao sincronizar dados de atividade.');
        });
    }
  }
}());
