document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('video');
    const startButton = document.getElementById('startButton');
    const status = document.getElementById('status');

    // Function to start video
    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            status.textContent = 'Video feed is live.';
        } catch (error) {
            console.error('Error accessing media devices.', error);
            status.textContent = 'Failed to access media devices.';
        }
    };

    startButton.addEventListener('click', startVideo);
});
