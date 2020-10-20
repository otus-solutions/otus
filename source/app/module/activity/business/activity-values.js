(function () {
  'use strict';

  angular.module('otusjs.activity.business')
    .value('otusjs.activity.business.ActivityValues', {
      toast : {
        sucessActivityCreation: "atividade criada com sucesso",
        failActivityCreation: "Ocorreu um erro ao adicionar a(s) atividade(s)",
        successMessage: "Solicitação realizada com sucesso!",
        failureMessage: "Ocorreu algum problema, tente novamente mais tarde.",
        deleteSuccessMessage: "Remoção realizada com sucesso!",
        updateSuccessMessage: "Atualização realizada com sucesso!",
        conflictMessage: "Conflito: Informação em uso!"
      }
    });

}())