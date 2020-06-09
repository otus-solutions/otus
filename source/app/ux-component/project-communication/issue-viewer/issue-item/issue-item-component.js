(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusIssueItem', {
      controller:'issueItemCtrl as $ctrl',
      templateUrl: 'app/ux-component/project-communication/issue-viewer/issue-item/issue-item-template.html',
      bindings: {
        item: '<',
        itemAttributes: '<'
      }
    }).controller('issueItemCtrl', Controller);

  Controller.$inject = [
    'otusjs.issueViewer.IssueViewerService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(IssueViewerService, ApplicationStateService) {
    const self = this;

    self.$onInit = onInit;
    self.openIssueMessages = openIssueMessages;

    function onInit() {
      self.expanded = false;
      self.rn = self.item.participant.rn;
      self.name = _capitalizeName(self.item.participant.name);
      self.center = self.item.participant.center;
      self.creationDate = IssueViewerService.formatDate(new Date(self.item.creationDate));
      self.status = IssueViewerService.translateStatus(self.item.status);
      self.statusColor = IssueViewerService.LABELS.STATUS_COLOR[self.item.status];
    }

    function _capitalizeName(name) {
      return name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    function openIssueMessages(){
      IssueViewerService.storageCurrentIssues(self.item);
      ApplicationStateService.activateIssueMessagesViewer();
    }

  }

}());