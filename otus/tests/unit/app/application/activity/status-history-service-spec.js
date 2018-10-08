describe('StatusHistoryService Test', function() {
  var Mock = {};
  var service;
  var Injections = {};
  var UNIT_NAME = 'otusjs.application.activity.StatusHistoryService';
  var LABELS = ['Criado', 'Salvo', 'Finalizado'];
  var COLORS = ['#ef5545', '#fcff82', '#91ef45'];

  beforeEach(function() {
    angular.mock.module('otusjs.application.activity');
    inject(function(_$injector_) {
      service = _$injector_.get(UNIT_NAME);
      mockValues();
    });
  });

  it('should test method listStatus', function() {
    expect(service.listStatus()).toEqual(Mock.STATUS);
  });
  it('should test method getStatusValue', function() {
    expect(service.getStatusValue(Mock.STATUS[0].name)).toEqual(Mock.STATUS[0].value);
    expect(service.getStatusValue(Mock.STATUS[1].name)).toEqual(Mock.STATUS[1].value);
    expect(service.getStatusValue(Mock.STATUS[2].name)).toEqual(Mock.STATUS[2].value);
    expect(service.getStatusValue()).toEqual(null);
  });
  it('should test method getLabels', function() {
    expect(service.getLabels()).toEqual(LABELS);
  });
  it('should test method getColors', function() {
    expect(service.getColors()).toEqual(COLORS);
  });

  function mockValues() {
    Mock.STATUS = [
      {
        name: 'CREATED',
        label: 'Criado',
        color: '#ef5545',
        icon: 'fiber_new',
        value: -1
      },
      {
        name: 'SAVED',
        label: 'Salvo',
        color: '#fcff82',
        icon: 'save',
        value: 1
      },
      {
        name: 'FINALIZED',
        label: 'Finalizado',
        color: '#91ef45',
        icon: 'check_circle',
        value: 2
      }
    ];
  }

});
