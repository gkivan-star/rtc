// Function to send the IP address to the Flask server
function sendIP() {
    const ipAddress = "192.168.17.100";  // This is just a mock IP address. Replace it with the actual IP.

    // Create the data object to send in the POST request
    const data = {
        ipAddress: ipAddress
    };

    // Send the POST request using the Fetch API
    fetch("http://192.168.17.54:5000", {
        method: "POST",  // HTTP method
        headers: {
            "Content-Type": "application/json"  // Content type set to JSON
        },
        body: JSON.stringify(data)  // Convert the data object to a JSON string
    })
    .then(response => response.json())  // Convert the response to JSON
    .then(data => {
        console.log("Success:", data);
        alert("IP Address Sent Successfully!");
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while sending the IP.");
    });
}
