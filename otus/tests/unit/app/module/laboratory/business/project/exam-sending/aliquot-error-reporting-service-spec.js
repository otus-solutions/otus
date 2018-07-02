describe('AliquotErrorReportingService', function () {
  const ALIQUOT_DOES_MATCH_EXAM = "Aliquot does not match exam"
  const ALIQUOT_NOT_FOUND = "Aliquot not found";
  const ALIQUOT_DOES_MATCH_EXAM_PT_BR = "Alíquota não corresponde ao exame"
  const ALIQUOT_NOT_FOUND_PT_BR = "Alíquota não encontrada";

  var UNIT_NAME = 'otusjs.laboratory.business.project.sending.AliquotErrorReportingService';
  var service = {};
  var Injections = {};
  var Mock = {};

  beforeEach(angular.mock.module('otusjs.laboratory.business.project.sending'));
  beforeEach(function () {
    inject(function ($injector) {
      service = $injector.get('otusjs.laboratory.business.project.sending.AliquotErrorReportingService');
      mockStruture();
      /* Injections */
      mockInjections($injector);
    });
  });

  describe('createErrorReporting method', function () {
    var report;
    beforeEach(function () {
      report = service.createErrorReporting(Mock.aliquotsWithProblems);
    });

    it('should return structure expected', function () {
      expect(report).not.toBeNull();
      expect(report).toEqual(Mock.returnExpected);
    });

    it('should return information translated', function () {
      expect(report[0]).toEqual(jasmine.objectContaining({
        ALIQUOTA: '363036448',
        PROBLEMA: 'Alíquota não corresponde ao exame',
        EXAME_RECEBIDO: 'URÉIA - SANGUE',
        EXAMES_POSSIVEIS: 'ELSA B12, CREATININA - SANGUE, ÁCIDO ÚRICO - SANGUE'
      }));

      expect(report[1]).toEqual(jasmine.objectContaining({
        ALIQUOTA: '363036999',
        PROBLEMA: 'Alíquota não encontrada',
        EXAME_RECEBIDO: 'ELSA B12',
        EXAMES_POSSIVEIS: 'URÉIA - SANGUE, CREATININA - SANGUE, ÁCIDO ÚRICO - SANGUE'
      }));
    });
  });

  describe('createErrorReporting method', function () {
    var report;
    beforeEach(function () {
      report = service.setValidAliquot(Mock.sendingExam, Mock.aliquotsWithProblems);
    });

    it('should return structure expected', function () {
      expect(report).not.toBeNull();
    });

    it('should return all aliquots with problems as not valid', function () {
      expect(report.length).toEqual(2);
      expect(report[0].aliquotValid).toEqual(false);
      expect(report[1].aliquotValid).toEqual(false);
    })
  });

  function mockStruture() {
    Mock.aliquotsWithProblems = [{
      "aliquot": "363036448",
      "message": "Aliquot does not match exam",
      "possibleExams": "ELSA B12, CREATININA - SANGUE, ÁCIDO ÚRICO - SANGUE",
      "receivedExam": "URÉIA - SANGUE"
    },
    {
      "aliquot": "363036999",
      "message": "Aliquot not found",
      "possibleExams": "URÉIA - SANGUE, CREATININA - SANGUE, ÁCIDO ÚRICO - SANGUE",
      "receivedExam": "ELSA B12"
    }];

    Mock.returnExpected = [
      {
        ALIQUOTA: '363036448',
        PROBLEMA: 'Alíquota não corresponde ao exame',
        EXAME_RECEBIDO: 'URÉIA - SANGUE',
        EXAMES_POSSIVEIS: 'ELSA B12, CREATININA - SANGUE, ÁCIDO ÚRICO - SANGUE'
      },
      {
        ALIQUOTA: '363036999',
        PROBLEMA: 'Alíquota não encontrada',
        EXAME_RECEBIDO: 'ELSA B12',
        EXAMES_POSSIVEIS: 'URÉIA - SANGUE, CREATININA - SANGUE, ÁCIDO ÚRICO - SANGUE'
      }];

    Mock.sendingExam = {
      exams: [
        {
          examResults: [
            {
              aliquotCode: '363036448',
              aliquotValid: true,
              examName: "URÉIA - SANGUE"
            },
            {
              aliquotCode: '363036999',
              aliquotValid: true,
              examName: "URÉIA - SANGUE"
            },
            {
              aliquotCode: '300000000',
              aliquotValid: true,
              examName: "URÉIA - SANGUE"
            },
          ]
        }
      ]
    }
  }

  function mockInjections($injector) { }
});