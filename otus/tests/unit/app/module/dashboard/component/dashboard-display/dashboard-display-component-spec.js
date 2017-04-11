xdescribe('otusDashboardDisplay', function() {

  var UNIT_NAME = 'otusDashboardDisplay';
  var injections = {};
  var bindings = {};
  var componentController = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$componentController_) {
      componentController = _$componentController_(UNIT_NAME, bindings, injections);
    });
  });

  describe('component definition', function() {

    it('should be defined', function() {
      expect(componentController).toBeDefined();
    });

  })

});
