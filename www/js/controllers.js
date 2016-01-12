angular.module('starter.controllers', [])

.controller('TodosCtrl', function($scope, $rootScope, Todos, $localStorage, $ionicModal, $ionicPopup, $location) {
  $scope.$storage = $localStorage;
  $scope.todos = Todos.all();
  $scope.list = {};
  $ionicModal.fromTemplateUrl('templates/add-list.html', {scope: $scope}).then(function(modal) { $scope.modal = modal; });
  $scope.openModal = function(){$scope.modal.show();};
  $scope.closeModal = function(){$scope.modal.hide();};
  $scope.$on('$destroy', function(){$scope.modal.remove();});
  $scope.colores = ['rosa','azul', 'verde','naranja','marron', 'violeta'];
  $scope.add = function(list){
    if(!list.name){
      $ionicPopup.alert({
       title: 'Ups!',
       template: 'Debes ingresar un nombre para la lista'
     });
    }else{
      $scope.list.todos = new Array();
      Todos.saveList(list);
      $scope.clearList();
      $location.path('/tab/todos/'+list.id);
    }
  }
  $scope.isDone = false;
  $scope.del = function(list){
    var confirmPopup = $ionicPopup.confirm({
      title: '¿Estás seguro?',
       template: 'Si aceptas se eliminará la lista con todas las tareas',
       buttons: [
        {text: 'Cancelar', type: 'button-default'},
        {text: 'Eliminar', type: 'button-assertive', onTap: function(e){return true;}}
      ]
     });

     confirmPopup.then(function(res) {
       if(res) {
         Todos.removeList(list);
       } else {
         console.log('Cancelado');
       }
     });
  };
  $scope.clearList = function(){
    $scope.list = {};
    $scope.closeModal();
  };
})

.controller('TodoListCtrl', function($scope, $rootScope, $stateParams, $ionicModal, Todos, $localStorage) {
  $scope.todolist = Todos.one($stateParams.todosId);
  $scope.listid = $scope.todolist.id;
  $scope.todo = {};
  $scope.todo.done = false;
  $ionicModal.fromTemplateUrl('templates/add-todo.html', {scope: $scope}).then(function(modal) { $scope.modal = modal; });
  $scope.openModal = function(){$scope.modal.show();};
  $scope.closeModal = function(){$scope.modal.hide();};
  $scope.$on('$destroy', function(){$scope.modal.remove();});
  $scope.clearList = function(){
    $scope.todo = {};
    $scope.closeModal();
  }
  $scope.addTodo = function(id, todo){
    if(!todo.name){
    }else{
      Todos.saveTodo($scope.listid, todo);
      $scope.clearList();
    }
  }
})

.controller('NotesCtrl', function($scope, $rootScope, Notes, $localStorage, $ionicModal, $ionicPopup, $location) {
  $scope.$storage = $localStorage;
  $scope.notes = Notes.all();
  $scope.note = {};
  $ionicModal.fromTemplateUrl('templates/add-note.html', {scope: $scope}).then(function(modal) { $scope.modal = modal; });
  $scope.openModal = function(){$scope.modal.show();};
  $scope.closeModal = function(){$scope.modal.hide();};
  $scope.$on('$destroy', function(){$scope.modal.remove();});
  $scope.add = function(note){
    if(!note.title){
      $ionicPopup.alert({
       title: 'Ups!',
       template: 'La nota debe tener un titulo'
     });
    }else{
      Notes.addNote(note);
      $scope.clearList();
      $location.path('/tab/notes/'+note.id);
    }
  }
  $scope.clearList = function(){
    $scope.note = {};
    $scope.closeModal();
  };
})
.controller('NoteDetailCtrl', function($scope, $rootScope, $stateParams, $ionicModal, Notes, $localStorage, $location) {
  $scope.note = Notes.one($stateParams.noteId);
  $scope.save = function(note){
    Notes.updateNote(note);
    $location.path('/tab/notes/');
  }
})
.controller('OptionsCtrl', function($scope, $rootScope, Todos, $localStorage, $ionicModal, $ionicPopup, $location) {
  $scope.resetDB = function(){
    var confirmPopup = $ionicPopup.confirm({
      title: '¿Estás seguro?',
       template: 'Si aceptas se eliminarán todas las notas existentes',
       buttons: [
        {text: 'Cancelar', type: 'button-default'},
        {text: 'Eliminar', type: 'button-assertive', onTap: function(e){return true;}}
      ]
     });

     confirmPopup.then(function(res) {
       if(res) {
         $localStorage.$reset({
          notes: [],
          todos: []
         });
       } else {
         console.log('Cancelado');
       }
     });
  };
});