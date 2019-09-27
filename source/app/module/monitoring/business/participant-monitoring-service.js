(function () {
  'use strict';

  angular
    .module('otusjs.monitoring.business')
    .service('otusjs.monitoring.business.ParticipantMonitoringService', Service);

  Service.$inject = [
    '$q',
    'otusjs.monitoring.repository.MonitoringCollectionService',
    'otusjs.model.monitoring.HeatMapActivityFactory',
    'otusjs.model.monitoring.HeatMapExamFactory'
  ];

  function Service($q, MonitoringCollectionService, HeatMapActivityFactory, HeatMapExamFactory) {
    var self = this;
    self.participantActivityStatusList = [];
    self.participantExamStatusList = [];
    /* Public methods */
    self.buildActivityStatusList = buildActivityStatusList;
    self.buildActivityStatus = buildActivityStatus;
    self.defineActivityWithDoesNotApplies = defineActivityWithDoesNotApplies;
    self.deleteNotAppliesOfActivity = deleteNotAppliesOfActivity;
    self.defineExamWithDoesNotApplies = defineExamWithDoesNotApplies;
    self.buildExamStatusList = buildExamStatusList;
    self.buildExamStatus = buildExamStatus;
    self.deleteNotAppliesOfExam = deleteNotAppliesOfExam;

    function buildActivityStatusList(recruitmentNumber) {
      var defer = $q.defer();
      MonitoringCollectionService.getStatusOfActivities(recruitmentNumber).then(function (result) {
        self.participantActivityStatusList = result;
        defer.resolve(HeatMapActivityFactory.fromJsonObject(result));
      }).catch(function () {
        defer.reject();
      });
      return defer.promise;
    }

    function buildActivityStatus(activity) {
      return HeatMapActivityFactory.create(activity).toJSON();
    }

    function defineActivityWithDoesNotApplies(recruitmentNumber, observation, oldActivity) {
      var defer = $q.defer();
      var data = {
        "recruitmentNumber": recruitmentNumber,
        "acronym": oldActivity.acronym,
        "observation": observation
      };

      MonitoringCollectionService.defineActivityWithDoesNotApplies(data).then(function (response) {
        self.participantActivityStatusList.filter(function (activity) {
          if (activity.acronym === oldActivity.acronym) {
            activity.doesNotApply = {
              "recruitmentNumber": recruitmentNumber,
              "acronym": activity.acronym,
              "observation": observation
            };
            defer.resolve(activity);
          }
        });
      }).catch(function (e) {
        defer.reject(e);
      });

      return defer.promise;
    }

    function deleteNotAppliesOfActivity(recruitmentNumber, oldActivity) {
      var defer = $q.defer();

      MonitoringCollectionService.deleteNotAppliesOfActivity(recruitmentNumber, oldActivity.acronym).then(function (response) {
        self.participantActivityStatusList.filter(function (activity) {
          if (activity.acronym === oldActivity.acronym) {
            delete activity.doesNotApply;
            defer.resolve(activity);
          }
        });
      }).catch(function (e) {
        defer.reject(e);
      });

      return defer.promise;
    }

    function buildExamStatusList(recruitmentNumber) {
      var defer = $q.defer();
      MonitoringCollectionService.getStatusOfExams(recruitmentNumber).then(function (result) {
        self.participantExamStatusList = result.participantExams;
        defer.resolve(HeatMapExamFactory.fromJsonObject(result.participantExams));
      }).catch(function () {
        defer.reject();
      });
      return defer.promise;
    };

    function buildExamStatus(exam) {
      return HeatMapExamFactory.create(exam).toJSON();
    }

    function defineExamWithDoesNotApplies(recruitmentNumber, observation, oldExam) {
      var defer = $q.defer();
      var data = {
        "recruitmentNumber": recruitmentNumber,
        "name": oldExam.name,
        "observation": observation
      };

      MonitoringCollectionService.defineExamWithDoesNotApplies(data).then(function (response) {
        self.participantExamStatusList.filter(function (exam) {
          if (exam.name === oldExam.name) {
            exam.doesNotApply = {
              "recruitmentNumber": recruitmentNumber,
              "name": exam.name,
              "observation": observation
            };
            defer.resolve(exam);
          }
        });
      }).catch(function (e) {
        defer.reject(e);
      });
      return defer.promise;
    }

    function deleteNotAppliesOfExam(recruitmentNumber, oldExam) {
      var defer = $q.defer();
      var data = {
        "recruitmentNumber": recruitmentNumber,
        "name": oldExam.name
      };

      MonitoringCollectionService.deleteNotAppliesOfExam(data).then(function (response) {
        self.participantExamStatusList.filter(function (exam) {
          if (exam.name === oldExam.name) {
            delete exam.doesNotApply;
            defer.resolve(exam);
          }
        });
      }).catch(function (e) {
        defer.reject(e);
      });
      return defer.promise;
    }
  }
}());
