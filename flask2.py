from flask import Flask, request, jsonify
from flask_cors import CORS  # Importing CORS
import logging

# Initialize the Flask application
app = Flask(__name__)

# Enable CORS to allow cross-origin requests from the frontend
CORS(app)

# Enable logging to see requests and errors
logging.basicConfig(level=logging.DEBUG)

# List to store IP addresses
ip_list = []

# Endpoint to handle the POST request
@app.route("/", methods=["POST"])
def receive_ip():
    try:
        # Get the IP address from the request
        data = request.get_json()
        ip_address = data.get('ipAddress')

        # Add the received IP address to the list
        if ip_address and ip_address not in ip_list:
            ip_list.append(ip_address)
            app.logger.debug(f"New IP detected and added to list: {ip_address}")

        # Respond with a success message
        return jsonify({"message": "IP address received successfully!"}), 200

    except Exception as e:
        # Log any error that occurs
        app.logger.error(f"Error: {str(e)}")
        return jsonify({"error": "An error occurred"}), 500

# Start the server
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)  # Allow access from all devices on the network
