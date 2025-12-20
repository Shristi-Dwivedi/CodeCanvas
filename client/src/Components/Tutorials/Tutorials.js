import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tutorials.css";
import Sidebar from '../Sidebar/Sidebar';
import ChatBot from "../ChatBot/ChatBot";

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tutorials")
      .then(res => setTutorials(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleVideoWatched = async (tutorialId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      await axios.post(`/api/tutorials/${tutorialId}/watch`, { userId: user.id });
      console.log("Marked as watched:", tutorialId);
    } catch (err) {
      console.error("Error saving watched:", err);
    }
  };

  // timers for each tutorial
  useEffect(() => {
    if (!activeVideo) return;

    const timer = setTimeout(() => {
      handleVideoWatched(activeVideo);
    }, 10000);

    return () => clearTimeout(timer);
  }, [activeVideo]);

  return (
    <>
      <div className='tutorial_navbar_cnt'>
        <div className='tutorial_navbox'>
          <div className='tutorial_sidebar'>
            <Sidebar />
            <ChatBot />
          </div>
          <p className='tutorial_navhead'>CodeCanvas</p>
          <a href='/dashboard' className='tutorial_learnstat'>LEARNING PROGRESS</a>
          <a href='/dashboard' className='tutorial_codestat'>CODING PROGRESS</a>
          <a href='/dashboard/editor' className='tutorial_ide'>WORK ON IDE</a>
          <a href='/dashboard/test' className='tutorial_test'>TEST YOURSELF !</a>
        </div>
      </div>
      <div className="tutorials-container">
        <div className="tutorials-grid">
          {tutorials.map((tutorial) => (
            <div key={tutorial._id} className="tutorial-card">
              <h3 className="tutorial-title">{tutorial.title}</h3>
              <iframe
                src={tutorial.VideoUrl}
                title={tutorial.title}
                allowFullScreen
                width="560"
                height="315"
                onLoad={() => setActiveVideo(tutorial._id)}
              ></iframe>
              <p>{tutorial.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Tutorials;
