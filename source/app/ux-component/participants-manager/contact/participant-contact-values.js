(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .value('ParticipantContactValues', {
      fields: {
        main: 'Principal',
        second: 'Segundo',
        third: 'Terceiro',
        fourth: 'Quarto',
        fifth: 'Quinto',
        comments: 'Observações',
        address: ' (Rua, Av, Rod...)',
        streetNumber: 'Número',
        postalCode: 'CEP',
        neighbourhood: 'Bairro',
        city: 'Cidade',
        state: 'UF',
        country: 'País',
        complements: 'Complemento',
        observation: 'Observação'
      },
      keys: {
        email: {translatedTitle: 'Emails'},
        address:{translatedTitle: 'Endereços'},
        phoneNumber:{translatedTitle: 'Telefones'}
      },
      icons:{
        addContact:{
          icon:'add_circle_outline',
          translatedTitle: 'Adicionar Contato'
        },
        edit:{
          icon:'create',
          translatedTitle: 'Editar'
        },
        save:{
          icon:'save',
          translatedTitle: 'Salvar Edição'
        },
        clear: {
          icon: 'clear',
          translatedTitle: 'Excluir'
        },
        return: {
          icon:'undo',
          translatedTitle: 'Desfazer'
        },
        findPostalCode:{
          icon:'search',
          translatedTitle: 'Buscar Cep'
        },
        saveNewContact:{
          icon:'note_add',
          translatedTitle: 'Gravar novo contato'
        },
        deleteContact: {
          icon:'delete',
          translatedTitle: 'Excluir Contatos'
        }
      },
      msg:{
        postalCodeNotFound: 'CEP não encontrado',
        contactFound: 'Favor, preencha todos os campos!',
        contactNotFound: 'Contatos não cadastrados',
        contactFail: 'Não foi possível executar!',
        contactDelete: 'Excluido com sucesso.',
        country: 'Brasil',
        updateSuccess: 'Atualizado com sucesso.',
        createSuccess: 'Novo contato criado',
        ok: 'Ok',
        comeBack: 'Voltar',
        yes: 'Sim',
        not: 'Não',
        delete: 'Excluir',
        massegeTextDelete: 'Confirmar exclusão de contatos',
        massegeDialogDelete: 'Deseja excluir os contatos?'
      }

    });
}());