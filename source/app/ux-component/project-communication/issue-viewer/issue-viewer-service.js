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
                   ParticipantManagerService) {

    const self = this;
    const INITIAL_CURRENT_QUANTITY = 0;
    const INITIAL_QUANTITY_TO_GET = 15;

    self.dataReady = false;
    self.participants = {};

    self.initialize = initialize;
    self.translateStatus = translateStatus;

    initialize();

    function initialize(){
      angular.extend(self, self, GenericListViewerService);
      self.init(ISSUE_VIEWER_LABELS, INITIAL_CURRENT_QUANTITY, INITIAL_QUANTITY_TO_GET,
        ProjectCommunicationRepositoryService.filter, IssueFactory,
        childParseItemsMethod
      );

      self.getSearchSettings = getSearchSettings;
      self.getItemAttributes = getItemAttributes;
      self.getInputViewState = getInputViewState;

      ParticipantManagerService.setup()
        .then(response => { self.dataReady = true; });
    }

    function childParseItemsMethod(genericListJsonArray) {
      let parsedItems = [];
      genericListJsonArray.forEach(item => {
        // parsedItems.push(IssueFactory.fromJsonObject(self.currParticipants[item.sender]));
        parsedItems.push(IssueFactory.fromJsonObject(item, ParticipantManagerService));
      });
      return parsedItems;
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
          "status": "OPENED"
        }
      };
    }

    function getItemAttributes() {
      let itemAttributes = {};
      Object.values(ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES).forEach(attribute => {
        itemAttributes[attribute.TITLE] = {
          title:           attribute.TITLE,
          translatedTitle: attribute.TRANSLATED_TITLE,
          icon:            attribute.ICON
        }
      });
      return itemAttributes;
    }

    function getInputViewState() {
      return {
        rn: false,
        creationDate: false,
        center: false
      };
    }

    function translateStatus(status){
      const translation = ISSUE_VIEWER_LABELS.FILTER_STATUS[status];
      return translation.substring(0, translation.length-1);
    }

  }

}());
