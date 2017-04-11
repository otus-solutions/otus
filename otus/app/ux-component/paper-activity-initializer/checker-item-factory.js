(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.CheckerItemFactory', Factory);

  function Factory() {
    var self = this;

    /* Public methods */
    self.create = create;

    function create(checker) {
      return new CheckerItem(checker);
    }

    return self;
  }

  function CheckerItem(checker) {
    var self = this;

    self.text = checker.name + ' ' + checker.surname;
    self.title = checker.name + ' ' + checker.surname;
    self.metastat = {};
    self.metastat.code = checker.$loki;
    self.metastat.email = checker.email;
    self.checker = checker;
  }
}());
