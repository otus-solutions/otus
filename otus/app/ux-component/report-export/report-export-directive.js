(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .directive('reportExport', reportTemplateExport);

  reportTemplateExport.$inject = [
    '$mdToast',
    '$timeout'
  ];

  function reportTemplateExport($mdToast, $timeout) {
    return {
      scope: {
        report: '<'
      },
      restrict: 'A',
      link: function(scope, element, attr) {
        element.on('click', function() {
          function displayMsg(msg){
            $mdToast.show(
              $mdToast.simple()
              .position("bottom right")
              .textContent(msg)
              .hideDelay(3000));
          }
          switch (attr.option) {
            case 'XLS':
              alasql('SELECT * INTO XLS("relatório.xls",{headers:true}) FROM ?', [scope.report]);
              displayMsg('XLS exportado com sucesso!');
              break;
            case 'CSV':
              alasql('SELECT * INTO CSV("relatório.csv",{headers:true}) FROM ?', [scope.report]);
              displayMsg('CSV exportado com sucesso!');
              break;
            case 'TAB':
              alasql('SELECT * INTO TAB("relatório.tab",{headers:true}) FROM ?', [scope.report]);
              displayMsg('TAB exportado com sucesso!');
              break;
            case 'TXT':
              alasql('SELECT * INTO TXT("relatório.txt",{headers:true}) FROM ?', [scope.report]);
              displayMsg('TXT exportado com sucesso!');
              break;
            case 'JSON':
              alasql('SELECT * INTO JSON("relatório.json",{headers:true}) FROM ?', [scope.report]);
              displayMsg('JSON exportado com sucesso!');
              break;
            default:
            displayMsg('Formato não reconhecido!');
          }
        });
      }
    };
  }

}());
