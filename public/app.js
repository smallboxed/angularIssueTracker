var app = angular.module('angularIssueTracker',[]);
  app.controller("mainController", function($scope,$sce,gitApi) {
    $scope.duration = 7;

    var issues = gitApi.getAngularIssues($scope.duration);
    issues.then(function(data){
      $scope.issues = data.data.map(function(obj){
        return {
          title:obj.title ? obj.title : "NA",
          user:obj.user ? obj.user.login : "NA",
          assignee:obj.assignee ? obj.assignee.login : "NA",
          body:obj.body ? $sce.trustAsHtml(obj.body) : $sce.trustAsHtml("No Body")
        }
      });
    });

  });
  app.factory('gitApi',function($http){
    return {
      getAngularIssues:function(duration){
        var d = new Date();
        d.setDate(d.getDate()-duration);
        var date = d.toISOString();

        return $http.get("https://api.github.com/repos/angular/angular/issues?since=" + date);
      }
    }
  })