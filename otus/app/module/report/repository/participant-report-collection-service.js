(function () {
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
            .catch(function (e) {
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
            .catch(function (e) {
              request.reject(e);
            });
        });
      return request.promise;
    }

    function getActivityReport(id) {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getActivityReport(id)
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });
      return request.promise;
    }
  }
}());

// (function () {
//   'use strict';
//
//   angular
//     .module('otusjs.report.repository')
//     .service('otusjs.report.repository.ParticipantReportCollectionService', Service);
//
//   Service.$inject = [
//     '$q',
//     'otusjs.report.core.ModuleService'
//   ];
//
//   function Service($q, ModuleService) {
//     var self = this;
//     var _remoteStorage = ModuleService.getParticipantReportRemoteStorage();
//
//     //Participant Report Methods
//     self.getParticipantReportList = getParticipantReportList;
//     self.getFullReport = getFullReport;
//     self.getActivityReport = getActivityReport;
//
//     function getParticipantReportList(rn) {
//       var request = $q.defer();
//       _remoteStorage
//         .whenReady()
//         .then(function (remoteStorage) {
//           return remoteStorage
//             .list(rn)
//             .then(function (response) {
//               request.resolve(response.data);
//             })
//             .catch(function (e) {
//               request.reject(e);
//             });
//         });
//
//       return request.promise;
//     }
//
//     function getFullReport(rn, id) {
//       var request = $q.defer();
//
//       _remoteStorage
//         .whenReady()
//         .then(function (remoteStorage) {
//           return remoteStorage
//             .getReport(rn, id)
//             .then(function (response) {
//               request.resolve(response.data);
//             })
//             .catch(function (e) {
//               request.reject(e);
//             });
//         });
//       return request.promise;
//     }
//
//     function getActivityReport(id) {
//       var request = $q.defer();
//       _remoteStorage
//         .whenReady()
//         .then(function (remoteStorage) {
//           return remoteStorage
//             .getActivityReport(id)
//             .then(function (response) {
//               _getMockResponse(response, "pd");
//               request.resolve(response.data);
//             })
//             .catch(function (e) {
//               request.reject(e);
//             });
//         });
//       return request.promise;
//     }
//
//     function _getMockResponse(response, state) {
//       if (state === "ok")
//         return response.data = {
//           "_id": "5be30a1916da480067523df9",
//           "template": "  \n\u003cotus-script\u003e\n  {{data.date \u003d helper.formatDate(ds.atividade[0].getInterviewDate())}}\n  {{data.participant \u003d ds.participant[0]}}\n  {{data.sexo \u003d data.participant.sex.toUpperCase() \u003d\u003d\u003d \u0027F\u0027 ? \u0027Feminino\u0027 : \u0027Masculino\u0027}}\n  {{data.nascimento \u003d helper.formatDate(ds.participant[0].birthdate.value)}}\n  \n  {{data.exameUreiaSanque \u003d ds.exameUreiaSanque[0]}}\n  {{data.exameUreiaSanqueObs \u003d data.exameUreiaSanque.observations[0] ? data.exameUreiaSanque.observations[0].value : \"\"}}\n  {{data.resultadoUreia \u003d helper.getObjectByArray(data.exameUreiaSanque.examResults, \u0027resultName\u0027, \u0027URÉIA...................................:\u0027)}}\n\n  {{data.exameCreatininaSangue \u003d ds.exameCreatininaSangue[0]}}\n  {{data.exameCreatininaSangueObs \u003d data.exameCreatininaSangue.observations[0] ? data.exameCreatininaSangue.observations[0].value : \"\"}}\n  {{data.resultadoCreatinina \u003d helper.getObjectByArray(data.exameCreatininaSangue.examResults, \u0027resultName\u0027, \u0027CREATININA..............................:\u0027)}}\n\n  {{data.exameELSAB12 \u003d ds.exameELSAB12[0]}}\n  {{data.exameELSAB12Obs \u003d data.exameELSAB12.observations[0] ? data.exameELSAB12.observations[0].value : \"\"}}\n  {{data.resultadoVitaminaB12 \u003d helper.getObjectByArray(data.exameELSAB12.examResults, \u0027resultName\u0027, \u0027VITAMINA B12:\u0027)}}\n\n  {{data.exameAspartatoTransaminase \u003d ds.exameAspartatoTransaminase[0]}}\n  {{data.exameAspartatoTransaminaseObs \u003d data.exameAspartatoTransaminase.observations[0] ? data.exameAspartatoTransaminase.observations[0].value : \"\"}}\n  {{data.resultadoAspartatoTransaminase \u003d helper.getObjectByArray(data.exameAspartatoTransaminase.examResults, \u0027resultName\u0027, \u0027ASPARTATO TRANSAMINASE..................:\u0027)}}\n\n  {{data.exameAlaninaTransaminase \u003d ds.exameAlaninaTransaminase[0]}}\n  {{data.exameAlaninaTransaminaseObs \u003d data.exameAlaninaTransaminase.observations[0] ? data.exameAlaninaTransaminase.observations[0].value : \"\"}}\n  {{data.resultadoAlaninaTransaminase \u003d helper.getObjectByArray(data.exameAlaninaTransaminase.examResults, \u0027resultName\u0027, \u0027ALANINA TRANSAMINASE....................:\u0027)}}\n\n  {{data.exameGamaGlutamilTransferase \u003d ds.exameGamaGlutamilTransferase[0]}}\n  {{data.exameGamaGlutamilTransferaseObs \u003d data.exameGamaGlutamilTransferase.observations[0] ? data.exameGamaGlutamilTransferase.observations[0].value : \"\"}}\n  {{data.resultadoGamaGT \u003d helper.getObjectByArray(data.exameGamaGlutamilTransferase.examResults, \u0027resultName\u0027, \u0027GAMA GT.................................:\u0027)}}\n\n  {{data.exameAcidoUrico \u003d ds.exameAcidoUrico[0]}}\n  {{data.exameAcidoUricoObs \u003d data.exameAcidoUrico.observations[0] ? data.exameAcidoUrico.observations[0].value : \"\"}}\n  {{data.resultadoAcidoUrico \u003d helper.getObjectByArray(data.exameAcidoUrico.examResults, \u0027resultName\u0027, \u0027ÁCIDO ÚRICO.............................:\u0027)}}\n\n  {{data.exameColesterolTotalFracoes \u003d ds.exameColesterolTotalFracoes[0]}}\n  {{data.exameColesterolTotalFracoesObs \u003d data.exameColesterolTotalFracoes.observations[0] ? data.exameColesterolTotalFracoes.observations[0].value : \"\"}}\n  {{data.resultadoColesterolTotal \u003d helper.getObjectByArray(data.exameColesterolTotalFracoes.examResults, \u0027resultName\u0027, \u0027COLESTEROL TOTAL........................:\u0027)}}\n  {{data.resultadoHdlColesterol \u003d helper.getObjectByArray(data.exameColesterolTotalFracoes.examResults, \u0027resultName\u0027, \u0027HDL COLESTEROL..........................:\u0027)}}\n  {{data.resultadoLdlColesterol \u003d helper.getObjectByArray(data.exameColesterolTotalFracoes.examResults, \u0027resultName\u0027, \u0027LDL COLESTEROL..........................:\u0027)}}\n\n  {{data.exameTriglicerides \u003d ds.exameTriglicerides[0]}}\n  {{data.exameTrigliceridesObs \u003d data.exameTriglicerides.observations[0] ? data.exameTriglicerides.observations[0].value : \"\"}}\n  {{data.resultadoTriglicerides \u003d helper.getObjectByArray(data.exameTriglicerides.examResults, \u0027resultName\u0027, \u0027TRIGLICÉRIDES...........................:\u0027)}}\n\n  {{ required(\u0027Resultado Ureia\u0027, data.resultadoUreia, \u0027é obrigatório.\u0027) }}\n  {{ required(\u0027Resultado Creatinina\u0027, data.resultadoCreatinina, \u0027é obrigatório.\u0027) }}\n  {{ required(\u0027Resultado Aspartato Transaminase\u0027, data.resultadoAspartatoTransaminase, \u0027é obrigatório.\u0027) }}\n  {{ required(\u0027Resultado Alanina Transaminase\u0027, data.resultadoAlaninaTransaminase, \u0027é obrigatório.\u0027) }}\n  {{ required(\u0027Resultado Gama GT\u0027, data.resultadoGamaGT, \u0027é obrigatório.\u0027) }}\n  {{ required(\u0027Resultado Acido Urico\u0027, data.resultadoAcidoUrico, \u0027é obrigatório.\u0027) }}\n  {{ required(\u0027Resultado Colesterol Total\u0027, data.resultadoColesterolTotal, \u0027é obrigatório.\u0027) }}\n  {{ required(\u0027Resultado Hdl Colesterol\u0027, data.resultadoHdlColesterol, \u0027é obrigatório.\u0027) }}\n  {{ required(\u0027Resultado Ldl Colesterol\u0027, data.resultadoLdlColesterol, \u0027é obrigatório.\u0027) }}\n  {{ required(\u0027Resultado Triglicerides\u0027, data.resultadoTriglicerides, \u0027é obrigatório.\u0027) }}\n\u003c/otus-script\u003e\n\u003cdiv\u003e\n  \u003cstyle type\u003d\"text/css\"\u003e\n    img {\n      display: block;\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 0.5cm;\n      width: 80mm;\n    }\n\n    hr {\n      border-top: 1.5pt solid #000000;\n    }\n\n    .footer{\n      width: 100%;\n      border-top: 2.0pt solid #000000;\n      font-family: \"Arial\", \"serif\";\n      font-size: 12px;\n      text-align: center;\n      position: absolute; \n    }\n\n    .footer-1{ \n      top: 260mm; \n    }\n\n    .footer-2{ \n      top: 537.5mm; \n    }\n    \n    .footer-3{ \n      top: 814mm; \n    }\n\n    .participantInfo {\n      display: flex;\n      border-bottom: 2.0pt solid #000000;\n    }\n\n    .column {\n      flex: 20%;\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues p:first-of-type {\n      font-size: 14px;\n    }\n\n    .contextObs {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n    }\n\n    .break {\n      page-break-before: always;\n    }\n    p{\n      margin: 0.5em 0;\n    }\n  \u003c/style\u003e\n  \u003cheader\u003e\n    \u003c!-- TODO: Substituir imagem --\u003e\n    \u003cimg src\u003d\"http://wiki.inf.otus-solutions.com.br/images/d/d4/ELSA-logo.jpg\"\u003e\n  \u003c/header\u003e\n\n  \u003csection class\u003d\"participantInfo\"\u003e\n    \u003csection class\u003d\"column\"\u003e\n      Nome: {{data.participant.name}}\n      \u003cbr\u003e Sexo: {{data.sexo}}\n      \u003cbr\u003e Data de Nascimento: {{data.nascimento}}\n      \u003cbr\u003e\n    \u003c/section\u003e\n    \u003csection class\u003d\"column\"\u003e\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      \u003cbr\u003e Data da coleta: {{data.date}}\n    \u003c/section\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextValues\"\u003e\n    \u003cp\u003eColesterol total e Frações – Soro\u003c/p\u003e\n    \u003cbr/\u003e\n    \u003cp\u003eCOLESTEROL TOTAL: {{data.resultadoColesterolTotal.value}} mg/dL\u003c/p\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextObs\"\u003e\n    \u003cspan ng-if\u003d\"data.exameColesterolTotalFracoesObs\"\u003e\n      \u003cp\u003eObs: {{data.exameColesterolTotalFracoesObs}}\u003c/p\u003e\n      \u003cbr\u003e\n    \u003c/span\u003e\n    \u003cp\u003eMetodologia: ENZIMÁTICA COLORIMÉTRICA\u003c/p\u003e\n    \u003cp\u003eValores de referência acima de 20 anos:\u003c/p\u003e\n    \u003cp\u003eDesejável: \u003c 190 mg/dl\u003c/p\u003e\n    \u003cbr\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextValues\"\u003e\n    \u003cp\u003eHDL colesterol – Soro\u003c/p\u003e\n    \u003cbr/\u003e\n    \u003cp\u003eHDL COLESTEROL: {{data.resultadoHdlColesterol.value}} mg/dL\u003c/p\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextObs\"\u003e\n    \u003cspan ng-if\u003d\"data.exameColesterolTotalFracoesObs\"\u003e\n      \u003cp\u003eObs: {{data.exameColesterolTotalFracoesObs}}\u003c/p\u003e\n      \u003cbr\u003e\n    \u003c/span\u003e\n    \u003cp\u003eMetodologia: ENZIMÁTICA COLORIMÉTRICA\u003c/p\u003e\n    \u003cp\u003eValores de referência acima de 20 anos:\u003c/p\u003e\n    \u003cp\u003eDesejável: \u003e 40 mg/dl\u003c/p\u003e\n    \u003cbr\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextValues\"\u003e\n    \u003cp\u003eLDL colesterol – Soro\u003c/p\u003e\n    \u003cbr/\u003e\n    \u003cp\u003eLDL COLESTEROL: {{data.resultadoLdlColesterol.value}} mg/dL\u003c/p\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextObs\"\u003e\n    \u003cspan ng-if\u003d\"data.exameColesterolTotalFracoesObs\"\u003e\n      \u003cp\u003eObs: {{data.exameColesterolTotalFracoesObs}}\u003c/p\u003e\n      \u003cbr\u003e\n    \u003c/span\u003e\n    \u003cp\u003eMetodologia: CÁLCULO FRIEDWALD\u003c/p\u003e\n    \u003cp\u003eValores de referência acima de 20 anos:\u003c/p\u003e\n    \u003cp\u003eÓtimo: \u003c 100 mg/dL\u003c/p\u003e\n    \u003cp\u003eDesejável \u003c 130 mg/dL\u003c/p\u003e\n    \u003cbr\u003e\n    \u003chr\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextValues\"\u003e\n    \u003cp\u003eTriglicérides – Soro\u003c/p\u003e\n    \u003cbr/\u003e\n    \u003cp\u003eTRIGLICÉRIDES: {{data.resultadoTriglicerides.value}} mg/dL\u003c/p\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextObs\"\u003e\n    \u003cspan ng-if\u003d\"data.exameTrigliceridesObs\"\u003e\n      \u003cp\u003eObs: {{data.exameTrigliceridesObs}}\u003c/p\u003e\n      \u003cbr\u003e\n    \u003c/span\u003e\n    \u003cp\u003eMetodologia: ENZIMÁTICA COLORIMÉTRICA\u003c/p\u003e\n    \u003cp\u003eValores de referência acima de 20 anos:\u003c/p\u003e\n    \u003cp\u003eDesejável \u003c 150 mg/dL\u003c/p\u003e\n    \u003cp\u003eOBS.: Os valores de referência descritos neste laudo estão de acordo a Atualização da Diretriz Brasileira de Dislipidemias\n      e Prevenção da Aterosclerose 2017 para prevenção primária (sem doença cardiovascular prévia). Conforme categoria de\n      risco cardiovascular, o médico poderá definir valores de metas individualizadas.\u003c/p\u003e\n  \u003c/section\u003e\n\n  \u003cfooter class\u003d\"footer footer-1\"\u003e\n    \u003cp\u003eResponsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Pagina 1\u003c/p\u003e\n  \u003c/footer\u003e\n\n  \u003cp class\u003d\"break\"\u003e\u003c/p\u003e\n  \u003c!-- PAGE 1 END --\u003e\n\n  \u003cheader\u003e\n    \u003c!-- TODO: Substituir imagem --\u003e\n    \u003cimg src\u003d\"https://image.ibb.co/iw30bc/logo_Elsa.jpg\"\u003e\n  \u003c/header\u003e\n\n  \u003csection class\u003d\"participantInfo\"\u003e\n    \u003csection class\u003d\"column\"\u003e\n      Nome: {{data.participant.name}}\n      \u003cbr\u003e Sexo: {{data.sexo}}\n      \u003cbr\u003e Data de Nascimento: {{data.nascimento}}\n      \u003cbr\u003e\n    \u003c/section\u003e\n    \u003csection class\u003d\"column\"\u003e\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      \u003cbr\u003e Data da coleta: {{data.date}}\n    \u003c/section\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextValues\"\u003e\n    \u003cp\u003eAspartato transaminase (AST) – Soro\u003c/p\u003e\n    \u003cbr/\u003e\n    \u003cp\u003eASPARTATO TRANSAMINASE: {{data.resultadoAspartatoTransaminase.value}} U/L\u003c/p\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextObs\"\u003e\n    \u003cspan ng-if\u003d\"data.exameAspartatoTransaminaseObs\"\u003e\n      \u003cp\u003eObs: {{data.exameAspartatoTransaminaseObs}}\u003c/p\u003e\n      \u003cbr\u003e\n    \u003c/span\u003e\n    \u003cp\u003eMetodologia: ENZIMÁTICA AUTOMATIZADA (IFCC MODIFICADA)\u003c/p\u003e\n    \u003cp\u003eValores de referência:\u003c/p\u003e\n    \u003cp\u003eHOMENS: até 40 U/L\u003c/p\u003e\n    \u003cp\u003eMULHERES: até 32 U/L\u003c/p\u003e\n    \u003cbr\u003e\n    \u003chr\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextValues\"\u003e\n    \u003cp\u003eAlanina transaminase (ALT) – Soro\u003c/p\u003e\n    \u003cbr/\u003e\n    \u003cp\u003eALANINA TRANSAMINASE: {{data.resultadoAlaninaTransaminase.value}} U/L\u003c/p\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextObs\"\u003e\n    \u003cspan ng-if\u003d\"data.exameAlaninaTransaminaseObs\"\u003e\n      \u003cp\u003eObs: {{data.exameAlaninaTransaminaseObs}}\u003c/p\u003e\n      \u003cbr\u003e\n    \u003c/span\u003e\n    \u003cp\u003eMetodologia: ENZIMÁTICA AUTOMATIZADA (IFCC MODIFICADA)\u003c/p\u003e\n    \u003cp\u003eValores de referência:\u003c/p\u003e\n    \u003cp\u003eHOMENS: até 41 U/L\u003c/p\u003e\n    \u003cp\u003eMULHERES: até 33 U/L\u003c/p\u003e\n    \u003cbr\u003e\n    \u003chr\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextValues\"\u003e\n    \u003cp\u003eGama glutamil transferase (Gama GT) – Soro\u003c/p\u003e\n    \u003cbr/\u003e\n    \u003cp\u003eGAMA GT: {{data.resultadoGamaGT.value}} U/L\u003c/p\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextObs\"\u003e\n    \u003cspan ng-if\u003d\"data.exameGamaGlutamilTransferaseObs\"\u003e\n      \u003cp\u003eObs: {{data.exameGamaGlutamilTransferaseObs}}\u003c/p\u003e\n      \u003cbr\u003e\n    \u003c/span\u003e\n    \u003cp\u003eMetodologia: CINÉTICA COLORIMÉTRICA AUTOMATIZADA (SZACZ - IFCC)\u003c/p\u003e\n    \u003cp\u003eValores de referência:\u003c/p\u003e\n    \u003cp\u003eHOMENS: 8 a 61 U/L\u003c/p\u003e\n    \u003cp\u003eMULHERES: 5 a 36 U/L\u003c/p\u003e\n    \u003cbr\u003e\n    \u003chr\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextValues\"\u003e\n    \u003cp\u003eUréia – Soro\u003c/p\u003e\n    \u003cbr/\u003e\n    \u003cp\u003eURÉIA: {{data.resultadoUreia.value}} mg/dL\u003c/p\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextObs\"\u003e\n    \u003cspan ng-if\u003d\"data.exameUreiaSanqueObs\"\u003e\n      \u003cp\u003eObs: {{data.exameUreiaSanqueObs}}\u003c/p\u003e\n      \u003cbr\u003e\n    \u003c/span\u003e\n    \u003cp\u003eMetodologia: CINÉTICA AUTOMATIZADA (UREASE E GLUTAMATO DESIDROGENASE)\u003c/p\u003e\n    \u003cp\u003eValores de referência:\u003c/p\u003e\n    \u003cp\u003e17 a 49 mg/dL\u003c/p\u003e\n  \u003c/section\u003e\n\n  \u003cfooter class\u003d\"footer footer-2\"\u003e\n    \u003cp\u003eResponsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Página 2\u003c/p\u003e\n  \u003c/footer\u003e\n  \u003cp class\u003d\"break\"\u003e\u003c/p\u003e\n  \u003c!-- PAGE 2 END --\u003e\n\n  \u003cheader\u003e\n    \u003c!-- TODO: Substituir imagem --\u003e\n    \u003cimg src\u003d\"https://image.ibb.co/iw30bc/logo_Elsa.jpg\"\u003e\n  \u003c/header\u003e\n\n  \u003csection class\u003d\"participantInfo\"\u003e\n    \u003csection class\u003d\"column\"\u003e\n      Nome: {{data.participant.name}}\n      \u003cbr\u003e Sexo: {{data.sexo}}\n      \u003cbr\u003e Data de Nascimento: {{data.nascimento}}\n      \u003cbr\u003e\n    \u003c/section\u003e\n    \u003csection class\u003d\"column\"\u003e\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      \u003cbr\u003e Data da coleta: {{data.date}}\n    \u003c/section\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextValues\"\u003e\n    \u003cp\u003eCreatinina – Soro\u003c/p\u003e\n    \u003cbr/\u003e\n    \u003cp\u003eCREATININA: {{data.resultadoCreatinina.value}} mg/dL\u003c/p\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextObs\"\u003e\n    \u003cspan ng-if\u003d\"data.exameCreatininaSangueObs\"\u003e\n      \u003cp\u003eObs: {{data.exameCreatininaSangueObs}}\u003c/p\u003e\n      \u003cbr\u003e\n    \u003c/span\u003e\n    \u003cp\u003eMetodologia: ENZIMÁTICA COLORIMÉTRICA AUTOMATIZADA (JAFFÉ SEM DESPROTEINIZAÇÃO)\u003c/p\u003e\n    \u003cp\u003eValores de referência:\u003c/p\u003e\n    \u003cp\u003eHomem: 0,70 a 1,20 mg/dL\u003c/p\u003e\n    \u003cp\u003eMulher: 0,50 a 0,90 mg/dL\u003c/p\u003e\n    \u003cbr\u003e\n    \u003chr\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextValues\"\u003e\n    \u003cp\u003eÁcido úrico – Soro\u003c/p\u003e\n    \u003cbr/\u003e\n    \u003cp\u003eÁCIDO ÚRICO: {{data.resultadoAcidoUrico.value}} mg/dL\u003c/p\u003e\n  \u003c/section\u003e\n\n  \u003csection class\u003d\"contextObs\"\u003e\n    \u003cspan ng-if\u003d\"data.exameAcidoUricoObs\"\u003e\n      \u003cp\u003eObs: {{data.exameAcidoUricoObs}}\u003c/p\u003e\n      \u003cbr\u003e\n    \u003c/span\u003e\n    \u003cp\u003eMetodologia: ENZIMÁTICA COLORIMÉTRICA\u003c/p\u003e\n    \u003cp\u003eValores de referência:\u003c/p\u003e\n    \u003cp\u003eHomens: 3,4 a 7,0 mg/dL\u003c/p\u003e\n    \u003cp\u003eMulheres: 2,4 a 5,7 mg/dL\u003c/p\u003e\n    \u003cbr\u003e\n    \u003chr\u003e\n  \u003c/section\u003e\n\n  \u003csection ng-if\u003d\"data.exameELSAB12\" class\u003d\"contextValues\"\u003e\n    \u003cp\u003eVitamina B12 – Soro\u003c/p\u003e\n    \u003cbr/\u003e\n    \u003cp\u003eVITAMINA B12: {{data.resultadoVitaminaB12.value}} pg/mL\u003c/p\u003e\n  \u003c/section\u003e\n\n  \u003csection ng-if\u003d\"data.exameELSAB12\" class\u003d\"contextObs\"\u003e\n    \u003cspan ng-if\u003d\"data.exameELSAB12Obs\"\u003e\n      \u003cp\u003eObs: {{data.exameELSAB12Obs}}\u003c/p\u003e\n      \u003cbr\u003e\n    \u003c/span\u003e\n    \u003cp\u003eMetodologia: ELETROQUIMIOLUMINESCÊNCIA\u003c/p\u003e\n    \u003cp\u003eValores de referência:\u003c/p\u003e\n    \u003cp\u003e221 a 946 pg/mL\u003c/p\u003e\n  \u003c/section\u003e\n\n  \u003cfooter class\u003d\"footer footer-3\"\u003e\n    \u003cp\u003eResponsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Página 3\u003c/p\u003e\n  \u003c/footer\u003e\n\u003c/div\u003e\n",
//           "label": "Bioquimica Soro (Lab. Central)",
//           "sender": "diogo.rosas.ferreira@gmail.com",
//           "sendingDate": "2018-11-07T15:51:53.725Z",
//           "fieldCenter": ["SP", "RS", "RJ", "MG", "ES", "BA"],
//           "dataSources": [{
//             "key": "participant",
//             "dataSource": "Participant",
//             "label": "Informações do participante",
//             "result": [{
//               "recruitmentNumber": 5001007,
//               "name": "ROZALINO CORREA MORAES",
//               "sex": "M",
//               "birthdate": {"objectType": "ImmutableDate", "value": "1954-10-11 00:00:00.000"},
//               "fieldCenter": {
//                 "name": null,
//                 "code": null,
//                 "acronym": "RS",
//                 "country": null,
//                 "state": null,
//                 "address": null,
//                 "complement": null,
//                 "zip": null,
//                 "phone": null,
//                 "backgroundColor": null,
//                 "borderColor": null
//               }
//             }],
//             "optional": false
//           }, {
//             "filters": {"acronym": "CSJ", "category": "C0", "statusHistory": {"name": "FINALIZED", "position": -1}},
//             "key": "atividade",
//             "dataSource": "Activity",
//             "label": "Formulario CSJ com status igual a finalizado",
//             "result": [{
//               "statusHistory": [{
//                 "objectType": "ActivityStatus",
//                 "name": "CREATED",
//                 "date": "2018-05-30T22:16:24.903Z",
//                 "user": {
//                   "name": "Diogo",
//                   "surname": "Ferreira",
//                   "phone": "5193034655",
//                   "email": "diogo.rosas.ferreira@gmail.com"
//                 }
//               }, {
//                 "objectType": "ActivityStatus",
//                 "name": "INITIALIZED_OFFLINE",
//                 "date": "2018-03-01T22:15:56.368Z",
//                 "user": {"name": "Bruce", "surname": "Duncan", "phone": "51997123127", "email": "bbduncan@ufrgs.br"}
//               }, {
//                 "objectType": "ActivityStatus",
//                 "name": "OPENED",
//                 "date": "2018-05-30T22:16:29.179Z",
//                 "user": {
//                   "name": "Diogo",
//                   "surname": "Ferreira",
//                   "phone": "5193034655",
//                   "email": "diogo.rosas.ferreira@gmail.com"
//                 }
//               }, {
//                 "objectType": "ActivityStatus",
//                 "name": "INITIALIZED_ONLINE",
//                 "date": "2018-05-30T22:16:30.347Z",
//                 "user": {
//                   "name": "Diogo",
//                   "surname": "Ferreira",
//                   "phone": "5193034655",
//                   "email": "diogo.rosas.ferreira@gmail.com"
//                 }
//               }, {
//                 "objectType": "ActivityStatus",
//                 "name": "FINALIZED",
//                 "date": "2018-05-30T22:16:48.615Z",
//                 "user": {
//                   "name": "Diogo",
//                   "surname": "Ferreira",
//                   "phone": "5193034655",
//                   "email": "diogo.rosas.ferreira@gmail.com"
//                 }
//               }], "mode": "PAPER"
//             }],
//             "optional": false
//           }, {
//             "filters": {"examName": "URÉIA - SANGUE", "fieldCenter": "SP"},
//             "key": "exameUreiaSanque",
//             "dataSource": "Exam",
//             "label": "Resultados de Uréia - Sangue",
//             "result": [{
//               "_id": "5b16b844e103cf0780cd113d",
//               "examSendingLotId": "5b16b844e103cf0780cd113c",
//               "objectType": "Exam",
//               "name": "URÉIA - SANGUE",
//               "examResults": [{
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd113d",
//                 "_id": "5bd34f9b9bdf61326c1641cd",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "URÉIA - SANGUE",
//                 "resultName": "URÉIA...................................:",
//                 "value": "404",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd113d",
//                 "_id": "5bd34f9b9bdf61326c1641f0",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "URÉIA - SANGUE",
//                 "resultName": "URÉIA...................................:",
//                 "value": "1901",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd113d",
//                 "_id": "5bd352ca9bdf61326c16421e",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "ELSA INS - INSULINA JEJUM",
//                 "resultName": "Insulina jejum : ",
//                 "value": "628",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1940-06-27 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd113d",
//                 "_id": "5bd354569bdf61326c16421f",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "ELSA INS - INSULINA JEJUM",
//                 "resultName": "Insulina jejum : ",
//                 "value": "427",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1940-06-27 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd113d",
//                 "_id": "5bd355e49bdf61326c164220",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "ELSA INS - INSULINA JEJUM",
//                 "resultName": "Insulina jejum : ",
//                 "value": "96",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1940-06-27 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd113d",
//                 "_id": "5bd35ba29bdf61326c16431b",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "ELSA 3FT",
//                 "resultName": "Insulina jejum : ",
//                 "value": "848",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1940-06-27 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd113d",
//                 "_id": "5bd35c1a9bdf61326c16431d",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "ELSA 3FT",
//                 "resultName": "Insulina jejum : ",
//                 "value": "1330",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1940-06-27 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd113d",
//                 "_id": "5bd35cdd9bdf61326c16431e",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "ELSA 3FT",
//                 "resultName": "URÉIA...................................:",
//                 "value": "404",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }],
//               "observations": [{
//                 "objectType": "ExamObservation",
//                 "name": "OBS:",
//                 "value": "Teste de observação (Antonio)"
//               }]
//             }],
//             "optional": false
//           }, {
//             "filters": {"examName": "CREATININA - SANGUE", "fieldCenter": "SP"},
//             "key": "exameCreatininaSangue",
//             "dataSource": "Exam",
//             "label": "Resultados de Creatinina - Sangue",
//             "result": [{
//               "_id": "5b16b844e103cf0780cd113e",
//               "examSendingLotId": "5b16b844e103cf0780cd113c",
//               "objectType": "Exam",
//               "name": "CREATININA - SANGUE",
//               "examResults": [{
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd113e",
//                 "_id": "5bd34f9b9bdf61326c1641ce",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "CREATININA - SANGUE",
//                 "resultName": "CREATININA..............................:",
//                 "value": "1530",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd113e",
//                 "_id": "5bd34f9b9bdf61326c1641f1",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "CREATININA - SANGUE",
//                 "resultName": "CREATININA..............................:",
//                 "value": "1041",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }],
//               "observations": [{
//                 "objectType": "ExamObservation",
//                 "name": "OBS:",
//                 "value": "Teste de observação (Antonio)"
//               }]
//             }],
//             "optional": false
//           }, {
//             "filters": {"examName": "ELSA B12", "fieldCenter": "SP"},
//             "key": "exameELSAB12",
//             "dataSource": "Exam",
//             "label": "Resultados de ELSA B12",
//             "result": [{
//               "_id": "5b16b844e103cf0780cd1148",
//               "examSendingLotId": "5b16b844e103cf0780cd113c",
//               "objectType": "Exam",
//               "name": "ELSA B12",
//               "examResults": [{
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1148",
//                 "_id": "5bd34f9b9bdf61326c1641da",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "ELSA B12",
//                 "resultName": "VITAMINA B12:",
//                 "value": "520",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "F",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-02-22 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1148",
//                 "_id": "5bd34f9b9bdf61326c1641fd",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "ELSA B12",
//                 "resultName": "VITAMINA B12:",
//                 "value": "1246",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "F",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-02-22 00:00:00.000"}
//               }],
//               "observations": [{
//                 "objectType": "ExamObservation",
//                 "name": "OBS:",
//                 "value": "Teste de observação (Maria)"
//               }]
//             }],
//             "optional": true
//           }, {
//             "filters": {"examName": "ASPARTATO TRANSAMINASE(TGO/AST)-SANGUE", "fieldCenter": "SP"},
//             "key": "exameAspartatoTransaminase",
//             "dataSource": "Exam",
//             "label": "Resultados de Aspartato Transaminase (TGO/AST)",
//             "result": [{
//               "_id": "5b16b844e103cf0780cd1141",
//               "examSendingLotId": "5b16b844e103cf0780cd113c",
//               "objectType": "Exam",
//               "name": "ASPARTATO TRANSAMINASE(TGO/AST)-SANGUE",
//               "examResults": [{
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1141",
//                 "_id": "5bd34f9b9bdf61326c1641d0",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "ASPARTATO TRANSAMINASE(TGO/AST)-SANGUE",
//                 "resultName": "ASPARTATO TRANSAMINASE..................:",
//                 "value": "141",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1141",
//                 "_id": "5bd34f9b9bdf61326c1641f3",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "ASPARTATO TRANSAMINASE(TGO/AST)-SANGUE",
//                 "resultName": "ASPARTATO TRANSAMINASE..................:",
//                 "value": "490",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }],
//               "observations": [{
//                 "objectType": "ExamObservation",
//                 "name": "OBS:",
//                 "value": "Teste de observação (Antonio)"
//               }]
//             }],
//             "optional": false
//           }, {
//             "filters": {"examName": "ALANINA TRANSAMINASE (TGP/ALT) - SANGUE", "fieldCenter": "SP"},
//             "key": "exameAlaninaTransaminase",
//             "dataSource": "Exam",
//             "label": "Resultados de Alanina Transaminase (TGP/ALT)",
//             "result": [{
//               "_id": "5b16b844e103cf0780cd1142",
//               "examSendingLotId": "5b16b844e103cf0780cd113c",
//               "objectType": "Exam",
//               "name": "ALANINA TRANSAMINASE (TGP/ALT) - SANGUE",
//               "examResults": [{
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1142",
//                 "_id": "5bd34f9b9bdf61326c1641d1",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "ALANINA TRANSAMINASE (TGP/ALT) - SANGUE",
//                 "resultName": "ALANINA TRANSAMINASE....................:",
//                 "value": "349",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1142",
//                 "_id": "5bd34f9b9bdf61326c1641f4",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "ALANINA TRANSAMINASE (TGP/ALT) - SANGUE",
//                 "resultName": "ALANINA TRANSAMINASE....................:",
//                 "value": "1753",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }],
//               "observations": [{
//                 "objectType": "ExamObservation",
//                 "name": "OBS:",
//                 "value": "Teste de observação (Antonio)"
//               }]
//             }],
//             "optional": false
//           }, {
//             "filters": {"examName": "GAMA GLUTAMIL TRANSFERASE - SANGUE", "fieldCenter": "SP"},
//             "key": "exameGamaGlutamilTransferase",
//             "dataSource": "Exam",
//             "label": "Resultados de Gama Glutamil Transferase",
//             "result": [{
//               "_id": "5b16b844e103cf0780cd1143",
//               "examSendingLotId": "5b16b844e103cf0780cd113c",
//               "objectType": "Exam",
//               "name": "GAMA GLUTAMIL TRANSFERASE - SANGUE",
//               "examResults": [{
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1143",
//                 "_id": "5bd34f9b9bdf61326c1641d2",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "GAMA GLUTAMIL TRANSFERASE - SANGUE",
//                 "resultName": "GAMA GT.................................:",
//                 "value": "1841",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1143",
//                 "_id": "5bd34f9b9bdf61326c1641f5",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "GAMA GLUTAMIL TRANSFERASE - SANGUE",
//                 "resultName": "GAMA GT.................................:",
//                 "value": "2057",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }],
//               "observations": [{
//                 "objectType": "ExamObservation",
//                 "name": "OBS:",
//                 "value": "Teste de observação (Antonio)"
//               }]
//             }],
//             "optional": false
//           }, {
//             "filters": {"examName": "ÁCIDO ÚRICO - SANGUE", "fieldCenter": "SP"},
//             "key": "exameAcidoUrico",
//             "dataSource": "Exam",
//             "label": "Resultados de Ácido Úrico",
//             "result": [{
//               "_id": "5b16b844e103cf0780cd1144",
//               "examSendingLotId": "5b16b844e103cf0780cd113c",
//               "objectType": "Exam",
//               "name": "ÁCIDO ÚRICO - SANGUE",
//               "examResults": [{
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1144",
//                 "_id": "5bd34f9b9bdf61326c1641d3",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "ÁCIDO ÚRICO - SANGUE",
//                 "resultName": "ÁCIDO ÚRICO.............................:",
//                 "value": "1233",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1144",
//                 "_id": "5bd34f9b9bdf61326c1641f6",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "ÁCIDO ÚRICO - SANGUE",
//                 "resultName": "ÁCIDO ÚRICO.............................:",
//                 "value": "754",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }],
//               "observations": [{
//                 "objectType": "ExamObservation",
//                 "name": "OBS:",
//                 "value": "Teste de observação (Antonio)"
//               }]
//             }],
//             "optional": false
//           }, {
//             "filters": {"examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE", "fieldCenter": "SP"},
//             "key": "exameColesterolTotalFracoes",
//             "dataSource": "Exam",
//             "label": "Resultados de Colesterol Total e Frações",
//             "result": [{
//               "_id": "5b16b844e103cf0780cd1145",
//               "examSendingLotId": "5b16b844e103cf0780cd113c",
//               "objectType": "Exam",
//               "name": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
//               "examResults": [{
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1145",
//                 "_id": "5bd34f9b9bdf61326c1641d4",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
//                 "resultName": "COLESTEROL NÃO HDL......................:",
//                 "value": "348",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1145",
//                 "_id": "5bd34f9b9bdf61326c1641d5",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
//                 "resultName": "COLESTEROL TOTAL........................:",
//                 "value": "2108",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1145",
//                 "_id": "5bd34f9b9bdf61326c1641d6",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
//                 "resultName": "HDL COLESTEROL..........................:",
//                 "value": "1035",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1145",
//                 "_id": "5bd34f9b9bdf61326c1641d7",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
//                 "resultName": "LDL COLESTEROL..........................:",
//                 "value": "1531",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1145",
//                 "_id": "5bd34f9b9bdf61326c1641f7",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
//                 "resultName": "COLESTEROL NÃO HDL......................:",
//                 "value": "607",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1145",
//                 "_id": "5bd34f9b9bdf61326c1641f8",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
//                 "resultName": "COLESTEROL TOTAL........................:",
//                 "value": "1772",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1145",
//                 "_id": "5bd34f9b9bdf61326c1641f9",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
//                 "resultName": "HDL COLESTEROL..........................:",
//                 "value": "507",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1145",
//                 "_id": "5bd34f9b9bdf61326c1641fa",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
//                 "resultName": "LDL COLESTEROL..........................:",
//                 "value": "426",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }],
//               "observations": [{
//                 "objectType": "ExamObservation",
//                 "name": "OBS:",
//                 "value": "Teste de observação (Antonio)"
//               }]
//             }],
//             "optional": false
//           }, {
//             "filters": {"examName": "TRIGLICÉRIDES - SANGUE", "fieldCenter": "SP"},
//             "key": "exameTriglicerides",
//             "dataSource": "Exam",
//             "label": "Resultados de Triglicérides",
//             "result": [{
//               "_id": "5b16b844e103cf0780cd1140",
//               "examSendingLotId": "5b16b844e103cf0780cd113c",
//               "objectType": "Exam",
//               "name": "TRIGLICÉRIDES - SANGUE",
//               "examResults": [{
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1140",
//                 "_id": "5bd34f9b9bdf61326c1641cf",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "TRIGLICÉRIDES - SANGUE",
//                 "resultName": "TRIGLICÉRIDES...........................:",
//                 "value": "239",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }, {
//                 "examSendingLotId": "5b16b844e103cf0780cd113c",
//                 "examId": "5b16b844e103cf0780cd1140",
//                 "_id": "5bd34f9b9bdf61326c1641f2",
//                 "objectType": "ExamResults",
//                 "aliquotCode": "3530000719",
//                 "examName": "TRIGLICÉRIDES - SANGUE",
//                 "resultName": "TRIGLICÉRIDES...........................:",
//                 "value": "1648",
//                 "aliquotValid": true,
//                 "releaseDate": "2018-01-03T13:43:00.000Z",
//                 "observations": [],
//                 "fieldCenter": null,
//                 "recruitmentNumber": 5001007,
//                 "sex": "M",
//                 "birthdate": {"objectType": "ImmutableDate", "value": "1960-08-24 00:00:00.000"}
//               }],
//               "observations": [{
//                 "objectType": "ExamObservation",
//                 "name": "OBS:",
//                 "value": "Teste de observação (Antonio)"
//               }]
//             }],
//             "optional": false
//           }]
//         }
//
//       if (state === "pd")
//         return response.data = {
//           "_id": "5be30a1916da480067523df9",
//           "template": "  \n<otus-script>\n  {{data.date = helper.formatDate(ds.atividade[0].getInterviewDate())}}\n  {{data.participant = ds.participant[0]}}\n  {{data.sexo = data.participant.sex.toUpperCase() === 'F' ? 'Feminino' : 'Masculino'}}\n  {{data.nascimento = helper.formatDate(ds.participant[0].birthdate.value)}}\n  \n  {{data.exameUreiaSanque = ds.exameUreiaSanque[0]}}\n  {{data.exameUreiaSanqueObs = data.exameUreiaSanque.observations[0] ? data.exameUreiaSanque.observations[0].value : \"\"}}\n  {{data.resultadoUreia = helper.getObjectByArray(data.exameUreiaSanque.examResults, 'resultName', 'URÉIA...................................:')}}\n\n  {{data.exameCreatininaSangue = ds.exameCreatininaSangue[0]}}\n  {{data.exameCreatininaSangueObs = data.exameCreatininaSangue.observations[0] ? data.exameCreatininaSangue.observations[0].value : \"\"}}\n  {{data.resultadoCreatinina = helper.getObjectByArray(data.exameCreatininaSangue.examResults, 'resultName', 'CREATININA..............................:')}}\n\n  {{data.exameELSAB12 = ds.exameELSAB12[0]}}\n  {{data.exameELSAB12Obs = data.exameELSAB12.observations[0] ? data.exameELSAB12.observations[0].value : \"\"}}\n  {{data.resultadoVitaminaB12 = helper.getObjectByArray(data.exameELSAB12.examResults, 'resultName', 'VITAMINA B12:')}}\n\n  {{data.exameAspartatoTransaminase = ds.exameAspartatoTransaminase[0]}}\n  {{data.exameAspartatoTransaminaseObs = data.exameAspartatoTransaminase.observations[0] ? data.exameAspartatoTransaminase.observations[0].value : \"\"}}\n  {{data.resultadoAspartatoTransaminase = helper.getObjectByArray(data.exameAspartatoTransaminase.examResults, 'resultName', 'ASPARTATO TRANSAMINASE..................:')}}\n\n  {{data.exameAlaninaTransaminase = ds.exameAlaninaTransaminase[0]}}\n  {{data.exameAlaninaTransaminaseObs = data.exameAlaninaTransaminase.observations[0] ? data.exameAlaninaTransaminase.observations[0].value : \"\"}}\n  {{data.resultadoAlaninaTransaminase = helper.getObjectByArray(data.exameAlaninaTransaminase.examResults, 'resultName', 'ALANINA TRANSAMINASE....................:')}}\n\n  {{data.exameGamaGlutamilTransferase = ds.exameGamaGlutamilTransferase[0]}}\n  {{data.exameGamaGlutamilTransferaseObs = data.exameGamaGlutamilTransferase.observations[0] ? data.exameGamaGlutamilTransferase.observations[0].value : \"\"}}\n  {{data.resultadoGamaGT = helper.getObjectByArray(data.exameGamaGlutamilTransferase.examResults, 'resultName', 'GAMA GT.................................:')}}\n\n  {{data.exameAcidoUrico = ds.exameAcidoUrico[0]}}\n  {{data.exameAcidoUricoObs = data.exameAcidoUrico.observations[0] ? data.exameAcidoUrico.observations[0].value : \"\"}}\n  {{data.resultadoAcidoUrico = helper.getObjectByArray(data.exameAcidoUrico.examResults, 'resultName', 'ÁCIDO ÚRICO.............................:')}}\n\n  {{data.exameColesterolTotalFracoes = ds.exameColesterolTotalFracoes[0]}}\n  {{data.exameColesterolTotalFracoesObs = data.exameColesterolTotalFracoes.observations[0] ? data.exameColesterolTotalFracoes.observations[0].value : \"\"}}\n  {{data.resultadoColesterolTotal = helper.getObjectByArray(data.exameColesterolTotalFracoes.examResults, 'resultName', 'COLESTEROL TOTAL........................:')}}\n  {{data.resultadoHdlColesterol = helper.getObjectByArray(data.exameColesterolTotalFracoes.examResults, 'resultName', 'HDL COLESTEROL..........................:')}}\n  {{data.resultadoLdlColesterol = helper.getObjectByArray(data.exameColesterolTotalFracoes.examResults, 'resultName', 'LDL COLESTEROL..........................:')}}\n\n  {{data.exameTriglicerides = ds.exameTriglicerides[0]}}\n  {{data.exameTrigliceridesObs = data.exameTriglicerides.observations[0] ? data.exameTriglicerides.observations[0].value : \"\"}}\n  {{data.resultadoTriglicerides = helper.getObjectByArray(data.exameTriglicerides.examResults, 'resultName', 'TRIGLICÉRIDES...........................:')}}\n\n  {{ required('Resultado Ureia', data.resultadoUreia, 'é obrigatório.') }}\n  {{ required('Resultado Creatinina', data.resultadoCreatinina, 'é obrigatório.') }}\n  {{ required('Resultado Aspartato Transaminase', data.resultadoAspartatoTransaminase, 'é obrigatório.') }}\n  {{ required('Resultado Alanina Transaminase', data.resultadoAlaninaTransaminase, 'é obrigatório.') }}\n  {{ required('Resultado Gama GT', data.resultadoGamaGT, 'é obrigatório.') }}\n  {{ required('Resultado Acido Urico', data.resultadoAcidoUrico, 'é obrigatório.') }}\n  {{ required('Resultado Colesterol Total', data.resultadoColesterolTotal, 'é obrigatório.') }}\n  {{ required('Resultado Hdl Colesterol', data.resultadoHdlColesterol, 'é obrigatório.') }}\n  {{ required('Resultado Ldl Colesterol', data.resultadoLdlColesterol, 'é obrigatório.') }}\n  {{ required('Resultado Triglicerides', data.resultadoTriglicerides, 'é obrigatório.') }}\n</otus-script>\n<div>\n  <style type=\"text/css\">\n    img {\n      display: block;\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 0.5cm;\n      width: 80mm;\n    }\n\n    hr {\n      border-top: 1.5pt solid #000000;\n    }\n\n    .footer{\n      width: 100%;\n      border-top: 2.0pt solid #000000;\n      font-family: \"Arial\", \"serif\";\n      font-size: 12px;\n      text-align: center;\n      position: absolute; \n    }\n\n    .footer-1{ \n      top: 260mm; \n    }\n\n    .footer-2{ \n      top: 537.5mm; \n    }\n    \n    .footer-3{ \n      top: 814mm; \n    }\n\n    .participantInfo {\n      display: flex;\n      border-bottom: 2.0pt solid #000000;\n    }\n\n    .column {\n      flex: 20%;\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues p:first-of-type {\n      font-size: 14px;\n    }\n\n    .contextObs {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n    }\n\n    .break {\n      page-break-before: always;\n    }\n    p{\n      margin: 0.5em 0;\n    }\n  </style>\n  <header>\n    <!-- TODO: Substituir imagem -->\n    <img src=\"http://wiki.inf.otus-solutions.com.br/images/d/d4/ELSA-logo.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Colesterol total e Frações – Soro</p>\n    <br/>\n    <p>COLESTEROL TOTAL: {{data.resultadoColesterolTotal.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameColesterolTotalFracoesObs\">\n      <p>Obs: {{data.exameColesterolTotalFracoesObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA</p>\n    <p>Valores de referência acima de 20 anos:</p>\n    <p>Desejável: < 190 mg/dl</p>\n    <br>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>HDL colesterol – Soro</p>\n    <br/>\n    <p>HDL COLESTEROL: {{data.resultadoHdlColesterol.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameColesterolTotalFracoesObs\">\n      <p>Obs: {{data.exameColesterolTotalFracoesObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA</p>\n    <p>Valores de referência acima de 20 anos:</p>\n    <p>Desejável: > 40 mg/dl</p>\n    <br>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>LDL colesterol – Soro</p>\n    <br/>\n    <p>LDL COLESTEROL: {{data.resultadoLdlColesterol.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameColesterolTotalFracoesObs\">\n      <p>Obs: {{data.exameColesterolTotalFracoesObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: CÁLCULO FRIEDWALD</p>\n    <p>Valores de referência acima de 20 anos:</p>\n    <p>Ótimo: < 100 mg/dL</p>\n    <p>Desejável < 130 mg/dL</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Triglicérides – Soro</p>\n    <br/>\n    <p>TRIGLICÉRIDES: {{data.resultadoTriglicerides.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameTrigliceridesObs\">\n      <p>Obs: {{data.exameTrigliceridesObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA</p>\n    <p>Valores de referência acima de 20 anos:</p>\n    <p>Desejável < 150 mg/dL</p>\n    <p>OBS.: Os valores de referência descritos neste laudo estão de acordo a Atualização da Diretriz Brasileira de Dislipidemias\n      e Prevenção da Aterosclerose 2017 para prevenção primária (sem doença cardiovascular prévia). Conforme categoria de\n      risco cardiovascular, o médico poderá definir valores de metas individualizadas.</p>\n  </section>\n\n  <footer class=\"footer footer-1\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Pagina 1</p>\n  </footer>\n\n  <p class=\"break\"></p>\n  <!-- PAGE 1 END -->\n\n  <header>\n    <!-- TODO: Substituir imagem -->\n    <img src=\"https://image.ibb.co/iw30bc/logo_Elsa.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Aspartato transaminase (AST) – Soro</p>\n    <br/>\n    <p>ASPARTATO TRANSAMINASE: {{data.resultadoAspartatoTransaminase.value}} U/L</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameAspartatoTransaminaseObs\">\n      <p>Obs: {{data.exameAspartatoTransaminaseObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA AUTOMATIZADA (IFCC MODIFICADA)</p>\n    <p>Valores de referência:</p>\n    <p>HOMENS: até 40 U/L</p>\n    <p>MULHERES: até 32 U/L</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Alanina transaminase (ALT) – Soro</p>\n    <br/>\n    <p>ALANINA TRANSAMINASE: {{data.resultadoAlaninaTransaminase.value}} U/L</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameAlaninaTransaminaseObs\">\n      <p>Obs: {{data.exameAlaninaTransaminaseObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA AUTOMATIZADA (IFCC MODIFICADA)</p>\n    <p>Valores de referência:</p>\n    <p>HOMENS: até 41 U/L</p>\n    <p>MULHERES: até 33 U/L</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Gama glutamil transferase (Gama GT) – Soro</p>\n    <br/>\n    <p>GAMA GT: {{data.resultadoGamaGT.value}} U/L</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameGamaGlutamilTransferaseObs\">\n      <p>Obs: {{data.exameGamaGlutamilTransferaseObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: CINÉTICA COLORIMÉTRICA AUTOMATIZADA (SZACZ - IFCC)</p>\n    <p>Valores de referência:</p>\n    <p>HOMENS: 8 a 61 U/L</p>\n    <p>MULHERES: 5 a 36 U/L</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Uréia – Soro</p>\n    <br/>\n    <p>URÉIA: {{data.resultadoUreia.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameUreiaSanqueObs\">\n      <p>Obs: {{data.exameUreiaSanqueObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: CINÉTICA AUTOMATIZADA (UREASE E GLUTAMATO DESIDROGENASE)</p>\n    <p>Valores de referência:</p>\n    <p>17 a 49 mg/dL</p>\n  </section>\n\n  <footer class=\"footer footer-2\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Página 2</p>\n  </footer>\n  <p class=\"break\"></p>\n  <!-- PAGE 2 END -->\n\n  <header>\n    <!-- TODO: Substituir imagem -->\n    <img src=\"https://image.ibb.co/iw30bc/logo_Elsa.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Creatinina – Soro</p>\n    <br/>\n    <p>CREATININA: {{data.resultadoCreatinina.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameCreatininaSangueObs\">\n      <p>Obs: {{data.exameCreatininaSangueObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA AUTOMATIZADA (JAFFÉ SEM DESPROTEINIZAÇÃO)</p>\n    <p>Valores de referência:</p>\n    <p>Homem: 0,70 a 1,20 mg/dL</p>\n    <p>Mulher: 0,50 a 0,90 mg/dL</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Ácido úrico – Soro</p>\n    <br/>\n    <p>ÁCIDO ÚRICO: {{data.resultadoAcidoUrico.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameAcidoUricoObs\">\n      <p>Obs: {{data.exameAcidoUricoObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA</p>\n    <p>Valores de referência:</p>\n    <p>Homens: 3,4 a 7,0 mg/dL</p>\n    <p>Mulheres: 2,4 a 5,7 mg/dL</p>\n    <br>\n    <hr>\n  </section>\n\n  <section ng-if=\"data.exameELSAB12\" class=\"contextValues\">\n    <p>Vitamina B12 – Soro</p>\n    <br/>\n    <p>VITAMINA B12: {{data.resultadoVitaminaB12.value}} pg/mL</p>\n  </section>\n\n  <section ng-if=\"data.exameELSAB12\" class=\"contextObs\">\n    <span ng-if=\"data.exameELSAB12Obs\">\n      <p>Obs: {{data.exameELSAB12Obs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ELETROQUIMIOLUMINESCÊNCIA</p>\n    <p>Valores de referência:</p>\n    <p>221 a 946 pg/mL</p>\n  </section>\n\n  <footer class=\"footer footer-3\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Página 3</p>\n  </footer>\n</div>\n",
//           "label": "Bioquimica Soro (Lab. Central)",
//           "sender": "diogo.rosas.ferreira@gmail.com",
//           "sendingDate": "2018-11-07T15:51:53.725Z",
//           "fieldCenter": [
//             "SP",
//             "RS",
//             "RJ",
//             "MG",
//             "ES",
//             "BA"
//           ],
//           "dataSources": [
//             {
//               "key": "participant",
//               "dataSource": "Participant",
//               "label": "Informações do participante",
//               "result": [],
//               "optional": false
//             },
//             {
//               "filters": {
//                 "acronym": "CSJ",
//                 "category": "C0",
//                 "statusHistory": {
//                   "name": "FINALIZED",
//                   "position": -1
//                 }
//               },
//               "key": "atividade",
//               "dataSource": "Activity",
//               "label": "Formulario CSJ com status igual a finalizado",
//               "result": [],
//               "optional": false
//             },
//             {
//               "filters": {
//                 "examName": "URÉIA - SANGUE",
//                 "fieldCenter": "SP"
//               },
//               "key": "exameUreiaSanque",
//               "dataSource": "Exam",
//               "label": "Resultados de Uréia - Sangue",
//               "result": [],
//               "optional": false
//             },
//             {
//               "filters": {
//                 "examName": "CREATININA - SANGUE",
//                 "fieldCenter": "SP"
//               },
//               "key": "exameCreatininaSangue",
//               "dataSource": "Exam",
//               "label": "Resultados de Creatinina - Sangue",
//               "result": [],
//               "optional": false
//             },
//             {
//               "filters": {
//                 "examName": "ELSA B12",
//                 "fieldCenter": "SP"
//               },
//               "key": "exameELSAB12",
//               "dataSource": "Exam",
//               "label": "Resultados de ELSA B12",
//               "result": [],
//               "optional": true
//             },
//             {
//               "filters": {
//                 "examName": "ASPARTATO TRANSAMINASE(TGO/AST)-SANGUE",
//                 "fieldCenter": "SP"
//               },
//               "key": "exameAspartatoTransaminase",
//               "dataSource": "Exam",
//               "label": "Resultados de Aspartato Transaminase (TGO/AST)",
//               "result": [],
//               "optional": false
//             },
//             {
//               "filters": {
//                 "examName": "ALANINA TRANSAMINASE (TGP/ALT) - SANGUE",
//                 "fieldCenter": "SP"
//               },
//               "key": "exameAlaninaTransaminase",
//               "dataSource": "Exam",
//               "label": "Resultados de Alanina Transaminase (TGP/ALT)",
//               "result": [],
//               "optional": false
//             },
//             {
//               "filters": {
//                 "examName": "GAMA GLUTAMIL TRANSFERASE - SANGUE",
//                 "fieldCenter": "SP"
//               },
//               "key": "exameGamaGlutamilTransferase",
//               "dataSource": "Exam",
//               "label": "Resultados de Gama Glutamil Transferase",
//               "result": [],
//               "optional": false
//             },
//             {
//               "filters": {
//                 "examName": "ÁCIDO ÚRICO - SANGUE",
//                 "fieldCenter": "SP"
//               },
//               "key": "exameAcidoUrico",
//               "dataSource": "Exam",
//               "label": "Resultados de Ácido Úrico",
//               "result": [],
//               "optional": false
//             },
//             {
//               "filters": {
//                 "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
//                 "fieldCenter": "SP"
//               },
//               "key": "exameColesterolTotalFracoes",
//               "dataSource": "Exam",
//               "label": "Resultados de Colesterol Total e Frações",
//               "result": [],
//               "optional": false
//             },
//             {
//               "filters": {
//                 "examName": "TRIGLICÉRIDES - SANGUE",
//                 "fieldCenter": "SP"
//               },
//               "key": "exameTriglicerides",
//               "dataSource": "Exam",
//               "label": "Resultados de Triglicérides",
//               "result": [],
//               "optional": false
//             }
//           ]
//         }
//
//       if (state === "op"){
//         return response.data = {
//           "_id": "5be30a1916da480067523df9",
//           "template": "  \n<otus-script>\n  {{data.date = helper.formatDate(ds.atividade[0].getInterviewDate())}}\n  {{data.participant = ds.participant[0]}}\n  {{data.sexo = data.participant.sex.toUpperCase() === 'F' ? 'Feminino' : 'Masculino'}}\n  {{data.nascimento = helper.formatDate(ds.participant[0].birthdate.value)}}\n  \n  {{data.exameUreiaSanque = ds.exameUreiaSanque[0]}}\n  {{data.exameUreiaSanqueObs = data.exameUreiaSanque.observations[0] ? data.exameUreiaSanque.observations[0].value : \"\"}}\n  {{data.resultadoUreia = helper.getObjectByArray(data.exameUreiaSanque.examResults, 'resultName', 'URÉIA...................................:')}}\n\n  {{data.exameCreatininaSangue = ds.exameCreatininaSangue[0]}}\n  {{data.exameCreatininaSangueObs = data.exameCreatininaSangue.observations[0] ? data.exameCreatininaSangue.observations[0].value : \"\"}}\n  {{data.resultadoCreatinina = helper.getObjectByArray(data.exameCreatininaSangue.examResults, 'resultName', 'CREATININA..............................:')}}\n\n  {{data.exameELSAB12 = ds.exameELSAB12[0]}}\n  {{data.exameELSAB12Obs = data.exameELSAB12.observations[0] ? data.exameELSAB12.observations[0].value : \"\"}}\n  {{data.resultadoVitaminaB12 = helper.getObjectByArray(data.exameELSAB12.examResults, 'resultName', 'VITAMINA B12:')}}\n\n  {{data.exameAspartatoTransaminase = ds.exameAspartatoTransaminase[0]}}\n  {{data.exameAspartatoTransaminaseObs = data.exameAspartatoTransaminase.observations[0] ? data.exameAspartatoTransaminase.observations[0].value : \"\"}}\n  {{data.resultadoAspartatoTransaminase = helper.getObjectByArray(data.exameAspartatoTransaminase.examResults, 'resultName', 'ASPARTATO TRANSAMINASE..................:')}}\n\n  {{data.exameAlaninaTransaminase = ds.exameAlaninaTransaminase[0]}}\n  {{data.exameAlaninaTransaminaseObs = data.exameAlaninaTransaminase.observations[0] ? data.exameAlaninaTransaminase.observations[0].value : \"\"}}\n  {{data.resultadoAlaninaTransaminase = helper.getObjectByArray(data.exameAlaninaTransaminase.examResults, 'resultName', 'ALANINA TRANSAMINASE....................:')}}\n\n  {{data.exameGamaGlutamilTransferase = ds.exameGamaGlutamilTransferase[0]}}\n  {{data.exameGamaGlutamilTransferaseObs = data.exameGamaGlutamilTransferase.observations[0] ? data.exameGamaGlutamilTransferase.observations[0].value : \"\"}}\n  {{data.resultadoGamaGT = helper.getObjectByArray(data.exameGamaGlutamilTransferase.examResults, 'resultName', 'GAMA GT.................................:')}}\n\n  {{data.exameAcidoUrico = ds.exameAcidoUrico[0]}}\n  {{data.exameAcidoUricoObs = data.exameAcidoUrico.observations[0] ? data.exameAcidoUrico.observations[0].value : \"\"}}\n  {{data.resultadoAcidoUrico = helper.getObjectByArray(data.exameAcidoUrico.examResults, 'resultName', 'ÁCIDO ÚRICO.............................:')}}\n\n  {{data.exameColesterolTotalFracoes = ds.exameColesterolTotalFracoes[0]}}\n  {{data.exameColesterolTotalFracoesObs = data.exameColesterolTotalFracoes.observations[0] ? data.exameColesterolTotalFracoes.observations[0].value : \"\"}}\n  {{data.resultadoColesterolTotal = helper.getObjectByArray(data.exameColesterolTotalFracoes.examResults, 'resultName', 'COLESTEROL TOTAL........................:')}}\n  {{data.resultadoHdlColesterol = helper.getObjectByArray(data.exameColesterolTotalFracoes.examResults, 'resultName', 'HDL COLESTEROL..........................:')}}\n  {{data.resultadoLdlColesterol = helper.getObjectByArray(data.exameColesterolTotalFracoes.examResults, 'resultName', 'LDL COLESTEROL..........................:')}}\n\n  {{data.exameTriglicerides = ds.exameTriglicerides[0]}}\n  {{data.exameTrigliceridesObs = data.exameTriglicerides.observations[0] ? data.exameTriglicerides.observations[0].value : \"\"}}\n  {{data.resultadoTriglicerides = helper.getObjectByArray(data.exameTriglicerides.examResults, 'resultName', 'TRIGLICÉRIDES...........................:')}}\n\n  {{ required('Resultado Ureia', data.resultadoUreia, 'é obrigatório.') }}\n  {{ required('Resultado Creatinina', data.resultadoCreatinina, 'é obrigatório.') }}\n  {{ required('Resultado Aspartato Transaminase', data.resultadoAspartatoTransaminase, 'é obrigatório.') }}\n  {{ required('Resultado Alanina Transaminase', data.resultadoAlaninaTransaminase, 'é obrigatório.') }}\n  {{ required('Resultado Gama GT', data.resultadoGamaGT, 'é obrigatório.') }}\n  {{ required('Resultado Acido Urico', data.resultadoAcidoUrico, 'é obrigatório.') }}\n  {{ required('Resultado Colesterol Total', data.resultadoColesterolTotal, 'é obrigatório.') }}\n  {{ required('Resultado Hdl Colesterol', data.resultadoHdlColesterol, 'é obrigatório.') }}\n  {{ required('Resultado Ldl Colesterol', data.resultadoLdlColesterol, 'é obrigatório.') }}\n  {{ required('Resultado Triglicerides', data.resultadoTriglicerides, 'é obrigatório.') }}\n</otus-script>\n<div>\n  <style type=\"text/css\">\n    img {\n      display: block;\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 0.5cm;\n      width: 80mm;\n    }\n\n    hr {\n      border-top: 1.5pt solid #000000;\n    }\n\n    .footer{\n      width: 100%;\n      border-top: 2.0pt solid #000000;\n      font-family: \"Arial\", \"serif\";\n      font-size: 12px;\n      text-align: center;\n      position: absolute; \n    }\n\n    .footer-1{ \n      top: 260mm; \n    }\n\n    .footer-2{ \n      top: 537.5mm; \n    }\n    \n    .footer-3{ \n      top: 814mm; \n    }\n\n    .participantInfo {\n      display: flex;\n      border-bottom: 2.0pt solid #000000;\n    }\n\n    .column {\n      flex: 20%;\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues p:first-of-type {\n      font-size: 14px;\n    }\n\n    .contextObs {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n    }\n\n    .break {\n      page-break-before: always;\n    }\n    p{\n      margin: 0.5em 0;\n    }\n  </style>\n  <header>\n    <!-- TODO: Substituir imagem -->\n    <img src=\"http://wiki.inf.otus-solutions.com.br/images/d/d4/ELSA-logo.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Colesterol total e Frações – Soro</p>\n    <br/>\n    <p>COLESTEROL TOTAL: {{data.resultadoColesterolTotal.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameColesterolTotalFracoesObs\">\n      <p>Obs: {{data.exameColesterolTotalFracoesObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA</p>\n    <p>Valores de referência acima de 20 anos:</p>\n    <p>Desejável: < 190 mg/dl</p>\n    <br>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>HDL colesterol – Soro</p>\n    <br/>\n    <p>HDL COLESTEROL: {{data.resultadoHdlColesterol.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameColesterolTotalFracoesObs\">\n      <p>Obs: {{data.exameColesterolTotalFracoesObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA</p>\n    <p>Valores de referência acima de 20 anos:</p>\n    <p>Desejável: > 40 mg/dl</p>\n    <br>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>LDL colesterol – Soro</p>\n    <br/>\n    <p>LDL COLESTEROL: {{data.resultadoLdlColesterol.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameColesterolTotalFracoesObs\">\n      <p>Obs: {{data.exameColesterolTotalFracoesObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: CÁLCULO FRIEDWALD</p>\n    <p>Valores de referência acima de 20 anos:</p>\n    <p>Ótimo: < 100 mg/dL</p>\n    <p>Desejável < 130 mg/dL</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Triglicérides – Soro</p>\n    <br/>\n    <p>TRIGLICÉRIDES: {{data.resultadoTriglicerides.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameTrigliceridesObs\">\n      <p>Obs: {{data.exameTrigliceridesObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA</p>\n    <p>Valores de referência acima de 20 anos:</p>\n    <p>Desejável < 150 mg/dL</p>\n    <p>OBS.: Os valores de referência descritos neste laudo estão de acordo a Atualização da Diretriz Brasileira de Dislipidemias\n      e Prevenção da Aterosclerose 2017 para prevenção primária (sem doença cardiovascular prévia). Conforme categoria de\n      risco cardiovascular, o médico poderá definir valores de metas individualizadas.</p>\n  </section>\n\n  <footer class=\"footer footer-1\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Pagina 1</p>\n  </footer>\n\n  <p class=\"break\"></p>\n  <!-- PAGE 1 END -->\n\n  <header>\n    <!-- TODO: Substituir imagem -->\n    <img src=\"https://image.ibb.co/iw30bc/logo_Elsa.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Aspartato transaminase (AST) – Soro</p>\n    <br/>\n    <p>ASPARTATO TRANSAMINASE: {{data.resultadoAspartatoTransaminase.value}} U/L</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameAspartatoTransaminaseObs\">\n      <p>Obs: {{data.exameAspartatoTransaminaseObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA AUTOMATIZADA (IFCC MODIFICADA)</p>\n    <p>Valores de referência:</p>\n    <p>HOMENS: até 40 U/L</p>\n    <p>MULHERES: até 32 U/L</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Alanina transaminase (ALT) – Soro</p>\n    <br/>\n    <p>ALANINA TRANSAMINASE: {{data.resultadoAlaninaTransaminase.value}} U/L</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameAlaninaTransaminaseObs\">\n      <p>Obs: {{data.exameAlaninaTransaminaseObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA AUTOMATIZADA (IFCC MODIFICADA)</p>\n    <p>Valores de referência:</p>\n    <p>HOMENS: até 41 U/L</p>\n    <p>MULHERES: até 33 U/L</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Gama glutamil transferase (Gama GT) – Soro</p>\n    <br/>\n    <p>GAMA GT: {{data.resultadoGamaGT.value}} U/L</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameGamaGlutamilTransferaseObs\">\n      <p>Obs: {{data.exameGamaGlutamilTransferaseObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: CINÉTICA COLORIMÉTRICA AUTOMATIZADA (SZACZ - IFCC)</p>\n    <p>Valores de referência:</p>\n    <p>HOMENS: 8 a 61 U/L</p>\n    <p>MULHERES: 5 a 36 U/L</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Uréia – Soro</p>\n    <br/>\n    <p>URÉIA: {{data.resultadoUreia.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameUreiaSanqueObs\">\n      <p>Obs: {{data.exameUreiaSanqueObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: CINÉTICA AUTOMATIZADA (UREASE E GLUTAMATO DESIDROGENASE)</p>\n    <p>Valores de referência:</p>\n    <p>17 a 49 mg/dL</p>\n  </section>\n\n  <footer class=\"footer footer-2\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Página 2</p>\n  </footer>\n  <p class=\"break\"></p>\n  <!-- PAGE 2 END -->\n\n  <header>\n    <!-- TODO: Substituir imagem -->\n    <img src=\"https://image.ibb.co/iw30bc/logo_Elsa.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Creatinina – Soro</p>\n    <br/>\n    <p>CREATININA: {{data.resultadoCreatinina.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameCreatininaSangueObs\">\n      <p>Obs: {{data.exameCreatininaSangueObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA AUTOMATIZADA (JAFFÉ SEM DESPROTEINIZAÇÃO)</p>\n    <p>Valores de referência:</p>\n    <p>Homem: 0,70 a 1,20 mg/dL</p>\n    <p>Mulher: 0,50 a 0,90 mg/dL</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Ácido úrico – Soro</p>\n    <br/>\n    <p>ÁCIDO ÚRICO: {{data.resultadoAcidoUrico.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameAcidoUricoObs\">\n      <p>Obs: {{data.exameAcidoUricoObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA</p>\n    <p>Valores de referência:</p>\n    <p>Homens: 3,4 a 7,0 mg/dL</p>\n    <p>Mulheres: 2,4 a 5,7 mg/dL</p>\n    <br>\n    <hr>\n  </section>\n\n  <section ng-if=\"data.exameELSAB12\" class=\"contextValues\">\n    <p>Vitamina B12 – Soro</p>\n    <br/>\n    <p>VITAMINA B12: {{data.resultadoVitaminaB12.value}} pg/mL</p>\n  </section>\n\n  <section ng-if=\"data.exameELSAB12\" class=\"contextObs\">\n    <span ng-if=\"data.exameELSAB12Obs\">\n      <p>Obs: {{data.exameELSAB12Obs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ELETROQUIMIOLUMINESCÊNCIA</p>\n    <p>Valores de referência:</p>\n    <p>221 a 946 pg/mL</p>\n  </section>\n\n  <footer class=\"footer footer-3\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Página 3</p>\n  </footer>\n</div>\n",
//           "label": "Bioquimica Soro (Lab. Central)",
//           "sender": "diogo.rosas.ferreira@gmail.com",
//           "sendingDate": "2018-11-07T15:51:53.725Z",
//           "fieldCenter": [
//             "SP",
//             "RS",
//             "RJ",
//             "MG",
//             "ES",
//             "BA"
//           ],
//           "dataSources": [
//             {
//               "key": "participant",
//               "dataSource": "Participant",
//               "label": "Informações do participante",
//               "result": [{"teste":"teste"}],
//               "optional": false
//             },
//             {
//               "filters": {
//                 "examName": "ELSA B12",
//                 "fieldCenter": "SP"
//               },
//               "key": "exameELSAB12",
//               "dataSource": "Exam",
//               "label": "Resultados de ELSA B12",
//               "result": [],
//               "optional": true
//             },
//           ]
//         }
//       }
//
//       if (state === "md") {
//         response.data = {
//           "template": "  \n<otus-script>\n</otus-script>\n<div>\n  <style type=\"text/css\">\n    img {\n      display: block;\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 0.5cm;\n      width: 80mm;\n    }\n\n    hr {\n      border-top: 1.5pt solid #000000;\n    }\n\n    .footer{\n      width: 100%;\n      border-top: 2.0pt solid #000000;\n      font-family: \"Arial\", \"serif\";\n      font-size: 12px;\n      text-align: center;\n      position: absolute; \n    }\n\n    .footer-1{ \n      top: 260mm; \n    }\n\n    .footer-2{ \n      top: 537.5mm; \n    }\n    \n    .footer-3{ \n      top: 814mm; \n    }\n\n    .participantInfo {\n      display: flex;\n      border-bottom: 2.0pt solid #000000;\n    }\n\n    .column {\n      flex: 20%;\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues p:first-of-type {\n      font-size: 14px;\n    }\n\n    .contextObs {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n    }\n\n    .break {\n      page-break-before: always;\n    }\n    p{\n      margin: 0.5em 0;\n    }\n  </style>\n  <header>\n    <!-- TODO: Substituir imagem -->\n    <img src=\"http://wiki.inf.otus-solutions.com.br/images/d/d4/ELSA-logo.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Relatório de Atividade</p>\n    <br/>\n    <p>Formulário: CENTRO DE LEITURA DE RETINOGRAFIA</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameColesterolTotalFracoesObs\">\n      <p>Obs: {{data.exameColesterolTotalFracoesObs}}</p>\n      <br>\n    </span>\n    <p>Sigla : RETCLQ</p>\n    <p>Questão 1 : true</p>\n    </section>\n\n   <footer class=\"footer footer-1\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Pagina 1</p>\n  </footer>\n\n",
//           "label": "Titulo do relatório",
//           "acronym":"RETCLQ",
//           "version": 1,
//           "sender": "fdrtec@gmail.com",
//           "sendingDate": "2018-11-07T15:51:53.725Z",
//           "fieldCenter": [
//             "SP",
//             "RS",
//             "RJ",
//             "MG",
//             "ES",
//             "BA"
//           ],
//           "dataSources": [
//             {
//               "key": "RETCLQ",
//               "dataSource": "AnwserFillingDataSource",
//               "label": "Questões de RETCLQ",
//               "filters": {
//                 "acronym":"RETCQL",
//                 "version": 2,
//                 "category": 0
//               },
//               "result": [
//                 {
//                   "objectType": "QuestionFill",
//                   "questionID": "RETCLQ1",
//                   "customID": "RETCLQB_3",
//                   "answer": {
//                     "value": "a"
//                   },
//                   "forceAnswer": false,
//                   "metadata": {
//                     "value": true
//                   },
//                   "comment": ""
//                 }
//
//               ],
//               "optional": false
//             },
//             {
//               "key": "CSJ",
//               "dataSource": "AnwserFillingDataSource",
//               "label": "Questões de CSJ",
//               "filters": {
//                 "acronym":"CSJ",
//                 "version": 1,
//                 "category": 0
//               },
//               "result": [
//                 {
//                   "objectType": "QuestionFill",
//                   "questionID": "CSJ1",
//                   "customID": "CSJA_2",
//                   "answer": {
//                     "value": false
//                   },
//                   "forceAnswer": false,
//                   "metadata": {
//                     "value": "a"
//                   },
//                   "comment": ""
//                 }
//
//               ],
//               "optional": false
//             }
//
//           ]
//         }
//       }
//     }
//   }
// }());



