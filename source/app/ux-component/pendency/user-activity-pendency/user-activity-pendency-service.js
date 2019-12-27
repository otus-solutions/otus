(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.otus.uxComponent.UserActivityPendencyService', Service);

  Service.$inject = [
    '$q',
    '$mdToast',
    '$timeout',
    '$mdDialog',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.otus.uxComponent.CheckerItemFactory',
    'otusjs.model.pendency.UserActivityPendencyFactory',
    'otusjs.otus.uxComponent.UserActivityPendencyValue',
  ];

  function Service($q, $mdToast, $timeout, $mdDialog, ParticipantActivityService,
                   CheckerItemFactory, userActivityPendencyFactory, Values,) {
    const self = this;

    self.userActivityPendencyDialog = userActivityPendencyDialog;
    self.DialogController = DialogController;

    function userActivityPendencyDialog(selectedActivity) {
      self.cancel = $mdDialog.cancel;
      $mdDialog.show({
        locals: {selectedActivity: selectedActivity, updateList: self.updateList},
        templateUrl: 'app/ux-component/pendency/user-activity-pendency/user-activity-pendency-dialog-template.html',
        parent: angular.element(document.body),
        controller: self.DialogController,
        controllerAs: "vm",
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: true
      });
    }

    function DialogController(selectedActivity) {
      var self = this;
      self.selectedActivity = selectedActivity;
      //self.user = selectedActivity.statusHistory.getInitializedOfflineRegistry().user;
      //self.date = selectedActivity.statusHistory.getInitializedOfflineRegistry().date;
      /* Public methods */
      self.querySearch = querySearch;
      self.saveUserActivityPendency = saveUserActivityPendency;
      self.cancel = cancel;
      self.$onInit = onInit();

      function onInit() {
        self.checkers = ParticipantActivityService.listActivityCheckers().map(CheckerItemFactory.create);
        self.minDate = new Date();
      }

      function querySearch(query) {
        var results = query ? self.checkers.filter(_createFilterFor(query)) : self.checkers;
        var deferred = $q.defer();

        $timeout(function () {
          deferred.resolve(results);
        }, Math.random() * 1000, false);

        return deferred.promise;
      }

      function saveUserActivityPendency() {
        ParticipantActivityService.saveUserActivityPendency(_buildUserActivityPendency());
      }

      function _buildUserActivityPendency() {
        return userActivityPendencyFactory.create(
          angular.copy(self.selectedItem.checker.email),
          angular.copy(self.date),
          angular.copy(self.selectedActivity)
        )
      }


      // function updateCheckerActivity() {
      //   var activityStatus = angular.copy(self.selectedActivity.statusHistory.getInitializedOfflineRegistry());
      //   activityStatus.setUser(self.selectedItem.checker);
      //   activityStatus.setDate(self.date);
      //   ParticipantActivityService.updateCheckerActivity(
      //     self.selectedActivity.participantData.recruitmentNumber,
      //     self.selectedActivity.getID(),
      //     activityStatus)
      //     .then(function (response) {
      //       self.cancel();
      //       if (response) {
      //         updateList();
      //         _showMessage("Salvo com sucesso.")
      //       } else {
      //         _showMessage("Aferidor não alterado.")
      //       }
      //     }).catch(function (e) {
      //     self.cancel();
      //     _showMessage("Ocorreu um problema! Não foi possível alterar o aferidor.");
      //   });
      // }

      function cancel() {
        $mdDialog.cancel();
      }

      function _showMessage(msg) {
        $mdToast.show(
          $mdToast.simple()
            .position("bottom right")
            .textContent(msg)
            .hideDelay(3000));
      }

      function _createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(checker) {
          return checker.text.toLowerCase().indexOf(lowercaseQuery) > -1;
        };
      }
    }
  }

}());




