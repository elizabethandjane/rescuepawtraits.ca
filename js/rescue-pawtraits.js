var container, msnry, $btn, page = 1, loadMore, maxPages, $dogs, btnLoading, btnDoneLoading;

maxPages = $('.pager li:nth-last-child(2) a').attr('href').replace(/[^\d]/g, '');
$dogs = $('.dogs');

btnLoading = function () {
  $btn.addClass('load-btn--loading').attr('disabled', 'true').html('Loading…');
};

btnDoneLoading = function () {
  $btn.removeClass('load-btn--loading').removeAttr('disabled').html('Load More');
}

loadMore = function () {
  var req;

  btnLoading();
  page++;

  if (page > maxPages) {
    $btn.parent().remove();
    return;
  }

  req = $.ajax('/dog-photos-' + page + '/');
  req.done(function (data) {
    var dogs = $(data).find('.dog');

    $dogs.append(dogs);

    if (page >= maxPages) {
      $btn.parent().remove();
    }

    if ("Masonry" in window) {
      $dogs.masonry('appended', dogs);
    }

    btnDoneLoading();
  });
};

if ("Masonry" in window) {
  $dogs.masonry({
    columnWidth: 320,
    itemSelector: '.dog',
    gutter: 8,
    transitionDuration: 0,
    isFitWidth: true
  });
}

$btn = $('<button class="load-btn">Load More</button>');
$('.loader').html($btn);

$btn.on('click touchend', function (e) {
  loadMore();
});

if($.fn.waypoint) {
  $btn.waypoint(function () {
    loadMore();
    $btn.waypoint('disable');

    setTimeout(function () {
      $.waypoints('refresh');
      $btn.waypoint('enable');
    }, 400);
  }, { offset: '130%' });
}
