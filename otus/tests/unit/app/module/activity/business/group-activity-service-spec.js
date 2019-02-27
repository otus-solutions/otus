xdescribe('group-activity-service Test', function() {
    var Mock = {};
    var service;
    var Injections = {};
    var UNIT_NAME = "otusjs.activity.business.GroupActivityService";

    beforeEach(function() {
      //TODO: update module name
      angular.mock.module('otusjs.activity');

      inject(function(_$injector_) {
        Injections = {
          injection1: _$injector_.get('serviço1'),
          injection2: _$injector_.get('serviço2')
        };

        service = _$injector_.get('serviçoPrincipal', Injections);
      });
    });
    it('fail test', function() {
        expect(true).toBe(false);
    });

});
