var playerScore = 0;
var $politician, $cat;
var moving      = true;

$(document).ready(function() {
  $(document).click(catMove);
  startPosition();
});

function randNum(max, min) {
  return Math.random() * (max - min + 1) + min;
}

function startPosition() {
  var $container = $(".gameContainer");
  var x          = randNum(50, $container.width() - 50);
  var y          = randNum(50, $container.height() - 50);
  addPoliticianAndCatToBoard(x,y)
}

function addPoliticianAndCatToBoard(x,y) {
  if ($politician) $politician.stop().remove();
  if ($cat)        $cat.stop().remove();

  $politician = $(
    "<div class='body'>" + 
      "<div class='head' id='politician'></div>" + 
      "<div class='arm'></div>" + 
      "<div class='torso'></div>" + 
      "<div class='arm'></div>" + 
      "<div class='leg'></div>" + 
      "<div class='leg'></div>" + 
    "</div>"
  );



  $('.gameContainer').append($politician);
    //+

    // "<div class='body'>" + 
    //   "<div class='head' id='politician'></div>" + 
    //   "<div class='arm'></div>" + 
    //   "<div class='torso'></div>" + 
    //   "<div class='arm'></div>" + 
    //   "<div class='leg'></div>" + 
    //   "<div class='leg'></div>" + 
    // "</div>"
 // );
  // $politician = $("<div class='head' id='politician'></div>")
  $cat        = $("<div id='cat'></div>");
  // $('.gameContainer').append($politician);
  $('.gameContainer').append($cat);
  $politician.offset({left: x, top: y})
  movePolitician();
}

function movePolitician() {
  var $container  = $(".gameContainer");
  var x           = randNum(50, $container.width() - 50);
  var y           = randNum(50, $container.height() - 50);
  moving          = true;

  $politician
    .animate({
      left: x, 
      top: y
    }, {
      duration: 5000,
      step: function(now, fx){
        var politicianPosition = $politician.offset();
        var catPosition        = $cat.offset();
        collision(politicianPosition, catPosition);
      },
      complete: function() {
        startPosition();
      }
    });
};

// listen for colliding cat & politician => DONE
function collision(politicianPosition, catPosition) {
  if (moving && catPosition.left >= (politicianPosition.left - 50) &&
    catPosition.left  <= (politicianPosition.left + 50) &&
    catPosition.top   >= (politicianPosition.top - 50) &&
    catPosition.top   <= (politicianPosition.top + 50)) {
      return confirmHit(politician, cat);
    }
  return;
}

function confirmHit() {
  console.log("HIT")
  moving = false;
  $politician.effect('explode');
  $cat.effect('explode');
  playerScore += 1;
  $('#playerScore').html(playerScore);
  startPosition();
}

// move the cat to where clicked
function catMove() {
  var x = event.pageX-25;
  var y = event.pageY-25;

  $cat.animate({
    top: y, 
    left: x
  },{
    duration: 1000,
    complete: function(){
      startPosition();
    }
  });
}