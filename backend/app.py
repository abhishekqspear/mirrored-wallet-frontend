# # backend/app.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import smtplib
# from email.message import EmailMessage

# app = Flask(__name__)
# CORS(app)  # Enable CORS for frontend communication

# # Simulated in-memory mirrored wallet store
# wallet_store = {}

# # Simulated token price (static)
# token_prices = {
#     "BTC": 68000,
#     "ETH": 3400,
#     "USDT-TRC20": 1.0,
#     "USDT-ERC20": 1.0
# }

# @app.route("/api/wallet/connect", methods=["POST"])
# def connect_wallet():
#     data = request.json
#     address = data.get("address")
#     if address not in wallet_store:
#         wallet_store[address] = {
#             "tokens": {},
#             "total_usd": 0
#         }
#     return jsonify({"message": "Wallet connected.", "wallet": wallet_store[address]})

# @app.route("/api/wallet/send", methods=["POST"])
# def send_mirrored_token():
#     data = request.json
#     address = data.get("address")
#     token = data.get("token")
#     amount = float(data.get("amount"))

#     if address not in wallet_store:
#         return jsonify({"error": "Wallet not connected."}), 400

#     price = token_prices.get(token, 1.0)
#     usd_value = amount * price

#     wallet = wallet_store[address]
#     wallet["tokens"][token] = wallet["tokens"].get(token, 0) + amount
#     wallet["total_usd"] += usd_value

#     return jsonify({
#         "message": f"{amount} {token} mirrored.",
#         "wallet": wallet
#     })

# @app.route("/api/wallet/data", methods=["POST"])
# def get_wallet_data():
#     data = request.json
#     address = data.get("address")
#     return jsonify(wallet_store.get(address, {}))

# @app.route("/api/contact-admin", methods=["POST"])
# def contact_admin():
#     data = request.json
#     phone = data.get("phone")
#     email = data.get("email")
#     user_wallet = data.get("address")

#     # Simulated email send
#     try:
#         msg = EmailMessage()
#         msg.set_content(f"New contact from mirrored wallet user:\nPhone: {phone}\nEmail: {email}\nWallet: {user_wallet}")
#         msg["Subject"] = "Mirrored Wallet Contact Request"
#         msg["From"] = "admin@yourdomain.com"
#         msg["To"] = "admin@yourdomain.com"  # Replace with real admin email

#         # Dummy SMTP settings, replace with real SMTP server info
#         smtp = smtplib.SMTP("smtp.yourdomain.com", 587)
#         smtp.starttls()
#         smtp.login("admin@yourdomain.com", "yourpassword")
#         smtp.send_message(msg)
#         smtp.quit()

#         return jsonify({"message": "Admin contacted successfully."})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True, port=8000)


from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)  # Allow requests from frontend (React)

# Simulated in-memory storage (replace with DB if needed)
mirrored_tokens = []
contact_submissions = []

@app.route("/api/contact-admin", methods=["POST"])
def contact_admin():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"error": "All fields are required"}), 400

    contact = {
        "name": name,
        "email": email,
        "message": message,
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

    contact_submissions.append(contact)
    print(f"[Contact Submission] {contact}")  # Simulate logging

    return jsonify({"success": True, "message": "Admin has been notified."}), 200

@app.route("/api/mirror-token", methods=["POST"])
def mirror_token():
    token_data = request.json
    if not token_data:
        return jsonify({"error": "No token data provided"}), 400

    token_data["timestamp"] = datetime.datetime.utcnow().isoformat()
    mirrored_tokens.append(token_data)
    print(f"[Mirror] Token recorded: {token_data}")
    return jsonify({"status": "mirrored", "token": token_data}), 200

@app.route("/api/mirrored-tokens", methods=["GET"])
def get_mirrored_tokens():
    return jsonify(mirrored_tokens)

if __name__ == "__main__":
    app.run(debug=True,  port=8000)
