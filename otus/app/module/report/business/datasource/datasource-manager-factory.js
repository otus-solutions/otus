(function () {
  'use strict';

  angular
    .module("otusjs.report.business.datasource")
    .factory("otusjs.report.business.datasource.DatasourceManagerFactory", factory);


  function factory() {
    let self = this;

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

      return ds;
    }

    return self;
  }

  function ActivityDatasourceManager(datasource) {
    let self = this;



    let basicDatasourceSchema = Object.freeze({
      mode: undefined,
      statusHistory: undefined
    });


    onInit(datasource);

    self.objectType = "ActivityDatasource";

    self.getInterviewDate = getInterviewDate;
    self.getStatusByName = getStatusByName;
    self.getLastStatusByName = getLastStatusByName;
    self.getLastStatus = getLastStatus;

    function onInit(datasource) {
      Object.assign(self, basicDatasourceSchema, datasource);
    }

    function getInterviewDate() {
      return self.mode === "ONLINE" ? self.getLastStatusByName("FINALIZED").date : self.getStatusByName("INITIALIZED_OFFLINE").date;
    }

    function getStatusByName(name) {
      return self.statusHistory.find(function (status) {
        return status.name === name;
      });
    }

    function getLastStatusByName(name) {
      let statusList = self.statusHistory.filter(function (status) {
        return status.name === name;
      });

      return statusList[statusList.length - 1];
    }

    function getLastStatus() {
      return self.statusHistory[self.statusHistory.length - 1];
    }

  }


}());