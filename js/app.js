$(document).ready(function() {
  var $politician = $('#politician');
  var $cat        = $('#cat');
  $politician.animate({
    left:'+=65.3%'
  }, {
    duration: 5000,
    step: function(currentStep){
      var polaticianPosition = $politician.offset();
      var catPosition           = $cat.offset();
      collision(polaticianPosition, catPosition, politician, cat);
    }
  });
//=================================================================
// increase left & right positions incrementally in a loop as element moves.
// this reverses when half-way is reached.
// the thing which is changed is the final destination.

// use setInterval loop to increase the numbers.
  var timeout = setTimeout(arc, 1000);
  function arc() {
    // do something

    timeout = setTimeout(arc, 1000)
  }
  function abortTimer() {
    clearTimeout(timeout); //to be called to stop the timer
  }

  //=================================================================


  $( document).click(catMove);
});

function collision(polaticianPosition, catPosition, politician, cat) {
  if (catPosition.left >= (polaticianPosition.left - 50) &&
      catPosition.left <= (polaticianPosition.left + 50) &&
      catPosition.top >= (polaticianPosition.top - 50) &&
      catPosition.top <= (polaticianPosition.top + 50)) {
    $(politician).stop();
    $(politician).effect('explode');
  }
}

function catMove() {
  var x = event.pageX-25;
  var y = event.pageY-25;
  $('#cat').animate( {top:+y, left:x},{duration: 1000});
  halfWay(x,y);
}

function halfWay(x,y) {
  var $center = $(window).width()/2;
  var halfWayX = ((x-$center)/2 < 0) ? (x-$center)/2 *-1: (x-$center)/2;
  var halfWayY = y/2;
  console.log("X HalfWay = " + halfWayX + " Y HalfWay " + halfWayY)
  if(x === halfWay)
  $('#cat').css("background", "black");
}

function direction(x) {
  var $center = $(window).width()/2;
  if(x<$center) {
    // do something
  } else {
    // do something else
  }
}