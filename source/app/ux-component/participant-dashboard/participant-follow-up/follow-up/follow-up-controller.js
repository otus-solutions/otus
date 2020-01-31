(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusFollowUpCtrl', Controller);

  Controller.$inject = [
    '$mdDialog',
    'otusjs.participant.business.ParticipantFollowUpService',
    'otusjs.application.dialog.DialogShowService'
  ];

}());
function Controller($mdDialog, ParticipantFollowUpService, DialogShowService) {
  var self = this;
  self.isCanceled = false;

  self.$onInit = onInit;
  self.deactivateFollowUp = deactivateFollowUp;

  function onInit() {
    _verifyStatus();
  }

  function _verifyStatus() {
    self.isCanceled = self.followUpData.participantEvents.length > 0 &&  self.followUpData.participantEvents[0].status === "CANCELED";
  }

  function deactivateFollowUp() {
    _showDialog("O segmento ("+self.followUpData.description+") sera desativado permanentemente!").then(()=>{
      ParticipantFollowUpService.deactivateFollowUpEvent(self.followUpData.participantEvents[0]._id).then((result)=>{
        self.isCanceled = true;
        self.followUpData.status = "CANCELED";
      })
    }).catch(()=>{

    });
  }

  function _showDialog(msg) {
    var _exitDialog = {
      dialogToTitle:'Cancelamento de Segmento',
      titleToText:'Cancelar Segmento?',
      textDialog: msg,
      ariaLabel:'Confirmação de cancelamento',
      buttons: [
        {
          message:'Ok',
          action:function(){$mdDialog.hide()},
          class:'md-raised md-primary'
        },
        {
          message:'Cancelar',
          action:function(){$mdDialog.cancel()},
          class:'md-raised md-no-focus'
        }
      ]
    };

    return DialogShowService.showDialog( _exitDialog);
  }
}
