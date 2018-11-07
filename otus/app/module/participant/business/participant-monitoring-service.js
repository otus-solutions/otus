(function () {
  'use strict';

  angular
    .module('otusjs.participant.business')
    .service('otusjs.participant.business.ParticipantMonitoringService', Service);

  Service.$inject = [
    'otusjs.participant.repository.ParticipantMonitoringRepositoryService'
  ];

  function Service(ParticipantMonitoringRepositoryService) {
    var self = this;

    /* Public methods */
    self.getStatusOfActivities = getStatusOfActivities;
    self.updateObservation = updateObservation;

    function getStatusOfActivities(recruitmentNumber) {
      // return ParticipantMonitoringRepositoryService.getParticipantReportList(recruitmentNumber);

      /**
        TODO: Estrutura deve ser retornada do banco
      **/
      return [{
        "_id": "5ad0e01672019c02a80c63e2",
        'acronym': 'SIGLA1',
        'name': 'ACTIVITY_NAME',
        'status': 'UNNECESSARY',
        'type': 'Activity',
        'date': '21-10-2017', // TODO: Qual padrão estamos utilizando para data?
        'observations': 'Atividade está descartada, participante está com febre amarela.' // TODO: Sugestão, a observação com as atividades, assim como é no exame
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA2',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '21-10-2017',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA3',
        'name': 'ACTIVITY_NAME',
        'status': 'SAVED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA4',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '10-082017',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA5',
        'name': 'ACTIVITY_NAME',
        'status': 'SAVED',
        'type': 'Activity',
        'date': '07-08-2017',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA6',
        'name': 'ACTIVITY_NAME',
        'status': 'UNNECESSARY',
        'type': 'Activity',
        'date': '22-08-2017',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA7',
        'name': 'ACTIVITY_NAME',
        'status': 'SAVED',
        'type': 'Activity',
        'date': '07-08-2000',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA8',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '22-08-2006',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA9',
        'name': 'ACTIVITY_NAME',
        'status': 'SAVED',
        'type': 'Activity',
        'date': '08-082017',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA10',
        'name': 'ACTIVITY_NAME',
        'status': 'UNNECESSARY',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA11',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA12',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA13',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA14',
        'name': 'ACTIVITY_NAME',
        'status': 'UNNECESSARY',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA15',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA16',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA17',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA18',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA19',
        'name': 'ACTIVITY_NAME',
        'status': 'CREATED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA20',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA21',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA22',
        'name': 'ACTIVITY_NAME',
        'status': 'CREATED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA23',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA24',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA25',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA26',
        'name': 'ACTIVITY_NAME',
        'status': 'CREATED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA27',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA28',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA29',
        'name': 'ACTIVITY_NAME',
        'status': 'CREATED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA30',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA31',
        'name': 'ACTIVITY_NAME',
        'status': 'CREATED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA32',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA33',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA34',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA35',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA36',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA37',
        'name': 'ACTIVITY_NAME',
        'status': 'CREATED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA38',
        'name': 'ACTIVITY_NAME',
        'status': 'CREATED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      },
      {
        "_id": "5ad0e01672019c02a80c45e2",
        'acronym': 'SIGLA39',
        'name': 'ACTIVITY_NAME',
        'status': 'FINALIZED',
        'type': 'Activity',
        'date': '01-04-2018',
        'observations': ''
      }];
    }

    function updateObservation(data) {

    }

  }

}());
