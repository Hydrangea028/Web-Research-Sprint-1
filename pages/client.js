//all query selectors
var	addFont = 		document.querySelector('#addFont'),
	lessFont = 		document.querySelector('#lessFont'),
	foreColour = 	document.querySelector('#foreColour'),
	backColour = 	document.querySelector('#backColour'),
	line = 			document.querySelector('#line'),
	subtitle = 		document.querySelector('#subtitle'),
	start = 		document.querySelector('#start'),
	final = 		document.querySelector('#final');


var sr = 			new webkitSpeechRecognition(),
	finalResult = 	'',
	started = 		false;
 
sr.continuous = true; //speech input is continuous, no need to start it all the time
sr.interimResults = true; //enables interim, on the fly, results

final.addEventListener('click', finalTranscript);
start.addEventListener('click', startSpeech);

/*
 * =============================================================
 * Transcript
 */
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
			status.textContent = 'Capturing';
		};
				
		//once audio input has finished.
		sr.onend = function(){
			console.log('AyyLmaonyez');
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
			
			line.textContent = interimResult;
		};
	};
};


/*
 * =================================================================
 * Subtitle box stuff
 */

//increase font size to subtitle box
addFont.addEventListener('click', function(){
	line.style.fontSize = window.getComputedStyle(line, null).getPropertyValue('font-size') + 1;
});

//reduce font size
lessFont.addEventListener('click', function(){
	
});

subtitle.addEventListener('mousedown', mouseDown);

window.addEventListener('mouseup', function(){
	window.removeEventListener('mousemove', moveSubtitles)
});

function mouseDown(event){
	window.addEventListener('mousemove', moveSubtitles);
}
function moveSubtitles(){
	subtitle.style.position = 'absolute';
	subtitle.style.top = event.clientY + 'px';
	subtitle.style.left = event.clientX + 'px';
}