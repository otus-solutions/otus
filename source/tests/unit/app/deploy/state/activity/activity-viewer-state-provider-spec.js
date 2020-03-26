describe('ActivityViewerStateProvider', function () {

  var UNIT_NAME = 'otusjs.deploy.ActivityViewerState';
  var URL = '/activity-viewer';
  var TEMPLATE_URL = '<otus-activity-viewer layout="row" flex></otus-activity-viewer>';
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
      expect(provider.state.name).toEqual(Injections.STATE.ACTIVITY_VIEWER);
    });

    it('url should be equal to expected', function () {
      expect(provider.state.url).toEqual(URL);
    });

    it('templateUrl should be equal to expected', function () {
      expect(provider.state.template).toEqual(TEMPLATE_URL);
    });

  });

});
