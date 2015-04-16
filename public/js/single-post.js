angular.module('singlePost', ['api'])



.controller('PostController', ['$scope', '$http', '$sce', 'postApi', function($scope, $http, $sce, postApi){
  $scope.post_id = window.post_id;
  $scope.data = postApi.data;
  
  $scope.parseToHtml = function(_html) {
    if(_html != null){
      _html = _html.replace('\n','<br>');
      return $sce.trustAsHtml(_html);
    }
  }

  postApi.get_post($scope.post_id);
}])