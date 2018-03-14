(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .directive('dynamicReportPage', directive);

  directive.$inject = [
    '$window',
    '$compile',
    'otusjs.labelMaker.labelBuilder.LabelService'
  ];

  function directive($window, $compile, LabelService) {
    var ddo = {
      restrict: 'EA',
      scope: {},
      transclude: true,
      templateUrl: 'app/ux-component/dynamic-report/dynamic-report-template.html',
      controller: Controller,
      controllerAs: '$ctrl',
    };

    function Controller($element, $scope) {
      var self = this;
      self.printPage = self.printPage;

      onInit();

      function onInit() {
        self.baseInfo = {};
        self.tubesList = [];
        LabelService.pushInfo($scope.$parent.labelData);
        _setInfo();
      }

      function _setInfo() {
        self.tubesList = LabelService.getTubesList();
        self.baseInfo = LabelService.getBaseInfo();

        self.loadComponents = true;
      }

      $scope.$$postDigest(function () {
        _generateWindow();
      });

      function _generateWindow() {
        var newWindow = $window.open('', '_blank'); //TODO pop-under
        newWindow.document.write(`
        <html>
          <head>
            <title>Etiquetas</title>
            <base href="/otus/" />
            <link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/otusjs-label-page.min.css"/>
            <link href="app/static-resource/image/coruja_pesquisadora.png" rel="icon" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <link href="node_modules/angular-material/angular-material.min.css" rel="stylesheet" />
            <link href="app/static-resource/stylesheet/styles.css" rel="stylesheet" />
            <link href="app/static-resource/stylesheet/initial-config.css" rel="stylesheet" />
            <link href="app/static-resource/stylesheet/please-wait-style.css" rel="stylesheet">
          </head>
          <body>
          </body>
        </html>
        `);
        angular.element(newWindow.document.body)
          .append($element.contents());
      }

    }
    return ddo;
  }
}());
