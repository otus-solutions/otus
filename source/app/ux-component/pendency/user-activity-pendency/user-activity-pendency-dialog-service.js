(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.otus.uxComponent.UserActivityPendencyDialogService', Service);

  Service.$inject = [
    '$q',
    '$mdToast',
    '$timeout',
    '$mdDialog',
    'otusjs.pendency.business.UserActivityPendencyService',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.otus.uxComponent.CheckerItemFactory',
    'otusjs.model.pendency.UserActivityPendencyFactory',
    'otusjs.otus.uxComponent.UserActivityPendencyConstant',
  ];

  function Service($q, $mdToast, $timeout, $mdDialog, UserActivityPendencyService, ParticipantActivityService,
                   CheckerItemFactory, userActivityPendencyFactory, Constant) {
    const self = this;
    self.userActivityPendencyDialog = userActivityPendencyDialog;
    self.DialogController = DialogController;

    function userActivityPendencyDialog(selectedActivity) {
      return UserActivityPendencyService.getPendencyByActivityId(selectedActivity.getID())
        .then(foundPendency => {
          _invokeDialogComponent(Constant.TEMPLATE_UPDATE_USER_ACTIVITY_PENDENCY,
            selectedActivity, foundPendency);
        })
        .catch(() => {
          _invokeDialogComponent(Constant.TEMPLATE_CREATE_USER_ACTIVITY_PENDENCY, selectedActivity);
        })
    }

    function _invokeDialogComponent(selectedTemplateUrl, selectedActivity, foundPendency) {
      self.cancel = $mdDialog.cancel;
      $mdDialog.show({
        locals: {selectedActivity: selectedActivity, updateList: self.updateList, foundPendency: foundPendency},
        templateUrl: selectedTemplateUrl,
        parent: angular.element(document.body),
        controller: self.DialogController,
        controllerAs: "vm",
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: true
      });
    }

    function DialogController(selectedActivity, foundPendency) {
      var self = this;
      self.selectedActivity = selectedActivity;
      self.foundPendency = foundPendency;

      /* Public methods */
      self.querySearch = querySearch;
      self.saveUserActivityPendency = saveUserActivityPendency;
      self.updateUserActivityPendency = updateUserActivityPendency;
      self.deleteUserActivityPendency = deleteUserActivityPendency;
      self.cancel = cancel;
      self.$onInit = onInit();

      function onInit() {
        self.checkers = ParticipantActivityService.listActivityCheckers().map(CheckerItemFactory.create);
        self.minDate = new Date();
        _fillUpdateForm();
      }

      function _fillUpdateForm(){
        if (self.foundPendency) {
          self.selectedItem = _filterForEmail(foundPendency.receiver)[0];
          self.date = foundPendency.dueDate;
        }
      }

      function _filterForEmail(receiver){
        return self.checkers.filter((item) => {
          return item.checker.email === receiver;
          }
        )
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
        UserActivityPendencyService.saveUserActivityPendency(_buildUserActivityPendency())
          .then(value => {
            self.cancel();
            if (value) {
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Pendência salva com sucesso.')
                  .hideDelay(2000)
              )
            }
          });
      }

      function updateUserActivityPendency() {
        // UserActivityPendencyService.updateUserActivityPendency(
        //   id, emailUser, dueDate).then(value => console.log(value));


        console.log("teste de atualização");
        console.log(self.selectedItem.checker.email);
        $mdDialog.cancel()
      }

      function deleteUserActivityPendency() {
        console.log("teste de exclusão");
        $mdDialog.cancel()
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




