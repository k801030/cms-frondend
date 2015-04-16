angular.module('api', [])

.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
})

.value('serverUrl', 'http://localhost:9090')

.service('postApi', ['$http', '$sce', 'serverUrl', function($http, $sce, serverUrl) {
  var _data = {};
  _data.posts = [];

  this.data = _data;
  this.add_post = function(add_data, callback) {
    $http.post(serverUrl + '/api/post', add_data).
      success(function(data, status, headers, config) {
        // reload data
        //$scope.get_all_post();
        //$scope.add = {};
        callback();
      }).
      error(function(data, status, headers, config) {
        console.log(status);
      });
  }

  this.get_post = function(post_id) {
    $http.get(serverUrl + '/api/post/'+post_id).
      success(function(data, status, headers, config) {
        return data;
      }).
      error(function(data, status, headers, config) {

      });
  }

  this.get_all_post = function(callback) {

    $http.get(serverUrl + '/api/post').
      success(function(data, status, headers, config) {
        //console.log('success');
        _data.posts = data;
      }).
      error(function(data, status, headers, config) {
        console.log('error: '+status);
      });
  }

  this.update_post = function(post_id) {
    $http.put(serverUrl + '/api/post/'+post_id).
      success(function(data, status, headers, config) {

      }).
      error(function(data, status, headers, config) {

      });
  }

  this.delete_post = function(post_id, callback) {
    $http.delete(serverUrl + '/api/post/'+post_id).
      success(function(data, status, headers, config) {
        callback();
      }).
      error(function(data, status, headers, config) {

      });
  }

}])