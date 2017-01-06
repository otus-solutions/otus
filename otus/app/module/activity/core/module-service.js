(function() {
  'use strict';

  angular
    .module('otusjs.activity.core')
    .service('otusjs.activity.core.ModuleService', Service);

  Service.$inject = [
    '$q',
    'otusjs.activity.core.ContextService',
    'otusjs.activity.core.EventService'
  ];

  function Service($q, ContextService, EventService) {
    var self = this;
    var _activityDataSourceDefer = $q.defer();
    var _surveyDataSourceDefer = $q.defer();
    var _activityFacadeServiceDefer = $q.defer();

    self.DataSource = {};
    self.Event = EventService;
    self.Model = {};

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.configureActivityDataSourceService = configureActivityDataSourceService;
    self.configureActivityFacadeService = configureActivityFacadeService;
    self.configureUserDataSourceService = configureUserDataSourceService;
    self.addModel = addModel;
    self.whenActivityDataSourceServiceReady = whenActivityDataSourceServiceReady;
    self.whenActivityFacadeServiceReady = whenActivityFacadeServiceReady;
    self.whenSurveyDataSourceServiceReady = whenSurveyDataSourceServiceReady;

    function configureContext(context) {
      ContextService.configureContext(context);
    }

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    }

    function configureActivityDataSourceService(dataSource) {
      self.DataSource.Activity = dataSource;
      _activityDataSourceDefer.resolve(self.DataSource.Activity.getActivityDataSet());
      _surveyDataSourceDefer.resolve(self.DataSource.Activity.getSurveyDataSet());
    }

    function configureActivityFacadeService(facade) {
      self.Model.ActivityFacadeService = facade;
      _activityFacadeServiceDefer.resolve(self.Model.ActivityFacadeService);
    }

    function configureUserDataSourceService(dataSource) {
      self.DataSource.User = dataSource;
    }

    function addModel(model) {
      self.Model[model.OBJECT_TYPE] = model;
    }

    function whenActivityDataSourceServiceReady() {
      if (self.DataSource.Activity) {
        _activityDataSourceDefer = $q.defer();
        _activityDataSourceDefer.resolve(self.DataSource.Activity.getActivityDataSet());
      }
      return _activityDataSourceDefer.promise;
    }

    function whenActivityFacadeServiceReady() {
      if (self.Model.ActivityFacadeService) {
        _activityFacadeServiceDefer = $q.defer();
        _activityFacadeServiceDefer.resolve(self.Model.ActivityFacadeService);
      }
      return _activityFacadeServiceDefer.promise;
    }

    function whenSurveyDataSourceServiceReady() {
      if (self.DataSource.Activity) {
        _surveyDataSourceDefer = $q.defer();
        _surveyDataSourceDefer.resolve(self.DataSource.Activity.getSurveyDataSet());
      }
      return _surveyDataSourceDefer.promise;
    }
  }
}());
