angular.module('starter.controllers', [])

.controller('TodosCtrl', function($scope, $rootScope, Todos, $localStorage, $ionicModal) {
  $scope.$storage = $localStorage;
  $scope.todos = Todos.all();
  $scope.list = {};
  $ionicModal.fromTemplateUrl('templates/addList.html', {scope: $scope}).then(function(modal) { $scope.modal = modal; });
  $scope.openModal = function(){$scope.modal.show();};
  $scope.closeModal = function(){$scope.modal.hide();};
  $scope.$on('$destroy', function(){$scope.modal.remove();});

  $scope.add = function(list){
    if(!list.name){
      alert('Need a name');
    }else{
      Todos.save(list);
      $scope.clearList();
    }
  }
  $scope.clearList = function(){
    $scope.list = {};
    $scope.closeModal();
  }
})

.controller('TodoListCtrl', function($scope, $stateParams, Todos) {
  $scope.todoss = Todos.one($stateParams.todosId);
  console.log($scope.todoss);
  $ionicModal.fromTemplateUrl('templates/addTodo.html', {scope: $scope}).then(function(modal) { $scope.modal = modal; });
  $scope.openModal = function(){$scope.modal.show();};
  $scope.closeModal = function(){$scope.modal.hide();};
  $scope.$on('$destroy', function(){$scope.modal.remove();});
  $scope.addTodo = function(id){

  }
});