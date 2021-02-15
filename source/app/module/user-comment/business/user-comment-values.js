(function () {
  'use strict';

  angular.module('otusjs.user.comment.business')
    .value('otusjs.user.comment.business.UserCommentValues', {
      toast : {
        successUserCommentCreation: "Commentário criada com sucesso",
        failUserCommentCreation: "Ocorreu um erro ao adicionar o comentário",
        successMessage: "Solicitação realizada com sucesso!",
        failureMessage: "Ocorreu algum problema, tente novamente mais tarde.",
        deleteSuccessMessage: "Remoção realizada com sucesso!",
        updateSuccessMessage: "Atualização realizada com sucesso!",
        conflictMessage: "Conflito: Informação em uso!"
      }
    });

}())
