(function () {
  'use strict';

  angular
    .module('otusjs.participant.business')
    .service('otusjs.participant.business.ParticipantMonitoringService', Service);

  Service.$inject = [];

  function Service() {
    var self = this;

    /* Public methods */
    self.getCurrentStatusOfParticipantInStudy = getCurrentStatusOfParticipantInStudy;

    function getCurrentStatusOfParticipantInStudy() {
      /**
        TODO: Estrutura deve ser retornada do banco
      **/
      return [{
        'id': 'SIGLA1',
        'full_name': 'Exam_NAME',
        'status': 'FINALIZED', // TODO: É póssivel ser o mesmo estatus da atividade
        'type': 'Exam',
        'date': '2017-10-06', // TODO: Qual padrão estamos utilizando?
        'color': '#4286f4', // TODO: Acabou sendo desnecessário, cor é ajustada na hora de montar a tela!
        'comment': ''
      },
      {
        'id': 'SIGLA2',
        'full_name': 'ACTIVITY_NAME',
        'status': 'UNNECESSARY',
        'type': 'Activity',
        'date': '2017-10-21',
        'color': '#cecece',
        'comment': ''
      },
      {
        'id': 'SIGLA3',
        'full_name': 'ACTIVITY_NAME',
        'status': 'SAVED',
        'type': 'Activity',
        'date': '2018-04-01',
        'color': '#f4ca41',
        'comment': ''
      },
      {
        'id': 'SIGLA4',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2017-08-10',
        'color': '#1ece8b',
        'comment': ''
      },
      {
        'id': 'SIGLA5',
        'full_name': 'ACTIVITY_NAME',
        'status': 'SAVED',
        'type': 'Activity',
        'date': '2017-08-07',
        'color': '#4286f4',
        'comment': ''
      },
      {
        'id': 'SIGLA6',
        'full_name': 'ACTIVITY_NAME',
        'status': 'UNNECESSARY',
        'type': 'Activity',
        'date': '2017-08-22',
        'color': '#1ece8b',
        'comment': ''
      },
      {
        'id': 'SIGLA7',
        'full_name': 'ACTIVITY_NAME',
        'status': 'SAVED',
        'type': 'Activity',
        'date': '2000-08-07',
        'color': '#4286f4',
        'comment': ''
      },
      {
        'id': 'SIGLA8',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2006-08-22',
        'color': '#1ece8b',
        'comment': ''
      },
      {
        'id': 'SIGLA9',
        'full_name': 'ACTIVITY_NAME',
        'status': 'SAVED',
        'type': 'Activity',
        'date': '2017-08-08',
        'color': '#4286f4',
        'comment': ''
      },
      {
        'id': 'SIGLA10',
        'full_name': 'ACTIVITY_NAME',
        'status': 'UNNECESSARY',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#cecece',
        'comment': ''
      },
      {
        'id': 'SIGLA11',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#1ece8b',
        'comment': ''
      }, {
        'id': 'SIGLA12',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#1ece8b',
        'comment': ''
      },
      {
        'id': 'SIGLA13',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#1ece8b',
        'comment': ''
      },
      {
        'id': 'SIGLA14',
        'full_name': 'ACTIVITY_NAME',
        'status': 'UNNECESSARY',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#cecece',
        'comment': ''
      },
      {
        'id': 'SIGLA15',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#1ece8b',
        'comment': ''
      },
      {
        'id': 'SIGLA16',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#1ece8b',
        'comment': ''
      },
      {
        'id': 'SIGLA17',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#1ece8b',
        'comment': ''
      },
      {
        'id': 'SIGLA18',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#1ece8b',
        'comment': ''
      },
      {
        'id': 'SIGLA19',
        'full_name': 'ACTIVITY_NAME',
        'status': 'CREATED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#f4415c',
        'comment': ''
      },
      {
        'id': 'SIGLA20',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#4286f4',
        'comment': ''
      },
      {
        'id': 'SIGLA21',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#4286f4',
        'comment': ''
      },
      {
        'id': 'SIGLA22',
        'full_name': 'ACTIVITY_NAME',
        'status': 'CREATED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#f4415c',
        'comment': ''
      },
      {
        'id': 'SIGLA23',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#4286f4',
        'comment': ''
      },
      {
        'id': 'SIGLA24',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#4286f4',
        'comment': ''
      },
      {
        'id': 'SIGLA25',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#4286f4',
        'comment': ''
      },
      {
        'id': 'SIGLA26',
        'full_name': 'ACTIVITY_NAME',
        'status': 'CREATED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#f4415c',
        'comment': ''
      },
      {
        'id': 'SIGLA27',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#4286f4',
        'comment': ''
      },
      {
        'id': 'SIGLA28',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#4286f4',
        'comment': ''
      },
      {
        'id': 'SIGLA29',
        'full_name': 'ACTIVITY_NAME',
        'status': 'CREATED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#f4415c',
        'comment': ''
      },
      {
        'id': 'SIGLA30',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#4286f4',
        'comment': ''
      },
      {
        'id': 'SIGLA31',
        'full_name': 'ACTIVITY_NAME',
        'status': 'CREATED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#f4415c',
        'comment': ''
      },
      {
        'id': 'SIGLA32',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#4286f4',
        'comment': ''
      },
      {
        'id': 'SIGLA33',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#1ece8b',
        'comment': ''
      },
      {
        'id': 'SIGLA34',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#1ece8b',
        'comment': ''
      },
      {
        'id': 'SIGLA35',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#1ece8b',
        'comment': ''
      },
      {
        'id': 'SIGLA36',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#1ece8b',
        'comment': ''
      },
      {
        'id': 'SIGLA37',
        'full_name': 'ACTIVITY_NAME',
        'status': 'CREATED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#f4415c',
        'comment': ''
      },
      {
        'id': 'SIGLA38',
        'full_name': 'ACTIVITY_NAME',
        'status': 'CREATED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#f4415c',
        'comment': ''
      },
      {
        'id': 'SIGLA39',
        'full_name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '2014-12-22',
        'color': '#1ece8b',
        'comment': ''
      }];
    }

  }

}());
