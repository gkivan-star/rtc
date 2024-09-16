<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
    // Get video and audio from user's device
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            // Display the live video stream on the webpage
            const videoElement = document.querySelector('video');
            videoElement.srcObject = stream;
            videoElement.play();

            // Send the stream data to the Flask server via WebRTC or WebSocket
            // Implement the WebRTC or WebSocket connection here
            // Example: Send the stream to WebSocket server for further handling
        })
        .catch(error => {
            console.error('Error accessing media devices:', error);
        });
});
=======
const video = document.getElementById('video');

// Function to start capturing video and audio
async function startStream() {
    try {
        // Access the user's camera and microphone
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        video.srcObject = stream;

        // Set up WebSocket connection to the server
        const ws = new WebSocket('ws://localhost:5000'); // Change this to your ngrok URL if using ngrok

        // Handle WebSocket messages
        ws.onopen = () => {
            console.log('WebSocket connection established.');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Send video and audio data to the server
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                ws.send(event.data);
            }
        };

        mediaRecorder.start(1000); // Send data every second

    } catch (err) {
        console.error('Error accessing media devices:', err);
    }
}

startStream();
>>>>>>> 0d0a2348a334077072cba75d8a42a74c0baeebbc
