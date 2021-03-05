(function () {
  'use strict';

  angular.module('otusjs.user.comment.business')
    .value('otusjs.user.comment.business.UserCommentAboutParticipantValues', {
      toast: {
        successUserCommentAboutParticipantCreation: "Commentário criada com sucesso",
        failUserCommentAboutParticipantCreation: "Ocorreu um erro ao adicionar o comentário",
        successMessage: "Solicitação realizada com sucesso!",
        failureMessage: "Ocorreu algum problema, tente novamente mais tarde.",
        deleteSuccessMessage: "Remoção realizada com sucesso!",
        updateSuccessMessage: "Atualização realizada com sucesso!",
        conflictMessage: "Conflito: Informação em uso!"
      }
    });

}())
