var app = angular.module('appNews', []);

function cleanName(str) {
  toks=str.replace('-', ' ')
  var lower = toks.toLowerCase();
  return " "+lower.replace(/(^| )(\w)/g, function(x) {
    return x.toUpperCase();
  });
}

app.controller('newsCtrl', function($scope) {

  $scope.newsSevices = ['techcrunch', 'the-economist', 'new-scientist', 'financial-times', 'engadget', 'national-geographic', 'recode'];
  $scope.news
  $scope.selectedMedia

  // get a random newsfeed, different from the current one
  $scope.getRandomMedia = function(){
    var media = $scope.newsSevices
    var randMedia = media[Math.floor(Math.random() * media.length)];
    while(cleanName(randMedia)==$scope.selectedMedia){
      randMedia = media[Math.floor(Math.random() * media.length)];
    }
    return randMedia
  }

  // API call + update scope's news.
  $scope.switchService = function(){

    var currentSelection = $scope.getRandomMedia()
    $scope.selectedMedia=cleanName(currentSelection)
    var url='https://newsapi.org/v1/articles?source='+currentSelection+'&sortBy=top&apiKey=7950a784ca96493b8cb9eb743569c29b'
    $.get(url, function(data){
      $scope.news = data.articles
      $scope.$digest()
    })
  }

  // Apply initially to generate the feed
  $scope.switchService()

});
