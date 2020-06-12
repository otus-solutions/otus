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
    let confirmCancelPreActivities;
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


    function onInit(){
      self.replying = self.changingStatus = false;
      self.items = [];
      self.itemAttributes = {};//todo

      LoadingScreenService.start();
      _buildDialogs();

      self.issue = IssueMessagesViewerService.getCurrIssue();
      self.currStatus = self.issue.status;
      console.log(self.currStatus);

      self.statusOptions = IssueMessagesViewerService.getStatusActions(self.currStatus.value);

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

      IssueMessagesViewerService.updateIssueStatus(self.issue, self.currStatus)
        .then(() => {
          self.changingStatus = false;
        })
        .catch(e => console.log(e));
    }

    function _buildDialogs() {
      confirmCancelPreActivities = {
        dialogToTitle: 'Confirmação',
        titleToText: 'Cancelamento da Lista de Formulários',
        textDialog: 'Deseja sair do Gerenciador de Atividades ?',
        ariaLabel: 'Confirmação de cancelamento',
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