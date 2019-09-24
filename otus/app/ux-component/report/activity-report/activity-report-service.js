(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.otus.uxComponent.ActivityReportService', Service);

  Service.$inject = ['$mdDialog'];

  function Service($mdDialog) {
    var self = this;

    self.infoPendingReportAlert = infoPendingReportAlert;

    function infoPendingReportAlert() {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Relatório Incompleto: Pendências Detectadas')
          .textContent('Para visualizar/imprimir o relatório será necessário validar os itens abaixo.')
          .ariaLabel('Alert: Relatório incompleto')
          .ok('Voltar')
      );
    }
  }

}());