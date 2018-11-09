(function() {
    'use strict';

    angular
      .module('otusjs.otus.uxComponent')
      .factory('otusFlagReportParseDataFactory', Factory);

    function Factory() {
      var self = this;

      self.create = create;

      function create(json) {

        var obj = {};
        obj.columns = [];
        obj.index = [];
        obj.data = [];


        json[0].activities.forEach(function(atividade){
          obj.columns.push([atividade.rn, atividade.acronym]);

        });

        json.forEach(function(o){
          obj.index.push(o.rn);
          var data = [];
          var i = 0;
          o.activities.forEach(function(atividade){
            if(atividade.acronym === "TST") {

              data.push(0)
            }else {

              data.push(atividade.status)
            }
          });

          obj.data.push(data);

        });
        // console.log(obj)

        return obj;

      }

      return self;
    }
  }());
