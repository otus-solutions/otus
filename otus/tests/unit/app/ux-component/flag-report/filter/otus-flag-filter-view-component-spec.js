describe('flagFilterViewCtrl Test', function() {
  var Mock = {};
  var controller;
  var STATUS = [
    {
      name: 'CREATED',
      label: 'Criado',
      color: '#ef5545',
      icon: 'fiber_new',
      value: -1
    },
    {
      name: 'SAVED',
      label: 'Salvo',
      color: '#fcff82',
      icon: 'save',
      value: 1
    },
    {
      name: 'FINALIZED',
      label: 'Finalizado',
      color: '#91ef45',
      icon: 'check_circle',
      value: 2
    }
  ];

  var ACRONYMS = ["A","B","C","D","E","F"];
  var CENTERS = [{acronym: "RS"}];

  beforeEach(function() {

    angular.mock.module('otusjs.otus.uxComponent');

    inject(function(_$controller_) {
      controller = _$controller_('flagFilterViewCtrl');
      mockBindings();
      spyOn(controller, "onUpdate").and.callThrough();
    });
  });

    it('should create method onChangeFilter', function() {
      expect(controller.onChangeFilter).toBeUndefined();
      controller.$onInit();
      expect(controller.onChangeFilter).not.toBeUndefined();
    });

  it('should call method onUpdate', function () {
    controller.$onInit();
    expect(controller.onChangeFilter).toBeDefined();
    controller.onChangeFilter();
    expect(controller.onUpdate).toHaveBeenCalled();
    expect(controller.onUpdate).toHaveBeenCalledTimes(1);
  });

  it('should clear acronym', function () {
    controller.$onInit();
    controller.clear(Mock.acronym);
    expect(controller.selectedAcronym).toEqual(null);
    expect(controller.onUpdate).toHaveBeenCalled();
    expect(controller.onUpdate).toHaveBeenCalledTimes(1);
  });

  it('should clear status', function () {
    controller.$onInit();
    controller.clear(Mock.status);
    expect(controller.selectedStatus).toEqual(null);
    expect(controller.onUpdate).toHaveBeenCalled();
    expect(controller.onUpdate).toHaveBeenCalledTimes(1);
  });

  it('should clear not field informed or invalid', function () {
    controller.$onInit();
    controller.clear(null);
    expect(controller.onUpdate).not.toHaveBeenCalled();
    expect(controller.onUpdate).toHaveBeenCalledTimes(0);
  });


  function mockBindings() {
   controller.activitiesStatus = STATUS;
   controller.acronymsList = ACRONYMS;
   controller.centers = CENTERS;
   controller.onUpdate = () => {};

   Mock.acronym = "acronym";
   Mock.status = "status";
  }

});
