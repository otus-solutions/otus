(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('pendencyViewComponent', {
      controller: 'pendencyViewCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-viewer-template.html',
      bindings: {}
    }).controller('pendencyViewCtrl', Controller);

  Controller.$inject = ['otusjs.pendencyViewer.PendencyViewerService'];

  function Controller(PendencyViewerService) {
    const self = this;

    self.$onInit = onInit;

    self.items = [];
    self.paginatorActive = false;

    self.itemComponentName = 'otusPendencyItem';
    self.filtersComponentName = 'otusPendecyListFilters';

    function onInit() {
      self.items = [];
      PendencyViewerService.initialize();
      self.viewerTitle = PendencyViewerService.LABELS.PAGE_TITLE;
      self.viewerService = PendencyViewerService;
    }
  }

}());
