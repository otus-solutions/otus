(function () {
	'use strict';

	angular
		.module('otusjs.activity.business')
		.service('otusjs.activity.business.ParticipantActivityService', Service);

	Service.$inject = [
		'otusjs.activity.core.ModuleService',
		'otusjs.activity.core.ContextService',
		'otusjs.activity.repository.ActivityRepositoryService',
		'otusjs.activity.repository.UserRepositoryService',
		'otusjs.activity.business.ActivityDtoFactory',
		'otusjs.application.state.ApplicationStateService',
		'SurveyFormFactory'
	];

	function Service(ModuleService, ContextService, ActivityRepositoryService, UserRepositoryService, ActivityDtoFactory, ApplicationStateService, SurveyFormFactory) {
		var self = this;
		var _paperActivityCheckerData = null;
		self.activityConfigurations = new Object();
		self.activities = [];


		/* Public methods */
		self.initializePaperActivityData = initializePaperActivityData;
		self.add = add;
		self.listAll = listAll;
		self.listAllCategories = listAllCategories;
		self.listAvailables = listAvailables;
		self.selectActivities = selectActivities;
		self.getSelectedActivities = getSelectedActivities;
		self.getSelectedParticipant = getSelectedParticipant;
		self.listActivityCheckers = listActivityCheckers;
		self.getById = getById;
		self.setActivitiesSelection = setActivitiesSelection;
		self.getActivitiesSelection = getActivitiesSelection;
		self.updateCheckerActivity = updateCheckerActivity;
		self.configurationStructure = configurationStructure;
		self.addActivityRevision = addActivityRevision;
		self.getActivityRevisions = getActivityRevisions;
		self.createActivityDto = createActivityDto;
		self.saveActivities = saveActivities;
		self.getSurveyFromJson = getSurveyFromJson;


		function add() {
			var loggedUser = ContextService.getLoggedUser();

			getSelectedParticipant()
				.then(function (selectedParticipant) {
					_paperActivityCheckerData = JSON.parse(window.sessionStorage.getItem('activityPaper'));
					if (_paperActivityCheckerData) {
						_paperActivityCheckerData.realizationDate = new Date(_paperActivityCheckerData.realizationDate);
						ActivityRepositoryService.createFromPaperActivity(self.listSurveys, loggedUser, selectedParticipant, _paperActivityCheckerData, self.activityConfigurations);
						_paperActivityCheckerData = null;
						window.sessionStorage.removeItem('activityPaper');
						window.sessionStorage.removeItem('activityType');
					} else {
						ActivityRepositoryService.createFromSurvey(self.listSurveys, loggedUser, selectedParticipant, self.activityConfigurations);
					}
				});
		}

		function createActivityDto(survey, configuration, mode) {
			let loggedUser = ContextService.getLoggedUser();
			let activityDto = ActivityDtoFactory.create(survey, configuration, mode, loggedUser);
			return activityDto;
		}

		function saveActivities(preActivities) {
			_prepareActivities(preActivities)
				.then(() => ActivityRepositoryService.saveActivities(self.activities))
				.then(() => ApplicationStateService.activateParticipantActivities())
				.then(() => self.activities = []);
			window.sessionStorage.removeItem('preActivities');
		}

		function _prepareActivities(preActivities) {
			return getSelectedParticipant().then(function (selectedParticipant) {
				preActivities.forEach(activityDto => {
					activityDto.mode === "ONLINE" ? _createOnLineActivity(activityDto, selectedParticipant) : _createPaperActivity(activityDto, selectedParticipant);
				});
			});
		}

		function _createOnLineActivity(activityDto, selectedParticipant) {
			ActivityRepositoryService.createOnLineActivity(activityDto.surveyForm, activityDto.user, selectedParticipant, activityDto.configuration, activityDto.externalID)
				.then(OnlineActivity => self.activities.push(OnlineActivity));

		}

		function _createPaperActivity(activityDto, selectedParticipant) {
			ActivityRepositoryService.createPaperActivity(activityDto.surveyForm,
				activityDto.user, selectedParticipant, activityDto.paperActivityData, activityDto.configuration, activityDto.externalID)
				.then(paperActivity => self.activities.push(paperActivity));
		}


		function setActivitiesSelection(surveys) {
			self.listSurveys = surveys;
			_constructCollectionConfiguration();
		}

		function getActivitiesSelection() {
			return self.listSurveys;
		}

		function listAll() {
			return getSelectedParticipant()
				.then(function (selectedParticipant) {
					return ActivityRepositoryService.listAll(selectedParticipant);
				});
		}

		function listAvailables() {
			return ActivityRepositoryService.listAvailables();
		}

		function getById(activityInfo) {
			return ActivityRepositoryService.getById(activityInfo);
		}

		function initializePaperActivityData(paperActivityCheckerData) {
			window.sessionStorage.setItem('activityPaper', JSON.stringify(paperActivityCheckerData));
			_paperActivityCheckerData = paperActivityCheckerData;
		}

		function selectActivities(activities) {
			ContextService.selectActivities(activities);
		}

		function getSelectedActivities() {
			return {
				list: function list() {
					return ContextService.getSelectedActivities();
				},
				discard: function discard() {
					var toDiscard = ContextService.getSelectedActivities().map(function (activity) {
						activity.isDiscarded = true;
						return activity;
					});
					ActivityRepositoryService.discard(toDiscard);
					ContextService.clearSelectedActivities();
				}
			};
		}

		function getSelectedParticipant() {
			return ContextService.getSelectedParticipant();
		}

		function listActivityCheckers() {
			return UserRepositoryService.listAll();
		}

		function useSelectedActivity() {
			var selectedActivities = getSelectedActivities();
			if (selectedActivities.length === 1) {
				ContextService.setActivityInUse(selectedActivities[0]);
				ModuleService.ActivityFacadeService.useActivity(selectedActivities[0]);
			}
		}

		/* Activity Configuration Methods */
		function configurationStructure() {
			return self.activityConfigurations;
		}

		function _constructCollectionConfiguration() {
			self.listSurveys.forEach(function (template) {
				self.activityConfigurations[template.surveyTemplate.identity.acronym] = {};
			});
		}

		function listAllCategories() {
			return ActivityRepositoryService.listAllCategories();
		}

		function updateCheckerActivity(recruitmentNumber, id, activityStatus) {
			return ActivityRepositoryService.updateCheckerActivity(recruitmentNumber, Object.freeze({ id, activityStatus }));
		}

		function addActivityRevision(activityRevision, activity) {
			return ActivityRepositoryService.addActivityRevision(activityRevision, activity);
		}

		function getActivityRevisions(activityID, activity) {
			return ActivityRepositoryService.getActivityRevisions(activityID, activity);
		}

		function getSurveyFromJson(json) {
			return SurveyFormFactory.fromJsonObject(json);
		}
	}
}());
