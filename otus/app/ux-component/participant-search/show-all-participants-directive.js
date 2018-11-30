(function () {
  angular.module('otusjs.otus.uxComponent')
    .directive('showAllParticipants', buttonAutocomplete);
  function buttonAutocomplete($parse) {
    return {
      restrict: 'A',
      link: function(scope,element, attrs) {
          var id = attrs.mdInputId;
          const button = angular.element('<button style="width:auto;top:-4px;right:2px">' + attrs.labelButton + '</button>').addClass('md-button md-primary md-margin md-autocomplete');
          $('md-autocomplete-wrap').append(button);
          let searchTextModel = $parse(attrs.mdSearchText);
          scope.$watch(searchTextModel, function (searchText) {
            if (searchText == '' || searchText === null) {
              button.addClass('show');
              button.removeClass('hide');
            } else {
              button.addClass('hide');
              button.removeClass('show');
            }
          });
          button.on('click', function () {
            var fn = eval("var f = function(){ return scope." + attrs.action + "; }; f();");
            fn();
            this.blur();
          });

      }
    }
  }
}());