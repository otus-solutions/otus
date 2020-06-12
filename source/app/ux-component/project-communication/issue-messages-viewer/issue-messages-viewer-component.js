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
    let invalidPreActivities;

    self.viewerTitle = ISSUE_MESSAGES_VIEWER_CONSTANTS.PAGE_TITLE;
    self.itemComponentName = 'otusIssueMessageItem';
    self.headerComponentName = 'otusIssueInfoHeader';
    self.replyContent = null;
    self.currStatus = null;

    self.$onInit = onInit;
    self.openReplyInput = openReplyInput;
    self.sendReply = sendReply;
    self.cancelReply = cancelReply;
    self.openStatusOptions = openStatusOptions;
    self.changeStatus = changeStatus;
    self.cancelChangeStatus = cancelChangeStatus;


    function onInit(){
      self.replying = self.changingStatus = false;
      self.items = [];
      self.itemAttributes = {};//todo

      LoadingScreenService.start();
      _buildDialogs();

      self.issue = IssueMessagesViewerService.getCurrIssue();
      self.currStatus = self.issue.status;
      console.log(self.currStatus);

      self.statusOptions = IssueMessagesViewerService.getStatusActions(self.currStatus);

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

    function openStatusOptions(){
      self.changingStatus = true;
    }

    function changeStatus(){
      console.log(self.currStatus)

      DialogService.showDialog(confirmChangeStatusData)
        .then(() => {
          IssueMessagesViewerService.updateIssueStatus(self.issue, self.currStatus)
            .then(() => onInit())
            .catch(e => {
              console.log(e);
              self.changingStatus = false;
            });
        });
    }

    function cancelChangeStatus(){
      self.changingStatus = false;
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

      invalidPreActivities = {
        dialogToTitle: 'Pendência de Informações',
        titleToText: 'Detecção de Formulários Incompletos',
        textDialog: 'Retorne para lista e preencha os campos obrigatórios',
        ariaLabel: 'Aviso de formulários inválidos',
        buttons: [{
          message: 'Voltar',
          action: function () {
            $mdDialog.cancel()
          },
          class: 'md-raised md-no-focus'
        }]
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