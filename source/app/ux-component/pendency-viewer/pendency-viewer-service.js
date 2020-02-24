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
    self.formatDate = formatDate;
    self.calculateRemainingDays = calculateRemainingDays;
    self.getSelectedParticipantRN = getSelectedParticipantRN;

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

    function formatDate(date) {
      return date.getDate() + "/"+ (date.getMonth()+1) + "/" + date.getFullYear();
    }

    function calculateRemainingDays(dueDate){
      let today = _extractDateZeroTime(new Date());
      let due = _extractDateZeroTime(new Date(dueDate));
      const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
      let deadLine = Math.floor((due - today) / MILLISECONDS_PER_DAY);
      return deadLine;
    }

    function _extractDateZeroTime(date){
      date.setHours(0,0,0,0);
      return date;
    }

    function getSelectedParticipantRN(participant, pendencyFilterItem, searchSettings){
      searchSettings.filter[pendencyFilterItem.title] = participant.recruitmentNumber;
    }
  }


}());