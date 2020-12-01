describe('PreActivityFactory_UnitTest_Suite', function() {
  var Mock = {};
  var factory;
  var result;

  beforeEach(function() {
    angular.mock.module('otusjs.otus');

    angular.mock.inject(function($injector) {
      factory = $injector.get('otusjs.activity.business.PreActivityFactory');
    });

    _mockInitialize();

    result = factory.create(Mock.user, Mock.survey, Mock.configuration, Mock.mode, Mock.externalID, Mock.stage);
    result.surveyForm.isRequiredExternalID = jasmine.createSpy();
  });


  it('should create factory', function() {
    expect(factory).toBeDefined();
    expect(factory.create).toBeDefined();
  });


  it('should call create method', function () {
    expect(JSON.stringify(result)).toEqual(JSON.stringify(Mock.preActivity));
  });

  it('should call updatePreActivityValid method', function () {
    result.updatePreActivityValid(true, true);
    expect(result.preActivityValid).toBeTruthy();
  });

  it('should call updatePaperActivityData method', function () {
    result.updatePaperActivityData(Mock.checkerData,Mock.realizationDate);
    expect(result.paperActivityData.checker).toEqual(Mock.checkerData.checker);
    expect(result.paperActivityData.realizationDate).toEqual(Mock.realizationDate);
  });

  it('should call updatePaperActivityData preActivityValid false method', function () {
    result.updatePaperActivityData(false,{});
    expect(result.preActivityValid).toBeFalsy();
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
  }
});
