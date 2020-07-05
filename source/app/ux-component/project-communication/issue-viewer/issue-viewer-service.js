(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.issueViewer.IssueViewerService', Service);

  Service.$inject = [
    '$q',
    '$window',
    'otusjs.genericListViewer.GenericListViewerService',
    'ISSUE_VIEWER_LABELS',
    'otusjs.project.communication.repository.ProjectCommunicationRepositoryService',
    'otusjs.otus.uxComponent.IssueFactory',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.deploy.FieldCenterRestService',
  ];

  function Service($q, $window, GenericListViewerService, ISSUE_VIEWER_LABELS,
                   ProjectCommunicationRepositoryService, IssueFactory,
                   ParticipantManagerService, ContextService, ProjectFieldCenterService) {

    const self = this;
    const INITIAL_CURRENT_QUANTITY = 0;
    const INITIAL_QUANTITY_TO_GET = 15;
    const CURR_ISSUE_STORAGE_KEY = 'currentIssue';
    const CURR_SEARCH_SETTINGS_STORAGE_KEY = 'issueSearchSettings';

    self.participantDataReady = false;
    self.participants = {};
    self.needPreparations = self.storageItems = true;
    self.center = undefined;

    self.initialize = initialize;
    self.prepareData = prepareData;
    self.loadCenters = loadCenters;
    self.translateStatus = translateStatus;
    self.storageCurrentIssue = storageCurrentIssue;
    self.getCurrStoragedIssue = getCurrStoragedIssue;
    self.removeStoragedCurrentIssue = removeStoragedCurrentIssue;
    self.updateIssueStatus = updateIssueStatus;
    self.updateCurrStoragedIssueStatus = updateCurrStoragedIssueStatus;
    self.getCurrIssueMessages = getCurrIssueMessages;
    self.parseFilterObject = parseFilterObject;

    initialize();

    function initialize(){
      angular.extend(self, self, GenericListViewerService);
      self.init(ISSUE_VIEWER_LABELS, INITIAL_CURRENT_QUANTITY, INITIAL_QUANTITY_TO_GET,
        ProjectCommunicationRepositoryService.filter, IssueFactory,
        childParseItemsMethod
      );

      self.getAllItems = getAllItems;
      self.getSearchSettings = getSearchSettings;
      self.getItemAttributes = getItemAttributes;
      self.getInputViewState = getInputViewState;
    }

    function prepareData(){
      let defer = $q.defer();
      ContextService.getLoggedUser()
        .then(user => {
          self.center = user.fieldCenter.acronym;
          defer.resolve(ParticipantManagerService.setup())
        })
        .catch(err => defer.reject(err));
      return defer.promise;
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
          status: "OPEN",
          center: self.center
        }
      };
    }

    function getInputViewState() {
      return {
        rn: false,
        creationDate: false,
        center: false
      };
    }

    function getAllItems(searchSettings) {
      if(self.currSearchSettings){
        searchSettings = angular.copy(self.currSearchSettings);
      }

      return parseFilterObject(searchSettings).then(searchSettingsParsed => {
        return ProjectCommunicationRepositoryService.filter(searchSettingsParsed)
          .then(data => childParseItemsMethod(data))
          .catch(err => console.log("error:" + JSON.stringify(err)))
      });
    }

    function parseFilterObject(searchSettings){
      let promises = [];
      if(searchSettings.filter.rn){
        promises.push(ParticipantManagerService.getParticipant(searchSettings.filter.rn));
      }
      if(searchSettings.filter.center){
        promises.push(ProjectFieldCenterService.loadCenters());
      }

      let defer = $q.defer();
      let searchSettingsParsed = angular.copy(searchSettings);
      const fieldMap = {
        creationDate: 'creationDate',
        rn: 'sender',
        center: 'group'
      };

      searchSettingsParsed.order.fields = searchSettingsParsed.order.fields.map(field => fieldMap[field]);

      $q.all(promises).then(response => {
        let index = 0;
        if(searchSettings.filter.rn){
          delete searchSettingsParsed.filter.rn;
          searchSettingsParsed.filter[fieldMap.rn] = response[index++]._id;
        }
        if(searchSettings.filter.center){
          let centerId = response[index].find(center => center.acronym === searchSettings.filter.center)._id;
          delete searchSettingsParsed.filter.center;
          searchSettingsParsed.filter[fieldMap.center] = centerId;
        }
        self.currSearchSettings = searchSettings;
        defer.resolve(searchSettingsParsed);
      })
        .catch(err => defer.reject(err));

      return defer.promise;
    }

    function childParseItemsMethod(genericListJsonArray) {
      let defer = $q.defer();
      let promises = genericListJsonArray.map(item => ProjectCommunicationRepositoryService.getSenderById(item.sender));

      $q.all(promises).then(participants => {
        let parsedItems = [];
        for (let i = 0; i < genericListJsonArray.length; i++) {
          parsedItems.push(IssueFactory.fromJsonObject(genericListJsonArray[i], participants[i]))
        }
        defer.resolve(parsedItems);
      }).catch(err => defer.reject(err));

      return defer.promise;
    }

    function getItemAttributes() {
      let itemAttributes = {};
      Object.values(ISSUE_VIEWER_LABELS.ISSUE_ATTRIBUTES).forEach(attribute => {
        itemAttributes[attribute.TITLE] = {
          title:           attribute.TITLE,
          translatedTitle: attribute.TRANSLATED_TITLE,
          icon:            attribute.ICON
        }
      });
      return itemAttributes;
    }

    function loadCenters(){
      return ProjectFieldCenterService.loadCenters();
    }

    function translateStatus(status){
      const translation = ISSUE_VIEWER_LABELS.STATUS[status].filterLabel;
      return translation.substring(0, translation.length-1);
    }

    function storageCurrentIssue(currIssue){
      $window.sessionStorage.setItem(CURR_ISSUE_STORAGE_KEY, JSON.stringify(currIssue));
      $window.sessionStorage.setItem(CURR_SEARCH_SETTINGS_STORAGE_KEY, JSON.stringify(self.currSearchSettings));
    }

    function removeStoragedCurrentIssue(){
      $window.sessionStorage.removeItem(CURR_ISSUE_STORAGE_KEY);

      self.currSearchSettings = JSON.parse($window.sessionStorage.getItem(CURR_SEARCH_SETTINGS_STORAGE_KEY));
      $window.sessionStorage.removeItem(CURR_SEARCH_SETTINGS_STORAGE_KEY);
    }

    function getCurrStoragedIssue(){
      return JSON.parse($window.sessionStorage.getItem(CURR_ISSUE_STORAGE_KEY));
    }

    function updateIssueStatus(issue, newStatusValue){
      let updateMethod = null;

      switch (newStatusValue) {
        case ISSUE_VIEWER_LABELS.STATUS.OPEN.value:
          updateMethod = ProjectCommunicationRepositoryService.updateReopen;
          break;

        case ISSUE_VIEWER_LABELS.STATUS.CLOSED.value:
          updateMethod = ProjectCommunicationRepositoryService.updateClose;
          break;

        case ISSUE_VIEWER_LABELS.STATUS.FINALIZED.value:
          updateMethod = ProjectCommunicationRepositoryService.updateFinalized;
      }

      let oldStatus = issue.status;
      issue.status = newStatusValue;

      let defer = $q.defer();
      try{
        updateMethod(issue._id).then(() => {
          updateCurrStoragedIssueStatus(newStatusValue);
          issue.status = newStatusValue;
          defer.resolve();
        })
      }
      catch (error) {
        issue.status = oldStatus;
        defer.reject(error);
      }

      return defer.promise;
    }

    function updateCurrStoragedIssueStatus(newStatus){
      let currIssue = getCurrStoragedIssue();
      currIssue.status = newStatus;
      $window.sessionStorage.setItem(CURR_ISSUE_STORAGE_KEY, JSON.stringify(currIssue));
    }

    function getCurrIssueMessages(){
      const skip = 0, limit=10000;//todo
      return ProjectCommunicationRepositoryService.getAllIssueMessages(getCurrStoragedIssue()._id, skip, limit);
    }

  }

}());
