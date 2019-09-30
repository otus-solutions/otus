(function() {
  'use strict';

  angular
    .module('otusjs.report.repository')
    .service('otusjs.report.repository.ParticipantReportCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.report.core.ModuleService'
  ];

  function Service($q, ModuleService) {
    var self = this;
    var _remoteStorage = ModuleService.getParticipantReportRemoteStorage();

    //Participant Report Methods
    self.getParticipantReportList = getParticipantReportList;
    self.getFullReport = getFullReport;
    self.getActivityReport = getActivityReport;

    function getParticipantReportList(rn) {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .list(rn)
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function(e){
              request.reject(e);
            });
        });

      return request.promise;
    }

    function getFullReport(rn, id) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getReport(rn, id)
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function(e){
              request.reject(e);
            });
        });
      return request.promise;
    }

    function getActivityReport(id){
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getActivityReport(id)
            .then(function (response) {
              //retorna o dado do caminho do resultado de exame na api (teste client/api)
              console.log(response.data)
             response.data = {"_id":"5be30a1f16da480067523dfb","template":"\n<otus-script>\n  {{data.date = helper.formatDate(ds.atividade[0].getInterviewDate())}}\n  {{data.participant = ds.participant[0]}}\n  {{data.sexo = data.participant.sex.toUpperCase() === 'F' ? 'Feminino' : 'Masculino'}}\n  {{data.nascimento = helper.formatDate(ds.participant[0].birthdate.value)}}\n  {{data.exam = ds.exam[0]}}\n  {{data.examObservation = data.exam.observations[0] ? data.exam.observations[0].value : \"\"}}\n  {{data.result = helper.getObjectByArray(ds.exam[0].examResults, {'resultName': 'Proteina C'})}}\n\n  {{ required('Resultado Proteina C', data.result, 'é obrigatório.') }}\n</otus-script>\n<div>\n  <style type=\"text/css\">\n    img {\n      display: block;\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 0.5cm;\n      width: 80mm;\n    }\n\n    hr {\n      border-top: 1.5pt solid #000000;\n    }\n\n    .footer{\n      width: 100%;\n      border-top: 2.0pt solid #000000;\n      font-family: \"Arial\", \"serif\";\n      font-size: 12px;\n      text-align: center;\n      position: absolute; \n    }\n\n    .footer-1{\n      top: 260mm;\n    }\n\n    .participantInfo {\n      display: flex;\n      border-bottom: 2.0pt solid #000000;\n      margin-bottom: 1.0cm;\n    }\n\n    .column {\n      flex: 20%;\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n      margin-bottom: 0.1cm;\n    }\n\n    .contextValues {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues p:first-of-type {\n      font-size: 14px;\n    }\n\n    .contextObs {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n    }\n\n    p{\n      margin: 0.5em 0;\n    }\n  </style>\n  <header>\n    <img src=\"http://wiki.inf.otus-solutions.com.br/images/d/d4/ELSA-logo.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Proteína C Reativa ultra sensível - Soro</p>\n    <br/>\n    <p>PCR ultrassensível: {{data.result.value}} mg/L</p>\n    <br>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.examObservation\">\n      <p>Obs: {{data.examObservation}}</p>\n      <br>\n    </span>\n    <p>Metodologia: TURBIDIMETRIA</p>\n    <p>Valores de referência para avaliação em relação a risco cardiovascular:</p>\n    <p> Baixo risco: < 1.0 mg/L</p>\n    <p> Risco Intermediário: 1.0 a 3.0 mg/L</p>\n    <p> Alto risco: > 3.0 mg/L</p>\n    <br>\n    <hr>\n  </section>\n\n  <footer class=\"footer footer-1\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491</p>\n  </footer>\n\n</div>\n","label":"PCR (Lab. Central)","sender":"diogo.rosas.ferreira@gmail.com","sendingDate":"2018-11-07T15:51:59.246Z","fieldCenter":["SP","RS","RJ","MG","ES","BA"],"dataSources":[{"key":"participant","dataSource":"Participant","label":"Informações do participante","result":[{"recruitmentNumber":3051442,"name":"ANDRÉIA APARECIDA","sex":"F","birthdate":{"objectType":"ImmutableDate","value":"1977-05-04 00:00:00.000"},"fieldCenter":{"name":null,"code":null,"acronym":"MG","country":null,"state":null,"address":null,"complement":null,"zip":null,"phone":null,"backgroundColor":null,"borderColor":null}}],"optional":false},{"filters":{"acronym":"CSJ","category":"C0","statusHistory":{"name":"FINALIZED","position":-1}},"key":"atividade","dataSource":"Activity","label":"Formulario CSJ com status igual a finalizado","result":[{"statusHistory":[{"objectType":"ActivityStatus","name":"CREATED","date":"2018-05-07T18:44:10.846Z","user":{"name":"Ligia Maria","surname":"Giongo Fedeli","phone":"11981615707","email":"ligiamgfedeli@gmail.com"}},{"objectType":"ActivityStatus","name":"OPENED","date":"2018-05-09T20:18:12.708Z","user":{"name":"Diogo","surname":"Ferreira","phone":"5193034655","email":"diogo.rosas.ferreira@gmail.com"}},{"objectType":"ActivityStatus","name":"INITIALIZED_ONLINE","date":"2018-05-09T20:18:13.743Z","user":{"name":"Diogo","surname":"Ferreira","phone":"5193034655","email":"diogo.rosas.ferreira@gmail.com"}},{"objectType":"ActivityStatus","name":"FINALIZED","date":"2018-05-09T20:18:28.856Z","user":{"name":"Diogo","surname":"Ferreira","phone":"5193034655","email":"diogo.rosas.ferreira@gmail.com"}}],"mode":"ONLINE"}],"optional":false},{"filters":{"examName":"ELSA TURBISORO","fieldCenter":"SP"},"key":"exam","dataSource":"Exam","label":"Proteína C Reativa ultrasenssível","result":[null],"optional":false}]}
             //mockamos o retorno com o objeto que vai retornar futuramente do banco
             console.log(response.data)
             request.resolve(response.data);
            })
            .catch(function(e){
              request.reject(e);
            });
        });
      return request.promise;
    }
  }
}());
