describe('ActivityStageStateProvider', function () {

  var UNIT_NAME = 'otusjs.deploy.ActivityStageState';
  var URL = '/activity-stage';
  var TEMPLATE_URL = '<otus-activity-stage-list layout="column" flex></otus-activity-stage-list>';
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
      expect(provider.state.name).toEqual(Injections.STATE.PARTICIPANT_ACTIVITY_STAGE);
    });

    it('url should be equal to expected', function () {
      expect(provider.state.url).toEqual(URL);
    });

    it('templateUrl should be equal to expected', function () {
      expect(provider.state.template).toEqual(TEMPLATE_URL);
    });

  });

});
