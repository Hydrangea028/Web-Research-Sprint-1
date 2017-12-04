'use strict';

var socket = io();

//all query selectors
var	addFont = 		document.querySelector('#addFont'),
	lessFont = 		document.querySelector('#lessFont'),
	foreColour = 	document.querySelector('#foreColour'),
	backColour = 	document.querySelector('#backColour'),
	line = 			document.querySelector('#line'),
	subtitle = 		document.querySelector('#subtitle'),
	start = 		document.querySelector('#start'),
	final = 		document.querySelector('#final');


var sr = 			speechRecognition || webkitSpeechRecognition(),
	finalResult = 	'',
	started = 		false;


 
sr.continuous = true; //speech input is continuous, no need to start it all the time
sr.interimResults = true; //enables interim, on the fly, results

document.querySelector('#test').addEventListener('click', function(){
	socket.emit('send text', "Something to send");
});
final.addEventListener('click', finalTranscript);
start.addEventListener('click', startSpeech);


function finalTranscript(){
	alert(finalResult);
}

function startSpeech(event){
	
	if(started){
		
		//stop the recognition
		sr.stop();
		started = false;
		
	} else {
		
		//start the speech recognition
		sr.start();
		
		//when speech has started
		sr.onstart = function(){
			started = true
		};
		
		//when audio has been detected
		sr.onaudiostart = function(){
			//status.textContent = 'Capturing';
		};
				
		//once audio input has finished.
		sr.onend = function(){
			started = false;
		};
		
		//whilst input is received
		sr.onresult = function(event){
			var interimResult = '';
			
			for (var i = event.resultIndex; i < event.results.length; i++){
				if (event.results[i].isFinal){
					finalResult += event.results[i][0].transcript + ". ";
				} else {
					interimResult += event.results[i][0].transcript;
				};
			};
			
			/*send that to server
			socket.emit('subtitles', {
				text:interimResult
			});*/
			socket.emit('send text', interimResult);
		};
	};
};

socket.on('text', function(data){
	line.textContent = data.txt;
})

/*
 * =================================================================
 * Subtitle box stuff
 */

//increase font size in subtitle box
addFont.addEventListener('click', function(){
	var currentFontSize = parseInt(window.getComputedStyle(line, null).getPropertyValue('font-size'));
	line.style.fontSize = currentFontSize + 2 ;
});

//reduce font size  in subtitle box
lessFont.addEventListener('click', function(){
	var currentFontSize = parseInt(window.getComputedStyle(line, null).getPropertyValue('font-size'));
	line.style.fontSize = currentFontSize - 2 ;
});

//change foreground colour of subtitles
foreColour.addEventListener('change', function(){
	line.style.color = foreColour.options[foreColour.selectedIndex].text;
});

//change background colour of subtitles
backColour.addEventListener('change', function(){
	line.style.backgroundColor = backColour.options[backColour.selectedIndex].text;
});

//move subtitle box when user clicks on subtitles
line.addEventListener('mousedown', function(){
	window.addEventListener('mousemove', moveSubtitles);
});

//when user lets go of mouse, stop moving
window.addEventListener('mouseup', function(){
	window.removeEventListener('mousemove', moveSubtitles)
});

function moveSubtitles(){
	subtitle.style.position = 'absolute';
	subtitle.style.top = event.clientY + 'px';
	subtitle.style.left = event.clientX + 'px';
}
