import axios from 'axios'
import Stats from 'stats.js'

const stats = new Stats()
stats.showPanel(0)

const isLinked = window && window.location && window.location.hostname.match('myvtex.com')

const IMAGE_ROOT = isLinked
? `/_v/private/assets/v1/linked/${process.env.VTEX_APP_ID}/public/img`
: `https://vtexpages.vteximg.com.br/_v/public/assets/v1/published/${process.env.VTEX_APP_ID}/public/img`

function Queue(){var a=[],b=0;this.getLength=function(){return a.length-b};this.isEmpty=function(){return 0==a.length};this.enqueue=function(b){a.push(b)};this.dequeue=function(){if(0!=a.length){var c=a[b];2*++b>=a.length&&(a=a.slice(b),b=0);return c}};this.peek=function(){return 0<a.length?a[b]:void 0}};

const start = () => {
  var heatmap
  var heatmapData=[]
  var markers = []
  var images = []
  var markerInterval
  var messageInterval
  var timeConnect
  var connection
  var nextTime
  var queueImage = new Queue()
  var queueMarker = new Queue()
  var pendingMarkers = 0
  var pulseCanvas = document.querySelector('#overlay')
  var pulseContext = pulseCanvas.getContext('2d')
  var pulseResolution = 1
  // var heatmapCanvas = document.querySelector('#heatmap')
  // var heatmapContext = heatmapCanvas.getContext('2d')
  var galleryCanvas = document.querySelector('#image-gallery')
  var galleryContext = galleryCanvas.getContext('2d')
  var galleryResolution = 0.8
  var mapCanvas = document.querySelector('#map')
  var mapContext = mapCanvas.getContext('2d')
  var bordersMapCanvas = document.querySelector('#map-borders')
  var bordersMapContext = bordersMapCanvas.getContext('2d')
  var dayMapURL = `${IMAGE_ROOT}/world-map-2.svg`
  var nightMapURL = `${IMAGE_ROOT}/world-map-2-night.svg`
  var bordersMapURL = `${IMAGE_ROOT}/world-map-2-borders.svg`
  var nightBordersMapURL = `${IMAGE_ROOT}/world-map-2-night-borders.svg`
  var fps = 60
  var frame = 1000 / fps
  var errorCount = 0
  const imagesLimit = 200

  var dayMapImage
  var nightMapImage
  var bordersMapImage
  var nightBordersMapImage

  // size of the map image
  var mapWidth = 1009
  var mapHeight = 665

  var mapViewBounds = {
    bottomLeft: {
      x:50,
      y:600,
    },
    topRight: {
      x:900,
      y:280,
    }
  }

  var boundsSize = {
    width: mapViewBounds.topRight.x - mapViewBounds.bottomLeft.x,
    height: mapViewBounds.bottomLeft.y - mapViewBounds.topRight.y,
  }

  var boundsRatios = {
    width: mapWidth / boundsSize.width,
    height: mapHeight / boundsSize.height,
  }
  var boundsRatio = boundsSize.width/boundsSize.height
  var windowRatio = window.innerWidth/window.innerHeight
  var mapScale
  var mapOffset

  if (windowRatio < boundsRatio) {
    mapScale = window.innerWidth / boundsSize.width
    mapOffset = {
      x: -mapViewBounds.bottomLeft.x,
      y: -mapViewBounds.topRight.y + ((window.innerHeight/mapScale) - boundsSize.height)/2,
    }
  } else {
    mapScale = window.innerHeight / boundsSize.height
    mapOffset = {
      y: -mapViewBounds.topRight.y,
      x: -mapViewBounds.bottomLeft.x + ((window.innerWidth/mapScale) - boundsSize.width)/2,
    }
  }

  document.querySelector('#stats').appendChild(stats.dom)
  // AQUI
  // document.querySelector("#world-map").style.transform = "scale("+mapScale+") translate3d("+mapOffset.x+"px, "+mapOffset.y+"px, 0)"

  // Hardcoded rates for currency conversion. We don't need the most updated and precise numbers,
  //   just a slight idea of proportions.
  var conversionRates = {
    'ARS': 0.055,
    'BRL': 1,
    'CLP': 0.0068,
    'COP': 0.0014,
    'MXN': 0.26,
    'PEN': 1.38,
    'PYG': 0.00082,
    'RON': 1.26,
    'USD': 5.57,
    'CAD': 4.40,
    'UYU': 0.13,
    'EUR': 6.24,
    'CRC': 0.0087,
    'BOB': 0.81,
    'GTQ': 0.72,
  };

  function attempt() {
    console.log('attempt')
    connection = connect();
    if (localStorage.getItem('autCookie')) {
      document.querySelector('.loading').style.display='block'
    }
    openSocket();
  }

  function openSocket() {
    clearInterval(timeConnect)
    clearInterval(markerInterval)
    clearInterval(messageInterval)

    function onClose(event) {
      alert('on close '+String(event))
      setTimeout(attempt, 5000)
      // window.localStorage.removeItem('autCookie')
      // setTimeout(() => {
      //   var curAddress = window.location.href
      //   localStorage.removeItem('autCookie')
      //   // window.location.href = `/_v/auth-server/v1/login?ReturnUrl=${curAddress}`
      // }, 10000)

      // console.log('Closed')
      // clearInterval(timeConnect)
      // timeConnect = setInterval(openSocket, 1000)

      document.querySelector('.login').style.display = "block"
      document.querySelector('.loading').style.display='none'
    }

    function parseJwt (token) {
      try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
      } catch (e) {
        return null
      }
    };

    function onError(event) {
      if (event) {
        // alert('on error '+event.message)
        console.log('error message', event)
        console.log(JSON.stringify(event))
        console.table(event)
      } else {
        // alert('on error, no event')
      }
      errorCount++
      if (errorCount > 2) {
        window.localStorage.removeItem('autCookie')
      }
      setTimeout(attempt, 5000)
      document.querySelector('.login').style.display = "block"
      document.querySelector('.loading').style.display='none'
    }

    function onOpen() {
      // Connected
      console.log('Connected')
      document.querySelector('.login').style.display='none'
      document.querySelector('.loading').style.display='none'
      updateTokenMessage({ initial: true })
    }

    function updateTokenMessage({ initial }) {
      const jwt = parseJwt(localStorage.getItem('autCookie'))
      if (!jwt) {
        return
      }
      const expiry = new Date(jwt.exp*1000)
      const remaining = (jwt.exp-Date.now()/1000)
      const remainingHours = Math.floor(remaining/60/60)
      const remainingMinutes = Math.floor(((remaining/60/60)-remainingHours)*60)

      if (remainingHours > 1 && !initial) {
        return
      }

      document.querySelector('.valid').style.display='block'
      document.querySelector('.valid').innerHTML = `Token valid until ${expiry}. <br> Please refresh the page and generate a new token before then. <br> ${remainingHours} hour(s) ${remainingMinutes} minute(s) left`
      if (initial) {
        setTimeout(() => {
          document.querySelector('.valid').style.display='none'
        }, 5 * 1000)
      }
    }

    if (!connection) {
      console.log('no autCookie, no connection')
      onError()
      return
    }

    connection.onopen = onOpen
    connection.onerror = onError
    connection.onclose = onClose

    connection.onmessage = function onMessage (msg) {
      // console.log(msg.data)
      queueMarker.enqueue(msg.data)
      nextTime = getNextTime()
      errorCount = 0
    };

    markerInterval = setInterval(function handleMarkerQueue() {
      var now = new Date()
      var _nextTime = nextTime || getNextTime()
      var slots = Math.floor( (_nextTime - now.getTime()) / 2000)
      var chunk = 0

      if (slots > 0) {
        chunk = Math.ceil( queueMarker.getLength()/slots);
      }

      for (var i = chunk; i >= 0; i--) {
        moveQueue(chunk ? i*2000/chunk : 1)
      }

    }, 2000)

    messageInterval = setInterval(() => {
      updateTokenMessage({})
    }, 1000 * 60)

    function moveQueue(time) {
      pendingMarkers++
      var timeVariation=time*0.2
      setTimeout(function moveQueue() {
        if (!queueMarker.isEmpty()) {
          var markerData=queueMarker.dequeue()
          renderMarkers(markerData)
          pendingMarkers--
        }
      }, time + (-timeVariation + (Math.random()*timeVariation*2)))
    }

  } // End openSocket

  function connect() {
    console.log('connect')
    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }
    // TEMP FIX
    var autCookie = getCookie('VtexIdclientAutCookie') || null
    var url = "https://storedash-api.vtex.com/api/storedash/orderStream"

    if (!autCookie) {
      autCookie = localStorage.getItem('autCookie')
    }

    // if (!autCookie || autCookie === 'null') {
    //   autCookie = window.prompt('authToken')
    //   localStorage.setItem('autCookie', autCookie)
    // }

    if(autCookie) {
      url+='?authToken='+autCookie
    }

    if (!autCookie) {
      return
    }

    var evtSource = new EventSource(url);

    // evtSource.onerror = function (event) {
    //   console.log("Couldn't connect to Storedash OrderStream evtSource.");
    //   document.querySelector('.login').style.display='block'
    //   attempt()
    // };

    return evtSource;
  }

  function initialize() {
    document.getElementById('container').style.height = window.innerHeight + 'px'

    dayMapImage = new Image()
    nightMapImage = new Image()
    bordersMapImage = new Image()
    nightBordersMapImage = new Image()
    Promise.all([
      new Promise(function(resolve) {
        dayMapImage.addEventListener('load', function() {
          resolve(dayMapImage)
        })
      }),
      new Promise(function(resolve) {
        nightMapImage.addEventListener('load', function() {
          resolve(nightMapImage)
        })
      }),
      new Promise(function(resolve) {
        bordersMapImage.addEventListener('load', function() {
          resolve(bordersMapImage)
        })
      }),
      new Promise(function(resolve) {
        nightBordersMapImage.addEventListener('load', function() {
          resolve(nightBordersMapImage)
        })
      }),
    ]).then(function(){

      mapCanvas.setAttribute('width', window.innerWidth)
      mapCanvas.setAttribute('height', window.innerHeight)

      mapContext.save()

      mapContext.scale(mapScale, mapScale)
      mapContext.translate(mapOffset.x, mapOffset.y)
      mapContext.drawImage(dayMapImage, 0, 0)

      mapContext.save()

      var overlay = new DayNightOverlay()
      overlay.onAdd()
      overlay.draw(mapContext, mapWidth, mapHeight+390)
      mapContext.clip()
      mapContext.drawImage(nightMapImage, 0, 0)

      bordersMapCanvas.setAttribute('width', window.innerWidth)
      bordersMapCanvas.setAttribute('height', window.innerHeight)

      bordersMapContext.save()

      bordersMapContext.scale(mapScale, mapScale)
      bordersMapContext.translate(mapOffset.x, mapOffset.y)
      bordersMapContext.drawImage(bordersMapImage, 0, 0)

      bordersMapContext.save()

      overlay.draw(bordersMapContext, mapWidth, mapHeight+390)
      bordersMapContext.clip()
      bordersMapContext.drawImage(nightBordersMapImage, 0, 0)
    })
    dayMapImage.src = dayMapURL
    nightMapImage.src = nightMapURL
    bordersMapImage.src = bordersMapURL
    nightBordersMapImage.src = nightBordersMapURL

    initCanvas()
  }

  function initCanvas() {
    pulseCanvas.setAttribute('width',window.innerWidth*pulseResolution)
    pulseCanvas.setAttribute('height',window.innerHeight*pulseResolution)
    pulseCanvas.style.width = window.innerWidth+'px'
    pulseCanvas.style.height = window.innerHeight+'px'
    // heatmapCanvas.setAttribute('width',window.innerWidth)
    // heatmapCanvas.setAttribute('height',window.innerHeight)
    galleryCanvas.setAttribute('width',window.innerWidth*galleryResolution)
    galleryCanvas.setAttribute('height',window.innerHeight*galleryResolution)
    galleryCanvas.style.width = window.innerWidth+'px'
    galleryCanvas.style.height = window.innerHeight+'px'


    var markerSpeed = 0.002
    var markerColor = '#F71963'
    var highlightMarkerColor = '#ffc4dd'

    var imageSpeed = 0.0025

    function easeOutElastic(t, b, c, d) {
      var s=1.10158; var p=0;var a=c;
      if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.35;
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      return a*Math.pow(2,-15*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    }

    var start = null
    function update(delta) {
      pulseContext.clearRect(0,0, window.innerWidth*pulseResolution, window.innerHeight*pulseResolution)

      pulseContext.strokeStyle = markerColor

      for(let i=0; i< markers.length; i++){
        let marker = markers[i]
        var pulseT = Math.max(0, Math.min(1,marker.t*8)-(0.01+Math.min(0.13, marker.value*0.00001)))

        if(pulseT < 0.5) {
          // var pulseScale = Math.log10(Math.max(1, marker.value/200))+1
          var pulseScale = Math.log10(Math.max(1, marker.value/200))+1

          var initialPulseSize = 55*pulseScale
          // var initialPulseSize = 55*pulseScale

          var pulseSize = initialPulseSize*Math.pow(pulseT,1/2)
          // pulseContext.globalAlpha = Math.pow(1-pulseT,1/4)*0.4
          // pulseContext.lineWidth = pulseSize*2*Math.pow(1-pulseT, 8) * pulseResolution

          // pulseContext.lineWidth = (pulseSize*1.3)*1*Math.pow(1-pulseT, 8) * pulseResolution

          pulseContext.lineWidth = (pulseSize*2)*1*Math.pow(1-pulseT, 8) * pulseResolution

          // var lineWidth = pulseSize*2*Math.pow(1-pulseT, 8) * pulseResolution
          // pulseContext.strokeStyle = markerColor

          pulseContext.beginPath()
          pulseContext.arc(
            marker.x*pulseResolution, marker.y*pulseResolution,
            pulseSize*pulseResolution,
            0, 2*Math.PI
          )
          pulseContext.globalAlpha = 1
          pulseContext.stroke()
        }
        marker.t += markerSpeed*delta
      }

      pulseContext.globalAlpha = 1
      for(let i=0; i< markers.length; i++){
        let marker = markers[i]
        if(marker.t >= 1) continue

        pulseContext.beginPath()
        pulseContext.fillStyle = marker.t < 0.01 ? highlightMarkerColor : markerColor
        pulseContext.moveTo(marker.x*pulseResolution, marker.y*pulseResolution)
        pulseContext.arc(
          marker.x*pulseResolution, marker.y*pulseResolution,
          10*Math.pow(1-Math.abs(marker.t-(0+Math.min(marker.value*0.00001,0.02))),30)*pulseResolution,
          0, 2*Math.PI
        )
        pulseContext.fill()
      }
      pulseContext.globalAlpha = 1

      galleryContext.clearRect(0, 0, window.innerWidth*galleryResolution, window.innerHeight*galleryResolution)
      for(let i =0; i<images.length; i++){
        let image = images[i]
        if(image.t >= 1) continue

        var offset = Math.pow(image.t, 1/3) * 350
        var scale = Math.max(0.1, easeOutElastic(Math.min(1,image.t*2), 0, 1, 1))*(1+image.scale*0.6)
        var imageSize = 100
        var origin = {
          x: window.innerWidth - 100 - (image.origin * 60),
          y: window.innerHeight + 0,
        }
        var gravity = {
          x: 0,
          y: image.t * -(window.innerHeight - 300 + (image.gravityIncrease*300)),
        }
        var targetSize = imageSize * scale
        var oscilation = Math.sin(image.t*image.oscilationFreq*14)*image.oscilationAmp*40*(1+image.t*0.1)
        var targetPos = {
          x: origin.x+(Math.cos(image.direction)*offset)+oscilation+gravity.x,
          y: origin.y+(Math.sin(image.direction)*offset)+gravity.y,
        }
        image.y = targetPos.y

        galleryContext.drawImage(
          image.image,
          (targetPos.x - (targetSize/2))*galleryResolution,
          (targetPos.y - (targetSize/2))*galleryResolution,
          targetSize*galleryResolution,
          targetSize*galleryResolution,
        )

        // galleryContext.restore()

        // var speedIncreaseFactor = 0.2
        // image.t += imageSpeed*delta + (image.speedIncrease * speedIncreaseFactor)*Math.max(0, 1-image.t*4)*delta
        // image.speedIncrease *= 1 - speedIncreaseFactor*delta
        image.t += imageSpeed*delta
      }

      requestAnimationFrame(updateAgain)
    }
    let shouldUpdate = true
    function updateAgain(t){
      stats.begin()
      if(!start) start = t
      shouldUpdate = !shouldUpdate
      if(!shouldUpdate){
        requestAnimationFrame(updateAgain)
        return
      }
      var delta = (t - start)/frame
      start = t
      update(delta)
      stats.end()
    }
    updateAgain(performance.now())

    setInterval(function(){
      let i
      for(i = markers.length-1; i >= 0; i--){
        let marker = markers[i]
        if(marker.t >= 0.2) {
          markers.splice(i, 1)
        }
      }
      for(i = images.length-1; i >= 0; i--){
        let image = images[i]
        if(image.y < -100) {
          image.image = null
          images.splice(i, 1)
        }
      }
    }, 1000)
  }

  function getNextTime() {
    return new Date().getTime() + 15000
  }

  function addHeatMapPoint(x,y){
    heatmapContext.fillStyle='#ffc4dd'
    // heatmapContext.fillStyle='#F71963'
    heatmapContext.globalAlpha = 0.15
    heatmapContext.beginPath()
    heatmapContext.arc(x, y, 8, 0, 2*Math.PI)
    heatmapContext.fill()

    heatmapContext.globalAlpha = 1
    heatmapContext.beginPath()
    heatmapContext.arc(x, y, 0.5+(Math.random()*1.5), 0, 2*Math.PI)
    heatmapContext.fill()
  }

  function latLngToPoint(latitude, longitude, mapWidth, mapHeight) {
    // get x value
    const x = (longitude+180)*(mapWidth/360)

    // convert from degrees to radians
    const latRad = latitude*Math.PI/180;

    // get y value
    const mercN = Math.log(Math.tan((Math.PI/4)+(latRad/2)));
    const y     = (mapHeight/2)-(mapWidth*mercN/(2*Math.PI));

    return {x: x, y: y}
  }

  function renderMarkers(data) {
    data = JSON.parse(data)

    if (data.lat != 0 && data.long != 0 && data.transactionTotal) {
      var pos = latLngToPoint(data.lat, data.long, mapWidth*mapScale, mapHeight*mapScale)
      pos.x += (-30*mapScale)+(mapOffset.x*mapScale)
      pos.y += (130*mapScale)+(mapOffset.y*mapScale)

      const st = 1
      for (let i = 0; i<st; i++) {
        setTimeout(() => {
          showImage(data.accountName, data.salesChannel, data.sku, pos.x, pos.y)
            .then(function(){
              let value = 1
              if (conversionRates[data.transactionCurrency]) {
                value = data.transactionTotal * conversionRates[data.transactionCurrency];
              } else {
                console.warn('Missing conversion rate for ' + data.transactionCurrency);
              }

              var variation = 3
              pos.x += -variation + (Math.random() * variation * 2)
              pos.y += -variation + (Math.random() * variation * 2)

              markers.push({
                x: pos.x+(i>0 ? Math.random()*10 : 0),
                y: pos.y+(i>0 ? Math.random()*10 : 0),
                t: 0,
                value: value,
              })

              // addHeatMapPoint(pos.x, pos.y)
            })
        }, (2000/st)*i)
      }
    }
  }

  let statsVisible = false
  document.addEventListener('keydown', event => {
    if (event.key === 'f') {
      statsVisible = !statsVisible
      document.querySelector('#stats').style.display = statsVisible ? 'block' : 'none'
    }
  })
  var pending = 0

  async function getImageUrl(an, sc, skuId) {
    if (pending.length > 10) return Promise.reject()

    pending++

    const response = await axios({
      method: 'get',
      url: '/api/catalog_system/pub/products/search',
      params: {
        an: an,
        sc: sc,
        timeout: 500,
        fq: `skuId:${skuId}`,
      }
    })

    const {data} = response
    const sku = data[0].items.find(({itemId}) => itemId === skuId)
    const imageUrl = sku.images && sku.images.length > 0 && sku.images[0].imageUrl

    pending--
    if (imageUrl) {
      return imageUrl
    }

    throw new Error(`Couldn't load image. an=${an} sc=${sc} skuId=${skuId}`)
  }

  function resizeImageUrl(url, size){
    if(!url) return
    var idsRegex = /\/ids\/(\d*)\//

    var ids = url.match(idsRegex)
    if(ids && ids[1]){
      ids = ids[1]
    }else{
      return url
    }

    return url.replace(idsRegex, '/ids/'+ids+'-'+size+'-'+size+'/')
  }

  var loadImageDelay = 350
  var shouldLoadImage = true

  const loadImage = url => new Promise((resolve, reject) => {
    if(!shouldLoadImage){
      reject()
      return
    }
    var image=new Image()
    function onImageLoad(){
      image.removeEventListener('load', onImageLoad)
      resolve(image)
    }
    image.addEventListener('load', onImageLoad)
    image.src = url
    setTimeout(()=>{
      image.removeEventListener('load', onImageLoad)
      reject()
    }, 3000)

    shouldLoadImage = false
    setTimeout(() => { shouldLoadImage = true }, loadImageDelay)
  })

  function maskImage(image, size) {
    var canvas=document.createElement('canvas')
    canvas.setAttribute('width', size)
    canvas.setAttribute('height', size)
    var context = canvas.getContext('2d')

    context.fillStyle = 'white'
    context.save()
    context.globalAlpha = 1
    context.beginPath()
    context.arc(
      (size/2)*galleryResolution, (size/2)*galleryResolution,
      (size/2)*galleryResolution-2, 0, 2*Math.PI
    )
    context.fill()

    if (image){
      // context.strokeStyle = '#142032'
      // context.lineWidth = 2
      // context.stroke()

      context.beginPath()
      context.arc(
        (size/2)*galleryResolution, (size/2)*galleryResolution,
        (size/2)*galleryResolution-2, 0, 2*Math.PI
      )
      context.clip()

      context.drawImage(image, 1, 1)
    }
    return canvas
  }

  function addDummyImage(sourceX, sourceY){
    if (images.length >= imagesLimit) {
      return
    }
    images.unshift({
      image: maskImage(null, 100),
      t: 0,
      direction: -Math.PI/2, // + (-variation + Math.random()*variation*2),
      // oscilationFreq: Math.random(),
      // oscilationAmp: Math.random(),
      oscilationFreq: Math.random(),
      oscilationAmp: -1+(Math.random()*2),
      sourceX: sourceX,
      sourceY: sourceY,
      scale: -0.85-Math.random()*0.1,
      origin: 1,
      speedIncrease: 0,
      gravityIncrease: 1+Math.random()*2,
    })
  }
  function showImage(an, sc, skuId, sourceX, sourceY) {
    return new Promise(function(resolve) {
      getImageUrl(an, sc, skuId)
        .then(function(response) {
          var resizedUrl = resizeImageUrl(response, 100*galleryResolution)
          loadImage(resizedUrl).then(image=>{
            var variation = Math.PI/18
            // var speedIncrease = 0.05
            // images.forEach(image => {
            //   image.speedIncrease += 0.05
            // })
            var maskedImage = maskImage(image, 100)
            setTimeout(() => {
              images.push({
                image: maskedImage,
                t: 0,
                direction: -Math.PI/2, // + (-variation + Math.random()*variation*2),
                // oscilationFreq: Math.random(),
                // oscilationAmp: Math.random(),
                oscilationFreq: Math.random(),
                oscilationAmp: -1+(Math.random()*2),
                sourceX: sourceX,
                sourceY: sourceY,
                scale: Math.random(),
                origin: 1,
                speedIncrease: 0,
                gravityIncrease: Math.random(),
              })
              resolve()
            }, Math.random()*1000)
          }).catch(()=>{
            setTimeout(() => {
              addDummyImage(sourceX, sourceY)
              resolve()
            }, Math.random()*1000)
          })
        })
        .catch(function handleError() {
          setTimeout(() => {
            addDummyImage(sourceX, sourceY)
            resolve()
          }, Math.random()*1000)
        })
    })
  }

  initialize()

  attempt()

  setInterval(function reloadWindow() {
    window.location.reload(false);
  }, 10 * 60 * 1000);
}

export {
  IMAGE_ROOT,
  start
}
