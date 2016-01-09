angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngStorage'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  $rootScope.getDateTime = function() {
      var now     = new Date(); 
      var year    = now.getFullYear();
      var month   = now.getMonth()+1; 
      var day     = now.getDate();
      var hour    = now.getHours();
      var minute  = now.getMinutes();
      var second  = now.getSeconds(); 
      if(month.toString().length == 1) {var month = '0'+month;}
      if(day.toString().length == 1) {var day = '0'+day;}   
      if(hour.toString().length == 1) {var hour = '0'+hour;}
      if(minute.toString().length == 1) {var minute = '0'+minute;}
      if(second.toString().length == 1) {var second = '0'+second;}
      var ampm = hour >= 12 ? 'PM' : 'AM';
      var dateTime = day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second + ' ' + ampm;   
      return dateTime;
    };
    $rootScope.randomId = function(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.todos', {
      url: '/todos',
      views: {
        'tab-todos': {
          templateUrl: 'templates/tab-todos.html',
          controller: 'TodosCtrl'
        }
      }
    })
    .state('tab.todolist', {
      url: '/todos/:todosId',
      views: {
        'tab-todos': {
          templateUrl: 'templates/todo-list.html',
          controller: 'TodoListCtrl'
        }
      }
    });
  $urlRouterProvider.otherwise('/tab/todos');
});
