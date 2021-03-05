describe('UserCommentAboutParticipantStateProvider', function () {

  var UNIT_NAME = 'otusjs.deploy.UserCommentAboutParticipantState';
  var URL = '/user-comment-about-participant';
  var TEMPLATE_URL = '<otus-user-comment-about-participant-list layout="column" flex></otus-user-comment-about-participant-list>';
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
      expect(provider.state.name).toEqual(Injections.STATE.USER_COMMENT_ABOUT_PARTICIPANT);
    });

    it('url should be equal to expected', function () {
      expect(provider.state.url).toEqual(URL);
    });

    it('templateUrl should be equal to expected', function () {
      expect(provider.state.template).toEqual(TEMPLATE_URL);
    });

  });

});
