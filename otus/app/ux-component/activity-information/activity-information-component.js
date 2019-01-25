(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityInformation', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-information/activity-information-template.html',
      require: {
        otusActivityManager: '^otusActivityManager'
      }
    });

  Controller.$inject = [
    '$mdSidenav',
    'otusjs.activity.core.ContextService',
    'otusjs.otus.uxComponent.ActivityStatusItemFactory',
    '$mdDialog',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.deploy.model.ActivityFacadeService'
  ];

  function Controller($mdSidenav, ContextService, ActivityStatusItemFactory, $mdDialog, ParticipantActivityService, ActivityFacadeService) {
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

    function show() {
      var activity = ContextService.getSelectedActivities()[0];
      self.activity = {};
      self.activity.details = activity.surveyForm.surveyTemplate.identity;
      self.activity.history = activity.statusHistory.getHistory().map(ActivityStatusItemFactory.create);
      self.activity.history.reverse();
      ParticipantActivityService.getActivityRevisions(activity.getID()).then(function (revisions) {
          self.activity.revisions = revisions
        });
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

    function DialogController($mdDialog) {
      var self = this;
      self.activityRevision = {};
      self.onInit = onInit;
      self.addActivityRevision = addActivityRevision;
      self.user = ContextService.getLoggedUser();
      self.activity = ContextService.getSelectedActivities()[0];

      self.hide = function () {
        $mdDialog.hide();
      };

      self.cancel = function () {
        $mdDialog.cancel();
      };

      function addActivityRevision() {
        var activityRevision = ActivityFacadeService.createActivityRevision(self.activity.getID(), self.revisionDate);
        ParticipantActivityService.addActivityRevision(activityRevision);
        self.hide();
      }
    }
  }
}());
