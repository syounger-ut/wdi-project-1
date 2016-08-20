window.addEventListener('DOMContentLoaded', start);

function start() {
  var cat = document.getElementById('cat');
  var politician = document.getElementById('politician');
}




// ===================================================

//animation effect to move object around the page with jQuery:

$(document).ready(function() {
  $('#politician').animate({left:'+=94%'},1000);
  $('#politician').effect('bounce', {times: 3}, 500)

  $('#cat').click(explode);
  $(document).click(target);

});

function explode() {
  $(this).effect('explode');
}

function target() {
    var XPosition = 0;
    var YPosition = 0;
    var $cat = $("#cat");
    $(document).click(function (e) {
        XPosition = e.pageX - 25;
        YPosition = e.pageY - 25;
        $cat.stop().animate({ top: YPosition, left: XPosition });
    });
};