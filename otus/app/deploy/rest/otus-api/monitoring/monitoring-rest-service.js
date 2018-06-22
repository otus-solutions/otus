(function () {
    'use strict';

    angular
      .module('otusjs.deploy')
      .service('otusjs.deploy.MonitoringRestService', Service);

    Service.$inject = [
      'OtusRestResourceService',
      '$q'
    ];

    function Service(OtusRestResourceService, $q) {
      var self = this;
      var _rest = null;

      /* Public methods */
      self.initialize = initialize;
      self.list = list;
      self.find = find;
      self.listAcronyms = listAcronyms;
      self.listCenters = listCenters;

      function initialize() {
        _rest = OtusRestResourceService.getOtusMonitoringResource();
      }

      function list() {
        if (!_rest) {
          throw new Error('REST resource is not initialized.');
        }
        return _rest.list().$promise;
      }

      function find(acronym) {
        // if (!_rest) {
        //   throw new Error('REST resource is not initialized.');
        // }
        // return _rest.find({'acronym':acronym}).$promise;
//TODO: remove comments
        var defer = $q.defer();
        defer.resolve({data: a.data.filter(function (f) {
          return f.acronym === acronym;
        })});
        return defer.promise;
      }

      function listAcronyms() {
        if (!_rest) {
          throw new Error('REST resource is not initialized.');
        }
        return _rest.listAcronyms().$promise;
      }

      function listCenters() {
        if (!_rest) {
          throw new Error('REST resource is not initialized.');
        }
        return _rest.listCenters().$promise;
      }
//todo: remove
      var a = {
        "data": [{
          "fieldCenter": "ES",
          "month": 4,
          "year": 2018,
          "acronym": "AFID",
          "sum": "1"
        }, {"fieldCenter": "ES", "month": 6, "year": 2018, "acronym": "AFID", "sum": "1"}, {
          "fieldCenter": "ES",
          "month": 4,
          "year": 2018,
          "acronym": "CFUC",
          "sum": "1"
        }, {"fieldCenter": "ES", "month": 5, "year": 2018, "acronym": "CSJ", "sum": "1"}, {
          "fieldCenter": "ES",
          "month": 4,
          "year": 2018,
          "acronym": "DIEC",
          "sum": "1"
        }, {"fieldCenter": "ES", "month": 4, "year": 2018, "acronym": "DISC", "sum": "1"}, {
          "fieldCenter": "ES",
          "month": 4,
          "year": 2018,
          "acronym": "EAIC",
          "sum": "1"
        }, {"fieldCenter": "ES", "month": 4, "year": 2018, "acronym": "HMPD", "sum": "1"}, {
          "fieldCenter": "ES",
          "month": 4,
          "year": 2018,
          "acronym": "HOCC",
          "sum": "1"
        }, {"fieldCenter": "ES", "month": 4, "year": 2018, "acronym": "HVSD", "sum": "1"}, {
          "fieldCenter": "ES",
          "month": 3,
          "year": 2018,
          "acronym": "MEDC",
          "sum": "1"
        }, {"fieldCenter": "ES", "month": 4, "year": 2018, "acronym": "MEDC", "sum": "1"}, {
          "fieldCenter": "ES",
          "month": 4,
          "year": 2018,
          "acronym": "MULC",
          "sum": "1"
        }, {"fieldCenter": "ES", "month": 4, "year": 2018, "acronym": "PSEC", "sum": "1"}, {
          "fieldCenter": "ES",
          "month": 4,
          "year": 2018,
          "acronym": "SONC",
          "sum": "1"
        }, {"fieldCenter": "ES", "month": 2, "year": 2018, "acronym": "TCLEC", "sum": "1"}, {
          "fieldCenter": "MG",
          "month": 1,
          "year": 2018,
          "acronym": "DIEC",
          "sum": "1"
        }, {"fieldCenter": "MG", "month": 4, "year": 2018, "acronym": "DIEC", "sum": "1"}, {
          "fieldCenter": "MG",
          "month": 1,
          "year": 2018,
          "acronym": "MEDC",
          "sum": "1"
        }, {"fieldCenter": "MG", "month": 12, "year": 2017, "acronym": "VOPC", "sum": "1"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "ACTA",
          "sum": "1"
        }, {"fieldCenter": "RJ", "month": 2, "year": 2018, "acronym": "ACTA", "sum": "1"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "ACTDC",
          "sum": "1"
        }, {"fieldCenter": "RJ", "month": 2, "year": 2018, "acronym": "ACTDC", "sum": "1"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "AFID",
          "sum": "2"
        },
          {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "ANTC", "sum": "2"},
          {"fieldCenter": "SP", "month": 12, "year": 2016, "acronym": "ANTC", "sum": "5"},
          {"fieldCenter": "SP", "month": 4, "year": 2016, "acronym": "ANTC", "sum": "5"},
          {"fieldCenter": "SP", "month": 1, "year": 2015, "acronym": "ANTC", "sum": "5"},
          {
            "fieldCenter": "RJ",
            "month": 12,
            "year": 2017,
            "acronym": "BIOC",
            "sum": "1"
          },

          {"fieldCenter": "RJ", "month": 1, "year": 2018, "acronym": "BIOC", "sum": "1"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "CCA",
          "sum": "1"
        }, {"fieldCenter": "RJ", "month": 1, "year": 2018, "acronym": "CCA", "sum": "1"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "CFUC",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 1, "year": 2018, "acronym": "CISE", "sum": "1"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "CSI",
          "sum": "1"
        }, {"fieldCenter": "RJ", "month": 2, "year": 2018, "acronym": "CSI", "sum": "1"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "CSJ",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 5, "year": 2018, "acronym": "CSJ", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "CSP",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "CURC", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "DIEC",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "DISC", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "DORC",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "DSOC", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "EAIC",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "ECGC", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "FCOC",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "FORC", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "FRC",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 4, "year": 2018, "acronym": "FRC", "sum": "4"}, {
          "fieldCenter": "RJ",
          "month": 5,
          "year": 2018,
          "acronym": "FRC",
          "sum": "3"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "HMPD", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "HOCC",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "HVSD", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "ISG",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "MED2", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "MED3",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "MEDC", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 2,
          "year": 2018,
          "acronym": "MONC",
          "sum": "1"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "MSKC", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 1,
          "year": 2018,
          "acronym": "MULC",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "PASC", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "PSEC",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "RCPC", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "RETC",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "RETCLQ", "sum": "1"}, {
          "fieldCenter": "RJ",
          "month": 2,
          "year": 2018,
          "acronym": "RETCLQ",
          "sum": "1"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "SONC", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "SPPC",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "TCLEC", "sum": "1"}, {
          "fieldCenter": "RJ",
          "month": 1,
          "year": 2018,
          "acronym": "TCLEC",
          "sum": "1"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "TVSC", "sum": "2"}, {
          "fieldCenter": "RJ",
          "month": 12,
          "year": 2017,
          "acronym": "USGC",
          "sum": "2"
        }, {"fieldCenter": "RJ", "month": 12, "year": 2017, "acronym": "VOPC", "sum": "2"}, {
          "fieldCenter": "RS",
          "month": 1,
          "year": 2018,
          "acronym": "CCA",
          "sum": "2"
        }, {"fieldCenter": "RS", "month": 3, "year": 2018, "acronym": "CCA", "sum": "2"}, {
          "fieldCenter": "RS",
          "month": 5,
          "year": 2018,
          "acronym": "CSJ",
          "sum": "1"
        }, {"fieldCenter": "RS", "month": 4, "year": 2018, "acronym": "DIEC", "sum": "1"}, {
          "fieldCenter": "SP",
          "month": 4,
          "year": 2018,
          "acronym": "CFUC",
          "sum": "1"
        }, {"fieldCenter": "SP", "month": 2, "year": 2018, "acronym": "CISE", "sum": "2"}, {
          "fieldCenter": "SP",
          "month": 1,
          "year": 2018,
          "acronym": "CSI",
          "sum": "1"
        }, {"fieldCenter": "SP", "month": 2, "year": 2018, "acronym": "DIEC", "sum": "2"}, {
          "fieldCenter": "SP",
          "month": 4,
          "year": 2018,
          "acronym": "FRC",
          "sum": "1"
        }, {"fieldCenter": "SP", "month": 4, "year": 2018, "acronym": "HMPD", "sum": "1"}, {
          "fieldCenter": "SP",
          "month": 4,
          "year": 2018,
          "acronym": "HVSD",
          "sum": "1"
        }, {"fieldCenter": "SP", "month": 4, "year": 2018, "acronym": "ISG", "sum": "1"}, {
          "fieldCenter": "SP",
          "month": 2,
          "year": 2018,
          "acronym": "MEDC",
          "sum": "2"
        }, {"fieldCenter": "SP", "month": 4, "year": 2018, "acronym": "MULC", "sum": "1"}, {
          "fieldCenter": "SP",
          "month": 4,
          "year": 2018,
          "acronym": "SONC",
          "sum": "1"
        }]
      }



    }
  }());
