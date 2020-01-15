(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardPendency', {
      templateUrl: 'app/ux-component/dashboard-pendency/dashboard-pendency-template.html',
      controller: Controller,
    }).controller('otusDashboardPendencyCtrl', Controller);

  Controller.$inject = [
    'otusjs.report.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.model.pendency.UserActivityPendencyFactory',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.activity.business.ActivityPlayerService',
    'otusjs.pendency.business.UserActivityPendencyService'
  ];
//TODO tem criar três botões, direto para tela de lista de atividades, visualização da atividade, preencher atividade
  function Controller(EventService, DashboardService, UserActivityPendencyFactory, ParticipantManagerService, ParticipantActivityService,
                      ApplicationStateService, ActivityPlayerService, UserActivityPendencyService) {
    var self = this;

    var artefacts = {};

    self.$onInit = onInit();
    self.loadActivity = loadActivity;
    self.loadActivityPlayer = loadActivityPlayer;
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
        //"id": "5b8569b7086a5e5ee91527dc",
        "acronym": "DSOC",
        "recruitmentNumber": 2000735,
        "id": "5bb22262e103cf07800f470c"
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

          for(let pendency of values){
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
        }
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

    function loadActivity() {
      selectParticipant(Mock.userActivityPendency.getActivityRecruitmentNumber());
      ApplicationStateService.activateParticipantActivities()
    }

    function loadActivityPlayer() {
      selectParticipant(Mock.userActivityPendency.getActivityRecruitmentNumber());
      //todo inicializar player
      _loadActivities();
      ActivityPlayerService.load().then(function () {
        ApplicationStateService.activateActivityPlayer()
      })
    }

    function _loadActivities() {
      let activityInfo = Mock.userActivityPendency.activityInfo;
      activityInfo.participantData = {
        recruitmentNumber: Mock.userActivityPendency.getActivityRecruitmentNumber()
      }

      //todo buscar pelo backend uma atividade
      console.log(activityInfo)
      var x = ParticipantActivityService.getActivity(Mock.userActivityPendency.getActivityID(), Mock.userActivityPendency.getActivityRecruitmentNumber())
        .then(onlineActivity => ParticipantActivityService.selectActivities(onlineActivity));
      console.log(x)

      /*ParticipantActivityService
        .listAll()
        .then(function(activities) {
          self.activities = activities
          console.log(self.activities)
          // .map(ActivityItemFactory.create);
          self.AllActivities = angular.copy(self.activities);
          console.log(self.AllActivities)
          // self.isListEmpty = !self.activities.length;
          var _selectedActivities = [];

          var teste = self.AllActivities.find(element => console.log(element.getID()))
          ParticipantActivityService.selectActivities(_selectedActivities);
          self.ready = true;
        });*/
    }

    //TODO transferir para um service
    function loadParticipant() {
      selectParticipant(Mock.userActivityPendency.getActivityRecruitmentNumber());
      ApplicationStateService.activateParticipantDashboard();

      // .then(() => ParticipantManagerService.listIdexers())
      // .then(values => {artefacts.participants.push(values)});
      // EventService.onParticipantSelected(Mock.userActivityPendency.activityInfo);
      //  console.log(artefacts.participants)
      // DashboardService
      //     .getSelectedParticipant()
      //     .then(function (participantData) {
      //       self.selectedParticipant = participantData;
      //       self.isEmpty = false;
      //     });
      // ApplicationStateService.activateParticipantActivities();

      // var test = artefacts.participants.filter(Mock.userActivityPendency.getActivityRecruitmentNumber());
      // console.log( test )
      // selectParticipant(test)
    }

    function participantFilter(){
      loadParticipant()
      // ApplicationStateService.activateParticipantActivities();
      //  var view = test.participants.filter(Mock.userActivityPendency.getActivityRecruitmentNumber())
      // console.log(view)
    }

    /* Public methods */

    /*Build artifacts from MockDocument*/
    Mock.userActivityPendencyFactory = UserActivityPendencyFactory;
    Mock.UserActivityPendencyDocument = JSON.stringify(test);
    Mock.userActivityPendency = Mock.userActivityPendencyFactory.fromJsonObject(Mock.UserActivityPendencyDocument);
    console.log(Mock.userActivityPendency)
    Mock._id = Mock.userActivityPendency.getID();

    // participantFilter()
    //console.log(ParticipantManagerService.listIdexers)
    // );
    // Mock.userActivityPendency.getActivityRecruitmentNumber()
    // ParticipantManagerService.filter(Mock.userActivityPendency.getActivityRecruitmentNumber()).then(
    //   function(value){
    //     console.log(value)
    //   }
    // );


    // searchParticipant();
    // ParticipantManagerService.setup().then(searchParticipant());
    // console.log(ParticipantManagerService.listIdexers())

  }

})();