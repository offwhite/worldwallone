app = {
  init: function(){
    app.body = document.getElementsByTagName("BODY")[0]
    app.container = document.getElementById("theWall")
    app.width = window.innerWidth
    app.height = window.innerHeight
    app.mouseDown = false
    app.log = []
    app.setDefaults()
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
    app.brushSize = 40
    app.brushOpacity = 0.1
    app.color = 'red'
  },

  setOpacity: function(val){
    app.brushOpacity = val
  },

  setSize: function(size){
    app.brushSize = size
  },

  setColor: function(r,g,b){
    app.color = [r,g,b]
  },

  onMouseDown: function(e){
    app.mouseDown = true
    app.mouseX = e.clientX
    app.mouseY = e.clientY
    app.prevMouseX = app.mouseX
    app.prevMouseY = app.mouseY
    app.ctx.globalAlpha = app.brushOpacity
    app.ctx.strokeStyle = app.color
    app.ctx.lineWidth = app.brushSize
    app.ctx.lineJoin = app.ctx.lineCap = 'round'
    //app.ctx.shadowBlur = 10
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

    for (var i = 0; i < app.pointDistance; i++) {
      x = app.prevMouseX + (Math.sin(app.pointAngle) * i) - (app.brushSize / 2);
      y = app.prevMouseY + (Math.cos(app.pointAngle) * i) - (app.brushSize / 2);
      //app.ctx.drawImage(brush.current(), x, y, app.brushSize, app.brushSize);
      var radgrad = ctx.createRadialGradient(x,y,10,x,y,20);

      radgrad.addColorStop(0, '#000');
      radgrad.addColorStop(0.5, 'rgba(0,0,0,0.5)');
      radgrad.addColorStop(1, 'rgba(0,0,0,0)');

      //app.ctx.globalAlpha = 0.1
      app.ctx.fillStyle = radgrad;
      app.ctx.fillRect(x-20, y-20, 40, 40);
    }
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

tools = {
  init: function(){
    document.getElementById("opacity").onchange = function(){app.setOpacity(parseInt(this.value) / 100)}
    document.getElementById("size").onchange = function(){app.setSize(this.value)}
    document.getElementById("color").onchange = function(){
      str = this.value.split(',')
      app.setColor(str[0],str[1],str[2])
    }
    document.getElementById("clear").onclick = app.clearCanvas
    document.getElementById("replay").onclick = app.replay
    document.getElementById("rebuild").onclick = app.rebuildFromLog
    document.getElementById("undo").onclick = app.undo

  }
}

window.onload = function(){
  app.init();
  tools.init();
}
