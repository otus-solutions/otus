(function () {
  'use strict';

  angular
    .module('otusjs.monitoring.business')
    .service('otusjs.monitoring.business.ParticipantMonitoringService', Service);

  Service.$inject = [
    '$q',
    '$filter',
    'otusjs.monitoring.repository.MonitoringCollectionService'
  ];

  function Service($q, $filter, MonitoringCollectionService) {
    const CREATED = 'CREATED';
    const SAVED = 'SAVED';
    const FINALIZED = 'FINALIZED';
    const DOES_NOT_APPLY = 'DOES_NOT_APPLY';
    const UNDEFINED = 'UNDEFINED';
    const MULTIPLE = 'MULTIPLE';
    const AMBIGUITY = 'AMBIGUITY';

    var self = this;
    self.participantActivityStatusList = [];
    /* Public methods */
    self.buildActivityStatusList = buildActivityStatusList;
    self.getActivityStatusList = getActivityStatusList;
    self.buildActivityStatus = buildActivityStatus;
    self.defineActivityWithDoesNotApplies = defineActivityWithDoesNotApplies;
    self.deleteNotAppliesOfActivity = deleteNotAppliesOfActivity;

    function buildActivityStatusList(recruitmentNumber) {
      self.participantActivityStatusList = MonitoringCollectionService.getStatusOfActivities(recruitmentNumber);
    };

    function getActivityStatusList() {
      return _buildDataToView(self.participantActivityStatusList);
    }

    function buildActivityStatus(data) {
      if (data.doesNotApply) {
        if (data.activities.length == 0) {
          return {
            'acronym': data.acronym,
            'name': data.name,
            'status': DOES_NOT_APPLY,
            'observation': data.doesNotApply ? data.doesNotApply.observation : undefined
          };
        } else {
          return {
            'acronym': data.acronym,
            'name': data.name,
            'status': AMBIGUITY,
            'observation': data.doesNotApply ? data.doesNotApply.observation : undefined
          };
        }
      } else if (data.activities.length == 0) {
        return {
          'acronym': data.acronym,
          'name': data.name,
          'status': UNDEFINED
        };
      } else if (data.activities.length > 1) {
        var information = [];
        data.activities.filter(function (activity) {
          information.push({
            'status': _buildStatusToPTbr(activity.statusHistory.name),
            'date': $filter('date')(activity.statusHistory.date, 'dd/MM/yyyy')
          });
        });
        return {
          'acronym': data.acronym,
          'name': data.name,
          'status': MULTIPLE,
          'information': information
        };
      } else if (data.activities.length == 1) {
        switch (data.activities[0].statusHistory.name) {
          case CREATED:
            return {
              'acronym': data.acronym,
              'name': data.name,
              'status': CREATED,
              'date': $filter('date')(data.activities[0].statusHistory.date, 'dd/MM/yyyy')
            };
          case SAVED:
            return {
              'acronym': data.acronym,
              'name': data.name,
              'status': SAVED,
              'date': $filter('date')(data.activities[0].statusHistory.date, 'dd/MM/yyyy')
            };
          case FINALIZED:
            return {
              'acronym': data.acronym,
              'name': data.name,
              'status': FINALIZED,
              'date': $filter('date')(data.activities[0].statusHistory.date, 'dd/MM/yyyy')
            };
        }
      }
      return data;
    };

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
    };

    function deleteNotAppliesOfActivity(recruitmentNumber, oldActivity) {
      var defer = $q.defer();
      var data = {
        "recruitmentNumber": recruitmentNumber,
        "acronym": oldActivity.acronym
      };

      MonitoringCollectionService.deleteNotAppliesOfActivity(data).then(function (response) {
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

    function _buildDataToView(response) {
      if (!response)
        return;
      var data = [];
      response.forEach(function (activity) {
        data.push(buildActivityStatus(activity));
      });
      return data;
    };

    function _buildStatusToPTbr(status) {
      switch (status) {
        case CREATED:
          return 'Criado';
        case SAVED:
          return 'Salvo';
        case FINALIZED:
          return 'Finalizado';
      }
    };

  }
}());
