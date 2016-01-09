angular.module('starter.services', [])

.factory('Todos', function($localStorage, $rootScope) {
  var Todos = $localStorage.todos;

  return{
    all: function(){
      return Todos;
    },
    one: function(id){
      var alltodos = Todos;
      var todo = _.first(_.filter(alltodos, {'id': id}));
      return todo;
    },
    saveList: function(list){
      list.id = $rootScope.randomId();
      Todos.push(list);
    },
    removeList: function(list) {
      Todos.splice(Todos.indexOf(list), 1);
    },
    saveTodo: function(id){
      var alltodos = Todos;
      var todo = _.first(_.filter(alltodos, {'id': id}));
      todo.todos = [];
      todo.todos.push(todo);
    }
  }

});
