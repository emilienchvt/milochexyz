function getQueryStringValue (key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

artist = getQueryStringValue('artist')

prepare(artist)
  .then(x=>deepenMultiple(0,3))
  .then(x=>plot())
  .catch(function(){
    plot()
    $('#errContainer').text('I used all my free API calls for now :( Try later!')
  })


//function to manage successive calls. RECURSIVE GADDEM
var deepenMultiple=function(k, n){
  if(n>0){
    return deepen(k).then(x=>deepenMultiple(k+1, n-1))
  } else {
    return 0
  }
}
