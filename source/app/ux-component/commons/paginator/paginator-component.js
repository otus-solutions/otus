(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPaginator', {
      templateUrl: 'app/ux-component/commons/paginator/paginator-template.html',
      bindings: {
        elements: '=',
        pageSize: '=',
        onUpdate: '='
      },
      controller: "otusPaginatorCtrl as $ctrl"
    })
    .controller('otusPaginatorCtrl', Controller);

  Controller.$inject = [
    '$scope'
  ];

  function Controller($scope) {
    var self = this;

    self.$onInit = onInit;

    self.goToForward = goToForward;
    self.goToPrevious = goToPrevious;

    $scope.disabledForward = false;
    $scope.disabledPrevious = true;

    var _currentPage = 0;
    $scope.rowPerPage = [10, 25, 50, 100, 200, 250, 500];

    function onInit(){
      $scope.pageSize = self.pageSize ? _closestPageSize(self.pageSize, $scope.rowPerPage) : 50;
      if(Array.isArray(self.elements)){
        $scope.totalRows = self.elements.length ? self.elements.length : 0;
        if (self.elements.length > 0) _generatePages();
      } else {
        $scope.totalRows = 0;
      }
    }

    $scope.$watch('$ctrl.elements',function () {
      self.$onInit();
    });

    function _closestPageSize(goal, sizes) {
      var closest = sizes.reduce(function(prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
      });
      return closest;
    }

    self.onChangeSize = function(){
      _generatePages();
    }

    function goToForward() {
      if(_currentPage<$scope.rangePages.length - 1){
        _currentPage++;
        $scope.range = $scope.rangePages[_currentPage];
        $scope.disabledForward = (currentPage == $scope.rangePages.length - 1);
        $scope.disabledPrevious = false;
        self.onUpdate($scope.pages[_currentPage], _getStartPage() , _getFinalPage());
      }
    }

    function goToPrevious() {
      if(_currentPage>0){
        _currentPage--;
        $scope.range = $scope.rangePages[_currentPage];
        $scope.disabledForward = false;
        $scope.disabledPrevious = (_currentPage == 0);
        self.onUpdate($scope.pages[_currentPage], _getStartPage() , _getFinalPage());
      }
    }

    function _generatePages(){
      $scope.rangePages = [];
      $scope.pages = [];
      var index = 0;
      var begin = 0;
      _currentPage = 0;
      var limit = parseInt($scope.pageSize);
      for(var total = self.elements.length; total > 0; total = total - $scope.pageSize){
        if(index === 0){
          $scope.range = "".concat(begin+1,' - ', parseInt($scope.pageSize) >= $scope.totalRows ? $scope.totalRows: $scope.pageSize);
        }
        $scope.pages[index] = self.elements.slice(begin, limit);
        limit = limit > parseInt($scope.totalRows) ? parseInt($scope.totalRows) : limit;
        if(parseInt($scope.pageSize) >= $scope.totalRows){
          $scope.disabledForward = true;
        } else {
          $scope.disabledForward = false;
        }

        if(limit <= parseInt($scope.totalRows)){
          if(begin < parseInt($scope.totalRows)){
            $scope.rangePages[index] = "".concat(parseInt(begin)+1,' - ', parseInt(limit));
          }
        }
        begin = limit;
        limit = parseInt(limit) + parseInt($scope.pageSize);
        index++;
      }
      self.onUpdate($scope.pages[_currentPage], _getStartPage() , _getFinalPage());
    }


    function _getStartPage() {
      let pages = $scope.range.split(" - ");
      var startPage = Number(pages[0]);
      return startPage - 1;
    }
    function _getFinalPage() {
      let pages = $scope.range.split(" - ");
      var endPage = Number(pages[1]);
      return endPage - 1;
    }

  }
}());
