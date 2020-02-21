(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPendencyItem', {
      controller:'pendencyItemCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-item/pendency-item-template.html',
      bindings: {
        item: '<'
      }
    }).controller('pendencyItemCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;

    self.dueDate = _formatDate(new Date(self.item.dueDate));
    self.creationDate = _formatDate(new Date(self.item.creationDate));
    self.remainingDays = calculateRemainingDays(self.item.dueDate);

    function _formatDate(date) {
      return date.getDate() + "/"+ (date.getMonth()+1) + "/" + date.getFullYear();
    }

    function calculateRemainingDays(dueDate){
      let today = _extractDateZeroTime(new Date());
      let due = _extractDateZeroTime(new Date(dueDate));
      const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
      let deadLine = Math.floor((due - today) / MILLISECONDS_PER_DAY);
      return deadLine;
    }

    function _extractDateZeroTime(date){
      date.setHours(0,0,0,0);
      return date;
    }
  }

}());