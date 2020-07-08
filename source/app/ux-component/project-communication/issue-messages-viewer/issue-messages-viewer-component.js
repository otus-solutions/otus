(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusIssueMessagesViewerComponent', {
      controller: 'issueMessagesViewerCtrl as $ctrl',
      templateUrl: 'app/ux-component/project-communication/issue-messages-viewer/issue-messages-viewer-template.html',
      bindings: {
        issueId: '<'
      }
    }).controller('issueMessagesViewerCtrl', Controller);

  Controller.$inject = [
    '$mdDialog',
    'otusjs.application.dialog.DialogShowService',
    'ISSUE_MESSAGES_VIEWER_CONSTANTS',
    'otusjs.issueMessagesViewer.IssueMessagesViewerService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller($mdDialog, DialogService, ISSUE_MESSAGES_VIEWER_CONSTANTS, IssueMessagesViewerService, LoadingScreenService) {
    const self = this;
    let confirmSendReply;

    self.viewerTitle = ISSUE_MESSAGES_VIEWER_CONSTANTS.PAGE_TITLE;
    self.itemComponentName = 'otusIssueMessageItem';
    self.headerComponentName = 'otusIssueInfoHeader';
    self.replyContent = null;
    self.currStatus = null;

    self.$onInit = onInit;
    self.openReplyInput = openReplyInput;
    self.sendReply = sendReply;
    self.cancelReply = cancelReply;


    function onInit(){
      self.replying = false;
      self.items = [];
      self.itemAttributes = {};

      LoadingScreenService.start();

      self.issue = IssueMessagesViewerService.getCurrIssue();
      self.currStatus = self.issue.status;

      IssueMessagesViewerService.getAllItems()
        .then(response => {
          self.items = response;
          LoadingScreenService.finish();
        })
        .catch(error => {
          console.log(error);
          LoadingScreenService.finish();
        });
    }

    function openReplyInput(){
      self.replying = true;
    }

    function sendReply(){
      DialogService.showConfirmationDialog(
        'Envio de resposta',
        'Confirma o envio de mensagem?',
        'Confirmação de envio')
      .then(() => {
        IssueMessagesViewerService.createMessage(self.issue._id, self.replyContent)
          .then(() => onInit())
          .catch(e => {
            console.log(e);
            self.replying = false;
          });
      });
    }

    function cancelReply(){
      angular.element(document.getElementById('replyInputBox')).value = "";
      self.replyContent = "";
      self.replying = false;
    }

  }

}());