(function () {
  'use strict';

  angular
    .module('otusjs.report.business.dynamicReport')
    .service('otusjs.report.business.dynamicReport.DynamicReportService', Service);

  Service.$inject = [
    '$q',
    '$window',
    '$compile',
    'otusjs.report.business.dynamicReport.scope.ScopeReportFactory'
  ];

  function Service($q, $window, $compile, ScopeReportFactory) {
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

      // TODO: Execute helpers
      precompile(report)
        .then(function (structure) {
          report.compiledTemplate = structure.compiledTemplate;
          report.fieldsError = structure.fieldsError;


          let initialHtmlStructure = `
          <html>
            <head>          
              <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic" rel="stylesheet" />
              <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
              <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min.css">
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
                  
                  body {
                    margin: 10px 100px 0 100px;
                  }
                }
                
                otus-script {
                  display: none;
                }
                
                otus-datasource {
                  display: none;
                }          
                        
                .button-print{
                bottom: 5px;
                right: 0;
                position: fixed;
                background-color: #3883ff;
                }
                
                .material-icons.white {
                color: #ffffff;
                }
                
              </style>
              <title>Relatório: ${report.label}</title>          
            </head>
            <button class="no-print button-print md-button md-fab md-mini" onclick="window.print()" >
            <i class="material-icons white">print</i>
            </button>
            <body> 
            </body>
            </html>
          `;

          var newWindow = $window.open('about:blank', '_blank');
          newWindow.document.write(initialHtmlStructure);

          angular.element(newWindow.document.body)
            .append(report.compiledTemplate);

          newWindow.document.close();

          newWindow.onbeforeunload = function () {
            newWindow.close();
            callback();
            return;
          }
        }).catch(function (error) {
          
        });
    }
  }
}());