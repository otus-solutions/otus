(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('dynamicReport', {
      templateUrl: 'app/ux-component/dynamic-report/dynamic-report-template.html',
      controller: Controller,
      bindings: {
        labelData: '<',
        templateStructure: '<'
      }
    });

  Controller.$inject = [
    '$scope',
    '$rootScope',
    '$compile',
    '$element',
    '$window',
    'otusjs.labelMaker.labelBuilder.LabelService'
  ];

  function Controller($scope, $rootScope, $compile, $element, $window, LabelService) {
    var self = this;
    var LABEL_PAGE = '<dynamic-report-page/>';
    
    self.generateReportPage = generateReportPage;

    $scope.$on("Data_Ready", function (event) {
      self.ready = true;
    });

    $scope.$on("Data_Error", function (event) {
      self.dataError = true;
    });

    function generateReportPage() {
      self.templateStructure = {
        "oldtemplate": "<!-- \n  <data-source>\n  {\n    \"template\" : \"\",\n    \"dataSources\" : [ \n        {\n            \"key\" : \"cabeÃ§alho\",\n            \"dataSource\" : \"Participant\"\n        }, \n        {\n            \"key\" : \"HS\",\n            \"dataSource\" : \"Activity\",\n            \"filters\" : {\n                \"statusHistory\" : {\n                    \"name\" : \"FINALIZED\",\n                    \"position\" : -1\n                },\n                \"acronym\" : \"TF\",\n                \"category\" : \"C0\"\n            }\n        }\n    ]\n}\n</data-source>\n\n -->\n<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n  <title>Document</title>\n</head>\n\n<body>\n  <div>\n\n    <script>\n      {{\n         $ctrl.setup(\n            function () {\n              var data;\n\n              var calculaImc = (altura, peso) => peso / (altura * altura);\n              var obtemSexo = (sex) => sex === 'F' ? \"Feminino\" : \"Masculino\";\n\n              data.imc = calculaImc($ctrl.ds.participant.width, $ctrl.ds.participant.peso);\n              data.sexo = obtemSexo(\"F\");\n\n              return data;\n            }\n          );\n        }}\n    </script>\n\n    <span>Participante: {{$ctrl.ds.participant[0].name}}</span>\n    <span>IMC do Participante: {{$ctrl.data.imc}}</span>\n    <span>Sexo: {{$ctrl.data.sexo}}</span>\n  </div>\n</body>\n\n</html>",
        "oldoldtemplate": "<!-- \n  <data-source>\n  {\n    \"template\" : \"\",\n    \"dataSources\" : [ \n        {\n            \"key\" : \"cabeÃ§alho\",\n            \"dataSource\" : \"Participant\"\n        }, \n        {\n            \"key\" : \"HS\",\n            \"dataSource\" : \"Activity\",\n            \"filters\" : {\n                \"statusHistory\" : {\n                    \"name\" : \"FINALIZED\",\n                    \"position\" : -1\n                },\n                \"acronym\" : \"TF\",\n                \"category\" : \"C0\"\n            }\n        }\n    ]\n}\n</data-source>\n\n -->\n<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n  <title>Document</title>\n</head>\n\n<body>\n  <div>\n\n    <script>\n      {{\n         setup(\n            function () {\n              var data;\n\n              var calculaImc = (altura, peso) => peso / (altura * altura);\n              var obtemSexo = (sex) => sex === 'F' ? \"Feminino\" : \"Masculino\";\n\n              data.imc = calculaImc(ds.participant.width, ds.participant.peso);\n              data.sexo = obtemSexo(\"F\");\n\n              return data;\n            }\n          );\n        }}\n    </script>\n\n    <span>Participante: {{ds.participant[0].name}}</span>\n    <span>IMC do Participante: {{data.imc}}</span>\n    <span>Sexo: {{data.sexo}}</span>\n  </div>\n</body>\n\n</html>",
        "template": `
<otus-datasource>
  {
    "template": "",
    "dataSources": [
      {
        "key": "cabeçalho",
        "dataSource": "Participant"
      },
      {
        "key": "HS",
        "dataSource": "Activity",
        "filters": {
          "statusHistory": {
            "name": "FINALIZED",
            "position": -1
          },
          "acronym": "TF",
          "category": "C0"
        }
      }
    ]
  }
</otus-datasource>
<otus-script>
  {{data.imc = 15.4}}
  {{data.sexo = ""}}
  {{
    required("sexo", data.sexo, "é um campo obrigatório")
  }}
  {{
    required("imc", data.imc, "é um campo obrigatório")
  }}
  {{}}
</otus-script>

<div layout-padding>
  <span ng-style="style.participant">Participante: {{ds.participant[0].name}}</span><br>
  <span ng-style="style.imc">IMC do Participante: {{data.imc}}</span><br>
  <span ng-style="style.sexo">Sexo: {{data.sexo}}</span><br>
</div>
<md-button class="md-fab md-mini md-primary" aria-label="Eat cake">
<md-icon md-svg-icon="clipboard-check" aria-label="Preencher Atividade"></md-icon>
        </md-button>
`,
        "dataSources": {
          "participant": [
            {
              "recruitmentNumber": 3051442,
              "name": "ANDRÃƒâ€°IA APARECIDA",
              "sex": "F",
              "width": 1.5,
              "peso": 58.7,
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1977-05-04 00:00:00.000"
              },
              "fieldCenter": {
                "acronym": "ES"
              }
            }
          ]
        }
      };

      self.templateStructure.template = `
      <input class="no-print print-button button" type="button" value="Imprimir" onclick="window.print()">
        ${self.templateStructure.template}
    `

      var scope = $rootScope.$new();
      scope.template = self.templateStructure.template;
      // scope.template = "<div><div><div><div><div></div></div></div></div></div>";
      scope.setup = function(cb) { console.log('cb',cb); scope.data = cb()}
      scope.fieldRequiredArray = [];
      scope.style = {}
      scope.required = function(fieldName, value, msg){ 
        var requiredStyle = {"color":"red", "content": "Joe's Task:"};
        var defaultStyle = {};//{"color": "blue"};

        if(scope.style[fieldName] === undefined){
          var field = {
            fieldName: fieldName,
            valid: value ? true: false,
            msg: msg,
          };
          scope.fieldRequiredArray.push(field);
          scope.style[fieldName] = field.valid ? defaultStyle : requiredStyle;
        }
      }
      scope.ds = self.templateStructure.dataSources;
      scope.data = {};
      //var report = $compile(LABEL_PAGE)(scope);
      var report = $compile(scope.template)(scope);
      console.log(report)
      console.log(scope)
      openInNewTab(report, scope.template)
    }

    function openInNewTab(report, textHtml){
      var newWindow = $window.open('', '_blank'); //TODO pop-under
        newWindow.document.write(`
        <html>
          <head>
            <title>Relatório: @templateLabel</title>
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">
            <style>
              @page {
                size: 210mm 297mm;
                margin: 0mm;
              }
              
              * {
                padding: 0px;
                margin: 0px;
                /*visibility: hidden;*/
              }
              
              #print-page {
                font-family: monospace;
                margin: auto;
                overflow:hidden;
              }
              
              #print-page, #print-page * {
                visibility: visible;
              }
              
              .label {
                width: 55mm;
                height: 23mm;
                margin-bottom: 3mm !important;
                position: relative;
                /* margin: auto; */
                padding: 5px 3px 3px 5px;
                background-color: #fff;
                line-height: 14px;
              }
              
              .label p {
                font-family: Verdana, Geneva, sans-serif;
                font-size: 12px;
                line-height: 15px;
                font-weight: bolder;
                letter-spacing: 0.1em;
              }
              
              .label .label-text {
                font-family: Verdana, Geneva, sans-serif;
                font-size: 10px;
                line-height: 15px;
                letter-spacing: 0.1em;
              }
              
              .label .barcode {
                position: absolute;
                top: 70%;
                left: 50%;
                bottom: 0;
                transform: translate(-50%, -5%) !important;
                background-color: white;
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
              
              .print-button:hover {
                overflow:auto;
                background-color: #448AFF;
                color: white;
              }
              
              .print-button {
                position: fixed;
                left: 15em;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                -webkit-transition-duration: 0.4s;/* Safari */
                transition-duration: 0.4s;
                cursor: pointer;
                background-color: white;
                color: black;
                border: 2px solid #448AFF;
                border-radius: 3px;
                box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
                width: 100px;
                height: 40px;
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
        `);
         angular.element(newWindow.document.body)
           .append(report);
    }
  }
}());
