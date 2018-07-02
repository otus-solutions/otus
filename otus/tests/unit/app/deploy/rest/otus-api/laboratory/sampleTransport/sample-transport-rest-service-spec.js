xdescribe('the sample transport rest service', function() {
  var Mock = {};
  var service;
  var Injections = {};

  beforeEach(function() {
    angular.mock.module('otusjs.deploy');
  });

  beforeEach(function() {
    Mock.OtusRestResourceService = {
      getSampleTransport: function() {
        return {
          create: function() {
            return {$promise:Promise.resolve()};
          },
          getAliquot: function() {
            return {$promise:Promise.resolve()};
          },
          getAliquotsByPeriod: function() {
            return {$promise:Promise.resolve()};
          },
          getLots: function() {
            return {$promise:Promise.resolve()};
          },
          createLot: function() {
            return {$promise:Promise.resolve()};
          },
          updateLot: function() {
            return {$promise:Promise.resolve()};
          },
          deleteLot: function() {
            return {$promise:Promise.resolve()};
          }
        };
      }
    };

    angular.mock.module(function($provide) {
      $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
    });

  });

  beforeEach(function() {
    angular.mock.inject(function(_$injector_) {
      Injections = {
        OtusRestResourceService: Mock.OtusRestResourceService
      };
      service = _$injector_.get('otusjs.deploy.SampleTransportRestService', Injections);
    });
  });

  it('should call initialize method',function() {
    // service.initialize();
    console.log(service);
  });


});
