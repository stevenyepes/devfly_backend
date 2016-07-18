adminapp.factory('quote', ['$http', function($http) {
  var urlDesignApi = 'http://quotesondesign.com/api/3.0/api-3.0.json?callback=JSON_CALLBACK';
  var urlProgrammingApi = 'http://quotes.stormconsultancy.co.uk/random.json?callback=JSON_CALLBACK';
  return $http.jsonp(urlProgrammingApi).then(
    function successCallback(response) {
      return response;
    },
    function errorCallback(response) {

    }
  );

}]);
