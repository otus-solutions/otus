describe('PendencyViewerStateProvider', function () {

  var UNIT_NAME = 'otusjs.deploy.PendencyViewerState';
  var URL = '/pendency-viewer';
  var TEMPLATE_URL = '<pendency-view-component></pendency-view-component>';
  var provider = {};
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus');
  });

  beforeEach(function () {
    inject(function (_$injector_) {
      Injections.STATE = _$injector_.get('STATE');
      provider = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('state definition', function () {

    it('name should be equal to expected', function () {
      expect(provider.state.name).toEqual(Injections.STATE.PENDENCY_VIEWER);
    });

    it('url should be equal to expected', function () {
      expect(provider.state.url).toEqual(URL);
    });

    it('templateUrl should be equal to expected', function () {
      expect(provider.state.template).toEqual(TEMPLATE_URL);
    });

  });

});
