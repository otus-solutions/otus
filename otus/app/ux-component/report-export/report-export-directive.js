(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .directive('reportExport', reportTemplateExport);

  reportTemplateExport.$inject = [
    '$mdToast',
    '$timeout'
  ];

  function reportTemplateExport($mdToast, $timeout) {
    const FILENAME = "relatório";
    const SELECT = "SELECT * INTO";
    const PARAMETERS = "{headers:true}";
    const SUCCESS_MESSAGE = "exportado com sucesso!";
    const FAIL_MESSAGE = "Formato não reconhecido!";

    return {
      scope: {
        report: '<'
      },
      restrict: 'A',
      link: function (scope, element, attr) {
        element.on('click', function () {
          function displayMsg(msg) {
            $mdToast.show(
              $mdToast.simple()
                .position("bottom right")
                .textContent(msg)
                .hideDelay(3000));
          }
          switch (attr.option) {
            case 'XLS':
              alasql(SELECT + ' XLS("' + FILENAME + '.xls",' + PARAMETERS + ') FROM ?', [scope.report]);
              displayMsg('XLS ' + SUCCESS_MESSAGE);
              break;
            case 'CSV':
              alasql(SELECT + ' CSV("' + FILENAME + '.csv",' + PARAMETERS + ') FROM ?', [scope.report]);
              displayMsg('CSV ' + SUCCESS_MESSAGE);
              break;
            case 'TAB':
              alasql(SELECT + ' TAB("' + FILENAME + '.tab",' + PARAMETERS + ') FROM ?', [scope.report]);
              displayMsg('TAB ' + SUCCESS_MESSAGE);
              break;
            case 'TXT':
              alasql(SELECT + ' TXT("' + FILENAME + '.txt",' + PARAMETERS + ') FROM ?', [scope.report]);
              displayMsg('TXT ' + SUCCESS_MESSAGE);
              break;
            case 'JSON':
              alasql(SELECT + ' JSON("' + FILENAME + '.json",' + PARAMETERS + ') FROM ?', [scope.report]);
              displayMsg('JSON ' + SUCCESS_MESSAGE);
              break;
            default:
              displayMsg(FAIL_MESSAGE);
          }
        });
      }
    };
  }

}());
