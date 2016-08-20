$(document).ready(function() {
  var $politician = $('#politician');
  var $cat        = $('#cat');
  $politician.animate({
    left:'+=65.3%'
  }, {
    duration: 5000,
    step: function(currentStep){
      var politiciationPosition = $politician.offset();
      var catPosition           = $cat.offset();

      if (catPosition.left >= (politiciationPosition.left - 50) && 
        catPosition.left <= (politiciationPosition.left + 50)) {
        $('#politician').stop();
        $('#politician').effect('explode');
      }
    }
  });
  $( document).click(catMove);
});

function catMove() {
  var x = event.pageX-25;
  var y = event.pageY-25;
  $("#cat").css( {position:"absolute", top:y, left:x});
}