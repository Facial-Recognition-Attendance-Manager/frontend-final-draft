const imageUpload = document.getElementById('imageUpload')

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('./packages/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./packages/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('./packages/models')
]).then(start)

async function start() {
  
  const container = document.createElement('div')
  container.style.position = 'relative'
  document.body.append(container)
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  let image
  let canvas
  document.getElementById('loadingArea').style.display="none";
  document.getElementById('loginArea').style.display="block";
  imageUpload.addEventListener('change', async () => {
    if (image) image.remove()
    if (canvas) canvas.remove()
    image = await faceapi.bufferToImage(imageUpload.files[0])
    container.append(image)
    canvas = faceapi.createCanvasFromMedia(image)
    container.append(canvas)
    const displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas, displaySize)
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    const arr=[];
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
      var j=result.toString();
      j=j.substring(0,j.indexOf('(')-1);
      arr.push(j);
      drawBox.draw(canvas)
    });

  
  })
}

function loadLabeledImages() {
  const labels = ['Álvaro Odriozola','Andriy Lunin','Antonio Rüdiger','Aurélien Tchouaméni','Daniel Carvajal','Daniel Ceballos','David Alaba','Eden Hazard','Éder Gabriel Militão','Eduardo Camavinga','Federico Valverde','Ferland Mendy','Jesús Vallejo Lázaro','Karim Benzema','Lucas Vázquez','Luka Modric','Marco Asensio','Mariano Díaz','Nacho Fernández','Rodrygo Goes','Thibaut Courtois','Toni Kroos','Vinicius Junior'];
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 1; i++) {
        const img = await faceapi.fetchImage(`https://res.cloudinary.com/abir82/image/upload/v1656400239/LabelledImages/${label}/${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}