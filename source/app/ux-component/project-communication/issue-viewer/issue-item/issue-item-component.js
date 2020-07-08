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

    const visibilityIcon = {
      'true': {
        icon: 'visibility',
        tooltip: 'Ocultar Detalhes'
      },
      'false': {
        icon: 'visibility_off',
        tooltip: 'Mostrar Detalhes'
      }
    };

    self.$onInit = onInit;
    self.openIssueMessages = openIssueMessages;
    self.showLastMessage = showLastMessage;

    function onInit() {
      self.expanded = false;
      self.showingLastMessageIcon = visibilityIcon['false'];
      self.rn = self.item.participant.rn;
      self.name = IssueViewerService.capitalizeName(self.item.participant.name);
      self.center = self.item.participant.center;
      self.creationDate = IssueViewerService.formatDate(new Date(self.item.creationDate));
      self.status = IssueViewerService.translateStatus(self.item.status);
      self.statusColor = IssueViewerService.LABELS.STATUS[self.item.status].color;
    }

    function openIssueMessages(){
      IssueViewerService.storageCurrentIssue(self.item);
      ApplicationStateService.activateIssueMessagesViewer();
    }

    function showLastMessage(){
      self.expanded = !self.expanded;
      self.showingLastMessageIcon = visibilityIcon[self.expanded.toString()];
    }

  }

}());