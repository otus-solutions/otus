(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ActivityDataSourceService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.ProjectConfigurationRestService',
    'otusjs.deploy.ActivityRestService',
    'otusjs.deploy.SurveyRestService',
    'otusjs.activity.storage.ActivityLocalStorageService',
    'otusjs.activity.storage.SurveyStorageService'
  ];

  function Service($q, ProjectConfigurationRestService, ActivityRestService, SurveyRestService, ActivityStorageService, SurveyStorageService) {
    var self = this;
    var _loadingDefer = null;
    var _isSurveyDataReady = false;
    var _isActivityDataReady = false;
    var _updatedActivity = null;

    /* Public methods */
    self.up = up;
    self.getSurveyDataSet = getSurveyDataSet;
    self.loadDataByParticipant = loadDataByParticipant;

    function up() {
      _loadingDefer = $q.defer();
      _loadData();
      return _loadingDefer.promise;
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

    function loadDataByParticipant(participant) {
      return ActivityRestService
        .list(participant.recruitmentNumber)
        .then(function(response) {
          if (response.data && response.data.length) {
            ActivityStorageService.loadData(response.data);
          } else {
            console.log('Não foi possível atualizar o storage local.');
          }
          _isActivityDataReady = true;
          if (_isSurveyDataReady && _isActivityDataReady) _loadingDefer.resolve();
        });
    }

    function _loadData() {
      ProjectConfigurationRestService
        .getSurveys()
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
    }

    function _sendUpdatedDataToServer() {
      ActivityRestService
        .update(ActivityStorageService.getCollection().by('_id', _updatedActivity._id));
    }

    function _sendInsertedDataToServer() {
      var localData = ActivityStorageService.getCollection().find();

      localData.forEach(function(activity) {
        if (!activity._id && !(activity.getID && activity.getID())) {
          ActivityRestService
            .save(activity)
            .then(function(response) {
              activity._id = response.data;
              ActivityStorageService.getCollection().update(activity);
              ActivityStorageService.save();
            });
        }
      });
    }
  }
}());
