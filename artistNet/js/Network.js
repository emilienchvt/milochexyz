function Network () {

  this.nodes = [];
  this.edges = [];
  this.eventHandler = function(obj){
    console.log(obj.nodes[0])
  };

  // Add a Node to the Network, checking it does not already exist.
  this.addNode = function(node){
    var isin=false
    for (i in this.nodes){
      if(this.nodes[i].id==node.id){
        isin= true
      }
    }
    if (isin==false){
      this.nodes.push(node)
    }
  };

  // get a node by Id
  this.getNode=function(id){
    for (i in this.nodes){
      if (this.nodes[i].id==id){
        return this.nodes[i]
      }
    }
    return 0
  }

  this.getIndex=function(id){
    for (i in this.nodes){
      if (this.nodes[i].id==id){
        return i
      }
    }
    return 0
  }

  // some duplicate and nodeExist checks might be implemented here, but we don't need it for this app
  this.addEdge = function(fromId, toId){
    var newEdge = {
      from: fromId,
      to: toId,
      length: 10,
      width: 2,
    }
    this.edges.push(newEdge);
  }

  //plot the graph using visjs Improvements ?
  this.plot=function(container='mynetwork'){
    var network;
    var container = document.getElementById(container);
    var options = {
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
      // layout:{
      //   improvedLayout: true
      // },
      edges: {
        color:{inherit:true},
        width: 0.15,
        smooth: {
          // type: 'continuous'
        }
      },
      interaction: {
        hideEdgesOnDrag: true,
        tooltipDelay: 200
      },
      physics: { stabilization: true }
    };

    var data = {nodes:this.nodes, edges:this.edges};
    network = new vis.Network(container, data, options);

    network.on('selectNode', this.eventHandler)
  }
}
