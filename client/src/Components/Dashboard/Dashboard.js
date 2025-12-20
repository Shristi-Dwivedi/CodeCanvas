import React, { useState, useEffect, useContext } from 'react';
import "./Dashboard.css";
import Sidebar from '../Sidebar/Sidebar';
import VideoGraph from '../VideoGraph/VideoGraph';
import axios from 'axios';
import CodeGraph from '../CodeGraph/CodeGraph';
import AnimatedText from '../AnimatedText/AnimatedText';
import CommonNavbar from '../CommonNavbar/CommonNavbar';
import ChatBot from '../ChatBot/ChatBot';
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext); 
  const [watchedCount, setWatchedCount] = useState(0);
  const [grades, setGrades] = useState([]);
  const [videoData, setVideoData] = useState([]);

  const sentences = [
    "Dive into the world of CodeCanvas !",
    "Code never lies, comments sometimes do.",
    "Code, Eat, Sleep, Repeat.",
    "Who needs sleep when you have bugs?",
    "Eagerly awaited bugs to resolve.",
    "Warning : May contain infinite loops."
  ];

  // Fetch grades whenever currentUser changes
  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      setGrades([]);
      return;
    }

    const gradesKey = `grades_${currentUser.id}`;
    const savedGrades = JSON.parse(localStorage.getItem(gradesKey)) || [];
    setGrades(savedGrades);
  }, [currentUser]);

  // Fetch watched count whenever currentUser changes
  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      setWatchedCount(0);
      return;
    }

    axios.get(`http://localhost:5000/api/tutorials/stats/${currentUser.id}`)
      .then(res => setWatchedCount(res.data.watchedCount))
      .catch(err => console.error("Error fetching stats:", err));
  }, [currentUser]);

  // Fetch video data whenever currentUser changes
  useEffect(() => {
    if (!currentUser || !currentUser.id) return;

    const fetchWatchedData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tutorials/${currentUser.id}/watch`
        );
        setVideoData(response.data);
      } catch (error) {
        console.error("Error fetching watched tutorials:", error);
      }
    };

    fetchWatchedData();
  }, [currentUser]);

  if (!currentUser) return <p>Please login to see the dashboard.</p>;

  return (
    <div className='dashboard_main_container'>
      <div>
        <CommonNavbar />
        <Sidebar />
        <ChatBot />
      </div>

      {/* Welcome Name box */}
      <div className='dashboard_welcomebox'>
        <h2 className='dashboard_welcomebox_text'>Welcome {currentUser?.name}!</h2>
      </div>

      {/* Animated Text Area */}
      <div className="">
        <AnimatedText sentences={sentences} interval={3000} />
      </div>

      {/* Tutorials watched box */}
      <div className='dashboard_tutorialbox'>
        <h2 className='dashboard_tutorialbox_text'>Tutorials Watched: {watchedCount}</h2>
      </div>

      {/* Grade box */}
      <div className='dashboard_codegradebox'>
        {grades.length > 0 ? (
          <h2 className='dashboard_codegradebox_text'>Your Latest Grade: {grades[grades.length - 1].grade}</h2>
        ) : (
          <h2>Test Yourself for Grades.</h2>
        )}
      </div>

      {/* Tutorial Graph */}
      <VideoGraph data={videoData} />

      {/* Code Graph */}
      <CodeGraph userId={currentUser.id} />
    </div>
  );
};

export default Dashboard;
