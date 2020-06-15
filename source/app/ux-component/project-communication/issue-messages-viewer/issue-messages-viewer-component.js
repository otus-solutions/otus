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
    let confirmChangeStatusData;
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
    self.changeStatus = changeStatus;


    function onInit(){
      self.replying = false;
      self.items = [];
      self.itemAttributes = {};//todo

      LoadingScreenService.start();
      _buildDialogs();

      self.issue = IssueMessagesViewerService.getCurrIssue();
      self.currStatus = self.issue.status;

      _loadStatusOptions();

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

    function _loadStatusOptions(){
      self.statusOptions = IssueMessagesViewerService.getStatusActions(self.currStatus);
    }

    function openReplyInput(){
      self.replying = true;
    }

    function sendReply(){
      DialogService.showDialog(confirmSendReply).then(() => {
        IssueMessagesViewerService.createMessage(self.issue.id, self.replyContent)
          .then(() => onInit())
          .catch(e => {
            console.log(e);
            self.replying = false;
          });
      });
    }

    function cancelReply(){
      angular.element(document.getElementById('replyInputBox')).value = "";//todo
      self.replying = false;
    }

    function changeStatus(statusValue){
      self.currStatus = statusValue;
      console.log('changeStatus', self.currStatus)
      _loadStatusOptions();
      return IssueMessagesViewerService.updateIssueStatus(self.issue, self.currStatus);
    }

    function _buildDialogs() {
      confirmChangeStatusData = {
        dialogToTitle: 'Confirmação',
        titleToText: 'Atualização de status',
        textDialog: 'Confirma a troca de status?',
        ariaLabel: 'Confirmação de troca de status',
        buttons: _prepareButtons()
      };

      confirmSendReply = {
        dialogToTitle: 'Confirmação',
        titleToText: 'Envio de resposta',
        textDialog: 'Confirma o envio de mensagem?',
        ariaLabel: 'Confirmação de envio',
        buttons: _prepareButtons()
      };

    }

    function _prepareButtons() {
      return [
        {
          message: 'Ok',
          action: function () {
            $mdDialog.hide()
          },
          class: 'md-raised md-primary'
        },
        {
          message: 'Voltar',
          action: function () {
            $mdDialog.cancel()
          },
          class: 'md-raised md-no-focus'
        }
      ]
    }

  }

}());