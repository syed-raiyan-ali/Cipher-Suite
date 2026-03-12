import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import { UserContext } from "../UserContext";
import { auth } from "../firebase";
import GoogleLogin from "../GoogleLogin";
import { getCloudHistory, deleteOldHistory } from "../historyUtils";
import { getUserHistory, clearUserHistory } from "../utils/localStorageUtils";

export default function Profile() {
  const user = useContext(UserContext);
  const [history, setHistory] = useState([]);
  const isLoggedIn = !!user && !!user.uid;

  useEffect(() => {
    async function loadHistory() {
      if (isLoggedIn) {
        // Get last 30 days of history from cloud
        const { data, error } = await getCloudHistory(user, 30);
        setHistory(data || []);
      } else {
        setHistory(getUserHistory() || []); 
      }
    }
    loadHistory();
  }, [user, isLoggedIn]);

  const handleClearAll = async () => {
    if (isLoggedIn) {
      if (window.confirm("Clear all cloud cipher history?")) {
        await deleteOldHistory(user, 3650);
        setHistory([]);
      }
    } else {
      if (window.confirm("Clear all local cipher history?")) {
        clearUserHistory();
        setHistory([]);
      }
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-info-row">
        <div className="profile-pic-holder">
          {isLoggedIn && user.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="profile-pic" referrerPolicy="no-referrer" />
          ) : (
            <div className="profile-pic default-pic" />
          )}
        </div>
        <div className="profile-details">
          <h2>{isLoggedIn ? user.displayName : "User"}</h2>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "20px" }}>
        <button className="clear-history-btn" onClick={handleClearAll}>
          Clear All History
        </button>
        {!isLoggedIn ? (
          <GoogleLogin />
        ) : (
          <button
            className="profile-logout-btn"
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                auth.signOut();
              }
            }}
          >
            Logout
          </button>
        )}
      </div>

      {!isLoggedIn && (
        <div className="history-notice">
          <p><strong>Heads up:</strong> You can only save up to 5 history entries locally while logged out.</p>
          <p>Log in to save unlimited history and access it from any device!</p>
        </div>
      )}

      <div className="history-section">
        {history.length === 0 ? (
          <p>
            {isLoggedIn
              ? "No saved cloud history."
              : "No local cipher history saved."}
          </p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Cipher</th>
                <th>Mode</th>
                <th>Input</th>
                <th>Key / Shift</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              {history.map(
                ({ timestamp, cipher, mode, input, key, output }, i) => (
                  <tr key={i}>
                    <td>{new Date(timestamp).toLocaleString()}</td>
                    <td>{cipher}</td>
                    <td>{mode}</td>
                    <td>{input}</td>
                    <td>{key}</td>
                    <td>{output}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}