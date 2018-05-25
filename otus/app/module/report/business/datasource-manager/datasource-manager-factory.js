(function () {
  'use strict';

  angular
    .module("otusjs.report.business.datasourceManager")
    .factory("otusjs.report.business.datasourceManager.DatasourceManagerFactory", factory);


  function factory() {
    var self = this;

    self.manage = manage;

    function manage(ds) {
      switch (ds.dataSource) {
        case 'Activity':
          let managers = ds.result.map(function (item) {
            if (item) {
              return new ActivityDatasourceManager(item);
            }
            return null;
          });

          ds.result = managers;
          break;
      }
    }

    return self;
  }

  function ActivityDatasourceManager(item) {
    let self = this;

    self.mode = item.mode;
    self.statusHistory = item.statusHistory;


    self.getInterviewDate = getInterviewDate;
    self.getStatusByName = getStatusByName;
    self.getLastStatusByName = getLastStatusByName;


    function getInterviewDate() {
      let date;

      if (self.mode === "ONLINE") {
        let finalizeds = self.statusHistory.filter(function (status) {
          return status.name === 'FINALIZED';
        });
        date = finalizeds[finalizeds.length - 1].date;

      }

      if (self.mode === "PAPER") {
        let initializedOffline = self.statusHistory.find(function (status) {
          return status.name === 'INITIALIZED_OFFLINE';
        });

        date = initializedOffline.date;
      }

      return date;
    }

    function getStatusByName(name) {
      return self.statusHistory.find(function (status) {
        return status.name === name;
      });
    }

    function getLastStatusByName(name) {
      let statuses = self.statusHistory.filter(function (status) {
        return status.name === name;
      });

      return statuses[statuses.length - 1];
    }


  }


}());