
brush = {
  init: function(){
    brush.container = document.getElementById("brushPreview")
    brush.creatCanvas()
  },

  creatCanvas: function(){
    brush.canvas = document.createElement('canvas')
    brush.canvas.id = "currentBrush"
    brush.canvas.style.zIndex = 9
    brush.canvas.style.position = "absolute"
    brush.container.appendChild(brush.canvas)

    brush.ctx = brush.canvas.getContext("2d")
    brush.setBrush()
  },

  generate: function(){
    brush.canvas.width = 300
    brush.canvas.height = 300
    brush.output = []
    // center group
    brush.genGroup(
      50 - (parseInt(document.getElementById("inner_min").value) / 2),
      50 + (parseInt(document.getElementById("inner_min").value)/2),
      parseInt(document.getElementById("inner_count").value),
      parseInt(document.getElementById("inner_size").value),
    )
    // mid group
    brush.genGroup(
      50 - (parseInt(document.getElementById("mid_min").value)/2),
      50 + (parseInt(document.getElementById("mid_min").value)/2),
      parseInt(document.getElementById("mid_count").value),
      parseInt(document.getElementById("mid_size").value),
    )
    // outer group
    brush.genGroup(
      50 - (parseInt(document.getElementById("out_min").value)/2),
      50 + (parseInt(document.getElementById("out_min").value)/2),
      parseInt(document.getElementById("out_count").value),
      parseInt(document.getElementById("out_size").value),
    )

    document.getElementById("brush_file_output").value = JSON.stringify(brush.output)
  },

  genGroup: function(min, max, count, max_size){
    for(i=0;i<count;i++){
      x = Math.floor(Math.random() * (max - min)) + min;
      y = Math.floor(Math.random() * (max - min)) + min;
      s = Math.floor(Math.random() * (max_size - 1)) + 1;
      o = (Math.floor(Math.random() * (100 - 10)) + 10) / 100;
      brush.splat([x,y,s,o])
      brush.output.push([x,y,s,o])
    }
  },

  setBrush: function(){
    brush.canvas.width = 300
    brush.canvas.height = 300
    brush.ctx.fillStyle = 'black'
    brush.output = new Image
    brush.output.src = brush.canvas.toDataURL()
  },

  splat: function(args){
    brush.ctx.globalAlpha = args[3]
    brush.ctx.beginPath()
    brush.ctx.arc(args[0]*3, args[1]*3, args[2]*3, 0, 2 * Math.PI)
    brush.ctx.fill()
  },

  current: function(){
    return brush.output
  }
}

tools = {
  init: function(){
    document.getElementById("generate").onclick = brush.generate
  }
}

window.onload = function(){
  brush.init();
  tools.init();
}
