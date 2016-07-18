var adminapp = angular.module('admin', ['ui.router']);

adminapp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/dashboard');

  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      controller: 'admin-dashboardctrl',
      templateUrl: 'app_client/views/admin-dashboard.html'
    })
    .state('posts', {
      url: '/posts',
      controller: 'admin-postsctrl',
      templateUrl: 'app_client/views/admin-posts.html'
    })
    .state('users', {
      url: '/users',
      controller: 'admin-usersctrl',
      templateUrl: 'app_client/views/admin-users.html'
    });
});
