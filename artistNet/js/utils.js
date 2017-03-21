// Retrieve arrtistName in the query string
function getQueryStringValue(key) {
  req = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  if (req == "") {
    return "eminem"
  } else {
    return req
  }
}

//mark a timed pause of
function delay(nSec) {
  return new Promise(function(resolve) {
       setTimeout(resolve, nSec*1000)
  });
}
