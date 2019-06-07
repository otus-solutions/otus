describe('ProjectRemoteStorageService Suite Test', function () {


  const EXAM_LOTS = [{code: '300000051', objectType: 'ExameLot'}, {code: '300000052', objectType: 'ExameLot'}];
  const ALIQUOTS = [{code: '3530000719', objectType: "Aliquot"}, {code: '3530000720', objectType: "Aliquot"}];
  const EXAM_LOT_ID = '5c07cdf61e66c90053bcd383';
  const ALIQUOT_FILTER = {aliquotCode: '3530000719', fieldCenter: {acronym: 'RS'}, lotType: 'BIOCHEMICAL_SERUM'};
  const CENTER_ACRONYM = ALIQUOT_FILTER.fieldCenter.acronym;

  var service;
  var Mock = {};
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.deploy.storage');
  });

  beforeEach(function () {
    Mock.ExamsRestService = {
      getLots: function () {
      },
      getLotAliquots: function () {
      },
      getAliquot: function () {
      }
    }

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.deploy.ExamsRestService', Mock.ExamsRestService);
    });
  });

  beforeEach(function () {
    angular.mock.inject(function ($injector, $q) {
      Injections = {"$q": $q};
      service = $injector.get('otusjs.deploy.ProjectRemoteStorageService', Injections);
      spyOn(Mock.ExamsRestService, 'getLots').and.returnValue(Promise.resolve(EXAM_LOTS));
      spyOn(Mock.ExamsRestService, 'getLotAliquots').and.returnValue(Promise.resolve(ALIQUOTS));
      spyOn(Mock.ExamsRestService, 'getAliquot').and.returnValue(Promise.resolve(ALIQUOTS[0]));
    });
  });

  it('serviceExistence', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence', function () {
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

  it('getLotsMethod should to call getLots of  ExamRestService', function () {
    service.getLots(CENTER_ACRONYM);
    expect(Mock.ExamsRestService.getLots).toHaveBeenCalledTimes(1);
    expect(Mock.ExamsRestService.getLots).toHaveBeenCalledWith(CENTER_ACRONYM);
  });

  it('getLotAliquotsMethod should to call getLotAliquots of  ExamRestService', function () {
    service.getLotAliquots(EXAM_LOT_ID);
    expect(Mock.ExamsRestService.getLotAliquots).toHaveBeenCalledTimes(1);
    expect(Mock.ExamsRestService.getLotAliquots).toHaveBeenCalledWith(EXAM_LOT_ID);
  });

  it('getAliquotMethod should to call getAliquot of  ExamRestService', function () {
    service.getAliquot(ALIQUOT_FILTER);
    expect(Mock.ExamsRestService.getAliquot).toHaveBeenCalledTimes(1);
    expect(Mock.ExamsRestService.getAliquot).toHaveBeenCalledWith(ALIQUOT_FILTER);
  });
});