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
      $mdSidenav('right').toggle();

    }

    function activityReviewForm() {
      self.cancel = $mdDialog.cancel;
      $mdDialog.show({
        // locals: {selectedActivity: self.selectedPaperActivity},
        templateUrl: 'app/ux-component/activity-information/activity-review-form/activity-review-form-template.html',
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
      self.activityReview = {};
      self.onInit = onInit;
      self.addActivityReview = addActivityReview;
      self.userReviewer = ContextService.getLoggedUser();
      self.activity = ContextService.getSelectedActivities()[0];


      self.hide = function () {
        $mdDialog.hide();
      };

      self.cancel = function () {
        $mdDialog.cancel();
      };

      function addActivityReview() {
        var activityReview = ActivityFacadeService.createActivityReview(self.activity.getID(), self.userReviewer, self.reviewDate);
        ParticipantActivityService.addActivityReview (activityReview);
      }
    }
  }
}());
