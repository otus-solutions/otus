describe('Bar Charts Horizontal Factory Test', function() {
  var Mock = {};
  var factory;
  var Injections = {};
  var BODY = "body";
  var WHITE = "#ffffff";

  beforeEach(function() {
    angular.mock.module('otusjs.otus.uxComponent', function($provide) {
      $provide.value("otusjs.application.color.PalleteColorService", {
        getColor: () => {
          return "#ffffff";
        }
      });
    });
    inject(function(_$injector_) {
      factory = _$injector_.get('otusjs.otus.uxComponent.BarChartsHorizontalFactory');
      mockData();
    });

    spyOn(d3, 'select').and.callThrough();
  });

  it('should have methods defineds', function() {
    expect(factory.create).toBeDefined();
  });

  it('not should construct chart', function() {
    factory.create();
    factory.create(null, "body");
    expect(d3.select).toHaveBeenCalledTimes(0);
  });

  describe('create vertical bar chart with data without color', function() {
    beforeEach(function() {
      factory.create(Mock.data, BODY, null);
    });
    afterEach(function() {
      d3.selectAll('svg').remove();
    });
    it('should create a char bar vertical', function() {
      expect(d3.select).toHaveBeenCalledTimes(1);
      expect(getSvg().attr("width")).toEqual("290");
      expect(getSvg().attr("height")).toEqual('550');
      expect(d3.selectAll("svg rect.bar")._groups[0].length).toEqual(Mock.data.length);
      for (var i = 0; i < Mock.data.length; i++) {
        expect(d3.selectAll("rect.bar")._groups[0][i].style.fill).toEqual(WHITE)
      }
    });
  });

  describe('create vertical bar chart with data with color', function() {
    beforeEach(function() {
      factory.create(Mock.data, BODY, Mock.color);
    });
    afterEach(function() {
      d3.selectAll('svg').remove();
    });
    it('should create a char bar vertical', function() {
      expect(d3.select).toHaveBeenCalledTimes(1);
      expect(getSvg().attr("width")).toEqual("290");
      expect(getSvg().attr("height")).toEqual('550');
      expect(d3.selectAll("svg rect.bar")._groups[0].length).toEqual(Mock.data.length);
      for (var i = 0; i < Mock.data.length; i++) {
        expect(d3.selectAll("rect.bar")._groups[0][i].style.fill).toEqual(Mock.color)
      }
    });
  });

  function getSvg() {
    return d3.select('svg');
  }

  function mockData() {
    Mock.color = '#b33040';
    Mock.data = [
        {
          'title': 'Population',
          'value': 36
        },
        {
          'title': 'Popluation Grow Rate',
          'value': 48
        },
        {
          'title': 'Tallest Building',
          'value': 1614
        },
        {
          'title': 'Sex Ratio',
          'value': 106
        },
        {
          'title': 'Literacy All Gender',
          'value': 92
        },
        {
          'title': 'Literacy All Male',
          'value': 96
        },
        {
          'title': 'Literacy All Female',
          'value': 88
        },
        {
          'title': 'Area',
          'value': 9706
        },
        {
          'title': 'Area Land',
          'value': 9434
        },
        {
          'title': 'Area Water',
          'value': 272
        },
        {
          'title': 'Infant Mortality',
          'value': 15
        }
      ];
  }

});
