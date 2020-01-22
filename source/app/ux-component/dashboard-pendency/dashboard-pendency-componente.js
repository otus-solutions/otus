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
    self.displayGridLarge = displayGridLarge;
    self.displayGridSmall = displayGridSmall;

    self.userActivityPendencies = {
      opened: [],
      done: null,
      curr: [],
      currIsEmpty: true
    };
    self.showOpenedPendencies = true;
    self.whichIsShowing ='Em aberto';
    self.changePendenciesListToShow = _changePendenciesListToShow;

    function onInit() {
      self.participantManagerReady = false;
      ParticipantManagerService.setup()
        .then(() => self.participantManagerReady = true);
      self.pendencyListReady = false;

      _getOpenedUserActivityPendenciesToReceiver();
    }

    function _getOpenedUserActivityPendenciesToReceiver(){
      UserActivityPendencyService.getOpenedUserActivityPendenciesToReceiver()
        .then(values => {
          self.userActivityPendencies.opened = [];
          for(let item of values){
            self.userActivityPendencies.opened.push(_extractPendencyFromJsonItem(item));
          }
          _sortPendenciesByDueDate(self.userActivityPendencies.opened);
          self.userActivityPendencies.curr = self.userActivityPendencies.opened;
          self.userActivityPendencies.currIsEmpty = (self.userActivityPendencies.curr.length > 0);
        })
        .catch(() => {
          self.userActivityPendencies.opened = self.userActivityPendencies.curr = [];
          self.userActivityPendencies.currIsEmpty = false;
        });
    }

    function _getFinalizedUserActivityPendenciesToReceiver(){
      UserActivityPendencyService.getDoneUserActivityPendenciesToReceiver()
        .then(values => {
          self.userActivityPendencies.done = [];
          for(let item of values){
            self.userActivityPendencies.done.push(_extractPendencyFromJsonItem(item));
          }
          _sortPendenciesByDueDate(self.userActivityPendencies.done);
          self.userActivityPendencies.curr = self.userActivityPendencies.done;
          self.userActivityPendencies.currIsEmpty = (self.userActivityPendencies.curr.length > 0);
        })
        .catch(() => {
          self.userActivityPendencies.done = self.userActivityPendencies.curr = [];
          self.userActivityPendencies.currIsEmpty = false;
        });
    }

    function _changePendenciesListToShow(){
      if(self.showOpenedPendencies){
        if(!self.userActivityPendencies.done){
          self.showOpenedPendencies = !self.showOpenedPendencies;
          _getFinalizedUserActivityPendenciesToReceiver();
          return;
        }
        self.userActivityPendencies.curr = self.userActivityPendencies.done;
      }
      else{
        self.userActivityPendencies.curr = self.userActivityPendencies.opened;
      }
      self.userActivityPendencies.currIsEmpty = (self.userActivityPendencies.curr.length > 0);
      self.showOpenedPendencies = !self.showOpenedPendencies;
    }

    function _extractPendencyFromJsonItem(pendencyJson){
      const NUM_DAYS_MINIMUM_TO_WARNING = 7;
      const backgroundColor = {
        LATE: "red", // "#ffa886",
        ALMOST_LATE: "orange", // "#f8f8ab",
        OK: "green"
      };

      let pendency = UserActivityPendencyFactory.fromJsonObject(pendencyJson);
      const creationDate = _extractDateZeroTime(new Date(pendency.creationDate));
      const dueDate = _extractDateZeroTime(new Date(pendency.dueDate));
      const today = _extractDateZeroTime(new Date());

      const deadLine = _extractDuration(today, dueDate);
      const existenceTime = _extractDuration(creationDate, today);
      pendency.activityInfo['lastStatus'] = _createStatus(pendency.activityInfo.lastStatusName);

      let priority = {
        color: backgroundColor.OK,
        level: 'Baixa'
      };
      if(deadLine.days < 0){
        priority = {
          color: backgroundColor.LATE,
          level: 'Alta'
        };
      }
      else if(deadLine.days < NUM_DAYS_MINIMUM_TO_WARNING){
        priority = {
          color: backgroundColor.ALMOST_LATE,
          level: 'Média'
        };
      }

      return {
        activityId: pendency.activityId,
        activityInfo: pendency.activityInfo,
        creationDate: _formatDate(creationDate),
        existenceTime: existenceTime.str,
        dueDate: _formatDate(dueDate),
        deadLine: deadLine,
        priority: priority
      };
    }

    function _extractDateZeroTime(date){
      date.setHours(0,0,0,0);
      return date;
    }

    function _extractDuration(beginDate, endDate){
      const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
      const days = (endDate - beginDate) / MILLISECONDS_PER_DAY;
      const months = Math.floor(days / 30);
      const remainingDays = Math.abs(days % 30);
      return {
        days: days,
        str: (months===0 ? '' : `${months} m `) + (remainingDays===0 ? '' : `${remainingDays} d`)
      }
    }

    function _formatDate(date) {
      return date.getDate() + "/"+ (date.getMonth()+1) + "/" + date.getFullYear();
    }

    function _sortPendenciesByDueDate(pendenciesList){
      pendenciesList.sort(function(a, b){
        if(a.deadLine.days < b.deadLine.days) return -1;
        if(a.deadLine.days > b.deadLine.days) return 1;
        return 0;
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


    function displayGridLarge() {
      if (window.innerWidth < 1400) {
        return '1:0.75';
      }
      return '1:0.5';
    }

    function displayGridSmall() {
      if (window.innerWidth < 680) {
        return '1:1.3';
      }
      return '1:1';
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