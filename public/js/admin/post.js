angular.module('post', [])

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

.controller('APIController', ['$scope', '$http', '$sce', function($scope, $http, $sce){
  $scope.add = {
    title: "",
    content: ""
  };
  $scope.posts;
  $scope.link;
  $scope.add_post = function() {
    console.log($scope.add);
    $http.post('http://localhost:9090/api/post', $scope.add).
      success(function(data, status, headers, config) {
        console.log('success');
        // reload data
        $scope.get_all_post();
        $scope.add = {};
      }).
      error(function(data, status, headers, config) {
        console.log(status);
      });
  }

  $scope.link_append = function() {
    html = '<a href="' + $scope.link.url + '">' + $scope.link.text + '</a>';
    $scope.add.content += html;
    $scope.link_clear();
  }

  $scope.link_clear = function() {
    $scope.link.text = "";
    $scope.link.url = "";
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
        $scope.get_all_post();
      }).
      error(function(data, status, headers, config) {

      });
  }

  $scope.parseToHtml = function(_html) {
    _html = _html.replace('\n','<br>');
    return $sce.trustAsHtml(_html);
  }

  $scope.get_all_post();

}])