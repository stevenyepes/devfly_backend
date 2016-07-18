adminapp.controller('adminctrl', ['$scope', '$location', 'quote', function($scope, $location, quote) {

  $scope.menuChange = function(url) {
    $location.url(url);

    switch (url) {
      case 'dashboard':
        $scope.dashboard = true;
        $scope.posts = false;
        $scope.users = false;
        break;
      case 'posts':
        $scope.dashboard = false;
        $scope.posts = true;
        $scope.users = false;
        break;
      case 'users':
        $scope.dashboard = false;
        $scope.posts = false;
        $scope.users = true;
        break;
    }
  }

  $scope.quote = quote.then(function successCallback(response) {
    $scope.quote = response.data;
  });
}]);
