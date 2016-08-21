var playerScore = 0;
var politicianScore = 0;

$(document).ready(function() {
  $(document).click(catMove);
  setBoard();
});

function randNum(max, min) {
  var generator = Math.random() * (max - min) + min;
  return generator;
}

function direction() {
  var plusOrMinus = Math.random() < 0.5 ? '-' : '+';
  return plusOrMinus;
}

function setBoard() {
  politicianScore++;
  console.log(politicianScore);
  $('#politician').remove();
  $('#cat').remove();
  $('.gameContainer').append("<div id='politician'></div>");
  $('.gameContainer').append("<div id='cat'></div>");
  $('#politician').offset({left: randNum(1200, 200), top: randNum(500, 0)})
  movePolitician();
}

function movePolitician() {
  var $politician = $('#politician');
  var $cat        = $('#cat');
  $politician.animate({
    left: direction() + '=' + randNum(100, 0) + '%', top: direction() + '=' + randNum(100, 0) + '%'
  }, {
    duration: 5000,
    step: function(now, fx){
      var test = /*fx.elem.id + " " + fx.prop + ": " + */fx;
      $('#politician').css('left', fx + 100);
      var politicianPosition    = $politician.offset();
      var catPosition           = $cat.offset();
      collision(politicianPosition, catPosition, politician, cat);
    },
    complete: function() {
          setBoard();
    }
  });
};


// listen for colliding cat & politician => DONE
function collision(politicianPosition, catPosition) {
  if  (catPosition.left >= (politicianPosition.left - 50) &&
      catPosition.left  <= (politicianPosition.left + 50) &&
      catPosition.top   >= (politicianPosition.top - 50) &&
      catPosition.top   <= (politicianPosition.top + 50)) {
        return confirmHit();
      }
  return;
}

function confirmHit() {
  $('#politician').stop();
  $('#cat').stop();
  $('#politician').effect('explode');
  playerScore+= 0.5;
  $('#playerScore').html(playerScore);
  setBoard();
}

// move the cat to where clicked
function catMove() {
  var x = event.pageX-25;
  var y = event.pageY-25;
  console.log('x: ' + x + 'y: ' + y)
  $('#cat').animate({
    top:y, left:x
  },{
    duration: 1000,
    complete: function(),{
      $('#politician').stop();
      $('#politician').remove();
      $('#cat').remove();
      setBoard();
    }
  });
}

function halfWay(x,y) {
  var $center = $(window).width()/2;
  var halfWayX = ((x-$center)/2 < 0) ? (x-$center)/2 *-1: (x-$center)/2;
  var halfWayY = y/2;
  console.log("X HalfWay = " + halfWayX + " Y HalfWay " + halfWayY)
  if(x === halfWay)
    $('#cat').css("background", "black");
}