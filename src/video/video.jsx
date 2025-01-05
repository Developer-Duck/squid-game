import React, { useEffect, useState, useRef } from 'react';
import '../styles/video/video.css';

const Video = ({ resetEliminatedPlayer }) => {
  const [streamActive, setStreamActive] = useState(false);
  const [streamError, setStreamError] = useState(false);
  const [latestEliminatedPlayer, setLatestEliminatedPlayer] = useState('');
  const streamRetryCount = useRef(0);
  const lastFetchedTime = useRef(0);
  const fetchInterval = 500;
  const maxRetries = 3;

  const initializeStream = async () => {
    try {
      const response = await fetch('http://localhost:5000/start_video_feed');
      if (response.ok) {
        setStreamActive(true);
        setStreamError(false);
        streamRetryCount.current = 0;
      } else {
        throw new Error('Failed to start video feed');
      }
    } catch (error) {
      console.error('Error initializing stream:', error);
      setStreamError(true);
      if (streamRetryCount.current < maxRetries) {
        streamRetryCount.current += 1;
        setTimeout(initializeStream, 1000);
      }
    }
  };

  const fetchEliminatedPlayers = async () => {
    const now = Date.now();
    if (now - lastFetchedTime.current < fetchInterval) return;
    lastFetchedTime.current = now;

    try {
      const response = await fetch('http://localhost:5000/eliminated_players', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const files = await response.json();
      if (files?.length > 0) {
        setLatestEliminatedPlayer(files[0]);
      } else {
        setLatestEliminatedPlayer('');
      }
    } catch (error) {
      console.error('Error fetching eliminated players:', error);
    }
  };

  useEffect(() => {
    initializeStream();
    const interval = setInterval(fetchEliminatedPlayers, fetchInterval);

    return () => {
      fetch('http://localhost:5000/stop_video_feed');
      clearInterval(interval);
      setStreamActive(false);
    };
  }, []);

  useEffect(() => {
    if (resetEliminatedPlayer) {
      setLatestEliminatedPlayer('');
    }
  }, [resetEliminatedPlayer]);

  const handleStreamError = () => {
    if (streamRetryCount.current < maxRetries) {
      streamRetryCount.current += 1;
      setStreamActive(false);
      setTimeout(initializeStream, 1000);
    } else {
      setStreamError(true);
    }
  };

  return (
    <div className="video_wrap">
      <div className="cam_show_wrap">
        {streamActive && (
          <img
            id="camera-stream"
            src={`http://localhost:5000/video_feed?t=${Date.now()}`}
            alt="Game Camera Feed"
            onError={handleStreamError}
            style={{ display: streamError ? 'none' : 'block' }}
          />
        )}
        {streamError && (
          <div className="stream-error">
            카메라 연결에 문제가 있습니다. 페이지를 새로고침 해주세요.
          </div>
        )}
      </div>
      <div className="out_show">
      <span className='out_txt'>탈락자</span>
        {latestEliminatedPlayer && (
          <img
            src={`http://localhost:5000/eliminated_images/${latestEliminatedPlayer}?t=${Date.now()}`}
            alt="Latest Eliminated Player"
            loading="lazy"
          />
        )}
        
      </div>
    </div>
  );
};

export default Video;