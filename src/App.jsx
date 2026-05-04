/*import { useState } from "react";

export default function App() {
  const [networks, setNetworks] = useState([]);

  const scanWifi = async () => {
    const res = await fetch("http://localhost:5000/scan");
    const data = await res.json();
    setNetworks(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Evil Twin Detector</h1>

      <button onClick={scanWifi}>Scan Networks</button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>SSID</th>
            <th>BSSID</th>
            <th>Signal</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {networks.map((n, i) => (
            <tr
              key={i}
              style={{
                backgroundColor: n.status.includes("⚠")
                  ? "#ffcccc"
                  : "#ccffcc"
              }}
            >
              <td>{n.ssid}</td>
              <td>{n.bssid}</td>
              <td>{n.signal}</td>
              <td>{n.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}*/


import { useState } from "react";

export default function App() {
  const [networks, setNetworks] = useState([]);

  const scanWifi = async () => {
    const res = await fetch("https://evil-twin-app.onrender.com/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([
        { ssid: "MyWifi", bssid: "AA:BB", signal: "80%" },
        { ssid: "MyWifi", bssid: "CC:DD", signal: "70%" },
        { ssid: "Cafe", bssid: "EE:FF", signal: "60%" }
      ])
    });

    const data = await res.json();
    setNetworks(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Evil Twin Detector</h1>

      <button onClick={scanWifi}>Scan Networks</button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>SSID</th>
            <th>BSSID</th>
            <th>Signal</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {networks.map((n, i) => (
            <tr
              key={i}
              style={{
                backgroundColor: n.status.includes("⚠")
                  ? "#ffcccc"
                  : "#ccffcc"
              }}
            >
              <td>{n.ssid}</td>
              <td>{n.bssid}</td>
              <td>{n.signal}</td>
              <td>{n.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}