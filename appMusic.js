function getRandomArtist(){
  var artists=[
    {
      name:'Bob Dylan',
      id:'74ASZWbe4lXaubB36ztrGX'
    },
    {
      name:'Notorious B.I.G.',
      id:'5me0Irg2ANcsgc93uaYrpb'
    },
    {
      name:'Gorillaz',
      id:'3AA28KZvwAUcZuOKwyblJQ'
    },
    {
      name:'Rodrigo y Gabriela',
      id:'7vX3cMVyW8gtDA4y855ynF'
    },
    {
      name:'Bob Dylan',
      id:'74ASZWbe4lXaubB36ztrGX'
    },
    {
      name:'Nekfeu',
      id:'4LXBc13z5EWsc5N32bLxfH'
    },
    {
      name:'Synapson',
      id:'5EGOerlVYxwqxaTLEWumBR'
    },
  ]
  var index = Math.floor((Math.random() * artists.length));
  return artists[index]
}

var setPlayer = function(){
  $("#artistpic").attr('src', 'https://media.giphy.com/media/l0He4fJxPCbfqv7Xi/source.gif')

  var artist=getRandomArtist()
  var uri = 'spotify:artist:'+artist.id
  var url= "https://embed.spotify.com/?uri="+uri+"&theme=white"
  console.log("./dataViz/index.html?artist="+artist.name)
  $("#similarLink").attr("href", "./dataViz/index.html?artist="+artist.name)
  $("#player").attr('src', url)
  $("#artname").text(artist.name)

  var cx = "001308167617373275063:cri02evdkiu"
  var apiKey = "AIzaSyCUwqvQF5VbXJgJ1wudIbtk7mEEJMwkx9s"
  var urlBingSearch = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?size=Wallpaper&q="

  $.ajax({
    url: urlBingSearch+artist.name+" music",
    type: "GET",
    beforeSend: function(xhr){
      xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      xhr.setRequestHeader('Ocp-Apim-Subscription-Key', '14d9d50265d4433c83d7c07a1d6d6474');
    },
    success: function(data){
      img_url = data.value[0].contentUrl
      img_descr = data.value[0].name
      $("#artistpic").attr('src', img_url)
      $("#artistcaption").text(img_descr)
    }
  })
}



setPlayer()
