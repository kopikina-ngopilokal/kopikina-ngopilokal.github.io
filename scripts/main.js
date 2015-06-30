$(document).ready(function () {
  // Function to run after section changed
  // All animation goes here
  var afterLoadHandler = {
    'home': function () {
      $('#mainVideo').animate({opacity:1}, 700);
      $('#mainVideo').get(0).play();
      // $('.anim-s1-bg').get(0).play();
      // $('.section-bg').css({position: 'fixed'});
    },

    'journey': function () {
      $('#mainVideo').animate({opacity:1}, 700);
      $('#mainVideo').get(0).play();

      var cup = $('#cup').find('img');

      resetCup(cup);

      // $('.anim-s2-bg').animate({opacity:1}, 700);
      // $('.anim-s2-bg').get(0).play();

      $('.anim-s2-1').delay(600).fadeIn();
      $('.anim-s2-2').delay(1200).fadeIn(100).addClass('fadeInLeft');
      $('.anim-s2-3').delay(1900).fadeIn(600);
      $('.anim-s2-4').delay(2700).fadeIn(600);

      setTimeout(function() {
        animateCup(cup);
      }, 3200);
    },

    'heritage': function () {
      $('.anim-s3-bg').fadeIn();

      $('.anim-s3-1').delay(600).fadeIn(100).addClass('fadeInRight');
      $('.anim-s3-2').delay(1400).fadeIn(100).addClass('fadeInDown');
      $('.anim-s3-3').delay(2200).fadeIn(600);
      $('.anim-s3-4').delay(3200).fadeIn(100).animate({height:180}, 1200);
      $('.anim-s3-5').delay(4800).fadeIn(600);
      $('.anim-s3-6').delay(5400).fadeIn(100).addClass('fadeInLeft');
      $('.anim-s3-7').delay(6400).css({display: 'inline-block', width:0}).animate({width:100}, 700);
      $('.anim-s3-8').delay(7600).fadeIn(100).addClass('fadeInDown');

      $("#slideshow > div:gt(0)").hide();

      setTimeout(function () {
        $('.anim-s3-1').removeClass('fadeInRight');
        $('.anim-s3-2').removeClass('fadeInDown');
        setInterval(function() { 
          $('#slideshow > div:first')
            // .delay(1500)
            .fadeOut(1000)
            .next()
            .delay(1000)
            .fadeIn(1000)
            .end()
            .appendTo('#slideshow');
        },  6000);
      }, 8000);
    },

    'islands': function () {
      $('.anim-s4-bg').fadeIn();

      $('.anim-s4-1').delay(600).fadeIn();
    },

    'coffee': function () {
      $('.anim-s5-bg').fadeIn();

      $('.anim-s5-1').delay(600).fadeIn(100).addClass('fadeInLeft');
      $('.anim-s5-2').delay(1400).css({display: 'inline-block', width:0}).animate({width:100}, 700);
      $('.anim-s5-3').delay(2400).fadeIn(100).addClass('fadeInDown');
      $('.anim-s5-4').delay(3200).fadeIn();
    },

    'brewing': function () {
      $('.anim-s6-1').fadeIn(800);
      $('.anim-s6-2').delay(900).animate({opacity:1});
      $('.anim-s6-3').delay(1200).animate({opacity:1});
      $('.anim-s6-4').delay(1500).animate({opacity:1});
    },

    'artisan': function () {
      $('.anim-s7-bg').fadeIn();

      $('.anim-s7-1').delay(600).fadeIn();
    },

    'subscribe': function () {
      $('.anim-s8-bg').fadeIn();

      $('.anim-s8-1').delay(600).fadeIn();
    },
  };

  // Initiate fullpage js
  $('#content').fullpage({
    anchors: ['home', 'journey', 'heritage', 'islands', 'coffee', 'brewing', 'artisan', 'subscribe'],

    afterLoad: function (anchorLink, index) {
      if (index !== 1 && index !== 8) {
        $('#navigation, #mapIcon').fadeIn();
      }

      afterLoadHandler[anchorLink]();
    },

    onLeave: function (index, nextIndex, direction) {
      $('.animated').fadeOut();
      if (nextIndex === 1 || nextIndex === 8) {
        $('#navigation, #mapIcon').fadeOut();
      }
      if (nextIndex > 2) {
        $('video').animate({opacity: 0});
      }
      $('#line').css({height:1});
    }
  });

  // Hide placeholder
  $('input').on('keyup', function (e) {
    if (e.keyCode === 13) {
      return;
    }

    if (!$(this).val()) {
      $('#inputPlaceholder').show();
    } else {
      $('#inputPlaceholder').hide();
    }
  });

  // Section 6: show text when hover video
  $('.js-s6-hover').on('mouseover', function (e) {
    var _this = $(this);
    var video = _this.find('video').get(0);
    var target = $(_this.attr('data-target'));

    video.play();
    _this.addClass('overlay');
    target.fadeIn();
  });

  $('.js-s6-hover').on('mouseleave', function (e) {
    var _this = $(this);
    var video = _this.find('video').get(0);
    var target = $(_this.attr('data-target'));

    video.pause();
    _this.removeClass('overlay');
    target.fadeOut();
  });

  function animateCup (obj) {
    var imgCount = 13,
        delay = 200,
        i = 1;

    var interval = setInterval(function () {
      var src = 'images/cangkir/cangkir' + i + '.png';
      obj.attr('src', src);
      i++;

      if (i > imgCount)
        clearInterval(interval);
    }, delay);
  }

  function resetCup (obj) {
    var src = 'images/cangkir/cangkir1.png';
    obj.attr('src', src);
  }

  // Map hover handler
  $('.indomap').find('.block').on('mouseover', function () {
    var _this = $(this);
    var src = _this.data('src');
    var content = _this.html();
    var map = $('.indomap').find('img');

    map.attr('src', src);
    $('.map-caption').delay(200).html(content).fadeIn();
  });

  $('.indomap').find('.block').on('mouseleave', function () {
    var map = $('.indomap').find('img');

    map.attr('src', 'images/map/indonesia.png');
    $('.map-caption').hide();
  });

  // Preload images
  function preloadImg(url){
    new Image().src = url;
  }

  preloadImg('images/map/sumatra.png');
  preloadImg('images/map/jawa.png');
  preloadImg('images/map/kalimantan.png');
  preloadImg('images/map/sulawesi.png');
  preloadImg('images/map/papua.png');
  preloadImg('images/map/balinusatenggara.png');
  for(var i = 1; i <= 13; i++){
    preloadImg('images/cangkir/cangkir'+i+'.png');
  }

  

});
