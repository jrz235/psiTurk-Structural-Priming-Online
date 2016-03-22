// variables
var leftchannel = [];
var rightchannel = [];
var recorder = null;
var recording = false;
var recordingLength = 0;
var volume = null;
var audioInput = null;
var sampleRate = null;
var audioContext = null;
var context = null;
var outputElement = document.getElementById('output');
var outputString;

// getUserMedia
var promisifiedOldGUM = function(constraints, successCallback, errorCallback) {

  // First get ahold of getUserMedia, if present
  var getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia);

  // Some browsers just don't implement it - return a rejected promise with an error
  // to keep a consistent interface
  if(!getUserMedia) {
    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
  }

  // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
  return new Promise(function(successCallback, errorCallback) {
    getUserMedia.call(navigator, constraints, successCallback, errorCallback);
  });
        
}

// Older browsers might not implement mediaDevices at all, so we set an empty object first
if(navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if(navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
}


var constraints = { audio: true };

navigator.mediaDevices.getUserMedia(constraints)
.then(function success(e){
    // creates the audio context
    audioContext = window.AudioContext || window.webkitAudioContext;
    context = new audioContext();

    // we query the context sample rate (varies depending on platforms)
    sampleRate = context.sampleRate;

    console.log('succcess');
    outputElement.innerHTML = 'Ready to record.';
    
    // creates a gain node
    volume = context.createGain();

    // creates an audio node from the microphone incoming stream
    audioInput = context.createMediaStreamSource(e);

    // connect the stream to the gain node
    audioInput.connect(volume);

    /* From the spec: This value controls how frequently the audioprocess event is 
    dispatched and how many sample-frames need to be processed each call. 
    Lower values for buffer size will result in a lower (better) latency. 
    Higher values will be necessary to avoid audio breakup and glitches */
    var bufferSize = 2048;
    recorder = context.createScriptProcessor(bufferSize, 2, 2);

    recorder.onaudioprocess = function(e){
        if (!recording) return;
        var left = e.inputBuffer.getChannelData (0);
        var right = e.inputBuffer.getChannelData (1);
        // we clone the samples
        leftchannel.push (new Float32Array (left));
        rightchannel.push (new Float32Array (right));
        recordingLength += bufferSize;
        console.log('recording');
    }

    // we connect the recorder
    volume.connect (recorder);
    recorder.connect (context.destination); 
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});

/*
if (!navigator.getUserMedia){
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                  navigator.mozGetUserMedia || navigator.msGetUserMedia;
}

if (navigator.getUserMedia){
    navigator.getUserMedia({audio:true}, success, function(e) {
    alert('Error capturing audio.');
    });
} else alert('getUserMedia not supported in this browser.');
*/

// when key is down
function startRecording(button) {
    
    // if R is pressed, we start recording
    // if ( button.keyCode == 82 ){
        recording = true;
        // disable/enable buttons appropriately
        button.disabled = true;
        document.getElementById('rec-span-aud').setAttribute('class','glyphicon glyphicon-remove-circle'); // add for exp.
        button.nextElementSibling.disabled = false;
        // reset the buffers for the new recording
        leftchannel.length = rightchannel.length = 0;
        recordingLength = 0;
        outputElement.innerHTML = 'Recording...';
    // if S is pressed, we stop the recording and package the WAV file
    // } else if ( e.keyCode == 83 ){
}

function stopRecording(button) {
        
        // we stop recording
        recording = false;

        // disable/enable buttons appropriately
        button.disabled = true;
        // button.previousElementSibling.disabled = false; // delete for exp.

        // we flat the left and right channels down
        var leftBuffer = mergeBuffers ( leftchannel, recordingLength );
        var rightBuffer = mergeBuffers ( rightchannel, recordingLength );
        // we interleave both channels together
        var interleaved = interleave ( leftBuffer, rightBuffer );
        
        // we create our wav file
        var buffer = new ArrayBuffer(44 + interleaved.length * 2);
        var view = new DataView(buffer);
        
        // RIFF chunk descriptor
        writeUTFBytes(view, 0, 'RIFF');
        view.setUint32(4, 44 + interleaved.length * 2, true);
        writeUTFBytes(view, 8, 'WAVE');
        // FMT sub-chunk
        writeUTFBytes(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        // stereo (2 channels)
        view.setUint16(22, 2, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 4, true);
        view.setUint16(32, 4, true);
        view.setUint16(34, 16, true);
        // data sub-chunk
        writeUTFBytes(view, 36, 'data');
        view.setUint32(40, interleaved.length * 2, true);
        
        // write the PCM samples
        var lng = interleaved.length;
        var index = 44;
        var volume = 1;
        for (var i = 0; i < lng; i++){
            view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
            index += 2;
        }
        
        // get worker and trial info
        var trial = document.getElementById('trial_info').innerHTML;

        // our final binary blob
        var blob = new Blob ( [ view ], { type : 'audio/wav' } );
        var fileName = encodeURIComponent(worker + "_" + trial + ".wav");
        // console.log(fileName);

        // let's display it within the page
        function createDownloadLink(blob, fileName) {
            // outputElement.innerHTML = 'Saving file...';
            var url = (window.URL || window.webkitURL).createObjectURL(blob);
            /* var link = window.document.createElement('a');
            link.href = url;
            link.download = 'output.wav';
            var click = document.createEvent("Event");
            click.initEvent("click", true, true);
            link.dispatchEvent(click); */
            // var li = document.createElement('li');
            
            if (document.getElementById('testAudio')){
              document.getElementById('testAudio').remove();
            }

            var au = document.createElement('audio')
            au.id = 'testAudio';
            // var hf = document.createElement('a');

            au.controls = true;
            au.src = decodeURIComponent(url);
            // hf.href = url;
            // hf.download = fileName;
            // hf.innerHTML = hf.download;
            recordingslist.appendChild(au);
            // li.appendChild(hf);
            // recordingslist.appendChild(li);

            outputElement.innerHTML = 'File saved.';
        }

        // let's save it to the server
        function upload(blobOrFile) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', 'SERVER URL'+fileName, true);
          /* xhr.onload = function(e) {};
          // Listen to the upload progress.
          // assuming you have a progress element on your dom
          var progressBar = document.querySelector('progress');
          xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
              progressBar.value = (e.loaded / e.total) * 100;
              progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
            }
          }; */
         
          xhr.send(blobOrFile);

          outputElement.innerHTML = 'File saved.';
        }

        // createDownloadLink(blob, fileName);
        upload(blob);
}

function interleave(leftChannel, rightChannel){
  var length = leftChannel.length + rightChannel.length;
  var result = new Float32Array(length);

  var inputIndex = 0;

  for (var index = 0; index < length; ){
    result[index++] = leftChannel[inputIndex];
    result[index++] = rightChannel[inputIndex];
    inputIndex++;
  }
  return result;
}

function mergeBuffers(channelBuffer, recordingLength){
  var result = new Float32Array(recordingLength);
  var offset = 0;
  var lng = channelBuffer.length;
  for (var i = 0; i < lng; i++){
    var buffer = channelBuffer[i];
    result.set(buffer, offset);
    offset += buffer.length;
  }
  return result;
}

function writeUTFBytes(view, offset, string){ 
  var lng = string.length;
  for (var i = 0; i < lng; i++){
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

// success function goes here

function endAudioStream() {
    if (context.state != "closed") {
    context.close();
    }
}
