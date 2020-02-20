(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.pendencyViewer.PendencyViewerService', Service);

  Service.$inject = [
    'otusjs.pendency.repository.UserActivityPendencyRepositoryService',
    'otusjs.model.pendency.UserActivityPendencyFactory'
  ];

  function Service(UserActivityPendencyRepositoryService, UserActivityPendencyFactory) {
    const self = this;
    self.getAllPendencies = getAllPendencies;

    function getAllPendencies(searchSettings) {
      return UserActivityPendencyRepositoryService.getAllPendencies(searchSettings)
        .then(data => parsePendencies(data))
        .catch(err => console.log("error:" + err))
    }

    function parsePendencies(pendencyJsonArray){
      let parsedPendencies = [];
      pendencyJsonArray.forEach( item => {
        parsedPendencies.push(UserActivityPendencyFactory.fromJsonObject(item));
      });
      return parsedPendencies;
    }

    // function getPendencies(selectedFilters) {
    //   console.log("service")
    //   const pendencies = [
    //     {
    //       creationDate: "17/02/2020",
    //       dueDate: "18/02/2020",
    //       requester: "supervisor@otus.com.br",
    //       receiver: "revisor@otus.com.br",
    //       acronym: "ELSA1",
    //       rn: 123567890,
    //       externalID : "XYZ789-ABC456",
    //       remainingDays: 1
    //
    //     },
    //
    //     {
    //       creationDate: "17/02/2020",
    //       dueDate: "27/02/2020",
    //       requester: "supervisor@otus.com.br",
    //       receiver: "revisor@otus.com.br",
    //       acronym: "ELSA2",
    //       rn: 9874563210,
    //       externalID : "XYZ789-ABC456",
    //       remainingDays: 10
    //     },
    //
    //     {
    //       creationDate: "17/02/2020",
    //       dueDate: "03/03/2020",
    //       requester: "supervisor@otus.com.br",
    //       receiver: "revisor@otus.com.br",
    //       acronym: "ELSA3",
    //       rn: 4569871230,
    //       externalID : "XYZ789-ABC456",
    //       remainingDays: 15
    //     },
    //   ];
    //
    //   return pendencies;
    // }

  }


}());