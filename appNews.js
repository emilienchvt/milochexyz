var app = angular.module('appNews', []);

app.controller('newsCtrl', function($scope) {

  $scope.newsSevices = ['google-news', 'techcrunch', 'the-wall-street-journal', 'the-economist', 'new-scientist', 'bloomberg', 'financial-times'];

  $scope.getRandomMedia = function(){
    var serv = $scope.newsSevices
    return serv[Math.floor(Math.random() * serv.length)];
  }

  $scope.currentSelection= "the-economist";

  $scope.news

  $scope.switchService = function(){
    $scope.currentSelection = $scope.getRandomMedia()
    $scope.setNews()
  }

  $scope.setNews=function(){
    var url='https://newsapi.org/v1/articles?source='+$scope.currentSelection+'&sortBy=top&apiKey=7950a784ca96493b8cb9eb743569c29b'
    $.get(url, function(data){
      $scope.news = data.articles
    })
  }

});
