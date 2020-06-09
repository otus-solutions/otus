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
    'otusjs.otus.uxComponent.IssueMessageFactory',
  ];

  function Service($q, ISSUE_MESSAGES_VIEWER_CONSTANTS, IssueViewerService,
                   ProjectCommunicationRepositoryService, IssueMessageFactory) {

    const self = this;

    self.getItemAttributes = getItemAttributes;
    self.getAllItems = getAllItems;
    self.formatDate = formatDate;
    self.capitalizeName = IssueViewerService.capitalizeName;
    self.getCurrIssueInfo = getCurrIssueInfo;

    function getAllItems(){
      return IssueViewerService.getCurrIssueMessages()
        .then(items => _parseItems(items))
        .catch(err => console.log("error:" + JSON.stringify(err)));
    }

    function _parseItems(genericListJsonArray) {
      let parsedItems = [];
      genericListJsonArray.forEach(item => {
        ProjectCommunicationRepositoryService.getIssueSenderInfo(item.sender)
          .then(sender => parsedItems.push(IssueMessageFactory.fromJsonObject(item, sender)));
      });
      return parsedItems;
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

    function getCurrIssueInfo(){
      const issue = IssueViewerService.getCurrStoragedIssue();
      issue.status = {
        translatedStatus: IssueViewerService.translateStatus(issue.status),
        color: IssueViewerService.LABELS.STATUS_COLOR[issue.status]
      };
      issue.creationDate = formatDate(new Date(issue.creationDate));
      return issue;
    }

  }

}());
