(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardPendency', {
      templateUrl: 'app/ux-component/dashboard-pendency/dashboard-pendency-template.html',
      controller: Controller,
    }).controller('otusDashboardPendencyCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    'otusjs.model.pendency.UserActivityPendencyFactory',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.activity.business.ActivityPlayerService',
    'otusjs.activity.business.ActivityViewService',
    'otusjs.pendency.business.UserActivityPendencyService'
  ];

  function Controller($q, $mdToast, UserActivityPendencyFactory, ParticipantManagerService, ParticipantActivityService,
                      ApplicationStateService, ActivityPlayerService, ActivityViewService, UserActivityPendencyService) {
    var self = this;

    self.messageError = '';

    self.$onInit = onInit();
    self.loadActivities = loadActivities;
    self.loadActivityPlayer = loadActivityPlayer;
    self.loadActivityViewer = loadActivityViewer;
    self.selectParticipant = selectParticipant;
    self.openedUserActivityPendencies = [];
    self.existOpenedUserActivityPendencies = false;

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
              activityId: pendency.activityId,
              activityInfo: pendency.activityInfo
            });
          }

          self.existOpenedUserActivityPendencies = (self.openedUserActivityPendencies.length > 0);

          console.log('self.openedUserActivityPendencies'); console.log(self.openedUserActivityPendencies);

        })
        .catch(() => {
          self.openedUserActivityPendencies = [];
          self.existOpenedUserActivityPendencies = false;
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
      var deferred = $q.defer();
      try {
        let participant = ParticipantManagerService.getParticipant(rn);
        ParticipantManagerService.selectParticipant(participant);
        deferred.resolve();
      } catch (e) {
        console.error(e);
        self.messageError = 'Error ao processar a busca do participante. Tente novamente.';
        $mdToast.show(
          $mdToast.simple()
            .position('bottom right')
            .textContent(self.messageError)
            .theme('error-toast')
            .hideDelay(3000)
        );
        deferred.reject();
      }
      return deferred.promise;
    }

    function loadActivities(rn) {
      selectParticipant(rn).then(() => ApplicationStateService.activateParticipantActivities());
    }

    function loadActivityPlayer(rn, activityId) {
      selectParticipant(rn).then(() => {
        ParticipantActivityService.getActivity(activityId, rn)
          .then(onActivity => ParticipantActivityService.selectActivities(onActivity))
          .then(() => ActivityPlayerService.load().then(function () {
            ApplicationStateService.activateActivityPlayer()
          }));
        ParticipantActivityService.clearSelectedActivities()});
    }

    function loadActivityViewer(rn, activityId) {
      selectParticipant(rn).then(() => {
        ParticipantActivityService.getActivity(activityId, rn)
          .then(onActivity => ParticipantActivityService.selectActivities(onActivity))
          .then(() => ActivityViewService.load().then(function () {
            ApplicationStateService.activateActivityViewer()
          }));
        ParticipantActivityService.clearSelectedActivities();
      })
    }

  }

})();