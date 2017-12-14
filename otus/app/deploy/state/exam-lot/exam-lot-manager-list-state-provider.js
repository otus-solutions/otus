(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ExamLotManagerListState', Provider);

  Provider.$inject = [
    'STATE'
  ];

  function Provider(STATE) {
    var self = this;

    self.$get = [provider];

    function provider() {
      return self;
    }

    self.state = {
      parent: STATE.EXAM_LOT_DASHBOARD,
      name: STATE.EXAM_LOT_MANAGER_LIST,
      url: '/' + STATE.EXAM_LOT_MANAGER_LIST,
      template: '<otus-exams-lots-manager lots="$resolve.lots" layout="column" flex></otus-exams-lots-manager>',
      resolve:{
        lots: _resolveLots
      }
    };

    function _resolveLots(ExamLotService) {
      return ExamLotService.getLots();
    }

    _resolveLots.$inject = [
      'otusjs.laboratory.business.project.exams.ExamLotService'
    ];
  }
}());
