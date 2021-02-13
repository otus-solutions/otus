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
    self.getAllUserComments = getAllUserComments;
    self.showStarSelectedUserComment = showStarSelectedUserComment;
    self.deleteSelectedComment = deleteSelectedComment;
    self.saveUserComment = saveUserComment;
    self.updateUserComment = updateUserComment;

    function initialize() {
      _rest = OtusRestResourceService.getUserCommentResourceFactory();
    }

    function getAllUserComments() {
      _checkRest();
      var data = [
        {
          _id: '113234',
          recruitmentNumber: '132324',
          name: 'Fulano',
          date: '2020-12-18T16:59:41.188',
          edit: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd',
          email: 'fulano@gmail.com',
          isCreate: true,
          starred: true
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          name: 'Fulano',
          date: '2020-12-18T16:59:41.188',
          edit: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd',
          email: 'fulano@gmail.com'
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          name: 'Fulano',
          date: '2020-12-18T16:59:41.188',
          edit: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd',
          email: 'fulano@gmail.com'
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          name: 'Fulano',
          date: '2020-12-18T16:59:41.188',
          edit: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd',
          email: 'fulano@gmail.com'
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          name: 'Fulano',
          date: '2020-12-18T16:59:41.188',
          edit: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd',
          email: 'fulano@gmail.com'
        }
      ];
      var test = {}
      test.data = data

      let request = $q.defer();
      // return _rest.getAll().$promise

      request.resolve(test);


      return request.promise;

    }

    function showStarSelectedUserComment(commentId) {
      let request = $q.defer();
      var data = true;
      var test = {}
      test.data = data
      // return _rest.showStarSelectedUserComment(commentId).$promise

      request.resolve(test);


      return request.promise;
    }

    function deleteSelectedComment(commentId) {
      // return _rest.deleteSelectedComment(commentId);
    }

    function saveUserComment(comment) {
      // return _rest.saveUserComment(comment);
    }

    function updateUserComment(commentId, comment) {
      // return _rest.updateUserComment(commentId, comment)
    }

    function _checkRest() {
      if (!_rest) {
        throw new Error('UserCommentRestService resource is not initialized.');
      }
    }
  }
})();
