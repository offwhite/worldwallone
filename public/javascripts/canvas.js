app = {
  init(){
    app.body = document.getElementsByTagName("BODY")[0]
    app.container = document.getElementById("theWall")
    app.mouseDown = false
    app.lastMark = 0
    app.log = []
    app.postAjax = new XMLHttpRequest()
    app.getAjax = new XMLHttpRequest()
    app.defaults()
    app.creatCanvas()
    app.eventListeners()
    app.getMarks()
    ui.init()
  },

  defaults(){
    app.brushSize = 100
    app.color = 'black'
    app.opacity = 1
    app.hardness = 50
  },

  eventListeners(){
    app.uiCanvas.onmousedown = app.onMouseDown
    app.uiCanvas.onmouseup = app.onMouseUp
    app.uiCanvas.onmouseenter = app.onMouseUp
    app.uiCanvas.onmousemove = app.onMouseMove
  },

  creatCanvas(){
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

  onMouseDown(e){
    app.mouseDown = true
    app.points = [app.mouse]
  },

  onMouseMove: function(e){
    app.mouse = {x: e.clientX, y: e.clientY}
    app.renderCursor()
    if(app.mouseDown){
      app.points.push(app.mouse)
      app.renderMark(app.uiCtx)
    }
  },

  onMouseUp(){
    if(!app.mouseDown) return
    app.mouseDown = false
    app.renderCursor()
    app.renderMark(app.wallCtx)
    app.logMark()
  },

  renderMark(ctx){
    var softness = ((app.brushSize / 3) * ((100 - app.hardness) / 100))
    ctx.globalAlpha = app.opacity
    ctx.strokeStyle = app.color
    ctx.lineWidth = (app.brushSize - (softness*1.2))
    ctx.lineJoin = ctx.lineCap = 'round'
    ctx.filter = 'blur('+softness+'px)'
    ctx.beginPath();
    ctx.moveTo(app.points[0].x, app.points[0].y)
    for(i=0;i<app.points.length;i++){
      ctx.lineTo(app.points[i].x, app.points[i].y);
    }
    ctx.stroke()

    ctx.globalAlpha = 0.8
    ctx.lineWidth = 1
    ctx.strokeStyle = '#000'
    ctx.filter = 'none'
  },

  renderCursor(){
    app.clearUiCanvas()
    app.uiCtx.beginPath()
    app.uiCtx.arc(app.mouse.x, app.mouse.y, (app.brushSize/2), 0, 2 * Math.PI)
    app.uiCtx.stroke()
  },

  clearUiCanvas: function(){
    app.uiCtx.clearRect(0, 0, app.uiCanvas.width, app.uiCanvas.height);
  },

  logMark(){
    var data = {
      points:    app.points,
      opacity:   app.opacity,
      brushSize: app.brushSize,
      hardness:  app.hardness,
      color:     app.color
    }
    app.postAjax.open("POST", "/mark");
    app.postAjax.setRequestHeader("Content-Type", "application/json")
    app.postAjax.send(JSON.stringify(data))
  },

  getMarks(incSession = false){
    app.getAjax.open("GET", '/mark/'+app.lastMark)
    app.getAjax.setRequestHeader("Content-Type", "application/json")
    app.getAjax.onreadystatechange = function() {
      if (app.getAjax.readyState == XMLHttpRequest.DONE && app.getAjax.status == 200) {
        app.makeMarks(JSON.parse(app.getAjax.responseText))
        app.markPoll = setTimeout(app.getMarks, 1000)
      }
    }
    app.getAjax.send()
  },

  makeMarks(response){
    let ctx = app.wallCtx
    ctx.lineJoin = ctx.lineCap = 'round'

    console.log(response['marks'].length)
    for(i=0;i<response['marks'].length;i++){
      let mark = response['marks'][i]
      let softness = ((mark.brushSize / 3) * ((100 - mark.hardness) / 100))
      let points = JSON.parse(mark.pointsJson)
      ctx.globalAlpha = mark.opacity
      ctx.strokeStyle = mark.color
      ctx.lineWidth = (mark.brushSize - (softness*1.2))
      ctx.filter = 'blur('+softness+'px)'

      ctx.beginPath();
      ctx.moveTo(points[0].x,points[0].y)
      for(p=0;p<points.length;p++){
        ctx.lineTo(points[p].x, points[p].y);
      }
      ctx.stroke()
      app.lastMark = mark.createdAt
    }

    console.log('drawn', app.lastMark )
  }
}


window.onload = function(){
  app.init()
}
