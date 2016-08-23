var playerScore = 0;
var $politician, $cat;
var moving      = true;
var fired = false;
var politicianNo = 0;
var politicians = [ "alexS.jpg", "borisJ.jpg", "davidC.jpg", "edM.jpg", "jeremyC.jpg", "nicolaS.jpg", "nigelF.jpg", "owenS.jpg", "donaldT.jpg", "angelaM.jpg", "theresaM.jpg", "michaelG.jpg", "marshmallowM.jpg" ];
var hiddenStart = [ "h2", "ul", ".gameContainer", ".articles", ".newspaper", ".cannon", ".catContainer" ];

$(document).ready(function() {
  $('.start').click(startGame);
});

function startGame() {
  $(hiddenStart).each(unHide);
  startPosition();
  $(document).on('mousemove', mouseTrack);
  $(document).click(catMove);
}

function unHide(index, value) {
  $('.start').css('display', 'none');
  $('.description').css('display', 'none');
  $('.disclaimer').css('display', 'none');
  $(value).css('visibility', 'visible');
} 

function randNum(max, min) {
  return Math.random() * (max - min) + min;
}

function direction() {
  var plusOrMinus = Math.random() < 0.5 ? '-' : '+';
  return plusOrMinus;
}

function mouseTrack(event) {
  if(fired === false){
    var cannonPosition = $('.cannon').offset();
    var x = event.pageX;
    var y = event.pageY;

    var height = cannonPosition.left - x+50;
    var width = cannonPosition.top - y+50;

    var answer = Math.atan2(height, width) * 180 / Math.PI;
    $('.cannon').css({'transform' : 'rotate(' + (answer*-1) + 'deg)'});
    $('.catContainer').css({'transform' : 'rotate(' + (answer*-1) + 'deg)'});
  } else {
    return;
  }
}

function politicianCount() {
  var allPoliticians = politicians.length;
  if(politicianNo >= allPoliticians) {
    politicianNo = 0;
  } else {
    return politicianNo;
  }
}

function startPosition() {
  fired = false;
  $(document).on('mousemove', mouseTrack);
  var $container = $(".gameContainer");
  var x          = randNum($container.width() - 50, 245);
  var y          = randNum($container.height() - 50, 150);
  addPoliticianAndCatToBoard(x,y)
}

function addPoliticianAndCatToBoard(x,y) {
  if ($politician) $politician.stop().remove();
  if ($cat)        $cat.stop().remove();
  $politician = $(
    "<div class='body'>" + 
      "<div class = 'head' id='politician'></div>" + 
      "<div class = 'arm'></div>" + 
      "<div class = 'torso'>" +
        "<div class='tie'></div>" +
      "</div>" + 
      "<div class = 'arm'></div>" + 
      "<div class = 'leg'></div>" + 
      "<div class = 'leg'></div>" + 
    "</div>"
  );
  $('.gameContainer').append($politician);
  $cat = $(
    "<div class='catContainer'>" +
      "<div id='cat'></div>" +
    "</div>"
  );
  $('#politician').append("<img src='images/" + politicians[politicianNo] +"'>")
  $('.gameContainer').append($cat);
  $cat.css('visibility', 'visible');
  $politician.offset({left: x, top: y})
  movePolitician();
}

function movePolitician() {
  var $container  = $(".gameContainer");
  var x           = randNum($container.width() - 50, 245);
  var y           = randNum($container.height() - 50,150);
  moving          = true;

  $politician
    .animate({
      left: direction() + x,
      top: direction() + y
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
                catPosition.left <= (politicianPosition.left + 50) &&
                catPosition.top  >= (politicianPosition.top - 50) &&
                catPosition.top  <= (politicianPosition.top + 50)) {
      return confirmHit(politician, cat);
    }
  return;
}

function confirmHit() {
  moving = false;
  $politician.effect('explode');
  $cat.effect('explode');
  playerScore ++;
  politicianNo++;
  politicianCount()
  $('#playerScore').html(playerScore);
  startPosition();
}

// move the cat to where clicked
function catMove() {
  new Audio("http://www.wavsource.com/snds_2016-08-21_1204101428963685/animals/cat_screech2.wav").play();
  var x = event.pageX;
  var y = event.pageY-25;
  fired = true;

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