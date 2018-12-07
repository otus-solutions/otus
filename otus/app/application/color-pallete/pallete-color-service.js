(function() {
  'use strict';

  angular
    .module('otusjs.application.color')
    .service('otusjs.application.color.PalleteColorService', Service);

  function Service() {
    var self = this;
    const COLOR_PALLETE = [
      "#415ad0",
      "#7a5e38",
      "#c9bd5b",
      "#e88023",
      "#343434",
      "#00796B",
      "#604a2f",
      "#af9c6d",
      "#26338c",
      "#f9eb6a",
      "#9a8a63",
      "#9bc6c2",
      "#9a5419"
    ];
    self.COLORS = angular.copy(COLOR_PALLETE);

    self.getRandomColor = getRandomColor;
    self.getColor = getColor;
    self.listColors = listColors;

    function _verifyExitsColors() {
      return self.COLORS.length ? true : false;
    }

    function _resetColors() {
        self.COLORS = angular.copy(COLOR_PALLETE);
    }

    function getRandomColor() {
      if (!_verifyExitsColors()) _resetColors();
      let index = Math.floor(Math.random() * self.COLORS.length);
      let color = self.COLORS[index];
      self.COLORS.splice(index, 1);
      return color;
    }

    function getColor(search) {
      var index = 0;
      if(typeof search === "string"){
        if(search.length){
          index = COLOR_PALLETE.indexOf(search) > -1 ? COLOR_PALLETE.indexOf(search) : 0;
        }
      } else if(typeof search === "number"){
        index = search;
      }
      if (!_verifyExitsColors()) _resetColors();
      let color = self.COLORS[index];
      return color;
    }

    function listColors() {
      return COLOR_PALLETE;
    }

  }
})();