fdescribe('otusActivityManagerList Test', function() {

  var UNIT_NAME = 'otusActivityListCtrl';
  var Mock = {};
  var Bindings = {};
  var Injections = {};
  var controller = {};

  beforeEach(function() {
    angular.mock.module('otusjs.otus.uxComponent', function($provide){
      $provide.value('otusActivityManager', {});
      $provide.value('otusjs.activity.business.ParticipantActivityService', {});
      $provide.value('otusjs.activity.core.EventService', {});
      $provide.value('otusjs.otus.uxComponent.ActivityItemFactory', {});
      $provide.value('otusjs.deploy.LoadingScreenService', {});
      $provide.value('otusjs.otus.uxComponent.DynamicTableSettingsFactory', {});
      $provide.value('$q', {});
    });

    inject(function(_$injector_, _$controller_) {

      controller = _$controller_(UNIT_NAME);
    });
  });

  it('should create controller', function(){
    console.log(controller);
  })

  

});
