import React, { useEffect, useState } from 'react';
import '../styles/video/video.css';

function Video() {
    const [streamKey, setStreamKey] = useState(Date.now());
    const [latestEliminatedPlayer, setLatestEliminatedPlayer] = useState('');

    const fetchEliminatedPlayers = async () => {
        try {
            const response = await fetch('http://localhost:5000/eliminated_players');
            const files = await response.json();
            if (files && files.length > 0) {
                setLatestEliminatedPlayer(files[0]);
            }
        } catch (error) {
            console.error('Error fetching eliminated players:', error);
        }
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 비디오 피드 시작
        fetch('http://localhost:5000/start_video_feed');

        // 주기적으로 제거된 플레이어 목록 업데이트 (1초마다)
        const interval = setInterval(fetchEliminatedPlayers, 1000);

        // 컴포넌트가 언마운트될 때 정리
        return () => {
            fetch('http://localhost:5000/stop_video_feed');
            clearInterval(interval);
        };
    }, []);

    return (
        <div className='video_wrap'>
            <div className='cam_show_wrap'>
                <img 
                    key={streamKey}
                    id="camera-stream" 
                    src={`http://localhost:5000/video_feed?t=${streamKey}`}
                    alt="Game Camera Feed"
               
                />
            </div>
            <div className='out_show'>
                {latestEliminatedPlayer && (
                    <img 
                        src={`http://localhost:5000/eliminated_images/${latestEliminatedPlayer}`}
                        alt="Latest Eliminated Player"
                 
                    />
                )}
            </div>
        </div>
    );
}

export default Video;