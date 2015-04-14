angular.module('post', [])



.controller('APIController', ['$scope', '$http', function($scope, $http){
  $scope.posts;

  $scope.add_post = function() {
    $http.post('http://localhost:9090/api/post').
      success(function(data, status, headers, config) {
        console.log('success');
      }).
      error(function(data, status, headers, config) {
        console.log(status);
      });
  }
  
  $scope.get_post = function(post_id) {
    $http.get('http://localhost:9090/api/post/'+post_id).
      success(function(data, status, headers, config) {

      }).
      error(function(data, status, headers, config) {

      });
  }

  $scope.get_all_post = function() {

    $http.get('http://localhost:9090/api/post').
      success(function(data, status, headers, config) {
        console.log('success');
        $scope.posts = data;
      }).
      error(function(data, status, headers, config) {
        console.log('error: '+status);
      });
  }

  $scope.update_post = function(post_id) {
    $http.put('http://localhost:9090/api/post/'+post_id).
      success(function(data, status, headers, config) {

      }).
      error(function(data, status, headers, config) {

      });
  }

  $scope.delete_post = function(post_id) {
    $http.delete('http://localhost:9090/api/post/'+post_id).
      success(function(data, status, headers, config) {

      }).
      error(function(data, status, headers, config) {

      });
  }

  $scope.get_all_post();

}])