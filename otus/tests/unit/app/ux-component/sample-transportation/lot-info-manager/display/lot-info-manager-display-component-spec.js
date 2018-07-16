describe('Lot info aliquot-manager display component', function() {
  var Mock = {};
  var $controller;
  var ctrl;
  var Injections = {};

  beforeEach(function() {
    angular.mock.module('otusjs.otus.uxComponent');
  });

  beforeEach(function() {
    Mock.AliquotTransportationService = {
      getContainerLabelToAliquot: function(aliquot) {},
      getAliquots: function(query) {},
      dynamicDataTableFunction: {
        updateDataTable: function() {}
      }
    };

    Mock.AliquotTransportationMesssagesService = {
      unselectedPeriod: function() {},
      invalidPeriodInterval: function() {},
      notAliquotsInserted: function() {},
      successInAliquotInsertion: function() {},
      toastOtherLot: function() {},
      toastNotFoundError: function() {},
      toastDuplicated: function() {}
    };

    Mock.AliquotTransportationFactory = {
      create: function(a, b, c, d, e, f) {
        return {
          toJSON: function() {
            return {};
          }
        };
      }
    };
    Mock.LoadingScreenService = {
      changeMessage: function(msg) {},
      start: function() {},
      finish: function() {}
    };
    Mock.lot = new TransportationLot();
    angular.mock.module(function($provide) {
      $provide.value('otusjs.laboratory.business.project.transportation.AliquotTransportationService', Mock.AliquotTransportationService);
      $provide.value('otusjs.laboratory.business.project.transportation.AliquotTransportationMessagesService', Mock.AliquotTransportationMesssagesService);
      $provide.value('otusjs.laboratory.business.project.transportation.AliquotTransportationQueryFactory', Mock.AliquotTransportationFactory);
      $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
    });
  });

  beforeEach(function() {
    inject(function(_$injector_, _$controller_) {

      $controller = _$controller_;
      Injections = {
        $mdDialog: _$injector_.get('$mdDialog'),
        $mdToast: _$injector_.get('$mdToast'),
        $filter: _$injector_.get('$filter'),
        DynamicTableSettingsFactory: _$injector_.get('otusjs.otus.uxComponent.DynamicTableSettingsFactory'),
        $q: _$injector_.get('$q')
      };
      ctrl = $controller('otusLotInfoManagerDisplayCtrl', Injections);
      jasmine.clock().install();
      jasmine.clock().tick(50);
      mockController();
    });
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  describe('onInit method', function() {
    var build;
    beforeEach(function() {
      spyOn(ctrl, '$onInit').and.callThrough();
      spyOn(Injections.DynamicTableSettingsFactory, 'create').and.callThrough();
      spyOn(Injections.DynamicTableSettingsFactory.create(), 'addColumnProperty').and.callThrough();
      ctrl.$onInit();

    });

    it('should onInit be defined', function() {
      expect(ctrl.$onInit).toHaveBeenCalled();
      expect(ctrl.$onInit).not.toBeNull();
    });

    it('should DynamicTableSettingsFactory be defined', function() {
      expect(Injections.DynamicTableSettingsFactory.create).toHaveBeenCalled();
      expect(Injections.DynamicTableSettingsFactory.create).not.toBeNull();
    });

    it('should dynamicTableSettings contain property value aliquotCollectionData.processing', function() {
      expect(ctrl.dynamicTableSettings.elementsProperties).toContain("aliquotCollectionData.processing");
    });

  });

  describe('insertAliquotsByPeriod method', function() {
    beforeEach(function() {
      spyOn(ctrl, 'insertAliquotsByPeriod').and.callThrough();
      spyOn(Mock.AliquotTransportationMesssagesService, 'unselectedPeriod').and.callThrough();
      spyOn(Mock.AliquotTransportationMesssagesService, 'invalidPeriodInterval').and.callThrough();
      spyOn(Mock.AliquotTransportationMesssagesService, 'successInAliquotInsertion').and.callThrough();
      spyOn(ctrl.lot, 'insertAliquotList').and.callThrough();
      spyOn(Injections.$mdDialog, 'show').and.callFake(function(confirm) {
        if (confirm) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      });
      spyOn(ctrl.AliquotTransportationService, 'getAliquots').and.callFake(function() {
        return Promise.resolve([].concat(mockWorkAliquots()));
      });
    });

    it('should show message unselectedPeriod', function() {
      ctrl.insertAliquotsByPeriod();
      expect(Mock.AliquotTransportationMesssagesService.unselectedPeriod).toHaveBeenCalledTimes(1);
    });

    it('should show message invalidPeriodInterval', function() {
      ctrl.initialDate = new Date(2018, 1, 1);
      ctrl.finalDate = new Date(2017, 1, 1);
      ctrl.insertAliquotsByPeriod();
      expect(Mock.AliquotTransportationMesssagesService.invalidPeriodInterval).toHaveBeenCalledTimes(1);
    });

    it('should insert WorkAliquotList', function(done) {
      var _length = ctrl.lot.aliquotList.length;
      ctrl.$onInit();
      ctrl.insertAliquotsByPeriod();
      Injections.$mdDialog.show(jasmine.any(Object)).then(function() {
        ctrl.AliquotTransportationService.getAliquots().then(function(result) {
          expect(ctrl.lot.insertAliquotList).toHaveBeenCalledWith(result);
          expect(ctrl.lot.insertAliquotList).toHaveBeenCalledTimes(1);
          expect(ctrl.lot.aliquotList.length).toBeGreaterThan(_length);
          expect(Mock.AliquotTransportationMesssagesService.successInAliquotInsertion).toHaveBeenCalledTimes(1);
          done();
        }).catch(function() {});
        done();
      }).catch(function() {});
    });

  });

  describe('fastInsertion method', function() {
    beforeEach(function() {
      spyOn(ctrl, 'fastInsertion').and.callThrough();
      spyOn(Mock.AliquotTransportationMesssagesService, 'toastOtherLot').and.callThrough();
      spyOn(Mock.AliquotTransportationMesssagesService, 'toastNotFoundError').and.callThrough();
      spyOn(Mock.AliquotTransportationMesssagesService, 'successInAliquotInsertion').and.callThrough();
      spyOn(Mock.AliquotTransportationMesssagesService, 'toastDuplicated').and.callThrough();
      spyOn(ctrl.lot, 'insertAliquot').and.callThrough();
      spyOn(ctrl.AliquotTransportationService, 'getAliquots').and.callFake(function() {
        return Promise.resolve(mockWorkAliquots());
      });
    });

    it('should insert WorkAliquot', function(done) {
      var _length = ctrl.lot.aliquotList.length;
      ctrl.aliquotCode = "363123445";
      ctrl.fastInsertion(ctrl.aliquotCode);
      ctrl.AliquotTransportationService.getAliquots().then(function(result) {
        expect(ctrl.lot.insertAliquot).toHaveBeenCalledWith(mockWorkAliquots());
        expect(ctrl.lot.insertAliquot).toHaveBeenCalledTimes(1);
        expect(ctrl.lot.aliquotList.length).toBeGreaterThan(_length);
        expect(Mock.AliquotTransportationMesssagesService.successInAliquotInsertion).toHaveBeenCalledTimes(1);
        done();
      });
      expect(ctrl.aliquotCode).toEqual('');
    });

    it('should not insert duplicated WorkAliquot', function(done) {
      ctrl.aliquotCode = "363123446";
      ctrl.fastInsertion(ctrl.aliquotCode);
      ctrl.AliquotTransportationService.getAliquots().then(function(result) {
        expect(Mock.AliquotTransportationMesssagesService.toastDuplicated).toHaveBeenCalledTimes(1);
        done();
      });
      expect(ctrl.aliquotCode).toEqual('');
    });
  });

  function mockController() {
    ctrl.storage = false;
    ctrl.onLotAlteration = function(newData) {};
    ctrl.setChartData = function() {};
    ctrl.lot = Mock.lot;
  }

  function mockWorkAliquots() {

    return {
      "recruitmentNumber": 1078650,
      "birthdate": {
        "objectType": "ImmutableDate",
        "value": "1960-02-22 00:00:00.000"
      },
      "sex": "F",
      "fieldCenter": {
        "name": "Sao Paulo",
        "code": 6,
        "acronym": "SP",
        "country": null,
        "state": null,
        "address": null,
        "complement": null,
        "zip": null,
        "phone": null
      },
      "objectType": "WorkAliquot",
      "code": "363123445",
      "name": "BIOCHEMICAL_SERUM",
      "container": "CRYOTUBE",
      "role": "EXAM",
      "aliquotCollectionData": {
        "objectType": "AliquotCollectionData",
        "metadata": "",
        "operator": "diogo.rosas.ferreira@gmail.com",
        "time": "2017-09-26T17:54:21.883Z",
        "processing": "2018-02-23T11:00:00Z"
      }
    };
  }

  function TransportationLot() {
    var self = this;
    self.fieldCenter = {
      acronym: 'RS'
    };
    self.insertAliquotList = function(list) {
      list.forEach(function(aliquot) {
        self.aliquotList.push(aliquot);
      });
    };

    self.insertAliquot = function(aliquot) {
      self.aliquotList.push(aliquot);
    };

    self.toJSON = function() {
      return {
        fieldCenter: self.fieldCenter,
        insertAliquot: self.insertAliquot,
        insertAliquotList: self.insertAliquotList,
        getAliquotCodeList: self.getAliquotCodeList,
        aliquotList: self.aliquotList
      };
    };
    self.getAliquotCodeList = function() {
      var _array = [];
      self.aliquotList.forEach(function(aliquot) {
        _array.push(aliquot.code);
      });
      return _array;
    };

    self.aliquotList = [{
        "recruitmentNumber": 1078650,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1960-02-22 00:00:00.000"
        },
        "sex": "F",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "363123446",
        "name": "FASTING_HORMONE",
        "container": "CRYOTUBE",
        "role": "EXAM",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "diogo.rosas.ferreira@gmail.com",
          "time": "2017-11-01T18:31:34.798Z",
          "processing": "2018-02-23T11:00:00Z"
        }
      },
      {
        "recruitmentNumber": 1078650,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1960-02-22 00:00:00.000"
        },
        "sex": "F",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "363123447",
        "name": "PCR",
        "container": "CRYOTUBE",
        "role": "EXAM",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "diogo.rosas.ferreira@gmail.com",
          "time": "2017-11-01T18:32:14.772Z",
          "processing": "2018-02-23T11:00:00Z"
        }
      },
      {
        "recruitmentNumber": 1078650,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1960-02-22 00:00:00.000"
        },
        "sex": "F",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "363123448",
        "name": "FASTING_GLYCEMIA",
        "container": "CRYOTUBE",
        "role": "EXAM",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "diogo.rosas.ferreira@gmail.com",
          "time": "2017-11-01T18:32:37.950Z",
          "processing": "2018-02-23T11:00:00Z"
        }
      },
      {
        "recruitmentNumber": 1078650,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1960-02-22 00:00:00.000"
        },
        "sex": "F",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "363123449",
        "name": "FASTING_SERUM",
        "container": "CRYOTUBE",
        "role": "STORAGE",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "diogo.rosas.ferreira@gmail.com",
          "time": "2018-03-01T13:57:41.450Z",
          "processing": "2018-02-23T11:00:00Z"
        }
      },
      {
        "recruitmentNumber": 1078650,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1960-02-22 00:00:00.000"
        },
        "sex": "F",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "363123450",
        "name": "FASTING_SERUM",
        "container": "CRYOTUBE",
        "role": "STORAGE",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "diogo.rosas.ferreira@gmail.com",
          "time": "2018-03-01T14:05:14.769Z",
          "processing": "2018-02-23T11:00:00Z"
        }
      },
      {
        "recruitmentNumber": 1078650,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1960-02-22 00:00:00.000"
        },
        "sex": "F",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "363123451",
        "name": "FASTING_SERUM",
        "container": "CRYOTUBE",
        "role": "STORAGE",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "diogo.rosas.ferreira@gmail.com",
          "time": "2018-03-01T14:05:34.290Z",
          "processing": "2018-02-23T11:00:00Z"
        }
      },
      {
        "recruitmentNumber": 1078650,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1960-02-22 00:00:00.000"
        },
        "sex": "F",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "363123452",
        "name": "FASTING_SERUM",
        "container": "CRYOTUBE",
        "role": "STORAGE",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "diogo.rosas.ferreira@gmail.com",
          "time": "2018-03-01T15:40:38.918Z",
          "processing": "2018-02-23T11:00:00Z"
        }
      },
      {
        "recruitmentNumber": 1078650,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1960-02-22 00:00:00.000"
        },
        "sex": "F",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "363123460",
        "name": "FASTING_SERUM",
        "container": "CRYOTUBE",
        "role": "STORAGE",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "diogo.rosas.ferreira@gmail.com",
          "time": "2018-03-01T16:54:10.483Z",
          "processing": "2018-02-23T11:00:00Z"
        }
      },
      {
        "recruitmentNumber": 1078650,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1960-02-22 00:00:00.000"
        },
        "sex": "F",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "363123461",
        "name": "FASTING_SERUM",
        "container": "CRYOTUBE",
        "role": "STORAGE",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "diogo.rosas.ferreira@gmail.com",
          "time": "2018-03-02T19:41:26.159Z",
          "processing": "2018-02-23T11:00:00Z"
        }
      },
      {
        "recruitmentNumber": 1078650,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1960-02-22 00:00:00.000"
        },
        "sex": "F",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "364100000",
        "name": "POST_INSULINE",
        "container": "PALLET",
        "role": "EXAM",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "diogo.rosas.ferreira@gmail.com",
          "time": "2017-11-20T12:28:32.428Z",
          "processing": "2018-02-23T11:00:00Z"
        }
      },
      {
        "recruitmentNumber": 1063154,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1954-09-20 00:00:00.000"
        },
        "sex": "M",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "363123456",
        "name": "BIOCHEMICAL_SERUM",
        "container": "CRYOTUBE",
        "role": "EXAM",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "diogo.rosas.ferreira@gmail.com",
          "time": "2018-03-01T15:43:58.600Z",
          "processing": "2018-02-26T10:45:00Z"
        }
      },
      {
        "recruitmentNumber": 1063154,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1954-09-20 00:00:00.000"
        },
        "sex": "M",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "364000000",
        "name": "POST_INSULINE",
        "container": "PALLET",
        "role": "EXAM",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "diogo.rosas.ferreira@gmail.com",
          "time": "2017-12-11T13:17:03.010Z",
          "processing": "2018-02-26T10:45:00Z"
        }
      },
      {
        "recruitmentNumber": 1015533,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1965-10-17 00:00:00.000"
        },
        "sex": "M",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "363000000",
        "name": "BIOCHEMICAL_SERUM",
        "container": "CRYOTUBE",
        "role": "EXAM",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "tiago.matana@gmail.com",
          "time": "2017-12-05T11:48:39.584Z",
          "processing": "2018-02-26T11:00:00Z"
        }
      },
      {
        "recruitmentNumber": 1015533,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1965-10-17 00:00:00.000"
        },
        "sex": "M",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "363000001",
        "name": "FASTING_HORMONE",
        "container": "CRYOTUBE",
        "role": "EXAM",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "tiago.matana@gmail.com",
          "time": "2017-12-05T11:49:01.016Z",
          "processing": "2018-02-26T11:00:00Z"
        }
      },
      {
        "recruitmentNumber": 1015533,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1965-10-17 00:00:00.000"
        },
        "sex": "M",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "363000200",
        "name": "PCR",
        "container": "CRYOTUBE",
        "role": "EXAM",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "tiago.matana@gmail.com",
          "time": "2017-12-05T11:49:01.016Z",
          "processing": "2018-02-26T11:00:00Z"
        }
      },
      {
        "recruitmentNumber": 1015533,
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1965-10-17 00:00:00.000"
        },
        "sex": "M",
        "fieldCenter": {
          "name": "Sao Paulo",
          "code": 6,
          "acronym": "SP",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null
        },
        "objectType": "WorkAliquot",
        "code": "363003600",
        "name": "FASTING_GLYCEMIA",
        "container": "CRYOTUBE",
        "role": "EXAM",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "tiago.matana@gmail.com",
          "time": "2017-12-05T11:49:01.017Z",
          "processing": "2018-02-26T11:00:00Z"
        }
      }
    ];

    return self;
  }

});
