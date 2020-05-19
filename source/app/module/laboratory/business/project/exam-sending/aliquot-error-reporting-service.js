(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.sending')
    .service('otusjs.laboratory.business.project.sending.AliquotErrorReportingService', service);

  service.$inject = [];

  function service() {
    const ALIQUOT_DOES_MATCH_EXAM = "Aliquot does not match exam"
    const ALIQUOT_NOT_FOUND = "Aliquot not found";
    const TUBE_NOT_FOUND = "Tube not found";
    const TUBE_NOT_COLLECTED = "Tube not collected";
    const TUBE_DOES_NOT_MATCH_EXAM_MESSAGE = "Tube does not match exam";
    const ALIQUOT_DOES_MATCH_EXAM_PT_BR = "Alíquota não corresponde ao exame"
    const ALIQUOT_NOT_FOUND_PT_BR = "Alíquota não encontrada";
    const TUBE_NOT_FOUND_PT_BR = "Tubo não encontrado"
    const TUBE_NOT_COLLECTED_PT_BR = "Tubo não coletado";
    const TUBE_DOES_NOT_MATCH_EXAM_MESSAGE_PT_BR = "Tubo não corresponde ao exame";
    var self = this;

    /* Public methods */
    self.createErrorReporting = createErrorReporting;
    self.setValidAliquot = setValidAliquot;

    function createErrorReporting(array) {
      var report = [];
      array.forEach(function (value) {
        if (!report.includes(value.aliquot)) {
          var output = {
            MATERIAL: value.material,
            PROBLEMA: value.message.includes(ALIQUOT_NOT_FOUND) ? ALIQUOT_NOT_FOUND_PT_BR :
              value.message.includes(TUBE_NOT_FOUND) ? TUBE_NOT_FOUND_PT_BR :
              value.message.includes(TUBE_NOT_COLLECTED) ? TUBE_NOT_COLLECTED_PT_BR :
              value.message.includes(TUBE_DOES_NOT_MATCH_EXAM_MESSAGE) ? TUBE_DOES_NOT_MATCH_EXAM_MESSAGE_PT_BR :
              value.message.includes(ALIQUOT_DOES_MATCH_EXAM) ? ALIQUOT_DOES_MATCH_EXAM_PT_BR : "",
            EXAME_RECEBIDO: value.receivedExam,
            EXAMES_POSSIVEIS: value.possibleExams
          };
          report.push(output);
        }
      });
      return report;
    }

    function setValidAliquot(sendingExam, errorAliquots) {
      var aliquotsWithProblems = [];
      sendingExam.exams.forEach(function (exam) {
        exam.examResults.forEach(function (result) {
          var invalidAliquotCode = errorAliquots.find(function (errorAliquot) { return errorAliquot.material == result.code });
          if (invalidAliquotCode) {
            result.aliquotValid = false;
            aliquotsWithProblems.push(result);
          }
        });
      });
      return aliquotsWithProblems;
    }
  }
}());