(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.issueMessagesViewer.IssueMessagesViewerService', Service);

  Service.$inject = [
    '$q',
    'ISSUE_MESSAGES_VIEWER_CONSTANTS',
    'otusjs.issueViewer.IssueViewerService',
    'otusjs.project.communication.repository.ProjectCommunicationRepositoryService',
    'otusjs.otus.uxComponent.IssueMessageFactory'
  ];

  function Service($q, ISSUE_MESSAGES_VIEWER_CONSTANTS, IssueViewerService,
                   ProjectCommunicationRepositoryService, IssueMessageFactory) {

    const self = this;

    self.getItemAttributes = getItemAttributes;
    self.getAllItems = getAllItems;
    self.formatDate = formatDate;
    self.formatStatus = formatStatus;
    self.capitalizeName = IssueViewerService.capitalizeName;
    self.getCurrIssue = getCurrIssue;
    self.removeStoragedCurrentIssue = removeStoragedCurrentIssue;
    self.createMessage = createMessage;

    function getAllItems(){
      return IssueViewerService.getCurrIssueMessages()
        .then(items => _parseItems(items))
        .catch(err => console.log("error:" + JSON.stringify(err)));
    }

    function _parseItems(genericListJsonArray) {
      let defer = $q.defer();
      let promises = genericListJsonArray.sort(compareIssueMessages)
        .map(item => ProjectCommunicationRepositoryService.getSenderById(item.sender));

      $q.all(promises).then(senders => {
        let parsedItems = [];
        for (let i = 0; i < genericListJsonArray.length; i++) {
          parsedItems.push(IssueMessageFactory.fromJsonObject(genericListJsonArray[i], senders[i]))
        }
        defer.resolve(parsedItems);
      }).catch(err => defer.reject(err));

      return defer.promise;
    }

    function compareIssueMessages(a, b){
      return (a.creationData === b.creationData ? 0 : (a.creationData < b.creationData ? -1 : 1));
    }

    function getItemAttributes() {
      let itemAttributes = {};
      Object.values(ISSUE_MESSAGES_VIEWER_CONSTANTS.ATTRIBUTES).forEach(attribute => {
        itemAttributes[attribute.TITLE] = {
          title:           attribute.TITLE,
          translatedTitle: attribute.TRANSLATED_TITLE,
          icon:            attribute.ICON
        }
      });
      return itemAttributes;
    }

    function formatDate(date){
      return IssueViewerService.formatDate(date) + ' - ' +
        date.getHours().toString(10).padStart(2, '0') + ':' + date.getMinutes().toString(10).padStart(2, '0');
    }

    function getCurrIssue(){
      return IssueViewerService.getCurrStoragedIssue();
    }

    function formatStatus(issueStatus){
      return IssueViewerService.formatStatus(issueStatus);
    }

    function createMessage(issueId, messageText){
      return ProjectCommunicationRepositoryService.createMessage(issueId, {
        "text": messageText,
        "creationDate": (new Date()).toJSON(),
        "issueId": issueId
      });
    }

    function removeStoragedCurrentIssue(){
      IssueViewerService.removeStoragedCurrentIssue();
    }

  }

}());
