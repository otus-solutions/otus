(function() {
    'use strict';

    angular
      .module('otusjs.otus.uxComponent')
      .factory('otusFlagReportParseDataFactory', Factory);

    function Factory() {
      var self = this;

      self.create = create;

      function create(json, acronym = null, status = null) {

        var obj = {};
        obj.columns = [];
        obj.index = [];
        obj.data = [];

        if (json.length){
          if(!acronym){
            json[0].activities.forEach(function(activity){
              obj.columns.push([activity.rn, activity.acronym]);
            });
          } else {
            json[0].activities.forEach(function(activity){
              if(activity.acronym == acronym)
                obj.columns.push([activity.rn, activity.acronym]);
            });
          }
          json.forEach(function(o){
            obj.index.push(o.rn);
            var data = [];

            o.activities.forEach(function(atividade){
              if(status != null){
                if(acronym === atividade.acronym){
                  if (status === atividade.status){
                    data.push(atividade.status);
                  } else {
                    data.push(null);
                  }
                } else if (acronym === null){
                  if (status === atividade.status){
                    data.push(atividade.status);
                  } else {
                    data.push(null);
                  }
                }
              } else {
                if(acronym === atividade.acronym){
                  data.push(atividade.status);
                } else if (acronym === null){
                  data.push(atividade.status);
                }
              }

            });

            obj.data.push(data);

          });
        }

        return obj;
      }

      return self;
    }
  }());
