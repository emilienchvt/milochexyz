var artistNet = new Network()
var artistName = getQueryStringValue('artist')
var explore

// function to feed the artist info and the spotify iframe using an api call to musicgraph
var setPlayer = function(artistName){
  url="http://api.musicgraph.com/api/v2/artist/search?api_key=7d170bf0cf6d155c21c27d55eef04a5c&name="+artistName
  $.get(url, function(res){
    var artist=res.data[0]
    $('#artName').text(artist.name)
    var descr = artist.main_genre+" - "+artist.country_of_origin
    $('#artDescr').text(descr)
    var url = "https://embed.spotify.com/?uri=spotify:artist:"+artist.spotify_id+"&theme=white"
    $('#player').attr('src', url)
  })
}

// returns a function to deepen, targeted on the selected artist
var metaExplore=function(id){
  return function(){
    $('#explorer').removeClass("btn-primary")
    var i = artistNet.getIndex(id)
    deepen(i, artistNet).then(x=>artistNet.plot())
  }
}

// applied when a node is selected
artistNet.eventHandler=function(res){
  // set target node
  var target = res.nodes[0]
  var artistName=artistNet.getNode(target).label
  $('#explorer').addClass("btn-primary")
  // set player and prepare function for explore
  setPlayer(artistName)
  explore=metaExplore(target)
}


// Generating first elements
setPlayer(artistName)

// initialize the network with artistName
initArtist(artistName, artistNet)
  // apply 3 deepenings to create the graph
  .then(x=>deepenMultiple(0, 1, artistNet))
  // plot the network
  .then(x=>artistNet.plot())
  // plot the network even if an error is received
  .catch(function(error){
    artistNet.plot()
})
