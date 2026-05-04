'''from flask import Flask, jsonify
from flask_cors import CORS   # 👈 ADD THIS
import subprocess

app = Flask(__name__)
CORS(app)  # 👈 ADD THIS LINE






def scan_wifi():
    try:
        output = subprocess.check_output(
            ["netsh", "wlan", "show", "networks", "mode=bssid"]
        ).decode('utf-8', errors='ignore')
    except Exception as e:
        print("Error:", e)
        return []

    networks = []
    current_ssid = ""

    for line in output.split("\n"):
        line = line.strip()

        if line.startswith("SSID"):
            parts = line.split(":", 1)
            if len(parts) > 1:
                current_ssid = parts[1].strip()

        elif line.startswith("BSSID"):
            parts = line.split(":", 1)
            if len(parts) > 1:
                bssid = parts[1].strip()
                networks.append({
                    "ssid": current_ssid,
                    "bssid": bssid,
                    "signal": "",
                    "status": "Checking"
                })

        elif "Signal" in line:
            parts = line.split(":", 1)
            if len(parts) > 1 and networks:
                networks[-1]["signal"] = parts[1].strip()

    # Detection
    ssid_map = {}
    for net in networks:
        ssid_map.setdefault(net["ssid"], []).append(net)

    result = []
    for ssid, items in ssid_map.items():
        status = "⚠ Suspicious" if len(items) > 1 else "Safe"
        for item in items:
            item["status"] = status
            result.append(item)

    return result


@app.route("/scan", methods=["GET"])
def scan():
    data = scan_wifi()
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)'''



from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

def analyze_networks(networks):
    ssid_map = {}

    for net in networks:
        ssid_map.setdefault(net["ssid"], []).append(net)

    result = []
    for ssid, items in ssid_map.items():
        status = "⚠ Suspicious" if len(items) > 1 else "Safe"
        for item in items:
            item["status"] = status
            result.append(item)

    return result


@app.route("/scan", methods=["POST"])
def scan():
    data = request.json   # receive from frontend
    analyzed = analyze_networks(data)
    return jsonify(analyzed)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)