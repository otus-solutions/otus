xdescribe('otus-api-service Test', function() {
    var Mock = {};
    var service;
    var Injections = {};

    beforeEach(function() {
      //TODO: update module name
      angular.mock.module('otus-api-service');

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
