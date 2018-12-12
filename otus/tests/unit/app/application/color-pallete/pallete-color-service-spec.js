describe('Pallete Color Service Test', function() {
  var Mock = {};
  var service;


  beforeEach(function() {
    angular.mock.module('otusjs.application.color');
    inject(function(_$injector_) {

      service = _$injector_.get('otusjs.application.color.PalleteColorService');
      mockData();
    });
  });
  it('should have methods and values defineds', function() {
    expect(service.getRandomColor).toBeDefined();
    expect(service.getColor).toBeDefined();
    expect(service.listColors).toBeDefined();
    expect(Array.isArray(service.COLORS)).toBeTruthy();
    expect(service.COLORS.length).toBeGreaterThan(0);
    expect(service.COLORS.length).toEqual(13);
    expect(service.COLORS).toEqual(Mock.colors);
  });

  it('should return a random color hex', function () {
    var COLOR = service.getRandomColor();
    var REGEXP = /#.{6}/;
    expect(COLOR).toEqual(jasmine.any(String));
    expect(COLOR).toEqual(COLOR.match(REGEXP)[0]);
    expect(REGEXP.test(COLOR)).toBeTruthy();
  });

  it('should return a color of pallete', function () {
    var i = 0;
    for (i; i < service.COLORS.length; i++) {
      expect(service.getColor(i)).toEqual(Mock.colors[i]);
    }
    expect(service.getColor(i)).toEqual(Mock.colors[0]);
    expect(service.getColor(Mock.colors[0])).toEqual(Mock.colors[0]);
    expect(service.getColor("jasmine")).toEqual(Mock.colors[0]);
    expect(service.getColor("")).toEqual(Mock.colors[0]);

  });


  it('should return list colors pallete', function () {
    expect(service.listColors()).toEqual(Mock.colors);
  });


  function mockData() {
    Mock.colors = [
      "#415ad0",
      "#e88023",
      "#00796B",
      "#af9c6d",
      "#c9bd5b",
      "#7a5e38",
      "#343434",
      "#604a2f",
      "#26338c",
      "#f9eb6a",
      "#9a8a63",
      "#9bc6c2",
      "#9a5419"
    ];
  }


});
