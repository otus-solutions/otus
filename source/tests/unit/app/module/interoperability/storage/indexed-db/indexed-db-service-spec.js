xdescribe('otusjs.otus.interoperability.storage.IndexedDbService', function() {

  var UNIT_NAME = 'otusjs.otus.interoperability.storage.IndexedDbService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {
      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

});
