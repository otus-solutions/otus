(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.aliquot')
    .service('otusjs.laboratory.aliquot.MomentType', Service);

  Service.$inject = [
    '$q'
  ];

  function Service($q) {
    var self = this;
    var _test;
    

    _init();

    function _init() {
      _test = null;
    }

    self.createListMomentType = createListMomentType;

    function _createStructureMomentType(jsonTypeMoment, aliquotsConfigs) {
      var momentType = {};
      
      momentType = _getStructureMomentType();

      momentType.type = jsonTypeMoment.type;
      momentType.moment = jsonTypeMoment.moment;
      momentType.momentLabel = jsonTypeMoment.momentLabel;
      momentType.boxColor = jsonTypeMoment.boxColor;
      momentType.tubeList = jsonTypeMoment.tubeList;
      momentType.aliquotsConfigs = aliquotsConfigs;

      return momentType;
    }


    function _getStructureMomentType(){
      return {
        type: "",
        moment:"",
        momentLabel:"",
        boxColor:"",
        tubeList: [],
        aliquotsConfigs: [],
        aliquotList: {}
      };
    }



    function createListMomentType(tubeList){
      var momentTypeList = [];
      var jsonTypeMoment = {};
      var arrayList = [];

      tubeList.forEach(function(tube) {
        var typeMoment = tube.type + '_' + tube.moment
        if(jsonTypeMoment[typeMoment]){
          jsonTypeMoment[typeMoment].tubeList.push(tube);
        } else {
          jsonTypeMoment[typeMoment] = {
            type: tube.type,
            moment: tube.moment,
            momentLabel: tube.momentLabel,
            boxColor: tube.boxColor,
            tubeList: []
          }
          jsonTypeMoment[typeMoment].tubeList.push(tube)

          arrayList.push(typeMoment);
        }
      });

      arrayList.forEach(function(typeMoment) {
        momentTypeList.push(
          _createStructureMomentType(jsonTypeMoment[typeMoment])
        );
      });

      return momentTypeList;
    }


    function _incrementLists(tubeList){
      
    }
  }
}());
