(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamLotInfoSidenav', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-lot/manager-list/info-sidenav/exam-lot-info-sidenav-template.html',
      bindings: {
        selectedLot: '='
      },
      require: {
        otusExamsLotsManager: '^otusExamsLotsManager'
      }
    });

  Controller.$inject = [
    '$mdSidenav',
    'otusjs.laboratory.business.project.exams.ExamLotService',
    '$q'
  ];

  function Controller($mdSidenav, ExamLotService, $q) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    self.show = show;

    function onInit() {
      self.otusExamsLotsManager.lotInfoComponent = self;
    }

    function show() {
      _loadAliquots().then(() => {
        self.aliquotListCopy = angular.copy(self.selectedLot.aliquotList).reverse();
        self.aliquotListCopy.forEach(function(aliquot) {
          aliquot.containerLabel = ExamLotService.getContainerLabelToAliquot(aliquot);
        }, this);
        $mdSidenav('right').toggle();
      });
    }

    function _loadAliquots() {
      var request = $q.defer();

      if(!self.selectedLot.aliquotList){
        ExamLotService.getLotAliquots(self.selectedLot._id).then(aliquotList => {
          self.selectedLot.aliquotList = aliquotList;
          request.resolve();
        });
      } else {
        request.resolve();
      }

      return request.promise;
    }
  }
}());