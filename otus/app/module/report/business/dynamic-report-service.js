(function () {
  'use strict';

  angular
    .module('otusjs.report.business')
    .service('otusjs.report.business.DynamicReportService', Service);

  Service.$inject = [
    '$rootScope',
    '$compile',
    '$window',
    '$filter',
    '$q'
  ];

  function Service($rootScope, $compile, $window, $filter, $q) {
    var self = this;

    self.precompile = precompile;
    self.openReportInNewTab = openReportInNewTab;

    function precompile(report) {
      let returned = {};
      let deferred = $q.defer();
      let scope = $rootScope.$new();
      let currentTemplate = report.template;

      currentTemplate = `${currentTemplate}
        <otus-script>
            {{data.testEndChangeScope = true}}
        </otus-script>
        `;
      
      scope.fieldRequiredArray = [];
      scope.style = {};
      scope.fieldsError = [];
      scope.required = function (fieldName, value, msg) {
        var requiredStyle = { "color": "red", "content": "Joe's Task:" };
        var defaultStyle = {};
        if (scope.style[fieldName] === undefined) {
          var field = {
            fieldName: fieldName,
            valid: value ? true : false,
            msg: msg,
          };
          scope.fieldRequiredArray.push(field);
          scope.style[fieldName] = field.valid ? defaultStyle : requiredStyle;
          if (field.valid === false) {
            scope.fieldsError.push(field);
          }
        }
      }
      scope.ds = report.dataSources;
      scope.data = {};
      scope.aux = {};
      scope.aux.formatDate = (value, format='dd/MM/yyyy') => $filter('date')(new Date(value), format);
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


    function openReportInNewTab(report) {
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
              margin-left: 2.25cm; margin-right: 3cm; margin-top: 1.25cm; margin-bottom: 1.25cm;
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
      }, 500);
    }


  }
}());
