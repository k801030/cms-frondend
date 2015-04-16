angular.module('post', ['api'])



.controller('APIController', ['$scope', '$http', '$sce', 'postApi', function($scope, $http, $sce, postApi){

  $scope.data = postApi.data;
  $scope.link;
  
  $scope.get_post = function(post_id) {
    postApi.get_post(post_id);
  }

  $scope.get_all_post = function() {
    postApi.get_all_post();
  }
  
  
  $scope.parseToHtml = function(_html) {
    _html = _html.replace('\n','<br>');
    return $sce.trustAsHtml(_html);
  }

  $scope.get_all_post();
  

}])