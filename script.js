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
