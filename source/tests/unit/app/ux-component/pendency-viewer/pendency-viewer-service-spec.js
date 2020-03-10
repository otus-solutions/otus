describe('PendencyViewerService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      //Injections. = $injector.get(' ');
      service = $injector.get('otusjs.pendencyViewer.PendencyViewerService', Injections);
      //mockInitialize();
    });
  });

  function mockInitialize(){}

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.getSearchSettings).toBeDefined();
    expect(service.getPendencyAttributes).toBeDefined();
    expect(service.getInputViewState).toBeDefined();
    expect(service.getAllPendencies).toBeDefined();
    expect(service.callValidationPendenciesLimits).toBeDefined();
    expect(service.formatDate).toBeDefined();
    expect(service.calculateRemainingDays).toBeDefined();
    expect(service.getSelectedParticipantRN).toBeDefined();
    expect(service.getChecker).toBeDefined();
  });

  it('getSearchSettingsMethod_should_returns_searchSettingsInitial', () => {
    let searchSettingsInitial = service.getSearchSettings();
    expect(searchSettingsInitial.order.fields[0]).toBe("dueDate");
  });

  it('getPendencyattributes_method_should_returns_pendencyAttributes', () => {

  });
  xit('should ', () => { });
  xit('should ', () => { });
  xit('should ', () => { });
  xit('should ', () => { });
  xit('should ', () => { });
  xit('should ', () => { });
  xit('should ', () => { });
  xit('should ', () => { });
  xit('should ', () => { });
  xit('should ', () => { });
  xit('should ', () => { });
 });
