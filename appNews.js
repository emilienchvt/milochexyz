var app = angular.module('appNews', []);

app.controller('newsCtrl', function($scope) {

  $scope.newsSevices = ['techcrunch', 'the-economist', 'new-scientist', 'financial-times', 'engadget', 'national-geographic', 'recode'];

  $scope.getRandomMedia = function(){
    var serv = $scope.newsSevices
    return serv[Math.floor(Math.random() * serv.length)];
  }

  $scope.news

  $scope.switchService = function(){
    var currentSelection = $scope.getRandomMedia()
    var url='https://newsapi.org/v1/articles?source='+currentSelection+'&sortBy=top&apiKey=7950a784ca96493b8cb9eb743569c29b'
    $.get(url, function(data){
      $scope.news = data.articles
      $scope.$digest()
    })
  }

  $scope.switchService()

});
