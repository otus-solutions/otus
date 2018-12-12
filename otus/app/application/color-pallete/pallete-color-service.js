(function() {
  'use strict';

  angular
    .module('otusjs.application.color')
    .service('otusjs.application.color.PalleteColorService', Service);

  function Service() {
    var self = this;
    const COLOR_PALLETE = [
      "#415ad0",
      "#e88023",
      "#00796B",
      "#af9c6d",
      "#c9bd5b",
      "#7a5e38",
      "#343434",
      "#604a2f",
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

    function getRandomColor() {
      return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    function getColor(search) {
      var index = 0;
      if(typeof search === "string"){
        if(search.length){
          index = COLOR_PALLETE.indexOf(search) > -1 ? COLOR_PALLETE.indexOf(search) : 0;
        }
      } else if(typeof search === "number" && search < self.COLORS.length && search){
        index = search;
      }

      let color = self.COLORS[index];
      return color;
    }

    function listColors() {
      return COLOR_PALLETE;
    }

  }
})();