(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.laboratoryViewerService.LaboratoryViewerService', Service);

  Service.$inject = [
    'otusjs.laboratory.repository.LaboratoryRepositoryService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Service(LaboratoryRepositoryService, ApplicationStateService){
    let self = this;

    self.checkExistAndRunOnInitOrBackHome = checkExistAndRunOnInitOrBackHome;

    function checkExistAndRunOnInitOrBackHome(onInitFunction, finishLoadingScreen=(() => {})){
      LaboratoryRepositoryService.checkLaboratoryConfiguration()
        .then(data => {
          onInitFunction();
        })
        .catch(err => {
          finishLoadingScreen();
          ApplicationStateService.activateDashboard();
        });
    }
  }
}());