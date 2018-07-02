(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.sending')
    .service('otusjs.laboratory.business.project.sending.AliquotErrorReportingService', service);

  service.$inject = [];

  function service() {
    const ALIQUOT_DOES_MATCH_EXAM = "Aliquot does not match exam"
    const ALIQUOT_NOT_FOUND = "Aliquot not found";
    const ALIQUOT_DOES_MATCH_EXAM_PT_BR = "Alíquota não corresponde ao exame"
    const ALIQUOT_NOT_FOUND_PT_BR = "Alíquota não encontrada";
    var self = this;

    /* Public methods */
    self.createErrorReporting = createErrorReporting;
    self.setValidAliquot = setValidAliquot;

    function createErrorReporting(array) {
      var report = [];
      array.forEach(function (value) {
        if (!report.includes(value.aliquot)) {
          var output = {
            ALIQUOTA: value.aliquot,
            PROBLEMA: value.message.includes(ALIQUOT_NOT_FOUND) ? ALIQUOT_NOT_FOUND_PT_BR : ALIQUOT_DOES_MATCH_EXAM_PT_BR,
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
          var invalidAliquotCode = errorAliquots.find(function (errorAliquot) { return errorAliquot.aliquot == result.aliquotCode });
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