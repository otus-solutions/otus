(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.IssueMessageFactory', Factory);

  Factory.$inject = [ ];

  function Factory() {
    let self = this;
    /* Public methods */
    self.create = create;
    self.fromJsonObject = fromJsonObject;

    function create() {

    }

    function fromJsonObject(item, sender){
      item.sender = {
        id: item.sender,
        name: sender.name + (sender.surname? ' ' + sender.surname : '')
      };
      return item;
    }

    return self;
  }
}());
