function getRandomArtist(){
  var artists=[
    {
      name:'Bob Dylan',
      id:'74ASZWbe4lXaubB36ztrGX'
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
      name:'Wax Tailor',
      id:'3qwxSif06Qwzykdln8ZGfG'
    },
    {
      name:'Nekfeu',
      id:'4LXBc13z5EWsc5N32bLxfH'
    },
    {
      name:'Synapson',
      id:'5EGOerlVYxwqxaTLEWumBR'
    },
    {
      name:'Alt-J',
      id:'3XHO7cRUPCLOr6jwp8vsx5'
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
  $("#similarLink").attr("href", "./artistNet?&artist="+artist.name)
  $("#player").attr('src', url)
  $("#artname").text(artist.name)

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
  }).fail(function(error){
    $("#artistpic").attr('src', "http://www.musicofiles.com/wp-content/uploads/2016/10/Live-music-bg.jpg")
    $("#artistcaption").text("Couldn't load artist's pic: Bing Image search limite reached")
  })
}

setPlayer()
