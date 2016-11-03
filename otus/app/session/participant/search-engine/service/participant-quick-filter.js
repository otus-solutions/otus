(function() {
  'use strict';

  angular
    .module('otusjs.otus.participant.searchEngine')
    .filter('participantQuick', Filter);

  function Filter() {
    return function(itens, query) {
      return itens.filter(function(item) {
        var regex = new RegExp(query, 'gi');
        return (regex.test(item.name)) || (regex.test(item.recruitmentNumber.toString()));
      });
    };
  }
}());
