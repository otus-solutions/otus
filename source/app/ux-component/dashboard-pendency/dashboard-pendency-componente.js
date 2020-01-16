(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardPendency', {
      templateUrl: 'app/ux-component/dashboard-pendency/dashboard-pendency-template.html',
      controller: Controller,
    }).controller('otusDashboardPendencyCtrl', Controller);

  Controller.$inject = [
    'otusjs.model.pendency.UserActivityPendencyFactory',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.activity.business.ActivityPlayerService',
    'otusjs.activity.business.ActivityViewService',
    'otusjs.pendency.business.UserActivityPendencyService'
  ];

  function Controller(UserActivityPendencyFactory, ParticipantManagerService, ParticipantActivityService,
                      ApplicationStateService, ActivityPlayerService, ActivityViewService, UserActivityPendencyService) {
    var self = this;

    self.$onInit = onInit();
    self.loadActivities = loadActivities;
    self.loadActivityPlayer = loadActivityPlayer;
    self.loadActivityViewer = loadActivityViewer;
    self.selectParticipant = selectParticipant;
    const Mock = {};

    let test = {
      "_id": "5e06659bf9d5924d303db335",
      "objectType": "userActivityPendency",
      "creationDate": "2019-12-19T19:31:08.570Z",
      "dueDate": "2020-12-19T19:31:08.570Z",
      "requester": "flavia.avila@ufrgs.br",
      "receiver": "ativ_created@otus.com",
      "activityInfo": {
        "id": "5b8569b7086a5e5ee91527dc",
        "acronym": "DSOC",
        "recruitmentNumber": 2000735,
        //"id": "5bb22262e103cf07800f470c"
      }
    };

    function onInit() {
      self.participantManagerReady = false;
      ParticipantManagerService.setup()
        .then(() => self.participantManagerReady = true);
      self.pendencyListReady = false;

      _getOpenedUserActivityPendenciesToReceiver();
    }

    function _getOpenedUserActivityPendenciesToReceiver(){

      const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

      UserActivityPendencyService.getAllUserActivityPendenciesToReceiver() // TODO change to getOpened
        .then(values => {
          self.openedUserActivityPendencies = [];

          for(let item of values){
            console.log(item)
            let pendency = UserActivityPendencyFactory.fromJsonObject(item);
            console.log(pendency)
            const creationDate = new Date(pendency.creationDate);
            creationDate.setHours(0,0,0,0);
            const today = new Date();
            today.setHours(0,0,0,0);
            let days = (today - creationDate) / MILLISECONDS_PER_DAY;
            const months = Math.floor(days / 30);
            days = days % 30;

            const timePending = (months===0 ? '' : `${months} meses `) +
              (days===0 ? '' : `${days} dias`);

            pendency.activityInfo['lastStatus'] = _createStatus(pendency.activityInfo.lastStatusName);

            self.openedUserActivityPendencies.push({
              creationDate: creationDate.getDate() + "/"+ (creationDate.getMonth()+1) + "/" + creationDate.getFullYear(),
              timePending: timePending,
              activityInfo: pendency.activityInfo
            });

            self.openedUserActivityPendencies.push({
              creationDate: creationDate.getDate() + "/"+ (creationDate.getMonth()+1) + "/" + creationDate.getFullYear(),
              timePending: timePending,
              activityInfo: pendency.activityInfo
            });self.openedUserActivityPendencies.push({
              creationDate: creationDate.getDate() + "/"+ (creationDate.getMonth()+1) + "/" + creationDate.getFullYear(),
              timePending: timePending,
              activityInfo: pendency.activityInfo
            });
          }

          console.log('self.openedUserActivityPendencies'); console.log(self.openedUserActivityPendencies);

        })
        .catch(() => {
          self.openedUserActivityPendencies = [];
        });
    }

    function _createStatus(status) {
      const dict = {
        FINALIZED: {
          icon: 'check_circle',
          tooltip: 'Finalizado'
        },
        CREATED: {
          icon: 'fiber_new',
          tooltip: 'Criado'
        },
        SAVED: {
          icon: 'save',
          tooltip: 'Salvo'
        },
        OPENED: {
          icon: 'open_in_new',
          tooltip: 'Aberto'
        },
        INITIALIZED_ONLINE: {
          icon: 'play_circle_filled',
          tooltip: 'Inicializado'
        },
        INITIALIZED_OFFLINE: {
          icon: 'play_circle_filled',
          tooltip: 'Inicializado'
        },
      };
      return dict[status];
    }

    function selectParticipant(rn) {
      try {
        let participant = ParticipantManagerService.getParticipant(rn);
        ParticipantManagerService.selectParticipant(participant);
      } catch (e) {
        //toast
      }
    }

    function loadActivities(rn) {
      selectParticipant(rn);
      ApplicationStateService.activateParticipantActivities()
    }

    function loadActivityPlayer(rn, activityId) {
      selectParticipant(rn);
      ParticipantActivityService.getActivity(activityId, rn)
        .then(onActivity => ParticipantActivityService.selectActivities(onActivity))
        .then(() => ActivityPlayerService.load().then(function () {
          ApplicationStateService.activateActivityPlayer()
        }));
      ParticipantActivityService.clearSelectedActivities();
    }

    function loadActivityViewer(rn, activityId) {
      selectParticipant(rn);
      ParticipantActivityService.getActivity(activityId, rn)
        .then(onActivity => ParticipantActivityService.selectActivities(onActivity))
        .then(() => ActivityViewService.load().then(function () {
          ApplicationStateService.activateActivityViewer()
        }));
      ParticipantActivityService.clearSelectedActivities();
    }

    /* Public methods */

    /*Build artifacts from MockDocument*/
    Mock.userActivityPendencyFactory = UserActivityPendencyFactory;
    Mock.UserActivityPendencyDocument = JSON.stringify(test);
    Mock.userActivityPendency = Mock.userActivityPendencyFactory.fromJsonObject(Mock.UserActivityPendencyDocument);
    console.log(Mock.userActivityPendency)
    Mock._id = Mock.userActivityPendency.getID();

  }

})();