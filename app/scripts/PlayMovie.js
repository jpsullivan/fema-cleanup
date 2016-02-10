var movieName = "audioMovie";
function thisMovie(movieName) {
  // IE and Netscape refer to the movie object differently.
  // This function returns the appropriate syntax depending on the browser.
  if (navigator.appName.indexOf ("Microsoft") !=-1) {
    return window[movieName]
  }	else {
    return document[movieName]
  }
}
// Checks if movie is completely loaded.
// Returns true if yes, false if no.
function movieIsLoaded (theMovie) {
  if (typeof(theMovie) != "undefined") {
    return theMovie.PercentLoaded() == 100;
  } else {
    return false;
  }
}
function playmovie(movieName) {
  if (movieIsLoaded(thisMovie(movieName))) {
    thisMovie(movieName).Play();
  }
}
function stopmovie(movieName) {
  if (movieIsLoaded(thisMovie(movieName))) {
    thisMovie(movieName).StopPlay();
  }
}
function rewindmovie(movieName) {
  if (movieIsLoaded(thisMovie(movieName))) {
    thisMovie(movieName).Rewind();
  }
}
function go(audioMovie, theFrame) {
  if (movieIsLoaded(thisMovie(movieName))) {
    thisMovie(movieName).GotoFrame(theFrame);
  }
}
function golabel() {
  if (movieIsLoaded(thisMovie(movieName))) {
    thisMovie(movieName).TGotoLabel("_level0/","redframe");
  }
}