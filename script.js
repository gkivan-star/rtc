const socket = io('http://localhost:3000');  // Replace with your server's URL

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

let localStream;
let peerConnection;

const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

// Request access to the user's media devices
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localVideo.srcObject = stream;
        localStream = stream;
        
        socket.emit('ready');
    })
    .catch(error => console.error('Error accessing media devices.', error));

// Handle incoming offer from the server
socket.on('offer', (offer) => {
    peerConnection = new RTCPeerConnection(configuration);
    
    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            socket.emit('ice-candidate', event.candidate);
        }
    };
    
    peerConnection.ontrack = event => {
        remoteVideo.srcObject = event.streams[0];
    };
    
    peerConnection.addStream(localStream);

    peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => peerConnection.createAnswer())
        .then(answer => peerConnection.setLocalDescription(answer))
        .then(() => {
            socket.emit('answer', peerConnection.localDescription);
        });
});

// Handle incoming ICE candidates
socket.on('ice-candidate', (candidate) => {
    if (peerConnection) {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
});
