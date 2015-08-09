// $(document).foundation();
jQuery(document).ready(function($) {

  "use strict";

  $(window).on('resize', function() {
    $('#fullscreen-video').css('position', 'static');
    // console.log('resized');
    setTimeout(function() {
      $('#fullscreen-video').css('position', 'relative');
    }, 500)
  })

  var iframes = $('.iframe');

  for (var i = 0; i < iframes.length; i++) {
    var iframe = iframes[i];
    $(iframe).attr('width', '100%');
    $(iframe).attr('height', '100%');
    $(iframe).attr('frameborder', '0');
  };


  if($('form#contact_form').length > 0) {
    $('form#contact_form').validate({
      messages: { },
      submitHandler: function(form) {
        $.ajax({
          type: 'POST',
          url: 'send.php',
          data: $(form).serialize(),
          success: function(data) {
            if(data.match(/success/)) {
              $(form).trigger('reset');
              $('#thanks').show().fadeOut(5000);
            }
          }
        });
        return false;
      }
    });
  }

  new WOW().init();

  $('.menu-toggler a').on('click', function(e) {
    e.preventDefault();
    $('header').toggleClass('on');
    $('body').toggleClass('no-overflow');
  });

  var timeout;

  if ($('.images-overlap').length > 0) {
    var waypoint = new Waypoint({
      element: $('.images-overlap'),
      offset: "70%",
      handler: function(direction) {
        if(direction == 'down') {
          // clear the queue removal
          clearTimeout(timeout);
          $('.images-overlap li').addClass('on');
        } else {
          timeout = setTimeout(function() {
            $('.images-overlap li').removeClass('on');
          }, 300);
        }
      }
    });
  }

  if ($('.shapes-overlap').length > 0) {
    var waypoint = new Waypoint({
      element: $('.shapes-overlap'),
      offset: "75%",
      handler: function(direction) {
        if(direction == 'down') {
          // clear the queue removal
          clearTimeout(timeout);
          $('.shapes-overlap li').addClass('on');
        } else {
          timeout = setTimeout(function() {
            $('.shapes-overlap li').removeClass('on');
          }, 300);
        }
      }
    });
  }

  if ($('.case-study').length > 0) {
    var waypoint = new Waypoint({
      element: $('.case-study'),
      offset: "75%",
      handler: function(direction) {
        if(direction == 'down') {
          // clear the queue removal
          clearTimeout(timeout);
          $('.case-study img').addClass('on');
        } else {
          timeout = setTimeout(function() {
            $('.case-study img').removeClass('on');
          }, 300);
        }
      }
    });
  }


  $(".milestone").appear(function() {
    $('.number', $(this)).countTo({
      speed: 1400
    });
  });

  $(document).scroll(function() {
    var windowHeight = $(window).height();
    var windowHalfHeight = windowHeight / 2;
    var windowScrollTop = $(document).scrollTop();

    // $(".work").each(function() {

    //   var topOffset = $(this).offset().top;
    //   var pendingOffset = windowScrollTop + windowHeight - topOffset;
    //   var n = pendingOffset / windowHalfHeight;

    //   0 > n || (n = Math.max(n, 0), n = Math.min(n, 1), n = 1 - n, $(this).hasClass('alt') && (n *= -1), $(this).css({
    //       transform: "rotate(" + 22 * n + "deg)"
    //   }))

    // });

  });

  $(document).scroll(function() {
    var windowHeight = $(window).height();
    var windowHalfHeight = windowHeight / 2;
    var windowScrollTop = $(document).scrollTop();

    // $(".post").each(function() {

    //   var topOffset = $(this).offset().top;
    //   var pendingOffset = windowScrollTop + windowHeight - topOffset;
    //   var n = pendingOffset / windowHalfHeight;

    //   0 > n || (n = Math.max(n, 0), n = Math.min(n, 1), n = 1 - n, $(this).hasClass('alt') && (n *= -1), $(this).css({
    //       transform: "rotate(" + 22 * n + "deg)"
    //   }))

    // });

  });

  if ($('#slides').length > 0) {
    $('#slides').on('init.slides', function() {
      var that = this;
      setTimeout(function() {
        $('.slides-container', that).children().eq(0).addClass('active');
      }, 300);
    });

    $('#slides').superslides({
      animation: 'slide',
      hashchange: false,
      play: 4000
    });

    $('#slides').on('animated.slides', function() {
      $('.slides-container', this).children().removeClass('active');

      var index = $(this).superslides('current');
      var that = this;

      setTimeout(function() {
        $('.slides-container', that).children().eq(index).addClass('active');
      }, 300);

    });
  }

  if ($('.slides').length > 0) {
    $('.slides').slick({
      autoplay: false,
      pauseOnHover: false,
      dots: true,
      speed: 1000,
      arrows: false
    });
  }

  if ($('.clients').length > 0) {
    $('.clients').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });
  }


});