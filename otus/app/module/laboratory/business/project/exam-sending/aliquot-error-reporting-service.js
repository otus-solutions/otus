(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.sending')
    .service('otusjs.laboratory.business.project.sending.AliquotErrorReportingService', service);

  service.$inject = [];

  function service() {
    const ALIQUOT_DOES_MATCH_EXAM = "Data Validation Fail: Aliquot does not match exam"
    const ALIQUOT_NOT_FOUND = "Data Validation Fail: Aliquots not found";
    const ALIQUOT_DOES_MATCH_EXAM_PT_BR = "Alíquota não corresponde ao exame"
    const ALIQUOT_NOT_FOUND_PT_BR = "Alíquota não encontrada";
    var self = this;
    self.report = {
      uniqueValues: [],
      data: []
    };

    /* Public methods */
    self.createErrorReporting = createErrorReporting;

    function createErrorReporting(array, message) {
      array.forEach(function (value) {
        var out = {
          ALIQUOTA: value.aliquot,
          PROBLEMA: message.includes(ALIQUOT_NOT_FOUND) ? ALIQUOT_NOT_FOUND_PT_BR : ALIQUOT_DOES_MATCH_EXAM_PT_BR,
          EXAME_RECEBIDO: value.receivedExam,
          EXAMES_POSSIVEIS: value.possibleExams
        };
        self.report.data.push(out);
        if (!self.report.uniqueValues.includes(value.aliquot))
          self.report.uniqueValues.push(value.aliquot)
      });
      return self.report;
    }
  }
}());