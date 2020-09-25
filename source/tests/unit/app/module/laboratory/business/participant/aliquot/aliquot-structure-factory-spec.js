describe('Aliquot Structure Factory', function () {
  var Mock = {};
  var factory;

  beforeEach(function () {
    angular.mock.module('otusjs.laboratory.business.participant.aliquot');
  });

  beforeEach(function () {
    inject(function (_$injector_) {
      factory = _$injector_.get('AliquotStructureFactory');
    });
    mockAliquot();
  });

  it('should create a new structure aliquot', function () {
    expect(factory.create({}).toJSON()).toEqual(Mock.aliquotEmpty);
  });

  it('should create a structure aliquot empty', function () {
    var _aliquot = factory.create(Mock.aliquot).toEmptyJSON();
    expect(_aliquot.aliquotCode).not.toEqual(Mock.aliquot);
    expect(_aliquot.aliquotCode).toEqual('');
    expect(_aliquot.aliquotId).toEqual(Mock.aliquot.aliquotId);
    expect(_aliquot.tubeId).toEqual(Mock.aliquot.tubeId);
    expect(_aliquot.isSaved).toEqual(Mock.aliquot.isSaved);
    expect(_aliquot.name).toEqual(Mock.aliquot.name);
    expect(_aliquot.role).toEqual(Mock.aliquot.role);
    expect(_aliquot.label).toEqual(Mock.aliquot.label);
    expect(_aliquot.tubeCode).toEqual(Mock.aliquot.placeholder);
  });

  function mockAliquot() {
    Mock.aliquotEmpty = {
      aliquotCode: '',
      role: '',
      index: '',
      aliquotId: 'Aliquot',
      tubeCode: '',
      container: '',
      containerLabel: '',
      date: '',
      isSaved: false,
      name: '',
      label: '',
      operator: '',
      placeholder: '',
      processing: '',
      time: '',
      tubeId: 'Tube',
      tubeMessage: '',
      locationPoint: ''
    };

    Mock.aliquot = {
      aliquotCode: '323004438',
      role: 'EXAM',
      index: 2,
      aliquotId: 'EXAMAliquot2',
      tubeCode: '323000000',
      container: '',
      containerLabel: '',
      date: '',
      isSaved: false,
      name: 'TESTE',
      label: 'Criotubo',
      operator: '',
      placeholder: '',
      processing: '',
      time: '',
      tubeId: 'EXAMTube2',
      tubeMessage: ''
    };
  }

});