(function() {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusLegendColor', {
      controller: Controller,
      templateUrl: 'app/ux-component/commons/legend-color/legend-color-template.html',
      bindings:{
        colors: "=",
        labels: "=",
        orientation: "=",
        title: "="
      }
    });


  function Controller() {
    var self = this;
    self.legend = self.title ? self.title : "Legenda";
    self.legend = self.legend.concat(":");
    self.params = [];
    self.column = self.orientation === "column" ? true : false;
    self.row = !self.column;
    self.$onInit = function () {


      for(var i = 0; i < self.labels.length; i++){
        self.params.push({
          color: {
            "background-color":self.colors[i],
            "border": "1px solid #000"
          },
          label: self.labels[i]
        });
      }
    }

  }
}());
