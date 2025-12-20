import React, { useState, useEffect, useContext } from 'react';
import "./TestHistory.css";
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import CommonNavbar from '../CommonNavbar/CommonNavbar';
import ChatBot from '../ChatBot/ChatBot';
import { AuthContext } from '../../context/AuthContext';

const TestHistory = () => {
  const { currentUser } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch test history whenever currentUser changes
  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      setHistory([]); // clear history on logout
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/testHistory/my-history/${currentUser.id}`
        );
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
        setHistory([]);
      }
    };

    fetchHistory();
  }, [currentUser]);

  // Fetch leaderboard once
  useEffect(() => {
    axios.get("http://localhost:5000/api/leaderboard")
      .then(res => setLeaderboard(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='test_history_main_container'>
      {/* Navbar and ChatBot always visible */}
      <div>
        <CommonNavbar />
        <ChatBot />
      </div>

      {/* Sidebar always visible */}
      <div className='test_history_sidebar'>
        <Sidebar />
      </div>

      <div className='test_history_container'></div>

      {/* Main content */}
      <div className="history-leaderboard-wrapper">
        {!currentUser ? (
          <p>Please login to see your test history.</p>
        ) : history.length === 0 ? (
          <p>No test history found.</p>
        ) : (
          <>
            {/* Test History */}
            <div className='test_history_sub_container'>
              <div className="test-list">
                {history.map((test) => (
                  <div key={test._id} style={{ marginBottom: "2rem" }}>
                    <table className="test-history-table">
                      <caption>{test.questions[0]?.title || "Question Title"}</caption>
                      <thead>
                        <tr>
                          <th>Grade</th>
                          <th>Attempted On</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {test.questions.map((q) => (
                          <tr key={q.questionId}>
                            <td>{test.grade}</td>
                            <td>{new Date(test.createdAt).toLocaleString()}</td>
                            <td>{q.score}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="leaderboard-container">
              <h2 className='leaderboard-heading'>Leaderboard</h2>
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Total Score</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.totalScore}</td>
                      <td>{item.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestHistory;
