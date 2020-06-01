(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.issueViewer.IssueViewerService', Service);

  Service.$inject = [
    '$q',
    'otusjs.genericListViewer.GenericListViewerService',
    'ISSUE_VIEWER_LABELS',
    'otusjs.project.communication.repository.ProjectCommunicationRepositoryService',
    'otusjs.otus.uxComponent.IssueFactory',
    'otusjs.participant.business.ParticipantManagerService'
  ];

  function Service($q, GenericListViewerService, ISSUE_VIEWER_LABELS,
                   ProjectCommunicationRepositoryService, IssueFactory,
                   ParticipantManagerService
                   ) {

    const self = this;
    const INITIAL_CURRENT_QUANTITY = 0;
    const INITIAL_QUANTITY_TO_GET = 15;

    self.dataReady = false;
    self.currParticipants = {};

    self.initialize = initialize;
    self.getChecker = getChecker;
    self.findParticipantFromEmail = findParticipantFromEmail;
    self.translateStatus = translateStatus;
    self.setupParticipantList = setupParticipantList;

    initialize();

    function initialize(){
      angular.extend(self, self, GenericListViewerService);
      self.init(self, ISSUE_VIEWER_LABELS, INITIAL_CURRENT_QUANTITY, INITIAL_QUANTITY_TO_GET,
        ProjectCommunicationRepositoryService.filter, IssueFactory,
        childParseItemsMethod
      );

      self.getSearchSettings = getSearchSettings;
      self.getItemAttributes = getItemAttributes;
      self.getInputViewState = getInputViewState;
      self.getSelectedParticipantRN = getSelectedParticipantRN;

      ParticipantManagerService.setup()
        .then(response => { self.dataReady = true; });
    }

    function setupParticipantList(){
      return ParticipantManagerService.getParticipantList()
    }

    function childParseItemsMethod(genericListJsonArray) {
      console.log(genericListJsonArray)
      let emails = genericListJsonArray.map(item => item.sender);

      return ParticipantManagerService.setup()
        .then(response => {
          ParticipantManagerService.getParticipantList()
            .filter(participant => emails.includes(participant.email))
            .forEach(participant => self.currParticipants[participant.email] = participant);

          let parsedItems = [];
          genericListJsonArray.forEach(item => {
            // parsedItems.push(IssueFactory.fromJsonObject(self.currParticipants[item.sender]));
            parsedItems.push(IssueFactory.fromJsonObject(item));
          });
          return parsedItems;
        });
    }

    function getSearchSettings() {
      return {
        "currentQuantity": INITIAL_CURRENT_QUANTITY,
        "quantityToGet": INITIAL_QUANTITY_TO_GET,
        "order": {
          "fields": ["creationDate"],
          "mode": 1
        },
        "filter": {
          "status": ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.STATUS.OPENED.VALUE
        }
      };
    }

    function getItemAttributes() {
      return {
        rn:           ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.RN,
        name:         ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.SENDER_NAME,
        center:       ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.CENTER,
        creationDate: ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.CREATION_DATE,
        title:        ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.TITLE,
        status:       ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.STATUS
      };
    }

    function getInputViewState() {
      return {
        rn: false,
        creationDate: false,
        center: false
      };
    }

    function getSelectedParticipantRN(participant, pendencyFilterItem, searchSettings) {
      searchSettings.filter[pendencyFilterItem.title] = participant.recruitmentNumber;
    }

    function getChecker(user, pendencyFilterItem, searchSettings) {
      searchSettings.filter[pendencyFilterItem.title] = [user.checker.email];
    }

    function translateStatus(status){
      const translation = ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.STATUS[status].TRANSLATED_TITLE;
      return translation.substring(0, translation.length-1);
    }

    //todo
    function findParticipantFromEmail(email){
      //return self.currParticipants[email];
      return {
        rn: 1234567,
        name: 'Fulano de Tal',
        center: 'RS'
      };
    }

  }

}());
