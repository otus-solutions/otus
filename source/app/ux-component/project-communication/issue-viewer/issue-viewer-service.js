(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.issueViewer.IssueViewerService', Service);

  Service.$inject = [
    '$q',
    'otusjs.genericListViewer.GenericListViewerService',
    'ISSUE_VIEWER_LABELS',
    // 'otusjs.pendency.repository.UserActivityPendencyRepositoryService',
    // 'otusjs.model.pendency.UserActivityPendencyFactory',
  ];

  function Service($q, GenericListViewerService, ISSUE_VIEWER_LABELS,
                   // UserActivityPendencyRepositoryService, UserActivityPendencyFactory
                   ) {

    const self = this;
    const INITIAL_CURRENT_QUANTITY = 0;
    const INITIAL_QUANTITY_TO_GET = 15;

    const fake_genericListFactory = {
      fromJsonObject: function(item) { return item; }
    };

    initialize();

    self.initialize = initialize;
    self.getChecker = getChecker;
    self.findParticipantFromEmail = findParticipantFromEmail;
    self.translateStatus = translateStatus;

    function initialize(){
      angular.extend(self, self, GenericListViewerService);
      self.init(ISSUE_VIEWER_LABELS, INITIAL_CURRENT_QUANTITY, INITIAL_QUANTITY_TO_GET,
        fake_getAllItems, fake_genericListFactory //todo temp
      );

      self.getSearchSettings = getSearchSettings;
      self.getItemAttributes = getItemAttributes;
      self.getInputViewState = getInputViewState;
      self.getSelectedParticipantRN = getSelectedParticipantRN;

      self.getAllItemsFromRepositoryService = fake_getAllItems;//todo temp
    }

    function getSearchSettings() {
      return {
        "currentQuantity": INITIAL_CURRENT_QUANTITY,
        "quantityToGet": INITIAL_QUANTITY_TO_GET,
        "order": {
          "fields": ["creationDate"],
          "mode": 1
        },
        "filter": {
          "status": ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.STATUS.OPENED.VALUE
        }
      };
    }

    function getItemAttributes() {
      return {
        rn:           ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.RN,
        name:         ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.SENDER_NAME,
        center:       ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.CENTER,
        creationDate: ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.CREATION_DATE,
        title:        ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.TITLE,
        status:       ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.STATUS
        // rn:           {title: 'rn',           translatedTitle: ISSUE_VIEWER_LABELS.FILTER.RN,             icon: 'account_circle'},
        // name:         {title: 'name',         translatedTitle: ISSUE_VIEWER_LABELS.FILTER.NAME,           icon: 'person'},
        // center:       {title: 'center',       translatedTitle: ISSUE_VIEWER_LABELS.FILTER.CENTER,         icon: 'location_on'},
        // creationDate: {title: 'creationDate', translatedTitle: ISSUE_VIEWER_LABELS.FILTER.CREATION_DATE,  icon: 'schedule'},
        // title:        {title: 'title',        translatedTitle: ISSUE_VIEWER_LABELS.FILTER.TITLE,          icon: 'insert_comment'},
        // status:       {title: 'status',       translatedTitle: ISSUE_VIEWER_LABELS.FILTER.STATUS,         icon: 'assignment_ind'}
      };
    }

    function getInputViewState() {
      return {
        rn: false,
        creationDate: false,
        center: false
      };
    }

    function getSelectedParticipantRN(participant, pendencyFilterItem, searchSettings) {
      searchSettings.filter[pendencyFilterItem.title] = participant.recruitmentNumber;
    }

    function getChecker(user, pendencyFilterItem, searchSettings) {
      searchSettings.filter[pendencyFilterItem.title] = [user.checker.email];
    }

    function translateStatus(status){
      const translation = ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES.STATUS[status].TRANSLATED_TITLE;
      return translation.substring(0, translation.length-1);
    }

    //todo
    function findParticipantFromEmail(email){
      return {
        rn: 1234567,
        name: 'Fulano de Tal',
        center: 'RS'
      };
    }

    //todo temp
    function fake_getAllItems(searchSettings){

      function getFakeIssue(id, sender, creationDate, status) {
        return {
          "_id": id,
          "objectType": "Issue",
          "sender": sender,
          "title": "Não consigo preencher a atividade TCLEC " + id,
          // "message": "Quando tento responder uma pergunta, não consigo inserir a resposta",
          "creationDate": creationDate.toJSON(),
          "status": status
        }
      }

      const defer = $q.defer();
      defer.resolve([
        getFakeIssue('1111111', 'aaa@otus.com', new Date(2020,5, 5), "CLOSED"),
        getFakeIssue('2222222', 'ccc@otus.com', new Date(2020,4, 5), "OPENED"),
        getFakeIssue('3333333', 'bbb@otus.com', new Date(2020,4, 25), "FINALIZED"),
      ]);

      return defer.promise;
    }

  }

}());
