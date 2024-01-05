function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', model_loaded)
}
function draw() {
  image(video, 0, 0, 300, 300)
  classifier.classify(video, got_results)
}
function model_loaded() {
  console.log("model loaded")
}
previous_result = ""
function got_results(error, results) {
  if (error) {
    console.error(error)
  }
  else {
    console.log(results)
    if ((results[0].confidence > 0.5) && (previous_result != results[0].label)) {
      previous_result = results[0].label
      document.getElementById("result_name").innerHTML = results[0].label
      document.getElementById("result_accuracy").innerHTML = results[0].confidence.toFixed(2)
      var synth = window.speechSynthesis;
       speak_data = 'Object detected is - ' + results[0].label;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
         synth.speak(utterThis);
    }
  }
}
