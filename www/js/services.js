angular.module('starter.services', [])

.factory('Todos', function($localStorage, $rootScope, $stateParams) {
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
    saveTodo: function(id, todo){
      var lists = Todos;
      var list = _.first(_.filter(lists, {'id': id}));
      list.todos.push(todo)
    }
  }

})
.factory('Notes', function($localStorage, $rootScope, $stateParams) {
  var Notes = $localStorage.notes;

  return{
    all: function(){
      return Notes;
    },
    one: function(id){
      var allnotes = Notes;
      var note = _.first(_.filter(allnotes, {'id': id}));
      return note;
    },
    addNote: function(note){
      note.id = $rootScope.randomId();
      Notes.push(note);
    },
    removeNote: function(note) {
      Notes.splice(Notes.indexOf(note), 1);
    },
    updateNote: function(note){
      Notes.splice(Notes.indexOf(note), 1);
      Notes.splice(Notes.indexOf(note), 0, note);

    }
  }

})