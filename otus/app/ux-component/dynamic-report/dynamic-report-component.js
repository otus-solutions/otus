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
        <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style type="text/css">
  otus-script {
    display: none;
  }
  </style>
</head>

<body>
  <div>

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
    
    
    <span ng-style="style.participant">Participante: {{ds.participant[0].name}}</span><br>
    <span ng-style="style.imc">IMC do Participante: {{data.imc}}</span><br>
    <span ng-style="style.sexo">Sexo: {{data.sexo}}</span><br>
  </div>
</body>

</html>`,
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

      var scope = $rootScope.$new();
      scope.template = self.templateStructure.template;
      // scope.template = "<div><div><div><div><div></div></div></div></div></div>";
      scope.setup = function(cb) { console.log('cb',cb); scope.data = cb()}
      scope.fieldRequiredArray = [];
      scope.style = {}
      scope.required = function(fieldName, value, msg){ 
        var requiredStyle = {"color":"red", "content": "Joe's Task:"};
        var defaultStyle = {"color": "blue"};

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
        newWindow.document.write('<html><body></body></html>');
         angular.element(newWindow.document.body)
           .append(report);
    }
  }
}());
