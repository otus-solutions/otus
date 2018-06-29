(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .directive('numbersOnly', function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attr, ngModelCtrl) {
          function fromUser(text) {
            if (text) {
              var stringfiedText = String(text);
              var transformedInput = stringfiedText.replace(/[^0-9]/g, '');
              if (transformedInput !== stringfiedText) {
                ngModelCtrl.$setViewValue(transformedInput);
                ngModelCtrl.$render();
              }
              return String(transformedInput);
            }
            return undefined;
          }
          ngModelCtrl.$parsers.push(fromUser);
        }
      };
    });
}());
