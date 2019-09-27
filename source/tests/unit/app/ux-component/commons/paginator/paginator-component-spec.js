describe('Paginator Component', function() {
  var Mock = {};
  var controller;
  Mock.scope = {$watch: ()=>{}};
  var UNIT_NAME = "otusPaginatorCtrl";
  var ROW_PER_PAGE = [10, 25, 50, 100, 200, 250, 500];
  var TOTAL_ROWS = 30;
  var RANGES = ["1 - 10", "11 - 20", "21 - 30"];

  beforeEach(function() {
    angular.mock.module('otusjs.otus.uxComponent', function ($provide) {
      $provide.value("$scope", Mock.scope);
    });
  });

  beforeEach(function () {
    inject(function (_$controller_) {
      controller = _$controller_(UNIT_NAME);
    })
  });

  describe('method onInit', function () {

    beforeEach(function () {
      mockBindings()
      mockController()
      spyOn(controller , "onUpdate").and.callThrough();
      controller.$onInit();
    })

    it('should constructor component', function() {
      expect(controller.pageSize).not.toContain(Mock.scope.rowPerPage)
      expect(Mock.scope.disabledForward).toEqual(false);
      expect(Mock.scope.disabledPrevious).toEqual(true);
      expect(Mock.scope.rowPerPage).toEqual(ROW_PER_PAGE);
      expect(Mock.scope.totalRows).toEqual(TOTAL_ROWS);
      expect(Mock.scope.pageSize).toEqual(10);
      expect(Mock.scope.rangePages.length).toEqual(3);
      expect(Mock.scope.pages.length).toEqual(3);
      expect(Mock.scope.range).toEqual(RANGES[0]);
      expect(controller.onUpdate).toHaveBeenCalledTimes(1);
      expect(controller.onUpdate).toHaveBeenCalledWith(Mock.scope.pages[0], 0, 9);
    });
  });

  describe('method goToForward', function () {

    beforeEach(function () {
      mockBindings()
      mockController()
      spyOn(controller , "onUpdate").and.callThrough();
      controller.$onInit();
    });

    it('should go forward to page 2', function() {
      controller.goToForward();
      expect(Mock.scope.disabledForward).toEqual(false);
      expect(Mock.scope.disabledPrevious).toEqual(false);
      expect(Mock.scope.range).toEqual(RANGES[1]);
      expect(controller.onUpdate).toHaveBeenCalledTimes(2);
      expect(controller.onUpdate).toHaveBeenCalledWith(Mock.scope.pages[1], 10, 19);
    });

    it('should go forward to page 3', function() {
      controller.goToForward();
      controller.goToForward();
      expect(Mock.scope.disabledForward).toEqual(true);
      expect(Mock.scope.disabledPrevious).toEqual(false);
      expect(Mock.scope.range).toEqual(RANGES[2]);
      expect(controller.onUpdate).toHaveBeenCalledTimes(3);
      expect(controller.onUpdate).toHaveBeenCalledWith(Mock.scope.pages[2], 20, 29);
    });
  });

  describe('method goToPrevious', function () {

    beforeEach(function () {
      mockBindings()
      mockController()
      spyOn(controller , "onUpdate").and.callThrough();
      controller.$onInit();
    });

    it('not should go previous', function() {
      controller.goToPrevious();
      expect(Mock.scope.disabledForward).toEqual(false);
      expect(Mock.scope.disabledPrevious).toEqual(true);
      expect(Mock.scope.range).toEqual(RANGES[0]);
      expect(controller.onUpdate).toHaveBeenCalledTimes(1);
    });

    it('should go previous to page 2', function() {
      controller.goToForward();
      controller.goToForward();
      expect(Mock.scope.disabledForward).toEqual(true);
      controller.goToPrevious();
      expect(Mock.scope.disabledForward).toEqual(false);
      expect(Mock.scope.disabledPrevious).toEqual(false);
      expect(Mock.scope.range).toEqual(RANGES[1]);
      expect(controller.onUpdate).toHaveBeenCalledTimes(4);
      expect(controller.onUpdate).toHaveBeenCalledWith(Mock.scope.pages[1], 10, 19);
    });

    it('should go previous to page 1', function() {
      controller.goToForward();
      controller.goToPrevious();
      expect(Mock.scope.disabledForward).toEqual(false);
      expect(Mock.scope.disabledPrevious).toEqual(true);
      expect(Mock.scope.range).toEqual(RANGES[0]);
      expect(controller.onUpdate).toHaveBeenCalledTimes(3);
      expect(controller.onUpdate).toHaveBeenCalledWith(Mock.scope.pages[0], 0 , 9);
    });
  });

  function mockBindings() {
    Mock.elements = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    Mock.pageSize = 15
  }

  function mockController() {
    controller.elements = Mock.elements;
    controller.pageSize = Mock.pageSize;
    controller.onUpdate = function () {};
  }

});
