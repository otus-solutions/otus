describe('otusParticipantAliquotService', function() {

  var UNIT_NAME = 'otusjs.laboratory.business.participant.aliquot.ParticipantAliquotService';
  var Mock = {};
  var Injections = {};
  var service = {};


  beforeEach(angular.mock.module('otusjs.laboratory.business.participant.aliquot'));
  beforeEach(function() {

    inject(function(_$injector_) {
      mockAliquotStruture();
      // Injections
      mockInjections(_$injector_);
      // service = _$injector_.get(UNIT_NAME, Injections);

    });
  });

  describe('populateAliquotsArray method', function() {

    var _aliquotNotStruture = {};
    var _aliquotStruture = {};
    var _greaterAliquotStruture = [];
    beforeEach(function() {
      _aliquotStruture = Mock.aliquotStructureExam;
      _greaterAliquotStruture.push(_aliquotNotStruture, _aliquotStruture);
    });

    it('should verify a aliquot struture', function() {
      expect(Mock.aliquotStructureExam).not.toBeNull();
      expect(Mock.aliquotStructureExam).not.toEqual(Mock.aliquotStructureStore);
      expect(Mock.aliquotStructureExam).toEqual(_aliquotStruture);
      expect(Mock.aliquotStructureExam).not.toBeGreaterThan(_greaterAliquotStruture);
    });

  });

  function mockAliquotStruture() {
    var aliquotStructure = {
    aliquotCode : "",
    tubeCode : "",
    container : "",
    containerLabel : "",
    placeholder : "",
    aliquotMessage : "",
    tubeMessage : "",
    operator : "",
    date : "",
    time : "",
    processing : "",
    isSaved : false
    };
    var aliquot = [];
    aliquot.role = "EXAM";
    aliquot.exams = [];
    aliquot.exams.push(aliquotStructure);
    Mock.aliquotStructureExam = aliquot;

    aliquot = [];
    aliquot.role = "STORAGE";
    aliquot.storage = [];
    aliquot.storage.push(aliquotStructure);
    Mock.aliquotStructureStore = aliquot;

  }

  function mockInjections($injector) {
    Mock.AliquotManagerService = $injector.get('otusjs.laboratory.business.participant.aliquot.AliquotManagerService');
    // Mock.ParticipantLaboratoryService = $injector.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');
    Mock.$q = $injector.get('$q');

    Injections.AliquotManagerService = Mock.AliquotManagerService;
    // Injections.ParticipantLaboratoryService = Mock.ParticipantLaboratoryService;
    Injections.$q = Mock.$q;
  }



});
