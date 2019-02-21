(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityInformation', {
      controller: "otusActivityInformationCtrl as $ctrl",
      templateUrl: 'app/ux-component/activity-information/activity-information-template.html',
      require: {
        otusActivityManager: '^otusActivityManager'
      }
    })
    .controller("otusActivityInformationCtrl", Controller);


  Controller.$inject = [
    '$mdSidenav',
    '$mdToast',
    'otusjs.activity.core.ContextService',
    'otusjs.otus.uxComponent.ActivityStatusItemFactory',
    '$mdDialog',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.deploy.model.ActivityFacadeService'
  ];

  function Controller($mdSidenav,$mdToast, ContextService, ActivityStatusItemFactory, $mdDialog, ParticipantActivityService, ActivityFacadeService) {
    var self = this;

    /* Public methods */
    self.show = show;
    self.activityReviewForm = activityReviewForm;
    self.DialogController = DialogController;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      self.otusActivityManager.activityInfoComponent = self;
    }
//TODO: implementar conceito de blocos para informar na descrição da atividade selecionada
    function show() {
      var activity = ContextService.getSelectedActivities()[0];
      self.activity = {};
      self.activity.details = activity.surveyForm.surveyTemplate.identity;
      self.activity.details["block"] = "CI";

      self.activity.history = activity.statusHistory.getHistory().map(ActivityStatusItemFactory.create);
      self.activity.history.reverse();
      _loadRevisions(activity);
      $mdSidenav('right').toggle();
    }

    function activityReviewForm() {
      self.cancel = $mdDialog.cancel;
      $mdDialog.show({
        templateUrl: 'app/ux-component/activity-information/activity-revision/activity-revision-template.html',
        parent: angular.element(document.body),
        controller: self.DialogController,
        controllerAs: "vm",
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: true
      });
    }

    function _loadRevisions(activity) {
      ParticipantActivityService.getActivityRevisions(activity.getID(), ContextService.getSelectedActivities()[0])
        .then(function (revisions) {
          self.activity.revisions = ActivityFacadeService.getActivityRevisions(revisions);
        });
    }

    function _displayMsg(msg){
      $mdToast.show(
        $mdToast.simple()
          .position("bottom right")
          .textContent(msg)
          .hideDelay(3000));
    }

    function DialogController($mdDialog, $mdToast) {
      var self = this;

      self.activityRevision = {};
      self.onInit = onInit;
      self.addActivityRevision = addActivityRevision;
      self.user = ContextService.getLoggedUser();
      self.activity = ContextService.getSelectedActivities()[0];
      self.revisionDate = new Date();
      self.now = new Date();

      self.hide = function () {
        $mdDialog.hide();
      };

      self.cancel = function () {
        $mdDialog.cancel();
      };

      function addActivityRevision() {
        var activityRevision = ActivityFacadeService.createActivityRevision(self.activity.getID(), self.revisionDate);
        ParticipantActivityService.addActivityRevision(activityRevision, self.activity).then(function (response) {
          if(response.data){
            _loadRevisions(self.activity);
            _displayMsg("Revisão salva com sucesso.");
            self.hide();
          } else {
            _displayMsg("Não foi possível salvar a revisão!");
            self.hide();
          }
        }).catch(function (err) {
          _displayMsg("Ocorreu um problema! Tente novamente mais tarde.");
          self.hide();
        });
      }
    }
  }
}());
