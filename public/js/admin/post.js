angular.module('adminPost', ['api'])



.controller('APIController', ['$scope', '$http', '$sce', 'postApi', function($scope, $http, $sce, postApi){
  $scope.add = {
    title: "",
    content: ""
  };
  $scope.data = postApi.data;
  $scope.link;
  
  $scope.add_post = function(){
    postApi.add_post($scope.add, function(){
      $scope.get_all_post();
      $scope.add = {};
    });
  }
  $scope.get_post = function(post_id) {
    postApi.get_post(post_id);
  }

  $scope.get_all_post = function() {
    postApi.get_all_post();
  }

  $scope.update_post = function(post_id) {
    postApi.update_post(post_id);
  }

  $scope.delete_post = function(post_id) {
    postApi.delete_post(post_id, function(){
      $scope.get_all_post();
    });
  }

  $scope.link_append = function() {
    html = '<a href="' + $scope.link.url + '" blank="target">' + $scope.link.text + '</a>';
    $scope.add.content += html;
    console.log(html);
    $scope.link_clear();
  }

  $scope.link_clear = function() {
    $scope.link.text = "";
    $scope.link.url = "";
  }
  
  
  $scope.parseToHtml = function(_html) {
    _html = _html.replace('\n','<br>');
    return $sce.trustAsHtml(_html);
  }

  $scope.get_all_post();
  

}])