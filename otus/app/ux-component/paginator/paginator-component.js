(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPaginator', {
      templateUrl: 'app/ux-component/paginator/paginator-template.html',
      bindings: {
        elements: '<',
        pageSize: '<',
        onUpdate: '='
      },
      controller: Controller
    });

  Controller.$inject = [
    '$scope'
  ];

  function Controller($scope) {
    var self = this;

    self.$onInit = onInit;

    self.goToForward = goToForward;
    self.goToPrevious = goToPrevious;

    $scope.limit = 5;
    $scope.begin = 0;
    $scope.disabledForward = false;
    $scope.disabledPrevious = true;

    var _currentPage = 0;
    $scope.rowPerPage = [10, 25, 50, 100, 200, 250, 500];

    function onInit(){
      $scope.pageSize = self.pageSize ? _closestPageSize(self.pageSize, $scope.rowPerPage) : 25;
      $scope.totalRows = self.elements.length ? self.elements.length : 0;
      _generatePages();

    }

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
        $scope.disabledForward = _currentPage == $scope.rangePages.length - 1 ? true : false;
        $scope.disabledPrevious = false;
        self.teste = $scope.pages[_currentPage];
        self.onUpdate(self.teste);
      }
    }

    function goToPrevious() {
      if(_currentPage>0){
        _currentPage--;
        $scope.range = $scope.rangePages[_currentPage];
        $scope.disabledForward = false;
        $scope.disabledPrevious = _currentPage == 0 ? true : false;
        self.onUpdate($scope.pages[_currentPage]);
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

      self.onUpdate($scope.pages[_currentPage]);

    }


  }
}());
