/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

$(function() {
    'use strict';

    var $window = $(window);
    var currentIndex = 0;
    var $sun = $('.sun-inner');
    var $slideContent = $('.day-in-life');
    var $background = $('#background-outer');
    var $visited = $('.visited span');
    var $unknown = $('.unknown span');

    var data = [
        [1, 1], [1, 1], [1, 2], [1, -1], [1, -2], [1, -3], [1, -4],
        [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, -1], [2, -2], [2, -3], [2, -4], [2, -5], [2, -6], [2, -7], [2, -8], [2, -9], [2, -10], [2, -11], [2, -12], [2, -13],
        [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, -1], [3, -2], [3, -3], [3, -4], [3, -5], [3, -6], [3, -7], [3, -8], [3, -9], [3, -10], [3, -11], [3, -12], [3, -13], [3, -14], [3, -15],
        [4, 1], [4, 2], [4, -1], [4, -2], [4, -3], [4, -4], [4, -5], [4, -6], [4, -7], [4, -8], [4, -9], [4, -10], [4, -11], [4, -12], [4, -13],
        [5, 1], [5, -1], [5, -2], [5, -3], [5, -4], [5, -5], [5, -6], [5, -7], [5, -8], [5, -9],

        [7, 1], [7, 2], [7, -1], [7, -2], [7, -3], [7, -4], [7, -5], [7, -6], [7, -7], [7, -8], [7, -9], [7, -10], [7, -11], [7, -12], [7, -13], [7, -14], [7, -15],
        [8, 1], [8, 2], [8, 3], [8, -1], [8, -2], [8, -3], [8, -4], [8, -5], [8, -6], [8, -7], [8, -8], [8, -9], [8, -10], [8, -11], [8, -12], [8, -13], [8, -14], [8, -15],
        [9, 1], [9, -1], [9, -2], [9, -3], [9, -4], [9, -5], [9, -6], [9, -7], [9, -8], [9, -9], [9, -10], [9, -11], [9, -12], [9, -13], [9, -14],

        [11, 1], [11, 2], [11, 3], [11, 4], [11, 5], [11, -1], [11, -2], [11, -3], [11, -4], [11, -5], [11, -6], [11, -7], [11, -8], [11, -9], [11, -10], [11, -11], [11, -12], [11, -13], [11, -14], [11, -15],
        [12, 1], [12, 2], [12, -1], [12, -2], [12, -3], [12, -4], [12, -5], [12, -6], [12, -7], [12, -8], [12, -9], [12, -10], [12, -11], [12, -12], [12, -13], [12, -14], [12, -15],
        [13, 1], [13, -1], [13, -2], [13, -3], [13, -4], [13, -5], [13, -6], [13, -7], [13, -8], [13, -9], [13, -10], [13, -11], [13, -12],
        [14, -1], [14, -2],
        [15, -1], [15, -2], [15, -3],
        [16, 1], [16, 2], [16, -1], [16, -2], [16, -3], [16, -4], [16, -5], [16, -6], [16, -7], [16, -8], [16, -9], [16, -10], [16, -11], [16, -12], [16, -13], [16, -14], [16, -15],
        [17, 1], [17, -1], [17, -2], [17, -3], [17, -4], [17, -5], [17, -6], [17, -7], [17, -8], [17, -9], [17, -10], [17, -11], [17, -12], [17, -13], [17, -14], [17, -15],

        [19, 1], [19, -1], [19, -2], [19, -3], [19, -4], [19, -5], [19, -6], [19, -7], [19, -8], [19, -9], [19, -10],
        [20, 1], [20, 2], [20, -1], [20, -2], [20, -3], [20, -4], [20, -5], [20, -6], [20, -7], [20, -8], [20, -9], [20, -10], [20, -11], [20, -12], [20, -13], [20, -14], [20, -15],
        [21, 1], [21, 2], [21, 3], [21, -1], [21, -2], [21, -3], [21, -4], [21, -5], [21, -6], [21, -7], [21, -8], [21, -9], [21, -10], [21, -11], [21, -12], [21, -13], [21, -14], [21, -15],

        [23, 1], [23, 2], [23, -1], [23, -2], [23, -3], [23, -4], [23, -5], [23, -6], [23, -7], [23, -8], [23, -9], [23, -10], [23, -11], [23, -12], [23, -13], [23, -14], [23, -15],
        [24, 1], [24, 2], [24, -1], [24, -2], [24, -3], [24, -4], [24, -5], [24, -6], [24, -7], [24, -8], [24, -9], [24, -10], [24, -11], [24, -12], [24, -13], [24, -14], [24, -15],
        [25, 1], [25, -1], [25, -2], [25, -3], [25, -4], [25, -5], [25, -6], [25, -7], [25, -8], [25, -9], [25, -10], [25, -11], [25, -12], [25, -13], [25, -14], [25, -15]
    ];

    var cache = data;

    var circles;

    var margin = {top: 0, right: 60, bottom: 0, left: 60};
    var width = 600 - margin.left - margin.right;
    var height = 700 - margin.top - margin.bottom;

    var x = d3.scale.linear()
              .domain([0, 25])
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

    var points = [0, 1, 4, 9, 13, 16, 20, 25];

    // draw the x axis
    var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(25)
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
            .attr('cx', function (d) {
                return x(d[0]);
            })
            .attr('cy', function (d) {
                return y(d[1]);
            })
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
                $step.show();
                setTimeout(function () {
                    $step.addClass('current');
                }, 50);
                $current.removeClass('current');
                setTimeout(function () {
                    $current.hide();
                }, 500);
            } else {
                $step.show();
                setTimeout(function () {
                    $step.addClass('current');
                }, 50);
            }
        }
    }

    function scrollToGradient (val) {
        var width = $window.width();
        var percent = (val / 25) * 100;
        var pos = Math.round(width * (percent / 10)) + 'px';
        var rotation = Math.round(percent) * 1.95;
        $background.stop().animate({
            scrollLeft: pos
        }, 1000);
        $sun.css({
            '-webkit-transform': 'rotate(' + rotation + 'deg)',
            'transform': 'rotate(' + rotation + 'deg)'
        });
    }

    function createCustomTicks () {
        var ticks = svg.selectAll('.tick');
        ticks.append('circle').attr('r', 6).attr('fill', '#454545');
        ticks.selectAll('line').remove();
        ticks.moveToFront();
    }

    function updateProgressTick (val) {
        var ticks = d3.select('.axis').selectAll('circle');
        ticks.transition().attr('fill', function (d) {
            return d <= val ? '#4DF32B' : '#454545';
        });
    }

    function updateStats() {
        var visited = 0;
        var unknown = 0;

        cache.forEach(function (d) {
            if (d[1] > 0) {
                visited += 1;
            } else {
                unknown += 1;
            }
        });

        $visited.html(visited);
        $unknown.html(unknown);
    }

    var timer;

    var $slider = $('#slider').rangeslider({
        polyfill: false,
        onSlide: function (pos, value) {
            var val = parseInt(value, 10);
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

            updateProgressTick(val);

            timer = setTimeout(function () {
                scrollToGradient(val);
                showSlideContent(val);
                updateStats();
            }, 200);
        }
    });

    createCustomTicks();
    $slider.val(0).change();
});
