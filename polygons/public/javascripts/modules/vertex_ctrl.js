// Generated by CoffeeScript 1.6.3
(function() {
  define(["underscore", "backbone", "models/vertex", "collections/vertex_list"], function(_, Backbone, Vertex, model) {
    var VertexCtrl;
    VertexCtrl = (function() {
      function VertexCtrl() {
        var self, vertex_being_dragged;
        self = this;
        vertex_being_dragged = null;
        canvas.addEventListener("mousedown", function(e) {
          var ds, keyCode, node, order, pair, vertex;
          keyCode = e.which || e.keyCode;
          switch (keyCode) {
            case 1:
              if (vertex_being_dragged) {
                return vertex_being_dragged = null;
              } else {
                vertex_being_dragged = self.findVertex(e.pageX, e.pageY);
                if (!vertex_being_dragged) {
                  node = null;
                  if (model.length <= 2) {
                    node = model.length;
                  } else {
                    ds = [];
                    model.each(function(v) {
                      var d0, d1, n, x0, x1, y0, y1;
                      x1 = v.get("x");
                      y1 = v.get("y");
                      x0 = e.pageX;
                      y0 = e.pageY;
                      d0 = Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2);
                      d1 = Math.round(Math.sqrt(d0));
                      n = v.get("node");
                      return ds.push([n, d1]);
                    });
                    order = ds.sort(function(a, b) {
                      return a[1] - b[1];
                    });
                    pair = [order[0], order[1]].sort(function(a, b) {
                      return a - b;
                    });
                    if (pair[0][0] === 0 && pair[1][0] === model.length - 1) {
                      node = model.length;
                    } else {
                      node = pair[1][0];
                      model.each(function(v) {
                        if (v.get("node") >= node) {
                          return v.set("node", v.get("node") + 1);
                        }
                      });
                    }
                    console.log(node);
                  }
                  vertex = new Vertex({
                    x: e.pageX,
                    y: e.pageY,
                    radius: 10,
                    node: node
                  });
                }
                return model.add(vertex);
              }
              break;
            case 3:
              model.remove(self.findVertex(e.pageX, e.pageY));
              return window.oncontextmenu = function() {
                return false;
              };
            default:
              return null;
          }
        });
        canvas.addEventListener("mousemove", function(e) {
          if (vertex_being_dragged) {
            return vertex_being_dragged.set({
              x: e.pageX,
              y: e.pageY
            });
          }
        });
        document.onkeydown = function(e) {
          var keyCode, node;
          keyCode = e.which || e.keyCode;
          if (keyCode === 27) {
            node = vertex_being_dragged.get("node");
            model.remove(vertex_being_dragged);
            return model.each(function(v) {
              if (v.get("node") > node) {
                return v.set("node", v.get("node") - 1);
              }
            });
          }
        };
      }

      VertexCtrl.prototype.findVertex = function(x, y) {
        return model.find(function(vertex) {
          return vertex.contains(x, y, vertex.get("radius"));
        });
      };

      return VertexCtrl;

    })();
    return VertexCtrl;
  });

}).call(this);
