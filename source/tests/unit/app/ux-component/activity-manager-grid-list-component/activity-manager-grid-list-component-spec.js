describe('otusActivityManagerGridList Test', function() {

    var UNIT_NAME = 'otusActivityGridListCtrl';
    var Injections = [];
    var controller = {};
    var ELEMENTS_ARRAY;

    beforeEach(function() {
        mocks();
        angular.mock.module('otusjs.otus');

        angular.mock.inject(function(_$injector_, _$controller_) {
            Injections.$filter = _$injector_.get('$filter');
            Injections.$mdToast = _$injector_.get('$mdToast');

            controller = _$controller_(UNIT_NAME, Injections);
        });
        controller.$onInit();
        controller.updateFunction(ELEMENTS_ARRAY);
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

    it('onInitMethod should inicialized the controller variables', function () {
        expect(controller.elementsArray).toEqual(ELEMENTS_ARRAY);
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

     it('selectDeselectMethod should select the activity and deselect the activity', function () {
        expect(controller.selectedItemCounter).toEqual(0);

        controller.selectDeselect(ELEMENTS_ARRAY[0]);
        expect(controller.selectedItemCounter).toEqual(1);

        controller.selectDeselect(ELEMENTS_ARRAY[1]);
        expect(controller.selectedItemCounter).toEqual(2);

        controller.selectDeselect(ELEMENTS_ARRAY[1]);
        expect(controller.selectedItemCounter).toEqual(1);

        controller.selectDeselect(ELEMENTS_ARRAY[0]);
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

    function mocks() {
        ELEMENTS_ARRAY = Test.utils.data.activity[0].activities;
    }

});
