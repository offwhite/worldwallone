app = {
  load: function(){
    var script = document.createElement('script')
    script.onload = app.init
    script.src = 'brushes/brushes.js'
    document.head.appendChild(script)
  },

  init: function(){
    app.body = document.getElementsByTagName("BODY")[0]
    app.container = document.getElementById("theWall")
    app.width = window.innerWidth
    app.height = window.innerHeight
    app.mouseDown = false
    app.log = []
    app.setDefaults()
    brush.init()
    app.creatCanvas()
    app.eventListeners()
  },

  eventListeners: function(){
    app.body.onresize = app.resize;
    app.canvas.onmousedown = app.onMouseDown
    app.canvas.onmouseup = app.onMouseUp
    app.canvas.onmouseenter = app.onMouseUp
    app.canvas.onmousemove = app.onMouseMove
  },

  creatCanvas: function(){
    app.canvas = document.createElement('canvas');
    app.canvas.id = "theWallCanvas";
    app.canvas.style.zIndex = 8;
    app.canvas.style.position = "absolute";
    app.clearCanvas()
    app.container.appendChild(app.canvas)
  },

  resize: function(){
    app.width = window.innerWidth
    app.height = window.innerHeight
  },

  setDefaults: function(){
    app.brushSize = 80
    app.brushOpacity = 0.2
    app.color = 'black'
  },

  setOpacity: function(val){
    app.brushOpacity = val
    brush.setBrush()
  },

  setSize: function(size){
    app.brushSize = size
  },

  setColor: function(color){
    app.color = color
    brush.setBrush()
  },

  onMouseDown: function(e){
    app.mouseDown = true
    app.mouseX = e.clientX
    app.mouseY = e.clientY
    app.prevMouseX = app.mouseX
    app.prevMouseY = app.mouseY
    app.makeMark(true)
  },

  onMouseUp: function(e){
    app.mouseDown = false
  },

  onMouseMove: function(e){
    if(app.mouseDown == false) return
    app.prevMouseX = app.mouseX
    app.prevMouseY = app.mouseY
    app.mouseX = e.clientX
    app.mouseY = e.clientY
    app.makeMark(true)
  },

  makeMark: function(recordToLog = true){
    if(recordToLog){
      app.logState()
    }
    app.setBrushStroke()

    app.ctx.globalAlpha = 1//app.brushOpacity

    for (var i = 0; i < app.pointDistance; i++) {
      x = app.prevMouseX + (Math.sin(app.pointAngle) * i) - (app.brushSize / 2);
      y = app.prevMouseY + (Math.cos(app.pointAngle) * i) - (app.brushSize / 2);
      app.ctx.drawImage(brush.current(), x, y, app.brushSize, app.brushSize);
    }
  },

  setBrushStroke: function(){
    Xa = app.prevMouseX; Ya = app.prevMouseY;
    Xb = app.mouseX;     Yb = app.mouseY;
    // stroke distance
    xD = (Xa < Xb) ? Xb - Xa : Xa - Xb
    yD = (Ya < Yb) ? Yb - Ya : Ya - Yb
    hyp = Math.sqrt((xD * xD) + (yD * yD))
    app.pointDistance = hyp
    // stroke angle
    app.pointAngle = Math.atan2(Xb-Xa,Yb-Ya);
    // stroke size
  },

  clearCanvas: function(recordToLog = true){
    app.canvas.width = 2000;
    app.canvas.height = 2000;

    app.ctx = app.canvas.getContext("2d")
    app.ctx.fillStyle = "white"
    app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height)
    if(recordToLog){
      app.log.push(['clear'])
    }
  },

  logState: function(){
    app.log.push([
      app.prevMouseX,app.prevMouseY,
      app.mouseX,app.mouseY,
      app.brushOpacity
    ])
  },

  replay: function(){
    //app.clearCanvas()
    app.replayLog(0)
    //console.log(app.log)
  },

  rebuildFromLog: function(){
    clearTimeout(app.logPlay)
    app.clearCanvas(false)
    for(i=0;i<app.log.length;i++){
      app.prevMouseX = app.log[i][0]
      app.prevMouseY = app.log[i][1]
      app.mouseX = app.log[i][2]
      app.mouseY = app.log[i][3]
      app.brushOpacity = app.log[i][4]
      app.makeMark(false)
    }
  },

  undo: function(){
    app.log.pop()
    app.rebuildFromLog()
  },

  replayLog: function(i){
    if(app.log[i] == undefined){return}
    if(app.log[i] == 'clear'){
      app.clearCanvas(false)
    }else{
      app.prevMouseX = app.log[i][0]
      app.prevMouseY = app.log[i][1]
      app.mouseX = app.log[i][2]
      app.mouseY = app.log[i][3]
      app.brushOpacity = app.log[i][4]
      app.makeMark(false)
    }
    app.logPlay = setTimeout(function(){app.replayLog(i+1)},1)
  }
}

brush = {
  init: function(){
    brush.brushes = loadBrushes()
    brush.selectedBrush = 0
    brush.container = document.getElementById("currentBrushHolder")
    brush.creatCanvas()
  },

  creatCanvas: function(){
    brush.canvas = document.createElement('canvas')
    brush.canvas.id = "currentBrush"
    brush.canvas.style.zIndex = 9
    brush.canvas.style.position = "absolute"
    brush.canvas.width = 100
    brush.canvas.height = 100
    brush.container.appendChild(brush.canvas)

    brush.ctx = brush.canvas.getContext("2d")
    brush.setBrush()
  },

  setBrush: function(){
    brush.canvas.width = 100
    brush.canvas.height = 100
    brush.ctx.fillStyle = app.color
    brush.ctx.globalAlpha = app.brushOpacity
    brush.paintBrush()
    brush.output = new Image
    brush.output.src = brush.canvas.toDataURL()
  },

  paintBrush: function(){
    b = brush.brushes[brush.selectedBrush]

    for(i=0;i<b.length;i++){
      brush.spat(b[i])
    }
  },

  spat: function(args){
    //brush.ctx.globalAlpha = args[3]
    brush.ctx.beginPath()
    brush.ctx.arc(args[0], args[1], args[2], 0, 2 * Math.PI)
    brush.ctx.fill()
  },

  current: function(){
    return brush.output
  }
}

tools = {
  init: function(){
    document.getElementById("opacity").onchange = function(){app.setOpacity(parseInt(this.value) / 1000)}
    document.getElementById("size").onchange = function(){app.setSize(this.value)}
    document.getElementById("color").onchange = function(){app.setColor(this.value)}
    document.getElementById("clear").onclick = app.clearCanvas
    document.getElementById("replay").onclick = app.replay
    document.getElementById("rebuild").onclick = app.rebuildFromLog
    document.getElementById("undo").onclick = app.undo

  }
}

window.onload = function(){
  app.load();
  tools.init();
}
