describe('Lot info manager display component', function() {
  var Mock = {};
  var $controller;
  var ctrl;
  var Injections = {};


  beforeEach(function() {
    angular.mock.module('otusjs.otus.uxComponent');
  });

  beforeEach(function() {
    Mock.AliquotTransportationService = {
      getContainerLabelToAliquot: (aliquot) => {}
    };


    Mock.AliquotTransportationMesssagesService = {};
    Mock.AliquotTransportationFactory = {};
    Mock.LoadingScreenService = {};

    angular.mock.module(function($provide) {
      $provide.value('otusjs.laboratory.business.project.transportation.AliquotTransportationService', Mock.AliquotTransportationService);
      $provide.value('otusjs.laboratory.business.project.transportation.AliquotTransportationMesssagesService', Mock.AliquotTransportationMesssagesService);
      $provide.value('otusjs.laboratory.business.project.transportation.AliquotTransportationFactory', Mock.AliquotTransportationFactory);
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
      mockLotAliquotList(ctrl);
    });
  });

  describe('onInit method', () => {
    var build;
    beforeEach(() => {
      ctrl._findAliquotByPeriod = jasmine.createSpy('_findAliquotByPeriod').and.callFake(function(a,b) {
        return Promise.resolve();
      });
      spyOn(ctrl, '$onInit').and.callThrough();
      spyOn(Injections.DynamicTableSettingsFactory, 'create').and.callThrough();
      spyOn(Injections.DynamicTableSettingsFactory.create(), 'addColumnProperty').and.callThrough();
      ctrl._findAliquotByPeriod();
      ctrl.$onInit();

    });

    it('should onInit be defined', () => {
      expect(ctrl.$onInit).toHaveBeenCalled();
      expect(ctrl._findAliquotByPeriod).toHaveBeenCalled();
      expect(ctrl.$onInit).not.toBeNull();
    });

    it('should DynamicTableSettingsFactory be defined', () => {
      expect(Injections.DynamicTableSettingsFactory.create).toHaveBeenCalled();
      expect(Injections.DynamicTableSettingsFactory.create).not.toBeNull();
    });

    it('should dynamicTableSettings contain property value aliquotCollectionData.processing', () => {
      expect(ctrl.dynamicTableSettings.elementsProperties).toContain("aliquotCollectionData.processing");
    });

  });

  function mockLotAliquotList(ctrl) {
    ctrl.lot = {
      aliquotList: [{
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
      ]
    }
  }
});
