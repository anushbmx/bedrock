/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

$(function() {
    'use strict';

    var ltr = document.dir === 'ltr';
    var oldIE = /MSIE\s[1-7]\./.test(navigator.userAgent);

    // Set up the modal navigation
    var nav_modal = function (direction) {
        var $origin = $('.modal-origin').removeClass('modal-origin');

        if (direction === 1) {
            $origin = $origin.next().length ? $origin.next()
                                            : $origin.siblings(':first');
        } else {
            $origin = $origin.prev().length ? $origin.prev()
                                            : $origin.siblings(':last');
        }

        $('#modal').attr('aria-labelledby', $origin.attr('id'));
        $('#modal .overlay-contents').replaceWith($origin.clone()
            .removeAttr('id').addClass('overlay-contents').attr('tabindex', '0'));

        $origin.addClass('modal-origin');
    };

    // Set up the modal
    $('[id^="principle-"]').each(function () {
        var section_id = $(this).attr('id');

        $(this).attr({
            'tabindex': '0'
        }).on('click', function () {
            if (oldIE) {
                return;
            }

            Mozilla.Modal.createModal(this, $(this).clone().removeAttr('id'), {
                'title': '',
                'onCreate': function () {
                    var $nav = $('<nav></nav>').appendTo('#modal .inner');
                    var $button = $('<span role="button" tabindex="0"></span>');

                    $button.clone().text(window.trans('principle-nav-prev'))
                        .addClass('prev').appendTo($nav);
                    $button.clone().text(window.trans('principle-nav-next'))
                        .addClass('next').appendTo($nav);

                    $nav.on('click', 'span', function () {
                        nav_modal($(this).hasClass('prev') ? -1 : 1);
                    }).on('keydown', 'span', function (event) {
                        if (event.keyCode === 13) {
                            $(this).trigger('click');
                        }
                    });
                }
            });
        }).on('keydown', function (event) {
            if (event.keyCode === 13) {
                $(this).trigger('click');
            }
        });

        $('<p class="more"></p>').text(window.trans('principle-read-more'))
            .appendTo($(this).find('header'));
    });

    if (!oldIE) {
        $('html').addClass('modal-enabled');
    }

    // Set up keyboard shortcuts for the modal
    $(document).on('keydown', function (event) {
        if (!$('#modal').length) {
            return;
        }

        var direction = 0;

        switch (event.keyCode) {
            case 37: // Left arrow
                direction = ltr ? -1 : 1;
                break;
            case 38: // Up arrow
                direction = -1;
                break;
            case 39: // Right arrow
                direction = ltr ? 1 : -1;
                break;
            case 40: // Down arrow
                direction = 1;
                break;
        }

        if (direction) {
            event.preventDefault();
            nav_modal(direction);
        }
    });

    // Open Twitter in a sub window when a share link is clicked
    $(document).on('click', '.share .tweet', function (event) {
        window.open(event.target.href, 'twitter', 'width=550,height=420,' +
            'scrollbars=yes,resizable=yes,toolbar=no,location=yes');
        event.preventDefault();
        event.stopPropagation();
        return false;
    });

    var tell_link = $('#sec-tell .share .tweet');

    // Update the tweet link when the arbitrary text is modifled
    $('#sec-tell textarea').on('input', function () {
        tell_link.attr('href', tell_link.attr('href')
            .replace(/&text=.*/, '&text=' + encodeURIComponent($(this).val())));
    });

    // Set up the picture grids
    $('.ri-grid').gridrotator({
        rows: 18,
        columns: 3,
        animType: 'fadeInOut',
        animSpeed: 1000,
        interval: 1000,
        step: 1,
        w768: {
            rows: 18,
            columns: 3
        },
    });
});
