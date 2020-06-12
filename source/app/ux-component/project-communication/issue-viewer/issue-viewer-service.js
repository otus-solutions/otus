(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.issueViewer.IssueViewerService', Service);

  Service.$inject = [
    '$q',
    '$window',
    'otusjs.genericListViewer.GenericListViewerService',
    'ISSUE_VIEWER_LABELS',
    'otusjs.project.communication.repository.ProjectCommunicationRepositoryService',
    'otusjs.otus.uxComponent.IssueFactory',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.otus.dashboard.core.ContextService'
  ];

  function Service($q, $window, GenericListViewerService, ISSUE_VIEWER_LABELS,
                   ProjectCommunicationRepositoryService, IssueFactory,
                   ParticipantManagerService, ContextService) {

    const self = this;
    const INITIAL_CURRENT_QUANTITY = 0;
    const INITIAL_QUANTITY_TO_GET = 15;
    const ISSUE_LIST_STORAGE_KEY = 'currentIssuesList';
    const CURR_ISSUE_STORAGE_KEY = 'currentIssue';

    self.participantDataReady = false;
    self.participants = {};
    self.needPreparations = self.storageItems = true;
    self.center = undefined;

    self.initialize = initialize;
    self.prepareData = prepareData;
    self.translateStatus = translateStatus;
    self.storageCurrentIssues = storageCurrentIssues;
    self.getCurrStoragedIssue = getCurrStoragedIssue;
    self.updateCurrStoragedIssueStatus = updateCurrStoragedIssueStatus;
    self.getCurrIssueMessages = getCurrIssueMessages;

    initialize();

    function initialize(){
      angular.extend(self, self, GenericListViewerService);
      self.init(ISSUE_VIEWER_LABELS, INITIAL_CURRENT_QUANTITY, INITIAL_QUANTITY_TO_GET,
        ProjectCommunicationRepositoryService.filter, IssueFactory,
        childParseItemsMethod
      );

      self.getAllItems = getAllItems;
      self.getSearchSettings = getSearchSettings;
      self.getItemAttributes = getItemAttributes;
      self.getInputViewState = getInputViewState;
    }

    function prepareData(){
      ContextService.getLoggedUser()
        .then(user => self.center = user.fieldCenter.acronym);
      return ParticipantManagerService.setup();
    }

    function getAllItems(searchSettings) {
      const items = JSON.parse($window.sessionStorage.getItem(ISSUE_LIST_STORAGE_KEY));
      if(items){
        const defer = $q.defer();
        defer.resolve(angular.copy(items));
        $window.sessionStorage.removeItem(ISSUE_LIST_STORAGE_KEY);
        $window.sessionStorage.removeItem(CURR_ISSUE_STORAGE_KEY);
        return defer.promise;
      }

      return ProjectCommunicationRepositoryService.filter(searchSettings)
        .then(data => childParseItemsMethod(data))
        .catch(err => console.log("error:" + JSON.stringify(err)))
    }

    function childParseItemsMethod(genericListJsonArray) {
      let parsedItems = [];
      genericListJsonArray.forEach(item => {
        ProjectCommunicationRepositoryService.getIssueSenderInfo(item.sender)
          .then(participant => parsedItems.push(IssueFactory.fromJsonObject(item, participant)))
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
          status: "OPEN",
          center: self.center
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

    function storageCurrentIssues(currIssue){
      $window.sessionStorage.setItem(ISSUE_LIST_STORAGE_KEY, JSON.stringify(self.items));
      $window.sessionStorage.setItem(CURR_ISSUE_STORAGE_KEY, JSON.stringify(currIssue));
    }

    function getCurrStoragedIssue(){
      return JSON.parse($window.sessionStorage.getItem(CURR_ISSUE_STORAGE_KEY));
    }

    function updateCurrStoragedIssueStatus(newStatus){
      let currIssue = getCurrStoragedIssue();
      currIssue.status = newStatus;

      self.items = JSON.parse($window.sessionStorage.getItem(ISSUE_LIST_STORAGE_KEY))
        .map(issue => {
          if(issue.id === currIssue.id){
            issue.status = newStatus;
          }
          return issue;
        });

      storageCurrentIssues(currIssue);
    }

    function getCurrIssueMessages(){
      return ProjectCommunicationRepositoryService.getAllIssueMessages(getCurrStoragedIssue().id);
    }

  }

}());
