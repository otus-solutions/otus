describe('otusGenericList_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];

  const ITEM_COMPONENT_NAME = 'itemComponentName';
  const ITEM_TEMPLATE_TAG = 'item-component-name';

  beforeEach(() => {
    angular.mock.module('otusjs.otus.uxComponent');
    angular.mock.inject(($injector,$controller) => {
      Injections.PENDENCY_VIEWER_TITLES = $injector.get('GENERIC_LIST_VIEWER_LABELS');
      Injections.HtmlBuilderService = $injector.get('otusjs.utils.HtmlBuilderService');
      ctrl = $controller('genericListCtrl', Injections, {
        itemComponentName: ITEM_COMPONENT_NAME
      });
    });
  });

  it('ctrl_existence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('onInitMethod_should_set_itemTemplate', () => {
    ctrl.$onInit();
    expect(ctrl.itemTemplate).toBeDefined();
    expect(ctrl.itemTemplate.includes('<'+ITEM_TEMPLATE_TAG)).toBeTruthy();
  });

});
