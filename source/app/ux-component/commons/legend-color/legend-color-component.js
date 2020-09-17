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

    self.$onInit = onInit;

    function onInit() {
      _setValues();
      _build();
    }

    function _build() {
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

    function _setValues() {
      self.legend = self.title ? self.title : "";
      self.legend = self.legend ? self.legend.concat(":") : "";
      self.params = [];
      self.column = (self.orientation === "column");
      self.row = !self.column;
    }

  }
}());
