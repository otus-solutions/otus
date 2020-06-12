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
    self.getStatusActions = getStatusActions;
    self.updateIssueStatus = updateIssueStatus;
    self.createMessage = createMessage;

    function getAllItems(){
      return IssueViewerService.getCurrIssueMessages()
        .then(items => _parseItems(items))
        .catch(err => console.log("error:" + JSON.stringify(err)));
    }

    function _parseItems(genericListJsonArray) {
      let parsedItems = [];
      genericListJsonArray
        .sort(compareIssueMessages)
        .forEach(item => {
          ProjectCommunicationRepositoryService.getIssueSenderInfo(item.sender)
            .then(sender => parsedItems.push(IssueMessageFactory.fromJsonObject(item, sender)));
        });
      return parsedItems;
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

    function formatStatus(issueStatus){
      return {
        value: issueStatus,
        translatedStatus: IssueViewerService.translateStatus(issueStatus),
        color: IssueViewerService.LABELS.STATUS_COLOR[issueStatus]
      }
    }

    function getCurrIssue(){
      return IssueViewerService.getCurrStoragedIssue();
    }

    function getStatusActions(currStatusValue){
      let allStatus =  angular.copy(ISSUE_MESSAGES_VIEWER_CONSTANTS.STATUS_ACTIONS);
      delete allStatus[currStatusValue];
      return allStatus;
    }

    function updateIssueStatus(issue, newStatusValue){
      console.log('service.updateStatus', issue.id)
      issue.status = newStatusValue;
      let arg = issue; //todo issue.id

      switch (newStatusValue) {
        case ISSUE_MESSAGES_VIEWER_CONSTANTS.STATUS_ACTIONS.OPEN.value:
          return ProjectCommunicationRepositoryService.updateReopen(arg);

        case ISSUE_MESSAGES_VIEWER_CONSTANTS.STATUS_ACTIONS.CLOSED.value:
          return ProjectCommunicationRepositoryService.updateClose(arg);

        case ISSUE_MESSAGES_VIEWER_CONSTANTS.STATUS_ACTIONS.FINALIZED.value:
          return ProjectCommunicationRepositoryService.updateFinalized(arg);
      }
    }

    function createMessage(issueId, messageText){
      return ProjectCommunicationRepositoryService.createMessage(issueId, {
        "text": messageText,
        "creationDate": (new Date()).toJSON(),
        "issueID": issueId
      });
    }

  }

}());
