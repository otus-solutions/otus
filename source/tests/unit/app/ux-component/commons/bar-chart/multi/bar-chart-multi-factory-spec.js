describe('Bar Chart Multi Factory Test', function() {
    var Mock = {};
    var factory;
    var Injections = {};
    var BODY = "body";
    var WHITE = "rgb(255, 255, 255)";
    var WIDTH = "260";
    var HEIGHT = "300";

    beforeEach(function() {
      angular.mock.module('otusjs.otus.uxComponent', function($provide) {
        $provide.value("otusjs.application.color.PaletteColorService", {
          getColor: (i) => {
            var cor = ["#ffffff","#ffffff"];
            return cor[i];
          }
        });
      });

      inject(function(_$injector_) {
        factory = _$injector_.get('otusjs.otus.uxComponent.BarChartsMultiFactory');
        mockData();
      });
      spyOn(d3, 'select').and.callThrough();
    });

    afterEach(function() {
      d3.selectAll('svg').remove();
    });

    it('should have methods defineds', function() {
      expect(factory.create).toBeDefined();
      expect(factory.build).toBeDefined();
    });

    it("should not construct a multi chart", function() {
      factory.create();
      factory.create([]);
      expect(d3.select).toHaveBeenCalledTimes(0);
    });

    it("should construct a multi chart without colors", function() {
      factory.create(Mock.data, BODY, {value: "Valor"})
      expect(d3.select).toHaveBeenCalledTimes(Mock.data.length);
      expect(getSvg().attr("width")).toEqual(WIDTH);
      expect(getSvg().attr("height")).toEqual(HEIGHT);
      for (var i = 0; i < Mock.data.length; i++) {
        expect(d3.selectAll(".chart-title")._groups[0][i].textContent).toEqual(Mock.data[i].title)
        expect(d3.selectAll("rect")._groups[0][i].style.fill).toEqual(WHITE);
      }
    });

    it("should construct a multi chart with colors array empty", function() {
      factory.create(Mock.data, BODY, {value: "Valor"}, [])
      expect(d3.select).toHaveBeenCalledTimes(Mock.data.length);
      expect(getSvg().attr("width")).toEqual(WIDTH);
      expect(getSvg().attr("height")).toEqual(HEIGHT);
      for (var i = 0; i < Mock.data.length; i++) {
        expect(d3.selectAll(".chart-title")._groups[0][i].textContent).toEqual(Mock.data[i].title)
        expect(d3.selectAll("rect")._groups[0][i].style.fill).toEqual(WHITE);
      }
    });

    it("should construct a multi chart with colors", function() {
      factory.create(Mock.data, BODY, Mock.labels, Mock.colors);
      expect(d3.select).toHaveBeenCalledTimes(Mock.data.length);
      expect(getSvg().attr("width")).toEqual(WIDTH);
      expect(getSvg().attr("height")).toEqual(HEIGHT);
      for (var i = 0; i < Mock.data.length; i++) {
        expect(d3.selectAll(".chart-title")._groups[0][i].textContent).toEqual(Mock.data[i].title)
        expect(d3.selectAll("rect")._groups[0][i].style.fill).toEqual(Mock.colors[0]);
        expect(d3.selectAll(".x_axis text")._groups[0][i].textContent).toEqual(Mock.labels.value);
      }
    });

    function getSvg() {
      return d3.select('svg');
    }

    function mockData() {
      Mock.labels = {value: "Valor"}
      Mock.colors = ['rgb(179, 48, 64)'];
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
