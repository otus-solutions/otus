describe('PreActivityFactory_UnitTest_Suite', function() {
  var Mock = {};
  var factory;
  var result;

  beforeEach(function() {
    angular.mock.module('otusjs.otus');

    angular.mock.inject(function($injector) {
      factory = $injector.get('otusjs.activity.business.PreActivityFactory');
    });
  });


  it('factory_existence_check', function() {
    expect(factory).toBeDefined();
    expect(factory.create).toBeDefined();
  });

  describe('factory_instance_test_suite', () => {

    beforeEach(() => {
      _mockInitialize();

      result = factory.create(Mock.user, Mock.survey, Mock.configuration, Mock.mode, Mock.externalID, Mock.stage);
      result.surveyForm.isRequiredExternalID = Mock.isRequiredExternalID;
    });

    it('instance_check', () => {
      expect(JSON.stringify(result)).toEqual(JSON.stringify(Mock.preActivity));
    });

    it('updatePaperActivityData_method_should_set_paperActivityData', () => {
      result.updatePaperActivityData(Mock.checkerData, Mock.realizationDate);
      expect(result.paperActivityData.checker).toEqual(Mock.checkerData.checker);
      expect(result.paperActivityData.realizationDate).toEqual(Mock.realizationDate);
    });

    it('updatePaperActivityData_method_should_set_preActivityValid_as_false', () => {
      result.updatePaperActivityData(false, {});
      expect(result.preActivityValid).toBeFalsy();
    });

    it('updatePreActivityValid_should_set_preActivityValid_in_case_surveyForm_isRequiredExternalID_return_true', () => {
      spyOn(result.surveyForm, 'isRequiredExternalID').and.returnValue(true);
      result.updatePreActivityValid(true, true);
      expect(result.preActivityValid).toBeTruthy();
    });

    it('updatePreActivityValid_should_set_preActivityValid_as_stateChecker', () => {
      spyOn(result.surveyForm, 'isRequiredExternalID').and.returnValue(false);
      Mock.stateChecker = {};
      result.updatePreActivityValid(Mock.stateChecker, true);
      expect(result.preActivityValid).toEqual(Mock.stateChecker);
    });

    it('updatePreActivityValid_should_set_preActivityValid_as_stateIdExternal', () => {
      spyOn(result.surveyForm, 'isRequiredExternalID').and.returnValue(false);
      Mock.stateIdExternal = {};
      result.updatePreActivityValid(null, Mock.stateIdExternal);
      expect(result.preActivityValid).toEqual(Mock.stateIdExternal);
    });

    it('updatePreActivityValid_should_not_set_preActivityValid', () => {
      spyOn(result.surveyForm, 'isRequiredExternalID').and.returnValue(false);
      result.updatePreActivityValid(jasmine.anything(), null);
      expect(result.preActivityValid).toEqual(false);
    });

    it('getStageId_method_should_return_stage_id', () => {
      expect(result.getStageId()).toEqual(Mock.stage._id);
    });
  });


  function _mockInitialize() {
    Mock.survey = Test.utils.data.activityPASC.surveyForm;
    Mock.mode = Test.utils.data.activityPASC.mode;
    Mock.configuration = {
      category: {
        disabled: false,
        isDefault: true,
        label: "Normal",
        name: "C0",
        objectType: "ActivityCategory"
      }
    };
    Mock.participant = Test.utils.data.activityPASC.participantData;
    Mock.configuration = {
      category: {
        disabled: false,
        isDefault: true,
        label: "Normal",
        name: "C0",
        objectType: "ActivityCategory"
      }
    };
    Mock.externalID = "32432432";
    Mock.user = {
      email: "fulano@gmail.com",
      fieldCenter: {},
      name: "Adonis",
      phone: "5199999999",
      surname: "Garcia",
      token: "eyJhbGciOiJIUzI1NiJ9AOFIMALEM"
    };
    Mock.stage = Test.utils.data.stage;
    Mock.preActivity = {
      objectType: "preActivity",
      surveyForm: Mock.survey,
      configuration: Mock.configuration,
      mode: Mock.mode,
      user: Mock.user,
      externalID: Mock.externalID,
      preActivityValid: false,
      stage: Mock.stage
    };
    Mock.checkerData = {
      checker: {
        "name" : "Carol",
        "surname" : "Oltramari",
        "phone" : "51999999999",
        "email" : "onery.carolina@gmail.com"
      }
    };
    Mock.realizationDate = "2019-01-05T18:20:16.829Z";
    Mock.isRequiredExternalID = function() { return true };
  }

});
