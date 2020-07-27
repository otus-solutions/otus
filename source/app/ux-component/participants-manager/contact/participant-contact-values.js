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
        observation: 'Observação',
        login: 'Email'
      },
      keys: {
        email: {translatedTitle: 'Emails'},
        address: {translatedTitle: 'Endereços'},
        phoneNumber: {translatedTitle: 'Telefones'},
        login: {translatedTitle: 'Login de Acesso'}
      },
      icons: {
        addContact: {
          icon: 'add_circle_outline',
          translatedTitle: 'Adicionar Contato'
        },

        createNewContacts: {
          icon: 'add_circle',
          translatedTitle: 'Adicionar formas de contatos'
        },

        edit: {
          icon: 'create',
          translatedTitle: 'Editar'
        },
        save: {
          icon: 'save',
          translatedTitle: 'Salvar Edição'
        },
        clear: {
          icon: 'clear',
          translatedTitle: 'Excluir'
        },
        return: {
          icon: 'undo',
          translatedTitle: 'Desfazer'
        },
        findPostalCode: {
          icon: 'search',
          translatedTitle: 'Buscar Cep'

        },
        saveNewContact: {
          icon: 'note_add',
          translatedTitle: 'Gravar novo contato'
        },
        deleteContact: {
          icon: 'delete',
          translatedTitle: 'Excluir Todos Contatos'
        },

        delete: {
          icon: 'delete',
          translatedTitle: 'Deletar'
        },
        swapMainContact: {
          icon: 'swap_vert',
          translatedTitle: 'Trocar contato padrão'
        },
        swapChoiceContact: {
          icon: 'looks_one',
          translatedTitle: 'Defina contato padrão'
        }
      },
      msg: {
        postalCodeNotFound: 'CEP não encontrado',
        postalCodeInstruction: '1º Informe o cep',
        contactFound: 'Favor, preencha todos os campos obrigatórios *',
        contactNotFound: 'Contatos não cadastrados',
        contactFail: 'Erro: Não foi completar a solicitação!',
        contactDelete: 'Excluído com sucesso.',
        errorContactDelete: 'Erro Interno: Solicitação recusada.',
        country: 'Brasil',
        updateSuccess: 'Atualizado com sucesso.',
        createSuccess: 'Novo contato criado',
        ok: 'Ok',
        comeBack: 'Voltar',
        yes: 'Sim',
        not: 'Não',
        delete: 'Excluir',
        messageTextDelete: 'Confirmar exclusão de contato(s)',
        messageDialogDelete: 'Deseja excluir o(s) contato(s)?',
        swapMainContactSucess: 'Alterado para padrão com sucesso',
        swapMainContactFail: 'Erro: Alteração não foi completada',
        captionAboutRequiredFields: '* campos obrigatórios'
      },
      dialogScene: {
        update: {
          dialogToTitle: 'Atualização de Dados',
          titleToText: 'Alteração do Email de Acesso',
          textDialog: '<p>Caso confirmada a alteração, o participante somente poderá acessar seu portal através do novo email.</p>'+
            '<p>Você deseja salvar a alteração?</p>',
          ariaLabel: 'Confirmação de alteração em email de acesso',
          button: { confirm: 'Salvar', cancel: 'Cancelar' }
        },
        delete: {
          dialogToTitle: 'Atualização de Dados',
          titleToText: 'Remoção de Email de Acesso',
          textDialog: '<p>Caso confirmada a alteração, o participante não poderá mais acessar seu portal.</p>' +
            '<p>Você deseja <strong>remover o email de acesso</strong>?</p>',
          ariaLabel: 'Confirmação de remoção de email de acesso',
          button: { confirm: 'Remover', cancel: 'Cancelar' }
        }
      }
    });
}());

