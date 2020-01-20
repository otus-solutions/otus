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
    self.openUserActivityPendencyDialog = openUserActivityPendencyDialog;
    self.DialogController = DialogController;

    function openUserActivityPendencyDialog(selectedActivity) {
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

    function _showMessage(msg) {
      $mdToast.show(
        $mdToast.simple()
          .position("bottom left")
          .textContent(msg)
          .hideDelay(3000));
    }

    function DialogController(selectedActivity, foundPendency) {
      var self = this;
      self.selectedActivity = selectedActivity;
      self.foundPendency = foundPendency;
      self.Constant = Constant;

      /* Public methods */
      self.querySearch = querySearch;
      self.createUserActivityPendency = createUserActivityPendency;
      self.updateUserActivityPendency = updateUserActivityPendency;
      self.deleteUserActivityPendency = deleteUserActivityPendency;
      self.cancel = cancel;
      self.$onInit = onInit();

      function onInit() {
        self.checkers = ParticipantActivityService.listActivityCheckers().map(CheckerItemFactory.create);
        self.minDate = new Date();
        _fillUpdateForm();
      }

      function _fillUpdateForm() {
        if (self.foundPendency) {
          self.selectedItem = _filterForEmail(foundPendency.receiver)[0];
          self.date = foundPendency.dueDate;
        }
      }

      function _filterForEmail(receiver) {
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

      function createUserActivityPendency() {
        UserActivityPendencyService.createUserActivityPendency(_buildUserActivityPendency())
          .then(value => {
            self.cancel();
            if (value) _showMessage(Constant.MSG_CREATE_SUCCESS);
            else _showMessage(Constant.MSG_CREATE_FAIL);
          });


      }

      function updateUserActivityPendency() {
        UserActivityPendencyService.updateUserActivityPendency(foundPendency._id, _buildUserActivityPendency())
          .then(value => {
            self.cancel();
            if (value) _showMessage(Constant.MSG_UPDATE_SUCCESS);
            else _showMessage(Constant.MSG_UPDATE_FAIL);
          });

      }

      function deleteUserActivityPendency() {
        UserActivityPendencyService.deleteUserActivityPendency(foundPendency._id)
          .then(value => {
            self.cancel();
            if (value) _showMessage(Constant.MSG_DELETE_SUCESS);
            else _showMessage(Constant.MSG_DELETE_FAIL);
          });
      }

      function _buildUserActivityPendency() {
        return userActivityPendencyFactory.create(
          angular.copy(self.selectedItem.checker.email),
          angular.copy(self.date),
          angular.copy(self.selectedActivity)
        )
      }

      function cancel() {
        $mdDialog.cancel();
      }

      function _createFilterFor(query) {
        let lowercaseQuery = angular.lowercase(query);
        return function filterFn(checker) {
          return checker.text.toLowerCase().indexOf(lowercaseQuery) > -1;
        };
      }
    }
  }

}());




