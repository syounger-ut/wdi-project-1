var playerScore = 0;
var politicianNo = 0;

$(document).ready(function() {
  $( document).click(catMove);
  setBoard();
});

function randNum(max) {
  var generator = Math.random() * (max - 0) + 0;
  return generator;
}

function direction() {
  var plusOrMinus = Math.random() < 0.5 ? '-' : '+';
  return plusOrMinus;
}

function setBoard() {
  $('.gameContainer').append("<div id='politician'></div>");
  $('.gameContainer').append("<div id='cat'></div>");
  $('#politician').offset({left: randNum(250), top: randNum(250)})
  movePolitician();
}

function movePolitician() {
  politicianNo++;
  var $politician = $('#politician');
  var $cat        = $('#cat');
  $politician.animate({
    left: direction() + '=' + randNum(100) + '%', top: direction() + '=' + randNum(100) + '%'
  }, {
    duration: 1000,
    step: function(now, fx){
      var test = /*fx.elem.id + " " + fx.prop + ": " + */fx;
      $('#politician').css('left', fx + 100);
      var politicianPosition    = $politician.offset();
      var catPosition           = $cat.offset();
      collision(politicianPosition, catPosition, politician, cat);
    },
    complete: function() {
          $('#politician').remove();
          $('#cat').remove();
          setBoard();
    }
  });
};

function collision(politicianPosition, catPosition, politician, cat) {
  if  (catPosition.left >= (politicianPosition.left - 50) &&
      catPosition.left  <= (politicianPosition.left + 50) &&
      catPosition.top   >= (politicianPosition.top - 50) &&
      catPosition.top   <= (politicianPosition.top + 50)) {
        $(politician).stop();
        $(politician).effect('explode');
        playerScore+= 0.5;
        $('#playerScore').html(playerScore);
        $('#politician').remove();
        $('#cat').remove();
        setBoard();
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