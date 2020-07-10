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
    '$mdToast',
    'otusjs.issueViewer.IssueViewerService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller($mdToast, IssueViewerService, ApplicationStateService, LoadingScreenService) {
    const self = this;
    const VISIBILITY_ICON = {
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
    self.showMore = showMore;
    self.changeStatusTo = changeStatusTo;

    function onInit() {
      self.expanded = false;
      self.showMoreIcon = VISIBILITY_ICON['false'];
      self.rn = self.item.participant.rn;
      self.name = IssueViewerService.capitalizeName(self.item.participant.name);
      self.center = self.item.participant.center;
      self.creationDate = IssueViewerService.formatDate(new Date(self.item.creationDate));
      self.status = IssueViewerService.formatStatus(self.item.status);
      self.statusOptions = IssueViewerService.getStatusInfo(self.item.status);
      self.elementID = `${self.rn.toString()}_${self.item.creationDate}`;
    }

    function openIssueMessages(){
      IssueViewerService.storageCurrentIssue(self.item);
      ApplicationStateService.activateIssueMessagesViewer();
    }

    function showMore(){
      self.expanded = !self.expanded;
      self.showMoreIcon = VISIBILITY_ICON[self.expanded.toString()];
    }

    function changeStatusTo(statusValue){
      LoadingScreenService.start();
      IssueViewerService.updateIssueStatus(self.item, statusValue)
        .then(() => {
          angular.element(document.getElementById(self.elementID)).remove();
          LoadingScreenService.finish();
          $mdToast.show(
            $mdToast.simple()
              .textContent('Status alterado com sucesso.')
              .position('bottom right')
              .hideDelay(3000)
          );
        })
        .catch(error => {
          console.log(error);
          LoadingScreenService.finish();
          $mdToast.show(
            $mdToast.simple()
              .textContent('Erro ao alterar status.')
              .position('bottom right')
              .theme('error-toast')
              .hideDelay(3000)
          );
        });
    }

  }

}());