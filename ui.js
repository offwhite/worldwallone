ui = {
  init: function(){
    ui.opacity = document.getElementById("opacity")
    ui.size = document.getElementById("size")
    ui.color = document.getElementById("color")
    ui.hardness = document.getElementById("hardness")
    ui.clear = document.getElementById("clear")
    ui.initSliders()

    // set current vals
    ui.opacity.value = app.opacity * 100
    ui.size.value = app.brushSize
    ui.color.value = app.color
    ui.hardness.value = app.hardness

    //events
    ui.opacity.onchange = function(){ui.setOpacity(parseInt(this.value) / 100)}
    ui.size.onchange = function(){ui.setSize(this.value)}
    ui.hardness.onchange = function(){ui.sethardness(this.value)}
    ui.color.onchange = function(){ui.setColor(this.value)}
    ui.clear.onclick = ui.clearCanvas
  },

  initSliders: function(){
    var sliders = document.getElementsByClassName("slider")
    for(i=0;i<sliders.length;i++){
      input = sliders[i]
      sliderBar = document.createElement('div')
      sliderBar.className = 'sliderBar';
      sliderHandle = document.createElement('div')
      sliderHandle.style.left = 0
      sliderBar.appendChild(sliderHandle)
      input.parentNode.insertBefore(sliderBar, input)

      sliderHandle.onmousedown = function(e){
        ui.mouseOrigin = {x: e.clientX, y: e.clientY}
        this.startPosition = parseInt(this.style.left, 10)
        ui.selectedSlider = this
        app.body.addEventListener('mousemove', ui.mouseMove)
        app.body.addEventListener('mouseup', ui.mouseUp)
      }
    }

  },

  mouseMove: function(e){
    ui.mouse = {x: e.clientX, y: e.clientY}
    mouseDelta = {x: ui.mouse.x - ui.mouseOrigin.x, y: ui.mouse.y - ui.mouseOrigin.y}
    slider = ui.selectedSlider.parentNode
    position = slider.getBoundingClientRect()
    newLeft = ui.selectedSlider.startPosition + mouseDelta.x
    newLeft = newLeft < 0 ? 0 : newLeft
    ui.selectedSlider.style.left = newLeft + 'px'
  },

  mouseUp: function(e){
    app.body.removeEventListener('mousemove', ui.mouseMove)
    app.body.removeEventListener('mouseup', ui.mouseUp)
  },

  clearCanvas: function(){
    app.ctx.restore();
    console.log('restored')
  },

  setOpacity: function(val){
    app.opacity = val
  },

  setSize: function(size){
    app.brushSize = size
  },

  setSize: function(size){
    app.brushSize = size
  },

  sethardness: function(val){
    app.hardness = val
  },

  setColor: function(colur){
    app.color = colur
  },
}
