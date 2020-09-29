describe('otusActivityManager Suite Test', function(){
  let Mock = {};
  let controller;

  beforeEach(function () {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $controller) => {
      controller = $controller('otusActivityManagerCtrl');
    });

    _mockInitialize();
  });


  it('controller_existence_check', function () {
    expect(controller).toBeDefined();
  });

  it('controller_methods_existence_check', () => {
    expect(controller.$onInit).toBeDefined();
    expect(controller.updateList).toBeDefined();
    expect(controller.handleViewInfoAction).toBeDefined();
  });

  it('onInit method should set listComponent and activityInfoComponent', function () {
    controller.$onInit();
    expect(controller.listComponent).toBeDefined();
    expect(controller.activityInfoComponent).toBeDefined();
  });

  it('updateList method should call listComponent update', function () {
    controller.listComponent = Mock.listComponent;
    spyOn(controller.listComponent, 'update').and.callThrough();
    controller.updateList();
    expect(controller.listComponent.update).toHaveBeenCalledTimes(1);
  });

  it('handleViewInfoAction method should call activityInfoComponent show', function () {
    controller.activityInfoComponent = Mock.activityInfoComponent;
    spyOn(controller.activityInfoComponent, 'show').and.callThrough();
    controller.handleViewInfoAction();
    expect(controller.activityInfoComponent.show).toHaveBeenCalledTimes(1);
  });

  function _mockInitialize(){
    Mock.listComponent = {
      update: function() {}
    };

    Mock.activityInfoComponent = {
      show: function() {}
    };
  }

});