(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.MonitoringRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.list = list;
    self.find = find;
    self.listAcronyms = listAcronyms;
    self.listCenters = listCenters;
    self.getActivitiesProgressReport = getActivitiesProgressReport;
    self.getStatusOfSurveys = getStatusOfSurveys;
    self.defineSurveyWithDoesNotApply = defineSurveyWithDoesNotApply;

    function initialize() {
      _rest = OtusRestResourceService.getOtusMonitoringResource();
    }

    function list() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.list().$promise;
    }

    function find(acronym) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.find({ 'acronym': acronym }).$promise;
    }

    function listAcronyms() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.listAcronyms().$promise;
    }

    function listCenters() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.listCenters().$promise;
    }

    function getActivitiesProgressReport(center) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getActivitiesProgressReport(center).$promise;
    }

    function getStatusOfSurveys(recruitmentNumber) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.getStatusOfActivities({
        rn: recruitmentNumber
      }).$promise;
    }

    function defineSurveyWithDoesNotApply(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.defineSurveyWithDoesNotApply({}, data).$promise;
    }
  }
}());
