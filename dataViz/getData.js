// initialize edges and nodes
var nodes=[]
var edges=[]

var addNode=function(artist, toNodes){
  var genre = artist.main_genre
  var name = artist.name
  var spotId = artist.spotify_id
  var id = artist.id

  var node = {
      id: id,
      label: name,
      group: genre,
  }

  var isin=false
  for (i in toNodes){
    if(nodes[i].id==node.id){
      isin= true
    }
  }

  if (isin==false){
    toNodes.push(node)
  }
}


var prepare=function(artist){
  var url = "http://api.musicgraph.com/api/v2/artist/search?api_key=c8303e90962e3a5ebd5a1f260a69b138&name="+artist
  return $.get(url,function(response){
    addNode(response.data[0], nodes)
  })
}

// Deepens the graph starting from a node
var deepen = function(ind){
  console.log('From Artist: '+nodes[ind].label)
  // API endpoint
  var url='http://api.musicgraph.com/api/v2/artist/'+nodes[ind].id+'/similar?api_key=c8303e90962e3a5ebd5a1f260a69b138'
  // send request
  return $.get(url, function(response){

    // for each similar artist
    for (i in response.data){
      // retrieve data
      var artist_i=response.data[i]

      addNode(artist_i, nodes)

      var newEdge = {
        from: nodes[ind].id,
        to: artist_i.id,
        length: 10,
        width: 2,
      }
      edges.push(newEdge);
    }
  })
}
