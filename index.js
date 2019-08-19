// Remove elements if they exists
// playback && playback.remove()
// stop && stop.remove()
// start && start.remove()
// container && container.remove()

// Elements.

var container = document.createElement("div")
var start = document.createElement("button")
var stop = document.createElement("button")
var playback = document.createElement("button")
var video = $$("video")[0]

// Add text to buttons

start.textContent = "START";
stop.textContent = "STOP";
playback.textContent = "PLAYBACK"

// Default stop shuold be disabled
stop.disabled = true;

// Append elements to container.
container.style.position = "fixed";
container.style.top = "60px";
container.style.left = "60px";
container.style.transform = "scale(1.5)";
container.appendChild(start)
container.appendChild(stop)
container.appendChild(playback)

document.body.appendChild(container)

// Record logic.

var videoSequences = [];
var startTime;

var startRecording = () => {
    startTime = video.currentTime;
    stop.disabled = false;
}

var stopRecording = () => {
    videoSequences.push({
        start: startTime,
        stop:  video.currentTime
    })
    stop.disabled = true;
}



var startPlaying = () => {

    video.currentTime = videoSequences[0].start;
    
    console.log("Number of sequences", videoSequences.length)
    videoSequences.forEach((sequence,i)=>{
        var duration = sequence.stop*1000 - sequence.start*1000;
        var next = i === videoSequences.length-1 ? 0 : i+1;
        setTimeout(function(nextStart){
            video.currentTime = nextStart;
            d = new Date();
            console.log("Set timed out", d.getMilliseconds());
        }.bind(null, videoSequences[next].start), duration)
    })
}

// Video recording logics.
start.addEventListener("click", startRecording)
stop.addEventListener("click", stopRecording)

// Video playback logic.
playback.addEventListener("click", startPlaying)
