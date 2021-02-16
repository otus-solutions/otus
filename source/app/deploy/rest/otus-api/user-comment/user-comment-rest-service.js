(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.UserCommentRestService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'
  ];

  function Service($q, OtusRestResourceService) {
    let self = this;
    let _rest = null;

    self.initialize = initialize;
    self.getAllUsersComments = getAllUsersComments;
    self.showStarSelectedUserComment = showStarSelectedUserComment;
    self.deleteSelectedComment = deleteSelectedComment;
    self.saveUserComment = saveUserComment;
    self.updateUserComment = updateUserComment;

    function initialize() {
      _rest = OtusRestResourceService.getNoteAboutParticipantResourceFactory();
    }

    function getAllUsersComments(searchSettings) {
      _checkRest();
      var data = [
        {
          "_id": "602699fcefc5ca1cb146be4a",
          "recruitmentNumber": 1234567,
          userName: 'Fulano',
          "creationDate": "2021-02-12T15:08:44.854Z",
          "lastUpdate": "2021-02-12T15:08:44.854Z",
          "editeded": false,
          "starred": false,
          "comment": "primeiro commentário",
          "userId": "5d1bbabe995e20d290d94e49"
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          userName: 'Fulano',
          creationDate: '2020-12-18T16:59:41.188',
          edited: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd',
          isCreate: true,
          starred: true
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          userName: 'Fulano',
          creationDate: '2020-12-18T16:59:41.188',
          edited: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd'
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          userName: 'Fulano',
          creationDate: '2020-12-18T16:59:41.188',
          edited: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd'
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          userName: 'Fulano',
          creationDate: '2020-12-18T16:59:41.188',
          edited: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdf',
          isCreate: true
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          userName: 'Fulano',
          creationDate: '2020-12-18T16:59:41.188',
          edited: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd'
        }
      ];
      var test = {}
      test.data = data

      let request = $q.defer();
      return _rest.getAll({ rn: searchSettings.recruitmentNumber }, searchSettings).$promise
      // searchSettings
      // request.resolve(test);


      // return request.promise;

    }

    function showStarSelectedUserComment(commentId, starred) {
      let request = $q.defer();
      var data = true;
      var test = {}
      test.data = data
      return _rest.updateStarred({id:commentId, starred: starred}).$promise

      // request.resolve(test);


      // return request.promise;
    }

    function deleteSelectedComment(commentId) {
      return _rest.delete({ id: commentId }).$promise;
    }

    function saveUserComment(comment) {
      return _rest.create(comment).$promise;
    }

    function updateUserComment(comment) {
      return _rest.update(comment).$promise;
    }

    function _checkRest() {
      if (!_rest) {
        throw new Error('UserCommentRestService resource is not initialized.');
      }
    }
  }
})();
