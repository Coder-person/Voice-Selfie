var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function sendButton(){
    document.getElementById("text_converter").innerHTML = "";
    recognition.start();
}
recognition.onresult = function(event){
    console.log(event);
    var content = event.results[0][0].transcript;
    console.log(content);
    document.getElementById("text_converter").innerHTML = content;
    if(content=="take my selfie"){
        console.log("Taking selfie");
        speakcomputer();
    }
}


var camera = document.getElementById("camera");

Webcam.set({
    width:360,
    height:250,
    image_format:'jpeg',
    jpeg_quality:90
});

function speakcomputer(){
    var synth = window.speechSynthesis;
    // speak_data = document.getElementById("text_converter").value;
    speak_data = "Taking your selfie in 5 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data); 
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function(){
        take_snapshot();
        save();
    } , 5000);
}

function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("takenPicture").innerHTML = "<img id='picture' src='"+data_uri+"'>";
    });
}

function save(){
    link = document.getElementById("selfie_link");
    image = document.getElementById("picture").src;
    link.href = image;
    link.click();
}