(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.otus.uxComponent.DynamicReportService', Service);

  Service.$inject = [
    '$rootScope',
    '$compile',
    '$q'
  ];

  function Service($rootScope, $compile, $q) {
    var self = this;
    var _test;

    self.precompile = precompile;

    function precompile(report) {
      var returned = {};
      var deferred = $q.defer();
      
      self.templateStructure = self.templateStructure || {
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
        "label": "Participante - IMC",
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

      //

      self.templateStructure.template = `
      <input class="no-print print-button button" type="button" value="Imprimir" onclick="window.print()">
        ${self.templateStructure.template}
        <otus-script>
            {{data.testEndChangeScope = true}}
        </otus-script>
    `

      var scope = $rootScope.$new();
      scope.template = self.templateStructure.template;
      // scope.template = "<div><div><div><div><div></div></div></div></div></div>";
      scope.setup = function(cb) { console.log('cb',cb); scope.data = cb()}
      scope.fieldRequiredArray = [];
      scope.style = {};
      scope.fieldsError = [];
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
          if(field.valid === false){
            scope.fieldsError.push(field);
          }
        }
      }
      scope.ds = self.templateStructure.dataSources;
      scope.data = {};
      //var report = $compile(LABEL_PAGE)(scope);
      returned.compiledTemplate = $compile(scope.template)(scope);
      console.log(report)
      console.log(scope)
      //openInNewTab(report, scope.template)

      
      scope.$watch('data.testEndChangeScope', function () {
        console.log("myscope",scope)
        if(scope.data.testEndChangeScope === true){
          returned.scope = scope;
          console.log("scope.fieldsError.length",scope.fieldsError.length)
          if(scope.fieldsError && scope.fieldsError.length){
            returned.fieldsError =  scope.fieldsError;
          }
          console.log("myscope",true)
          deferred.resolve(returned);
        }
      });

      // deferred.resolve(returned);
      //return returned;
      return deferred.promise;
    }
  }
}());
