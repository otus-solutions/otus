describe('Bar Charts Vertical Factory Test', function () {
  var Mock = {};
  var factory;
  var Injections = {};
  var BODY = "body";
  var WHITE = "#ffffff";

  beforeEach(function () {
    //TODO: update module name
    angular.mock.module('otusjs.otus.uxComponent', function ($provide) {
      $provide.value("otusjs.application.color.PaletteColorService", {
        getColor: () => {
          return "#ffffff";
        }
      });
    });
    inject(function (_$injector_) {
      factory = _$injector_.get('otusjs.otus.uxComponent.BarChartsVerticalFactory');
      mockData();
    });

    spyOn(d3, 'select').and.callThrough();
  });


  it('should have methods defineds', function () {
    expect(factory.create).toBeDefined();
  });

  it('not should construct chart', function () {
    factory.create();
    expect(d3.select).toHaveBeenCalledTimes(0);
  });

  it('should construct chart without label value', function () {
    factory.create(Mock.data, BODY);
    expect(d3.select).toHaveBeenCalledTimes(1);
  });

  describe('create vertical bar chart with one data', function () {
    beforeEach(function () {
      factory.create(Mock.data, BODY);
    });
    afterEach(function () {
      d3.selectAll('svg').remove();
    });
    it('should create a char bar vertical', function () {
      expect(getSvg().attr("height")).toEqual('-50');
      expect(getSvg().attr("margin")).toEqual('250');
      expect(d3.selectAll('text.labelValue').attr("fill")).toEqual("#000");
      for (var i = 0; i < Mock.data[0].length; i++) {
        expect(d3.selectAll('text.labelValue')._groups[0][i].textContent).toEqual(Mock.data[0][i].value.toString());
      }
      expect(d3.selectAll('g.cost')._groups[0][0].style.fill).toEqual(WHITE);
    });
  });

  describe('create vertical bar chart with multi data without colors', function () {
    beforeEach(function () {
      factory.create(Mock.dataset, BODY);
      factory.create(Mock.dataset, BODY, []);
    });
    afterEach(function () {
      d3.selectAll('svg').remove();
    });
    it('should create a char bar vertical', function () {
      expect(getSvg().attr("height")).toEqual('-50');
      expect(getSvg().attr("margin")).toEqual('250');
      expect(d3.selectAll('text.labelValue')._groups[0][0]).not.toBeDefined();
      expect(d3.selectAll('g.cost')._groups[0][0].style.fill).toEqual(WHITE);
      expect(d3.selectAll('g.cost')._groups[0][1].style.fill).toEqual(WHITE);
      expect(d3.selectAll('g.cost')._groups[0][2].style.fill).toEqual(WHITE);
    });
  });

  describe('create vertical bar chart with multi data with colors', function () {
    beforeEach(function () {
      factory.create(Mock.dataset, BODY, Mock.colors);
    });
    afterEach(function () {
      d3.selectAll('svg').remove();
    });
    it('should create a char bar vertical', function () {
      expect(getSvg().attr("height")).toEqual('-50');
      expect(getSvg().attr("margin")).toEqual('250');
      expect(d3.selectAll('text.labelValue')._groups[0][0]).not.toBeDefined();
      expect(d3.selectAll('g.cost')._groups[0][0].style.fill).toEqual(Mock.colors[0]);
      expect(d3.selectAll('g.cost')._groups[0][1].style.fill).toEqual(Mock.colors[1]);
      expect(d3.selectAll('g.cost')._groups[0][2].style.fill).toEqual(Mock.colors[2]);
    });
  });

  function getSvg() {
    return d3.select('svg');
  }

  function mockData() {
    Mock.colors = ['#b33040', '#d25c4d', '#f2b447'];
    Mock.data = [
      [{
        "char_title": "Transportados",
        "column": "FASTING_HORMONE_LOCAL",
        "value": 10
      },
      {
        "char_title": "Transportados",
        "column": "FASTING_GLYCEMIA_LOCAL",
        "value": 12
      },
      {
        "char_title": "Transportados",
        "column": "BUFFY_COAT_MG",
        "value": 5
      },
      {
        "char_title": "Transportados",
        "column": "POST_INSULINE_CENTRAL",
        "value": 1
      },
      {
        "char_title": "Transportados",
        "column": "POST_INSULINE_LOCAL",
        "value": 2
      },
      {
        "char_title": "Transportados",
        "column": "POST_GLYCEMIA",
        "value": 3
      },
      {
        "char_title": "Transportados",
        "column": "POST_SERUM",
        "value": 4
      },
      {
        "char_title": "Transportados",
        "column": "POST_GLYCEMIA_LOCAL",
        "value": 6
      },
      {
        "char_title": "Transportados",
        "column": "BIOCHEMICAL_URINE",
        "value": 10
      },
      {
        "char_title": "Transportados",
        "column": "URINARY_CALCIUM",
        "value": 16
      },
      {
        "char_title": "Transportados",
        "column": "FASTING_HORMONE",
        "value": 19
      }
      ]
    ]
    Mock.dataset = [
      [{
        "char_title": "Transportados",
        "column": "FASTING_HORMONE_LOCAL",
        "value": 10
      },
      {
        "char_title": "Transportados",
        "column": "FASTING_GLYCEMIA_LOCAL",
        "value": 12
      },
      {
        "char_title": "Transportados",
        "column": "BUFFY_COAT_MG",
        "value": 5
      },
      {
        "char_title": "Transportados",
        "column": "POST_INSULINE_CENTRAL",
        "value": 1
      },
      {
        "char_title": "Transportados",
        "column": "POST_INSULINE_LOCAL",
        "value": 2
      },
      {
        "char_title": "Transportados",
        "column": "POST_GLYCEMIA",
        "value": 3
      },
      {
        "char_title": "Transportados",
        "column": "POST_SERUM",
        "value": 4
      },
      {
        "char_title": "Transportados",
        "column": "POST_GLYCEMIA_LOCAL",
        "value": 6
      },
      {
        "char_title": "Transportados",
        "column": "BIOCHEMICAL_URINE",
        "value": 10
      },
      {
        "char_title": "Transportados",
        "column": "URINARY_CALCIUM",
        "value": 16
      },
      {
        "char_title": "Transportados",
        "column": "FASTING_HORMONE",
        "value": 19
      }
      ],
      [{
        "char_title": "Preparados",
        "column": "FASTING_HORMONE_LOCAL",
        "value": 15
      },
      {
        "char_title": "Preparados",
        "column": "FASTING_GLYCEMIA_LOCAL",
        "value": 18
      },
      {
        "char_title": "Preparados",
        "column": "BUFFY_COAT_MG",
        "value": 20
      },
      {
        "char_title": "Preparados",
        "column": "POST_INSULINE_CENTRAL",
        "value": 15
      },
      {
        "char_title": "Preparados",
        "column": "POST_INSULINE_LOCAL",
        "value": 10
      },
      {
        "char_title": "Preparados",
        "column": "POST_GLYCEMIA",
        "value": 12
      },
      {
        "char_title": "Preparados",
        "column": "POST_SERUM",
        "value": 15
      },
      {
        "char_title": "Preparados",
        "column": "POST_GLYCEMIA_LOCAL",
        "value": 11
      },
      {
        "char_title": "Preparados",
        "column": "BIOCHEMICAL_URINE",
        "value": 13
      },
      {
        "char_title": "Preparados",
        "column": "URINARY_CALCIUM",
        "value": 19
      },
      {
        "char_title": "Preparados",
        "column": "FASTING_HORMONE",
        "value": 17
      }
      ],
      [{
        "char_title": "Recebidos",
        "column": "FASTING_HORMONE_LOCAL",
        "value": 9
      },
      {
        "char_title": "Recebidos",
        "column": "FASTING_GLYCEMIA_LOCAL",
        "value": 9
      },
      {
        "char_title": "Recebidos",
        "column": "BUFFY_COAT_MG",
        "value": 8
      },
      {
        "char_title": "Recebidos",
        "column": "POST_INSULINE_CENTRAL",
        "value": 5
      },
      {
        "char_title": "Recebidos",
        "column": "POST_INSULINE_LOCAL",
        "value": 4
      },
      {
        "char_title": "Recebidos",
        "column": "POST_GLYCEMIA",
        "value": 6
      },
      {
        "char_title": "Recebidos",
        "column": "POST_SERUM",
        "value": 8
      },
      {
        "char_title": "Recebidos",
        "column": "POST_GLYCEMIA_LOCAL",
        "value": 9
      },
      {
        "char_title": "Recebidos",
        "column": "BIOCHEMICAL_URINE",
        "value": 9
      },
      {
        "char_title": "Recebidos",
        "column": "URINARY_CALCIUM",
        "value": 6
      },
      {
        "char_title": "Recebidos",
        "column": "FASTING_HORMONE",
        "value": 5
      }
      ]
    ];
  }

});
