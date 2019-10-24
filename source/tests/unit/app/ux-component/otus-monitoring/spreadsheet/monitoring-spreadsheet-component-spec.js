describe('monitoringSpreadsheetComponent test', function() {
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
        $filter: _$injector_.get('$filter')
      };
      ctrl = $controller('monitoringSpreadsheetCtrl', Injections);
      mockController();
    });
  });

  describe('onInit method', () => {
    beforeEach(() => {
      spyOn(ctrl, '$onInit').and.callThrough();
      spyOn(ctrl, 'createSpreadsheet').and.callThrough();

      ctrl.$onInit();
      ctrl.createSpreadsheet(mockData());
    });

    it('should onInit be defined', () => {
      expect(ctrl.$onInit).toHaveBeenCalled();
      expect(ctrl.createSpreadsheet).toHaveBeenCalledWith(mockData());
      expect(ctrl.centers).toBeDefined();

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
  }

  function mockData() {
    return {
      fieldCenters: [
        {
          backgroundColor: "rgba(255, 163, 102, 0.2)",
          borderColor: "rgba(255, 163, 102, 1)",
          borderWidth: 1,
          data: [0,9337],
          goal: 1945,
          label: "Bahia"
        },
        {
          backgroundColor: "rgba(255, 163, 102, 0.2)",
          borderColor: "rgba(255, 163, 102, 1)",
          borderWidth: 1,
          data: [0,0],
          goal: 3025,
          label: "Minas Gerais"
        },
        {
          backgroundColor: "rgba(255, 163, 102, 0.2)",
          borderColor: "rgba(255, 163, 102, 1)",
          borderWidth: 1,
          data: [0,0],
          goal: 1745,
          label: "Rio de Janeiro"
        },
      ]
    };
  }




});
