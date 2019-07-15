app = {
  init: function(){
    app.body = document.getElementsByTagName("BODY")[0]
    app.container = document.getElementById("theWall")
    app.mouseDown = false
    app.log = []
    app.defaults()
    app.creatCanvas()
    app.eventListeners()
    ui.init()
  },

  defaults: function(){
    app.brushSize = 100
    app.color = 'black'
    app.opacity = 1
    app.hardness = 50
  },

  eventListeners: function(){
    app.uiCanvas.onmousedown = app.onMouseDown
    app.uiCanvas.onmouseup = app.onMouseUp
    app.uiCanvas.onmouseenter = app.onMouseUp
    app.uiCanvas.onmousemove = app.onMouseMove
  },

  creatCanvas: function(){
    app.wallCanvas = document.createElement('canvas')
    app.wallCanvas.id = "theWallCanvas"
    app.wallCanvas.style.zIndex = 8
    app.wallCtx = app.wallCanvas.getContext("2d")
    app.wallCanvas.width = 2000
    app.wallCanvas.height = 2000
    app.container.appendChild(app.wallCanvas)

    app.uiCanvas = document.createElement('canvas')
    app.uiCanvas.id = "uiCanvas"
    app.uiCanvas.style.zIndex = 9
    app.uiCtx = app.uiCanvas.getContext("2d")
    app.uiCanvas.width = 2000
    app.uiCanvas.height = 2000
    app.container.appendChild(app.uiCanvas)
  },

  onMouseDown: function(e){
    app.mouseDown = true
    app.cs = [app.mouse]
  },

  onMouseMove: function(e){
    app.mouse = {x: e.clientX, y: e.clientY}
    app.renderCursor()
    if(app.mouseDown){
      app.cs.push(app.mouse)
      app.renderStroke(app.cs, app.uiCtx)
    }
  },

  onMouseUp: function(){
    if(!app.mouseDown) return
    app.mouseDown = false
    app.renderCursor()
    app.renderStroke(app.cs, app.wallCtx)
  },

  renderStroke: function(arr, ctx){
    var softness = ((app.brushSize / 3) * ((100 - app.hardness) / 100))
    ctx.globalAlpha = app.opacity
    ctx.strokeStyle = app.color
    ctx.lineWidth = (app.brushSize - (softness*1.2))
    ctx.filter = 'blur('+softness+'px)';
    ctx.lineJoin = ctx.lineCap = 'round'
    ctx.beginPath();
    ctx.moveTo(arr[0].x, arr[0].y)
    for(i=0;i<arr.length;i++){
      ctx.lineTo(arr[i].x, arr[i].y);
    }
    ctx.stroke()

    ctx.globalAlpha = 0.8
    ctx.lineWidth = 1
    ctx.strokeStyle = '#000'
    ctx.filter = 'none'
  },

  renderCursor: function(){
    app.clearUiCanvas()
    app.uiCtx.beginPath()
    app.uiCtx.arc(app.mouse.x, app.mouse.y, (app.brushSize/2), 0, 2 * Math.PI)
    app.uiCtx.stroke()
  },

  clearUiCanvas: function(){
    app.uiCtx.clearRect(0, 0, app.uiCanvas.width, app.uiCanvas.height);
  }
}


window.onload = function(){
  app.init()
}
