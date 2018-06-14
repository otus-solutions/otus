describe('monitoringFilterViewComponent test', function() {
  var Mock = {};
  var $controller;
  var ctrl;
  var Injections = {};


  beforeEach(function() {
    angular.mock.module('otusjs.otus.uxComponent');
  });

  beforeEach(function() {

    inject(function(_$injector_, _$controller_) {
      $controller = _$controller_;
      Injections = {
        $mdToast: _$injector_.get('$mdToast'),
        $filter: _$injector_.get('$filter')
      };
      ctrl = $controller('monitoringFilterViewCtrl', Injections);
      mockController();
    });
  });

  describe('onInit method', () => {
    beforeEach(() => {
      spyOn(ctrl, '$onInit').and.callThrough();
      spyOn(ctrl, 'onFilter').and.callThrough();
      spyOn(ctrl, 'updateData').and.callThrough();
      spyOn(ctrl, 'parseData').and.callThrough();
      ctrl.$onInit();
    });

    it('should onInit be defined', () => {
      expect(ctrl.$onInit).toHaveBeenCalled();
      expect(ctrl.onFilter).toHaveBeenCalledTimes(1);
      expect(ctrl.updateData).toHaveBeenCalledTimes(1);
      expect(ctrl.parseData).toHaveBeenCalledTimes(1);
      expect(ctrl.centers).toBeDefined();
      expect(ctrl.questionnaireInfo).toBeDefined();
      expect(ctrl.selected).toBeDefined();

    });

  });


  function mockCenters() {
    return JSON.parse('['+
    '{"name":"Minas Gerais","code":3,"acronym":"MG","country":null,"state":null,"address":null,"complement":null,"zip":null,"phone":null,"backgroundColor":"rgba(255, 99, 132, 0.2)","borderColor":"rgba(255, 99, 132, 1)","goal":3025},'+
    '{"name":"Sao Paulo","code":6,"acronym":"SP","country":null,"state":null,"address":null,"complement":null,"zip":null,"phone":null,"backgroundColor":"rgba(54, 162, 235, 0.2)","borderColor":"rgba(54, 162, 235, 1)","goal":4895},'+
    '{"name":"Rio Grande do Sul","code":5,"acronym":"RS","country":null,"state":null,"address":null,"complement":null,"zip":null,"phone":null,"backgroundColor":"rgba(75, 192, 192, 0.2)","borderColor":"rgba(75, 192, 192, 1)","goal":1999},'+
    '{"name":"Rio de Janeiro","code":4,"acronym":"RJ","country":null,"state":null,"address":null,"complement":null,"zip":null,"phone":null,"backgroundColor":"rgba(127, 190, 102, 0.2)","borderColor":"rgba(127, 190, 102, 1)","goal":1745},'+
    '{"name":"Espirito Santo","code":2,"acronym":"ES","country":null,"state":null,"address":null,"complement":null,"zip":null,"phone":null,"backgroundColor":"rgba(153, 102, 255, 0.2)","borderColor":"rgba(153, 102, 255, 1)","goal":1024},'+
    '{"name":"Bahia","code":1,"acronym":"BA","country":null,"state":null,"address":null,"complement":null,"zip":null,"phone":null,"backgroundColor":"rgba(255, 163, 102, 0.2)","borderColor":"rgba(255, 163, 102, 1)","goal":1945}]');

  }

  function mockController() {
    ctrl.centers = mockCenters();
    ctrl.updateData = (data) => {};
    ctrl.parseData = (data) => {};
    ctrl.startDateInfo = "1/2018";
    ctrl.endDateInfo = "5/2018";
    ctrl.questionnaireInfo = "CISE";
  }




});
