describe('ExamRestService Suite Test', function () {

  const ALIQUOT_TYPE = 'Aliquot';
  const EXAM_LOT_TYPE = 'ExameLot';
  const EXAM_LOT_ID = '5c07cdf61e66c90053bcd383';
  const EXAM_LOTS = [{code: '300000051', objectType: 'ExameLot'}, {code: '300000052', objectType: 'ExameLot'}];
  const ALIQUOTS = [{code: '3530000719', objectType: "Aliquot"}, {code: '3530000720', objectType: "Aliquot"}];
  const ALIQUOT_FILTER = {aliquotCode: '3530000719', fieldCenter: {acronym: 'RS'}, lotType: 'BIOCHEMICAL_SERUM'};
  const ERROR_MSG_REST = "REST resource is not initialized.";
  const CENTER_ACRONYM = ALIQUOT_FILTER.fieldCenter.acronym;

  var Mock = {};
  var service;
  var _rest = {};

  beforeEach(function () {
    angular.mock.module('otusjs.deploy.exam');
  });

  beforeEach(function () {
    _rest = {
      getLots: function (item) {
      },
      getLotAliquots: function () {
      },
      getAliquot: function (item) {
      },
    };

    Mock.OtusRestResourceService = {
      getExamUploadResource: function () {
        return {$promise: Promise.resolve()};
      },
      getExamLotResource: function () {
        return _rest
      }
    };

    angular.mock.module(function ($provide) {
      $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
    });
  });

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      service = $injector.get('otusjs.deploy.ExamsRestService');

      spyOn(_rest, 'getLots')
        .and.returnValue({$promise:EXAM_LOTS});

      spyOn(_rest, 'getLotAliquots')
        .and.returnValue({$promise: ALIQUOTS});

      spyOn(_rest, 'getAliquot')
        .and.returnValue({$promise: ALIQUOTS[0]});
    });
  });

  it('serviceExistence', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence', function () {
    expect(service.initialize).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.getLots).toBeDefined();
    expect(service.getLotAliquots).toBeDefined();
    expect(service.getAliquots).toBeDefined();
    expect(service.createLot).toBeDefined();
    expect(service.updateLot).toBeDefined();
    expect(service.deleteLot).toBeDefined();
    expect(service.getAvailableExams).toBeDefined();
    expect(service.getSendedExamById).toBeDefined();
    expect(service.getSendedExams).toBeDefined();
    expect(service.createSendExam).toBeDefined();
    expect(service.deleteSendedExams).toBeDefined();
  });

  it('getLotsMethod should delivery lots of Exams', function () {
    service.initialize();
    expect(service.getLots(CENTER_ACRONYM).length).toEqual(2);
    expect(service.getLots(CENTER_ACRONYM)[1].code).toEqual('300000052');
    expect(service.getLots(CENTER_ACRONYM)[0].objectType).toEqual(EXAM_LOT_TYPE);
  });

  it('getLotsMethod should to call getLots of  ExamLotResource', function () {
    service.initialize();
    service.getLots(CENTER_ACRONYM);
    expect(_rest.getLots).toHaveBeenCalledWith({acronym: CENTER_ACRONYM});
    expect(_rest.getLots.calls.count()).toEqual(1)
  });

  it('getLotsMethod should post uninitialized restResource error', function () {
    expect(function () {
      service.getLots(CENTER_ACRONYM)
    }).toThrow(new Error(ERROR_MSG_REST));
  });

  it('getLotAliquots should delivery lots of Aliquots ', function () {
    service.initialize();
    expect(service.getLotAliquots(EXAM_LOT_ID).length).toEqual(2);
    expect(service.getLotAliquots(EXAM_LOT_ID)[1].objectType).toEqual(ALIQUOT_TYPE)
  });

  it('getLotAliquotsMethod should to call getLotAliquots of  ExamLotResource ', function () {
    service.initialize();
    service.getLotAliquots(EXAM_LOT_ID);
    expect(_rest.getLotAliquots).toHaveBeenCalledWith({lotId: EXAM_LOT_ID});
    expect(_rest.getLotAliquots.calls.count()).toEqual(1)
  });

  it('getLotAliquotsMethod should post uninitialized restResource error', function () {
    expect(function () {
      service.getLotAliquots(EXAM_LOT_ID);
    }).toThrow(new Error(ERROR_MSG_REST));
  });

  it('getAliquot should delivery aliquot by filter', function () {
    service.initialize();
    expect(service.getAliquot(ALIQUOT_FILTER)).toEqual(ALIQUOTS[0]);
  });

  it('getAliquotMethod should to call getAliquot of  ExamLotResource', function () {
    service.initialize();
    service.getAliquot(ALIQUOT_FILTER);
    expect(_rest.getAliquot).toHaveBeenCalledWith(ALIQUOT_FILTER);
    expect(_rest.getAliquot.calls.count()).toEqual(1);
  });

  it('getAliquotMethod should post uninitialized restResource error', function () {
    expect(function () {
      service.getAliquot(EXAM_LOT_ID);
    }).toThrow(new Error(ERROR_MSG_REST));
  });
});
