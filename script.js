document.getElementById('start-record').addEventListener('click', function() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        console.log('Voice recognition started. Speak into the microphone.');
    };

    recognition.onspeechend = function() {
        console.log('Voice recognition ended.');
        recognition.stop();
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('output').innerText = transcript;

        // Send transcript to server for saving to database
        saveTranscript(transcript);
    };

    recognition.start();
});

function saveTranscript(transcript) {
    fetch('save_transcript.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: transcript })
    })
    .then(response => response.json())
    .then(data => console.log('Transcript saved:', data))
    .catch(error => console.error('Error saving transcript:', error));
}
