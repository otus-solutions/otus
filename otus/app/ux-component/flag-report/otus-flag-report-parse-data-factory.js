(function() {
    'use strict';

    angular
      .module('otusjs.otus.uxComponent')
      .factory('otusFlagReportParseDataFactory', Factory);

    function Factory() {
      var self = this;

      self.create = create;

      function create(json, sigla = null, status = null) {

        var obj = {};
        obj.columns = [];
        obj.index = [];
        obj.data = [];

        if(!sigla){
            json[0].activities.forEach(function(atividade){
              obj.columns.push([atividade.rn, atividade.acronym]);
            });
        } else {
          json[0].activities.forEach(function(atividade){
            if(atividade.acronym == sigla)
              obj.columns.push([atividade.rn, atividade.acronym]);
          });
        }
        json.forEach(function(o){
          obj.index.push(o.rn);
          var data = [];

          o.activities.forEach(function(atividade){
            if(status){
              if(sigla === atividade.acronym){
                if (status === atividade.status){
                  data.push(atividade.status);
                } else {
                  data.push(null);
                }
              } else if (sigla === null){
                if (status === atividade.status){
                  data.push(atividade.status);
                } else {
                  data.push(null);
                }
              }
            } else {
              if(sigla === atividade.acronym){
                data.push(atividade.status);
              } else if (sigla === null){
                data.push(atividade.status);
              }
            }

          });

          obj.data.push(data);

        });

        return obj;
      }

      return self;
    }
  }());
