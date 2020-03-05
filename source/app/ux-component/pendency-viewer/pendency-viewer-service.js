(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.pendencyViewer.PendencyViewerService', Service);

  Service.$inject = [
    'otusjs.pendency.repository.UserActivityPendencyRepositoryService',
    'otusjs.model.pendency.UserActivityPendencyFactory',
    'PENDENCY_VIEWER_TITLES'

  ];

  function Service(UserActivityPendencyRepositoryService, UserActivityPendencyFactory, PENDENCY_VIEWER_TITLES) {
    const self = this;
    self.getSearchSettings = getSearchSettings;
    self.getPendencyAttributes = getPendencyAttributes;
    self.getInputViewState = getInputViewState;
    self.getAllPendencies = getAllPendencies;
    self.formatDate = formatDate;
    self.calculateRemainingDays = calculateRemainingDays;
    self.getSelectedParticipantRN = getSelectedParticipantRN;
    self.getChecker = getChecker;

    function getSearchSettings() {
      return {
        "currentQuantity": 0,
        "quantityToGet": 10,
        "order": {
          "fields":["dueDate"],
          "mode": 1
        },
        "filter":{
          "status": "NOT_FINALIZED"
        }
      };
    }

    function getPendencyAttributes() {
      return [
        {title: 'rn', translatedTitle: PENDENCY_VIEWER_TITLES.RN, icon: 'account_circle'},
        {title: 'requester', translatedTitle: PENDENCY_VIEWER_TITLES.REQUESTER, icon: 'record_voice_over'},
        {title: 'receiver', translatedTitle: PENDENCY_VIEWER_TITLES.RECEIVER, icon: 'assignment_ind'},
        {title: 'acronym', translatedTitle: PENDENCY_VIEWER_TITLES.ACRONYM, icon: 'assignment'},
        {title: 'externalID', translatedTitle: PENDENCY_VIEWER_TITLES.EXTERNAL_ID, icon: 'fingerprint'},
        {title: 'dueDate', translatedTitle: PENDENCY_VIEWER_TITLES.DUE_DATE, icon: 'hourglass_empty'},
        {title: 'creationDate', translatedTitle: PENDENCY_VIEWER_TITLES.CREATION_DATE, icon: 'schedule'},
        {title: 'remainingDays', translatedTitle: PENDENCY_VIEWER_TITLES.REMAINING_DAYS, icon: 'speed'},
      ];
    }

    function getInputViewState() {
      return {
        rn: false,
        acronym: false,
        requester: false,
        receiver: false,
        dueDate: false,
        externalID: false,
        sortingCriteria: false
      };
    }

    function getAllPendencies(searchSettings) {
      return UserActivityPendencyRepositoryService.getAllPendencies(searchSettings)
        .then(data => _parsePendencies(data))
        .catch(err => console.log("error:" + err))
    }

    function _parsePendencies(pendencyJsonArray){
      let parsedPendencies = [];
      pendencyJsonArray.forEach( item => {
        parsedPendencies.push(UserActivityPendencyFactory.fromJsonObject(item));
      });
      return parsedPendencies;
    }

    function formatDate(date) {
      return date.getUTCDate() + "/"+ (date.getUTCMonth()+1) + "/" + date.getUTCFullYear();
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

    function getChecker(user, pendencyFilterItem, searchSettings){
      searchSettings.filter[pendencyFilterItem.title] = [user.checker.email];
    }
  }

}());