describe('otusActivityManagerGridList Test', function() {

  let Mock = {};
  let Injections = [];
  let controller = {};

  beforeEach(function() {
    angular.mock.module('otusjs.otus');

    angular.mock.inject(function($injector, $controller) {
      Injections.$filter = $injector.get('$filter');
      Injections.$mdToast = $injector.get('$mdToast');
      Injections.$mdColors = $injector.get('$mdColors');
      Injections.ACTIVITY_MANAGER_LABELS = $injector.get('ACTIVITY_MANAGER_LABELS');

      controller = $controller('otusActivityGridListCtrl', Injections);
    });
  });

  it('controller existence check', function () {
    expect(controller).toBeDefined();
  });

  it('should verify properties definition', function () {
    expect(controller.$onInit).toBeDefined();
    expect(controller.orderByIndex).toBeDefined();
    expect(controller.selectDeselect).toBeDefined();
    expect(controller.selectDeselectAll).toBeDefined();
    expect(controller.filterGridTile).toBeDefined();
    expect(controller.displayGridLarge).toBeDefined();
    expect(controller.displayGridSmall).toBeDefined();
  });

  describe('Methods Suite Test', function(){

    beforeEach(function() {
      _mockInitialize();
      controller.$onInit();
      controller.updateFunction(Mock.elementsArray);
    });

    it('onInitMethod should initialized the controller variables', function () {
      expect(controller.elementsArray).toEqual(Mock.elementsArray);
      expect(controller.hoverGridHeaderWhiteframe).toEqual('md-whiteframe-19dp');
      expect(controller.gridDataSettings).toBeUndefined();
      expect(controller.callbackAfterChange).toBeDefined();
    });

    it('filterGridTileMethod should filter the activities', function () {
      expect(controller.filter).toEqual("");
      controller.filter = "ACTDC";
      controller.filterGridTile();
      expect(controller.filteredActiviteis.length).toEqual(2);
      controller.filter = "diário";
      controller.filterGridTile();
      expect(controller.filteredActiviteis.length).toEqual(0);
      controller.filter = "CISE";
      controller.filterGridTile();
      expect(controller.filteredActiviteis.length).toEqual(1);
    });

    it('orderByIndexMethod should order the activities', function () {
      expect(controller.orderReverse).toBeFalsy();
      expect(controller.iconsDropUpDown).toEqual('arrow_drop_up');
      expect(controller.orderQuery).toBeUndefined();

      controller.orderByIndex('name');
      expect(controller.orderReverse).toBeFalsy();
      expect(controller.iconsDropUpDown).toEqual('arrow_drop_down');
      expect(controller.orderQuery).toEqual('name');

      controller.orderByIndex('name');
      expect(controller.orderReverse).toBeTruthy();
      expect(controller.iconsDropUpDown).toEqual('arrow_drop_up');
      expect(controller.orderQuery).toEqual('name');

      controller.orderByIndex('acronym');
      expect(controller.orderReverse).toBeFalsy();
      expect(controller.iconsDropUpDown).toEqual('arrow_drop_down');
      expect(controller.orderQuery).toEqual('acronym');
    });

    it('selectDeselectAllMethod should select all the activities and deselect all the activities', function () {
      expect(controller.selectedItemCounter).toEqual(0);
      expect(controller.selectAll).toBeFalsy();

      controller.selectDeselectAll();
      expect(controller.selectedItemCounter).toEqual(3);
      expect(controller.selectAll).toBeTruthy();

      controller.selectDeselectAll();
      expect(controller.selectedItemCounter).toEqual(0);
      expect(controller.selectAll).toBeFalsy();
    });

    it('selectDeselectMethod should (de)select the activity', function () {
      expect(controller.selectedItemCounter).toEqual(0);

      controller.selectDeselect(Mock.elementsArray[0]);
      expect(controller.selectedItemCounter).toEqual(1);

      controller.selectDeselect(Mock.elementsArray[1]);
      expect(controller.selectedItemCounter).toEqual(2);

      controller.selectDeselect(Mock.elementsArray[1]);
      expect(controller.selectedItemCounter).toEqual(1);

      controller.selectDeselect(Mock.elementsArray[0]);
      expect(controller.selectedItemCounter).toEqual(0);
    });


    it('should call displayGridLarge method', function () {
      window.innerWidth = 1300;
      expect(controller.displayGridLarge()).toEqual('1:0.9');
      window.innerWidth = 1900;
      expect(controller.displayGridLarge()).toEqual('6:4');
    });

    it('should call displayGridSmall method', function () {
      window.innerWidth = 600;
      expect(controller.displayGridSmall()).toEqual('1:1');
      window.innerWidth = 800;
      expect(controller.displayGridSmall()).toEqual('2.7:2');
    });
  });


  function _mockInitialize() {
    Mock.elementsArray = Test.utils.data.activity[0].activities;

    const STATUS = Injections.ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.STATUS.FINALIZED.label;
    Mock.elementsArray.forEach(element => element.status = STATUS);
  }

});
