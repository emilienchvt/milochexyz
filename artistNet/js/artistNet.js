// initialize edges and nodes
var nodes=[]
var edges=[]

var addArtist=function(artistObj, artistNetwork){

  var genre = artistObj.artist.primary_genres.music_genre_list[0].music_genre.music_genre_name
  var name = artistObj.artist.artist_name
  var id = artistObj.artist.artist_id

  var node = {
      id: id,
      label: name,
      group: genre
  }

  artistNetwork.addNode(node)
}


var initArtist=function(artistName, artistNetwork){

  return $.ajax({
    type: "GET",
    data: {
        apikey:"d539d2e8a5124e46a0ef3bf35047532e",
        q_artist: artistName,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "http://api.musixmatch.com/ws/1.1/artist.search",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(response) {
      var artist = response.message.body.artist_list[0]
      addArtist(artist, artistNetwork)
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
  });
}

// Deepens the graph starting from a node
var deepen = function(k, artistNetwork){

  console.log('From Artist: '+artistNetwork.nodes[k].label)
  // Run a similar artist request
  return $.ajax({
    type: "GET",
    data: {
        apikey:"d539d2e8a5124e46a0ef3bf35047532e",
        artist_id: artistNetwork.nodes[k].id,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "http://api.musixmatch.com/ws/1.1/artist.related.get",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(response) {
      var artists=response.message.body.artist_list
      for (i in artists){
        // retrieve data
        var artist_i=artists[i]
        addArtist(artist_i, artistNetwork)
        artistNetwork.addEdge(artistNetwork.nodes[k].id, artist_i.artist.artist_id)
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
  });
}

// recursively applies deepen to the n first nodes of the network.
var deepenMultiple = function(k, n, artistNetwork, progressive=false){
  if(n>0){
    if(progressive==true){
      return deepen(k, artistNetwork)
      .then(x=>artistNet.plot())
      .then(x=>delay(3))
      .then(x=>deepenMultiple(k+1, n-1, artistNetwork, progressive=true))
    } else {
      return deepen(k, artistNetwork).then(x=>deepenMultiple(k+1, n-1, artistNetwork))
    }
  } else {
    return 0
  }
}
