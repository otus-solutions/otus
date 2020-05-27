(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.issueViewer.IssueViewerService', Service);

  Service.$inject = [
    'otusjs.genericListViewer.GenericListViewerService',
    'ISSUE_VIEWER_LABELS',
    // 'otusjs.pendency.repository.UserActivityPendencyRepositoryService',
    // 'otusjs.model.pendency.UserActivityPendencyFactory',
  ];

  function Service(GenericListViewerService, ISSUE_VIEWER_LABELS,
                   // UserActivityPendencyRepositoryService, UserActivityPendencyFactory
                   ) {

    const self = this;
    const INITIAL_CURRENT_QUANTITY = 0;
    const INITIAL_QUANTITY_TO_GET = 15;

    initialize();

    self.initialize = initialize;
    self.getChecker = getChecker;
    self.findRecruitmentNumberFromEmail = findRecruitmentNumberFromEmail;

    function initialize(){
      angular.extend(self, self, GenericListViewerService);
      self.init(ISSUE_VIEWER_LABELS, INITIAL_CURRENT_QUANTITY, INITIAL_QUANTITY_TO_GET
        // UserActivityPendencyRepositoryService.getAllPendencies, UserActivityPendencyFactory
      );

      self.getSearchSettings = getSearchSettings;
      self.getItemAttributes = getItemAttributes;
      self.getInputViewState = getInputViewState;
      self.getSelectedParticipantRN = getSelectedParticipantRN;

      self.getItemAttributes = getItemAttributesFAKE; //todo excluir
    }

    function getItemAttributesFAKE(){
      function getFakeIssue(id, sender, creationDate) {
        return {
          "_id": id,
          "objectType": "Issue",
          "sender": sender,
          // "title": "Não consigo preencher a atividade TCLEC",
          // "message": "Quando tento responder uma pergunta, não consigo inserir a resposta",
          "creationDate": creationDate.toJSON(),
          "status": "OPEN"
        }
      }
      return [
        getFakeIssue('1111111', 'aaa@otus.com', new Date(2020,5, 5)),
        getFakeIssue('2222222', 'ccc@otus.com', new Date(2020,4, 5)),
        getFakeIssue('3333333', 'bbb@otus.com', new Date(2020,4, 25)),
      ]
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
          "status": "OPENED"
        }
      };
    }

    function getItemAttributes() {
      return {
        rn: {title: 'rn', translatedTitle: ISSUE_VIEWER_LABELS.RN, icon: 'account_circle'},
        center: {title: 'center', translatedTitle: ISSUE_VIEWER_LABELS.CENTER, icon: 'assignment'},
        creationDate: {title: 'creationDate', translatedTitle: ISSUE_VIEWER_LABELS.CREATION_DATE, icon: 'schedule'},
        status: {title: 'status', translatedTitle: ISSUE_VIEWER_LABELS.RECEIVER, icon: 'assignment_ind'}
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

    function findRecruitmentNumberFromEmail(email){
      return 1234567; //todo
    }

  }

}());
