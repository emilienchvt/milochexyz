var plot = function(){
  var network;
  var container = document.getElementById('mynetwork');
  var options = {
    clickToUse:true,
    nodes: {
      shape: 'dot',
      scaling: {
        min: 10,
        max: 30
      },
      font: {
        size: 12,
        face: 'Tahoma'
      }
    },
    edges: {
      color:{inherit:true},
      width: 0.15,
      smooth: {
        type: 'continuous'
      }
    },
    interaction: {
      hideEdgesOnDrag: true,
      tooltipDelay: 200
    },
    physics: false
  };

  var data = {nodes:nodes, edges:edges};
  network = new vis.Network(container, data, options);
}
