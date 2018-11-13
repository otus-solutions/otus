describe('StatusHistoryService Test', function() {
  var Mock = {};
  var service;
  var Injections = {};
  var UNIT_NAME = 'otusjs.application.activity.StatusHistoryService';
  var LABELS = ['Criado', 'Opcional', 'Salvo', 'Finalizado'];
  var COLORS = ['#EF5545', '#808080', '#FCFF82', '#91EF45'];

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
    expect(service.getStatusValue(Mock.STATUS[3].name)).toEqual(Mock.STATUS[3].value);
    expect(service.getStatusValue()).toEqual(null);
  });

  it('should test method getStatusLabel', function() {
    expect(service.getStatusLabel(Mock.STATUS[0].value)).toEqual(Mock.STATUS[0].label);
    expect(service.getStatusLabel(Mock.STATUS[1].value)).toEqual(Mock.STATUS[1].label);
    expect(service.getStatusLabel(Mock.STATUS[2].value)).toEqual(Mock.STATUS[2].label);
    expect(service.getStatusLabel(Mock.STATUS[3].value)).toEqual(Mock.STATUS[3].label);
    expect(service.getStatusLabel()).toEqual("");
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
        color: '#EF5545',
        icon: 'fiber_new',
        value: -1
      },
      {
        name: 'OPTIONAL',
        label: 'Opcional',
        color: '#808080',
        icon: '',
        value: 0
      },
      {
        name: 'SAVED',
        label: 'Salvo',
        color: '#FCFF82',
        icon: 'save',
        value: 1
      },
      {
        name: 'FINALIZED',
        label: 'Finalizado',
        color: '#91EF45',
        icon: 'check_circle',
        value: 2
      }
    ];
  }

});
