/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

$(function() {
    'use strict';

    var data = {
     "name": "You",
     "root": true,
     "size": 50000,
     "children": [
      {
       "name": "analytics",
       "size": 50000,
       "children": [
        {
         "name": "cluster",
         "size": 40000,
         "children": [
          {"name": "AgglomerativeCluster", "size": 3938},
          {"name": "CommunityStructure", "size": 3812}
         ]
        },
        {
         "name": "cluster",
         "size": 40000,
         "children": [
          {"name": "AgglomerativeCluster", "size": 3938},
          {"name": "CommunityStructure", "size": 3812},
          {"name": "HierarchicalCluster", "size": 6714},
          {"name": "MergeEdge", "size": 743}
         ]
        },
        {
         "name": "cluster",
         "size": 40000,
         "children": [
          {"name": "AgglomerativeCluster", "size": 3938},
          {"name": "CommunityStructure", "size": 3812},
          {"name": "HierarchicalCluster", "size": 6714},
          {"name": "MergeEdge", "size": 7435}
         ]
        }
       ]
      },
      {"name": "AgglomerativeCluster", "size": 3938},
      {"name": "CommunityStructure", "size": 3812},
      {"name": "HierarchicalCluster", "size": 6714}
     ]
    };

    var width = 1000;
    var height = 500;
    var root;

    var force = d3.layout.force()
        .linkDistance(80)
        .charge(-100)
        .gravity(.01)
        .size([width, height])
        .on('tick', tick);

    var svg = d3.select('#lightbeam')
        .attr('width', width)
        .attr('height', height);

    var link = svg.selectAll('.link'),
        node = svg.selectAll('.node');

    root = data;

    var nodes = flatten(root);
    nodes.forEach(function(d) {
        d._children = d.children;
        d.children = null;
    });

    update();

    setWaypoints();

    function update() {
        var nodes = flatten(root);
        var links = d3.layout.tree().links(nodes);

        // Restart the force layout.
        force.nodes(nodes).links(links).start();

        // Update links.
        link = link.data(links, function(d) {
            return d.target.id;
        });

        link.exit().remove();

        link.enter().insert('line', '.node').attr('class', 'link');

        // Update nodes.
        node = node.data(nodes, function(d) {
            return d.id;
        });

        node.exit().remove();

        var nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            //.on('click', click)
            .call(force.drag);

        nodeEnter.append('circle')
            .attr('r', function(d) {
                return Math.sqrt(d.size) / 10 || 15;
            })
            .attr('class', function(d) {
                return d.root ? 'root' : '';
            });

        // nodeEnter.append('text')
        //     .attr('dy', '.35em')
        //     .text(function(d) {
        //         return d.name;
        //     });

        node.select('circle')
            .style('fill', color);
    }

    function tick() {

        link.attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

        node.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });
    }

    function color(d) {
        return d.root ? '#fff'
            : d._children ? '#1BA5E0' // collapsed package
            : d.children ? '#1BA5E0' // expanded package
            : '#BAD3EB'; // leaf node
    }

    // Toggle children on click.
    function click(d) {
        if (d3.event.defaultPrevented) {
            return; // ignore drag
        }
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update();
    }

    // Returns a list of all nodes under the root.
    function flatten(root) {
        var nodes = [];
        var i = 0;

        function recurse(node) {
            if (node.children) {
                node.children.forEach(recurse);
            }
            if (!node.id) {
                node.id = ++i;
            }
            nodes.push(node);
        }

        recurse(root);
        return nodes;
    }

    function setWaypoints() {
        $('.svg-container').waypoint(function (direction) {
            if (direction === 'down') {
                $('.svg-container').addClass('stuck');
                $('.copy-container').addClass('stuck');
            } else {
                $('.svg-container').removeClass('stuck');
                $('.copy-container').removeClass('stuck');
            }
        });

        $('.you-hook').waypoint(function (direction) {
            if (direction === 'down') {
                $('.you').addClass('show');
            } else {
                $('.you').removeClass('show');
            }
        }, {
            offset: 50
        });

        $('.with-you-hook').waypoint(function (direction) {
            var nodes = flatten(root);
            if (direction === 'down') {
                nodes.forEach(function(d) {
                    if (!d.children) {
                        d.children = d._children;
                        d._children = null;
                    }
                });
                $('.you').removeClass('show');
                $('.with-you').addClass('show');
            } else {
                nodes.forEach(function(d) {
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    }
                });
                $('.you').addClass('show');
                $('.with-you').removeClass('show');
            }
            update();
        }, {
            offset: '25%'
        });

        $('.other-people-hook').waypoint(function (direction) {
            var nodes;
            if (direction === 'down') {
                nodes = flatten(root);
                nodes.forEach(function(d) {
                    if (!d.children) {
                        d.children = d._children;
                        d._children = null;
                    }
                });
                nodes = flatten(root);
                nodes.forEach(function(d) {
                    if (!d.children) {
                        d.children = d._children;
                        d._children = null;
                    }
                });
                nodes = flatten(root);
                nodes.forEach(function(d) {
                    if (!d.children) {
                        d.children = d._children;
                        d._children = null;
                    }
                });
                $('.with-you').removeClass('show');
                $('.other-people').addClass('show');
            } else {
                nodes = flatten(root);
                nodes.forEach(function(d) {
                    if (d.children && !d.root) {
                        d._children = d.children;
                        d.children = null;
                    }
                });
                $('.with-you').addClass('show');
                $('.other-people').removeClass('show');
            }
            update();
        }, {
            offset: '25%'
        });

        $('#average').waypoint(function (direction) {
            if (direction === 'down') {
                $('.svg-container').removeClass('stuck');
            } else {
                $('.svg-container').addClass('stuck');
            }
        });
    }
});
