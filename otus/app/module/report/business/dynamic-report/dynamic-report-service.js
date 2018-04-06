(function () {
  'use strict';

  angular
    .module('otusjs.report.business.dynamicReport')
    .service('otusjs.report.business.dynamicReport.DynamicReportService', Service);

  Service.$inject = [
    '$q',
    '$window',
    '$compile',
    '$rootScope',
    'otusjs.report.business.dynamicReport.scope.ScopeReportFactory'
  ];

  function Service($q, $window, $compile, $rootScope, ScopeReportFactory) {
    var self = this;

    self.precompile = precompile;
    self.openReportInNewTab = openReportInNewTab;

    function precompile(report) {
      let returned = {};
      let deferred = $q.defer();
      let currentTemplate = report.template;
      let scopeReport = ScopeReportFactory.create();
      let scope;

      scopeReport.setDatasource(report.dataSources);
      scope = scopeReport.scope;

      currentTemplate = `${currentTemplate}
        <otus-script>
          {{data.testEndChangeScope = true}}
        </otus-script>
      `;

      returned.compiledTemplate = $compile(currentTemplate)(scope);

      scope.$watch('data.testEndChangeScope', function () {
        if (scope.data.testEndChangeScope === true) {
          returned.scope = scope;
          returned.fieldsError = scope.fieldsError;
          deferred.resolve(returned);
        }
      });

      return deferred.promise;
    }


    function openReportInNewTab(report, callback) {
      let initialHtmlStructure = `
      <html>
        <head>
          <title>Relatório: ${report.label}</title>
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">
          <style>
            @page {
              size: 210mm 297mm;
              margin-left: 225mm; 
              margin-right: 300mm; 
              margin-top: 125mm; 
              margin-bottom: 125mm;
            }
         
            @media print {
              .no-print, .no-print *,
              otus-script, otus-script *,
              otus-datasource, otus-datasource * {
                display: none !important;
              }
            }
            
            @media screen {
              .no-print, .no-print * {
                visibility: visible;
              }
            }
            
            otus-script {
              display: none;
            }
            
            otus-datasource {
              display: none;
            }
          </style>
        </head>
        <body>
          <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
          <!-- ************************************* Angular ************************************* -->
          <!-- Angular Material requires Angular.js Libraries -->
          <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
          <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
          <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
          <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>

          <!-- Angular Material Library -->
          <script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>
        </body>
      </html>
      `;
      var newWindow = $window.open('', '_blank');
      newWindow.document.write(initialHtmlStructure);
      
      angular.element(newWindow.document.body)
      .append(report.compiledTemplate);
      newWindow.setTimeout(function(){ 
        newWindow.print(); 
        newWindow.close();
        callback();
      }, 500);

      window.otusCloseDynamicReport = function(){
        if(newWindow){
          try {
            newWindow.close();
            if(callback) callback();
          } catch (error) {
            
          }
        }
      }
    }
  }
}());
