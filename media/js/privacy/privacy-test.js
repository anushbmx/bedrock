/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

$(function() {
    'use strict';

    var $window = $(window);
    var currentIndex = 0;
    var $slideContent = $('.day-in-life');
    var $background = $('#background-outer');

    var data = [
        [2, 1], [2, 2], [2, -1], [2, -2], [2, -3], [2, -4],
        [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, -1], [3, -2], [3, -3], [3, -4], [3, -5], [3, -6], [3, -7], [3, -8], [3, -9], [3, -10], [3, -11], [3, -12], [3, -13],
        [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, -1], [4, -2], [4, -3], [4, -4], [4, -5], [4, -6], [4, -7], [4, -8], [4, -9], [4, -10], [4, -11], [4, -12], [4, -13], [4, -14], [4, -15],
        [5, 1], [5, 2], [5, -1], [5, -2], [5, -3], [5, -4], [5, -5], [5, -6], [5, -7], [5, -8], [5, -9], [5, -10], [5, -11], [5, -12], [5, -13],
        [6, 1], [6, -1], [6, -2], [6, -3], [6, -4], [6, -5], [6, -6], [6, -7], [6, -8], [6, -9],

        [8, 1], [8, 2], [8, -1], [8, -2], [8, -3], [8, -4], [8, -5], [8, -6], [8, -7], [8, -8], [8, -9], [8, -10], [8, -11], [8, -12], [8, -13], [8, -14], [8, -15],
        [9, 1], [9, 2], [9, 3], [9, -1], [9, -2], [9, -3], [9, -4], [9, -5], [9, -6], [9, -7], [9, -8], [9, -9], [9, -10], [9, -11], [9, -12], [9, -13], [9, -14], [9, -15],
        [10, 1], [10, -1], [10, -2], [10, -3], [10, -4], [10, -5], [10, -6], [10, -7], [10, -8], [10, -9], [10, -10], [10, -11], [10, -12], [10, -13], [10, -14],

        [12, 1], [12, 2], [12, 3], [12, 4], [12, 5], [12, -1], [12, -2], [12, -3], [12, -4], [12, -5], [12, -6], [12, -7], [12, -8], [12, -9], [12, -10], [12, -11], [12, -12], [12, -13], [12, -14], [12, -15],
        [13, 1], [13, 2], [13, -1], [13, -2], [13, -3], [13, -4], [13, -5], [13, -6], [13, -7], [13, -8], [13, -9], [13, -10], [13, -11], [13, -12], [13, -13], [13, -14], [13, -15],
        [14, 1], [14, -1], [14, -2], [14, -3], [14, -4], [14, -5], [14, -6], [14, -7], [14, -8], [14, -9], [14, -10], [14, -11], [14, -12],
        [15, -1], [15, -2],
        [16, -1], [16, -2], [16, -3],
        [17, 1], [17, 2], [17, -1], [17, -2], [17, -3], [17, -4], [17, -5], [17, -6], [17, -7], [17, -8], [17, -9], [17, -10], [17, -11], [17, -12], [17, -13], [17, -14], [17, -15],
        [18, 1], [18, -1], [18, -2], [18, -3], [18, -4], [18, -5], [18, -6], [18, -7], [18, -8], [18, -9], [18, -10], [18, -11], [18, -12], [18, -13], [18, -14], [18, -15],

        [20, 1], [20, -1], [20, -2], [20, -3], [20, -4], [20, -5], [20, -6], [20, -7], [20, -8], [20, -9], [20, -10],
        [21, 1], [21, 2], [21, -1], [21, -2], [21, -3], [21, -4], [21, -5], [21, -6], [21, -7], [21, -8], [21, -9], [21, -10], [21, -11], [21, -12], [21, -13], [21, -14], [21, -15],
        [22, 1], [22, 2], [22, 3], [22, -1], [22, -2], [22, -3], [22, -4], [22, -5], [22, -6], [22, -7], [22, -8], [22, -9], [22, -10], [22, -11], [22, -12], [22 -13], [22, -14], [22, -15],

        [24, 1], [24, 2], [24, -1], [24, -2], [24, -3], [24, -4], [24, -5], [24, -6], [24, -7], [24, -8], [24, -9], [24, -10], [24, -11], [24, -12], [24, -13], [24, -14], [24, -15],
        [25, 1], [25, 2], [25, -1], [25, -2], [25, -3], [25, -4], [25, -5], [25, -6], [25, -7], [25, -8], [25, -9], [25, -10], [25, -11], [25, -12], [25, -13], [25, -14], [25, -15],
        [26, 1], [26, -1], [26, -2], [26, -3], [26, -4], [26, -5], [26, -6], [26, -7], [26, -8], [26, -9], [26, -10], [26, -11], [26, -12], [26, -13], [26, -14], [26, -15]
    ];

    var cache = data;

    var circles;

    var margin = {top: 0, right: 60, bottom: 0, left: 60};
    var width = 600 - margin.left - margin.right;
    var height = 700 - margin.top - margin.bottom;

    var x = d3.scale.linear()
              .domain([0, 27])
              .range([ 0, width ]);

    var y = d3.scale.linear()
              .domain([-16, 16])
              .range([ height, 0 ]);

    function formatTickLabel (d) {
        // if (d === 0) {
        //     return '9am';
        // } else if (d === 10) {
        //     return 'Noon';
        // } else if (d === 26) {
        //     return '5pm';
        // } else {
        //     return null;
        // }
        return null;
    }

    var svg = d3.select('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'chart');

    var main = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'main');

    var points = [1, 2, 5, 10, 13, 14, 17, 21, 26];

    // draw the x axis
    var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(27)
    .tickValues(points)
    .tickPadding(15)
    .tickFormat(formatTickLabel);

    main.append('g')
    .attr('transform', 'translate(0,' + (height + 2) / 2 + ')')
    .attr('class', 'axis')
    .call(xAxis);

    var plot = main.append('g').attr('class', 'plot');

    d3.selection.prototype.moveToFront = function() {
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };

    function addDots (data, val) {
        circles = plot.selectAll('circle').data(data, function (d) {
            return d;
        }).enter();

        circles.append('circle')
            .attr('cx', function (d) { return x(d[0]); } )
            .attr('cy', function (d) { return y(d[1]); } )
            .attr('r', 0)
            .attr('fill', function (d) {
                return d[1] > 0 ? '#BAD4EC' : '#000';
            })
            .attr('fill-opacity', function (d) {
                return d[1] > 0 ? 1 : 0.5;
            })
            .transition()
            .delay(function (d, i) {
                return d[0] === val ? Math.abs(d[1]) * 50 : 0;
            })
            .attr('r', 6);
    }

    function removeDots (data) {
        circles = plot.selectAll('circle').data(data, function (d) {
            return d;
        });
        circles.exit().transition().style('opacity', 0).attr('r', 0).remove();
    }

    function showSlideContent (step) {
        var $step = $slideContent.find('.step' + step);
        var $current = $slideContent.find('li.current');

        if ($step.length && !$step.hasClass('current')) {
            if ($current.length) {
                $current.removeClass('current');
                $step.addClass('current');
            } else {
                $step.addClass('current');
            }
        }
    }

    function scrollToGradient (percent) {
        var width = $window.width();
        var pos = Math.round(width * (percent / 10)) + 'px';
        $background.stop().animate({
            scrollLeft: pos
        }, 1000);
    }

    function createCustomTicks () {
        var ticks = svg.selectAll('.tick');
        ticks.append('circle').attr('r', 8);
        ticks.selectAll('line').remove();
        ticks.moveToFront();
    }

    var timer;

    var $slider = $('#slider').rangeslider({
        polyfill: false,
        onSlide: function (pos, value) {
            var val = parseInt(value, 10);
            var percent = (val / 26) * 100;
            var floor = Math.floor((percent + 1) / 10) * 10;
            cache = [];

            clearTimeout(timer);

            data.forEach(function (d) {
                if (d[0] <= val) {
                    cache.push(d);
                } else if (val === 0) {
                    cache = [];
                }
            });

            if (val < currentIndex) {
                removeDots(cache);
            } else if (cache.length > 0) {
                addDots(cache, val);
            }

            currentIndex = val;

            timer = setTimeout(function () {
                scrollToGradient(percent);
                showSlideContent(val);
            }, 200);
        }
    });

    createCustomTicks();

    $slider.val(1).change();
});
