(function() {
  'use strict';

  angular
    .module('otusjs.activity.repository')
    .service('otusjs.activity.repository.ActivityCollectionService', Service);

  Service.$inject = [
    'otusjs.activity.core.ModuleService'
  ];

  function Service(ModuleService) {
    var self = this;
    var _participant = null;

    /* Public methods */
    self.insert = insert;
    self.listAll = listAll;
    self.remove = remove;
    self.update = update;
    self.save = save;
    self.useParticipant = useParticipant;
    self.resetParticipantInUse = resetParticipantInUse;

    function insert(activities) {
      if (activities.length > 0) {
        _executeWork(function(dataSource) {
          console.log(activities);
          dataSource.getData().insert(activities);
        });
      }
    }

    function listAll() {
      return _executeWork(function(dataSource) {
        if (_participant) {
          return dataSource.getData().where(_whereRecruitmentNumberEqual);
        } else {
          return dataSource.getData().find();
        }
      });
    }

    function remove(activities) {
      _executeWork(function(dataSource) {
        activities.forEach(function(activity) {
          dataSource.getData().remove(activity);
        });
      });
    }

    function update(activity) {
      _executeWork(function(dataSource) {
        dataSource.getData().update(activity);
      });
    }

    function save() {
      _executeWork(function(dataSource) {
        dataSource.save();
      });
    }

    function useParticipant(participant) {
      _participant = participant;
    }

    function resetParticipantInUse() {
      _participant = null;
    }

    function _executeWork(work) {
      return ModuleService.whenActivityDataSourceServiceReady().then(work);
    }

    function _whereRecruitmentNumberEqual(activity) {
      return activity.participantData.recruitmentNumber === _participant.recruitmentNumber;
    }
  }
}());
