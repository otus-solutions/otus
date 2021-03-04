(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.pendencyViewer.PendencyViewerService', Service);

  Service.$inject = [
    'otusjs.genericListViewer.GenericListViewerService',
    'otusjs.pendency.repository.UserActivityPendencyRepositoryService',
    'otusjs.model.pendency.UserActivityPendencyFactory',
    'PENDENCY_VIEWER_LABELS'
  ];

  function Service(GenericListViewerService, UserActivityPendencyRepositoryService, UserActivityPendencyFactory,
                   PENDENCY_VIEWER_LABELS) {

    const self = this;
    const INITIAL_CURRENT_QUANTITY = 0;
    const INITIAL_QUANTITY_TO_GET = 15;

    self.initialize = initialize;
    self.calculateRemainingDays = calculateRemainingDays;

    function initialize(){
      angular.extend(self, self, GenericListViewerService);
      self.init(PENDENCY_VIEWER_LABELS, INITIAL_CURRENT_QUANTITY, INITIAL_QUANTITY_TO_GET,
        UserActivityPendencyRepositoryService.getAllPendencies, UserActivityPendencyFactory);

      self.getSearchSettings = getSearchSettings;
      self.getItemAttributes = getItemAttributes;
      self.getInputViewState = getInputViewState;
    }

    function getSearchSettings() {
      return {
        "currentQuantity": INITIAL_CURRENT_QUANTITY,
        "quantityToGet": INITIAL_QUANTITY_TO_GET,
        "order": {
          "fields": ["dueDate"],
          "mode": 1
        },
        "filter": {
          "status": "NOT_FINALIZED"
        }
      };
    }

    function getItemAttributes() {
      return {
        rn: {title: 'rn', translatedTitle: PENDENCY_VIEWER_LABELS.RN, icon: 'account_circle'},
        requester: {title: 'requester', translatedTitle: PENDENCY_VIEWER_LABELS.REQUESTER, icon: 'record_voice_over'},
        receiver: {title: 'receiver', translatedTitle: PENDENCY_VIEWER_LABELS.RECEIVER, icon: 'assignment_ind'},
        acronym: {title: 'acronym', translatedTitle: PENDENCY_VIEWER_LABELS.ACRONYM, icon: 'assignment'},
        externalID: {title: 'externalID', translatedTitle: PENDENCY_VIEWER_LABELS.EXTERNAL_ID, icon: 'fingerprint'},
        dueDate: {title: 'dueDate', translatedTitle: PENDENCY_VIEWER_LABELS.DUE_DATE, icon: 'hourglass_empty'},
        creationDate: {title: 'creationDate', translatedTitle: PENDENCY_VIEWER_LABELS.CREATION_DATE, icon: 'schedule'},
        remainingDays: {title: 'remainingDays', translatedTitle: PENDENCY_VIEWER_LABELS.REMAINING_DAYS, icon: 'speed'}
      };
    }

    function getInputViewState() {
      return {
        rn: false,
        acronym: false,
        requester: false,
        receiver: false,
        dueDate: false,
        externalID: false,
        sortingCriteria: false
      };
    }

    function calculateRemainingDays(dueDate) {
      let today = _extractDateZeroTime(new Date());
      let due = _extractDateZeroTime(new Date(dueDate));
      const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
      return Math.floor((due - today) / MILLISECONDS_PER_DAY);
    }

    function _extractDateZeroTime(date) {
      date.setHours(0, 0, 0, 0);
      return date;
    }

  }

}());
