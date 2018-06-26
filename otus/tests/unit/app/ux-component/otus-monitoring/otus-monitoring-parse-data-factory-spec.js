describe('monitoringParseDataFactory test', function() {
  var Mock = {};
  var $controller;
  var factory;
  var Injections = {};
  var oldDate = Date;
  var startDate = new Date(2017,1,1);
  var endDate = new Date(2018,2,1);


  beforeEach(function() {
    angular.mock.module('otusjs.otus.uxComponent');
  });

  beforeEach(function() {

    inject(function(_$injector_) {

      factory = _$injector_.get('otusMonitorParseDataFactory', Injections);
      jasmine.clock().install();
      jasmine.clock().tick(50);
      mockFactory();
    });
  });

  afterEach(function() {
      jasmine.clock().uninstall();
    });

  describe('onInit method', () => {
    beforeEach(() => {
      spyOn(window, 'Date').and.callFake(function(data) {
        if(data == '2017-2-1'){
          return startDate;
        } else if(data == '2018-3-1') {
          return endDate;
        }
        return new oldDate();
      });
      spyOn(factory, 'init').and.callThrough();
      spyOn(factory, 'create').and.callThrough();

      factory.init(getDates(), getMonitoringData(), () => {}, getDataSet());
      Mock.monitoringObject = factory.create("CISE", getSelectedCenters(), "2017-2-1", "2018-3-1");
    });

    it('should create a object for chart', () => {
      expect(factory.init).toHaveBeenCalled();
      expect(factory.create).toHaveBeenCalled();
      expect(factory.create()).toEqual(getEmptyObject());
      expect(factory.create("CISE")).toEqual(getEmptyObject());
      expect(factory.create("CISE", getSelectedCenters())).toEqual(getEmptyObject());
      expect(Mock.monitoringObject).not.toEqual(getEmptyObject());
      expect(Mock.monitoringObject.data.length).toBeGreaterThan(0);
      expect(Mock.monitoringObject.fieldCenters).toEqual(getSelectedCenters());
      expect(Mock.monitoringObject.dates).toEqual(getDates());

    });

  });

  function getMonitoringData() {
    return [{
        fieldCenter: "RJ",
        acronym: "CISE",
        month: 2,
        year: 2017,
        sum: "2"
      },
      {
        fieldCenter: "SP",
        acronym: "CISE",
        month: 3,
        year: 2018,
        sum: "5"
      }
    ]
  }


  function getEmptyObject() {
    return {
      data: [],
      fieldCenters: [],
      dates: []
    };
  }

  function getDataSet() {
    return {
      "MG": {
        "goal": 100,
        "name": "Minas Gerais",
        "backgroundColor": "rgba(255, 99, 132, 0.2)",
        "borderColor": "rgba(255, 99, 132, 1)"
      },
      "SP": {
        "goal": 100,
        "name": "São Paulo",
        "backgroundColor": "rgba(255, 99, 132, 0.2)",
        "borderColor": "rgba(255, 99, 132, 1)"
      },
      "RS": {
        "goal": 100,
        "name": "Rio Grande do Sul",
        "backgroundColor": "rgba(255, 99, 132, 0.2)",
        "borderColor": "rgba(255, 99, 132, 1)"
      },
      "ES": {
        "goal": 100,
        "name": "Espirito Santo",
        "backgroundColor": "rgba(255, 99, 132, 0.2)",
        "borderColor": "rgba(255, 99, 132, 1)"
      },
      "RJ": {
        "goal": 100,
        "name": "Rio de Janeiro",
        "backgroundColor": "rgba(255, 99, 132, 0.2)",
        "borderColor": "rgba(255, 99, 132, 1)"
      },
      "BA": {
        "goal": 100,
        "name": "Bahia",
        "backgroundColor": "rgba(255, 99, 132, 0.2)",
        "borderColor": "rgba(255, 99, 132, 1)"
      }
    };

  }

  function getDates() {
    return ["2017-2-1", "2018-3-1"];
  }

  function getSelectedCenters() {
    return ["BA", "ES", "RS", "RJ", "SP", "MG"];
  }

  function mockFactory() {
    factory.uniqueDatesList = getDates();
    // factory.centers = mockCenters();
    // factory.updateData = (data) => {factory.ready = true;};
    // factory.parseData = (data) => {};
    // factory.startDateInfo = "1/2018";
    // factory.endDateInfo = "5/2018";
    // factory.questionnaireInfo = "CISE";
  }




});
