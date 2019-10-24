describe('the aliquot transportation factory', function() {
  var Mock = {};
  var factory;
  var Injections = {};

  beforeEach(function() {
    angular.mock.module('otusjs.laboratory.business.project.transportation');

    inject(function(_$injector_) {
        factory = _$injector_.get('otusjs.laboratory.business.project.transportation.AliquotTransportationQueryFactory');
    });
  });

  describe('create method without parameters', function() {
    var lotAliquot;
    beforeEach(function() {
      spyOn(factory, 'create').and.callThrough();
      lotAliquot = factory.create();
      lotAliquot = lotAliquot.toJSON();
    });

    it('should create an object', function() {
      expect(factory.create).toHaveBeenCalled();
      expect(lotAliquot).toBeDefined();
      expect(lotAliquot.objectType).toEqual('AliquotQuery');
      expect(lotAliquot.role).toEqual('EXAM');
      expect(lotAliquot.aliquotList).toEqual([]);
    });
  });

  describe('create method with parameters', function() {
    var lotAliquot;
    beforeEach(function() {
      spyOn(factory, 'create').and.callThrough();
      lotAliquot = factory.create('123456789',null,null,'RS',['321654987','987654321'], true);
      lotAliquot = lotAliquot.toJSON();
    });

    it('should create an object', function() {
      expect(factory.create).toHaveBeenCalled();
      expect(lotAliquot).toBeDefined();
      expect(lotAliquot.objectType).toEqual('AliquotQuery');
      expect(lotAliquot.role).toEqual('STORAGE');
      expect(lotAliquot.aliquotList.length).toEqual(2);
    });
  });

});
