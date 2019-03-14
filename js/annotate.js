
// Modifying the RTC video using information from this site:
// https://deepstreamhub.com/tutorials/protocols/webrtc-video-manipulation/#live-demo

//var localStream;
//var inputCtx = $('#rtcRenderer').getContext('2d');

"use strict";

let oldStream = null;
let isAnnotating = false;

function initialize() {
    try {
        document
            .getElementById("annotate_btn")
            .addEventListener("click", onAnnotateButtonPressed);
    } catch (e) {
        console.log("Initilization error: " + e.message || e, true);
    }
}

function onAnnotateButtonPressed() {
    if (isAnnotating) {
        stopAnnotating();
    } else {
        startAnnotating();
    }
}

function stopAnnotating() {
    let e = document.getElementById("annotate_btn");
    let v = e.value;
    e.value = "Start Annotate";
    isAnnotating = false;
    let videoPreview = document.getElementById("previewVideo");
    videoPreview.srcObject = oldStream;
}

function startAnnotating() {
    let e = document.getElementById("annotate_btn");
    let v = e.value;
    e.value = "Stop Annotate";
    isAnnotating = true;

    let videoPreview = document.getElementById("previewVideo");
    oldStream = videoPreview.srcObject;
    let outputCanvas = $('.output-canvas canvas')[0];
    videoPreview.srcObject = outputCanvas.captureStream();

    drawToCanvas();
}

function drawToCanvas() {

    if (!isAnnotating) return;

    let localVideo = $('#rtcRenderer')[0];
    //let videoRenderer = document.getElementById("rtcRenderer");
    let inputCtx = $('.input-canvas canvas')[0].getContext('2d');
    let width = 300;
    let height = 225;
    let outputCanvas = $('.output-canvas canvas')[0];
    let outputCtx = outputCanvas.getContext('2d');

    // draw video to input canvas
    inputCtx.drawImage(localVideo, 0, 0, width, height);

    // get pixel data from input canvas
    var pixelData = inputCtx.getImageData(0, 0, width, height);

    var avg, i;

    // simple greyscale transformation
    for (i = 0; i < pixelData.data.length; i += 4) {
        avg = (pixelData.data[i] + pixelData.data[i + 1] + pixelData.data[i + 2]) / 3;
        pixelData.data[i] = avg;
        pixelData.data[i + 1] = avg;
        pixelData.data[i + 2] = avg;
    }

    outputCtx.putImageData(pixelData, 0, 0);
    requestAnimationFrame(drawToCanvas);
}

initialize();