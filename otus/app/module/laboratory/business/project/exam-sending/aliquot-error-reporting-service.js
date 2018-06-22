(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.sending')
    .service('otusjs.laboratory.business.project.sending.AliquotErrorReportingService', service);

  service.$inject = [];

  function service() {
    const ALIQUOT_DOES_MATCH_EXAM_PT_BR = "Alíquota não corresponde ao exame"
    const ALIQUOT_NOT_FOUND_PT_BR = "Aliquot not found";
    const ALOQUIT_PT_BR = "Alíquota";
    const POSSIBLE_EXAMS_PT_BR = "Exames possíveis";
    const RECEIVED_EXAM_PT_BR = "Exame recebido";
    var self = this;
    self.report;

    /* Public methods */
    self.buildReport = buildReport;

    function buildReport(data, message) {
      console.log(data);
      self.report.ALOQUIT_PT_BR = [];
      if (message.includes(ALIQUOT_DOES_MATCH_EXAM_PT_BR)) {
        self.report.ALIQUOT_DOES_MATCH_EXAM_PT_BR;
      } else {
        self.report.ALIQUOT_NOT_FOUND_PT_BR;
      }
      self.report.POSSIBLE_EXAMS_PT_BR = [];
      self.report.RECEIVED_EXAM_PT_BR = [];

      // data.filter(function (value) {});

      return self.report;
    }
  }
}());