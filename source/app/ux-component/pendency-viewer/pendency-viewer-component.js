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
    self.items = [];
    self.paginatorActive = false;
    self.viewerTitle = PendencyViewerService.LABELS.PAGE_TITLE;
    self.viewerService = PendencyViewerService;
    self.itemComponentName = 'otusPendencyItem';
    self.filtersComponentName = 'otusPendecyListFilters';
  }

}());