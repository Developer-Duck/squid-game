import { useState, useEffect } from 'react';
import '../styles/content/content.css';

import Background from "../images/background.png";
import SquidGameDoll_front from "../images/doll_front.png";
import SquidGameDoll_back from "../images/doll_back.png";
import FrontManSub from './frontman.jsx';

function Content() {
    const [gameState, setGameState] = useState({
        isRunning: false,
        phase: 'countdown',
    });

    useEffect(() => {
        const fetchGameStatus = async () => {
            try {
                const response = await fetch('http://localhost:5000/game_status');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGameState({
                    isRunning: data.is_running,
                    phase: data.phase,
                });
            } catch (error) {
                console.error('Error fetching game status:', error);
            }
        };

        // Initial fetch
        fetchGameStatus();

        // Set up polling
        const intervalId = setInterval(fetchGameStatus, 100);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, []);

    // Determine which doll image to show
    const getDollImage = () => {
        // 게임이 실행 중이고 frozen 상태일 때만 front 이미지 표시
        if (gameState.isRunning && gameState.phase === 'frozen') {
            return SquidGameDoll_front;
        }
        // 그 외의 모든 경우(게임 시작 전, countdown, speaking)에는 back 이미지 표시
        return SquidGameDoll_back;
    };

    return (
        <div className='content_wrap'>
            <div className='background_img'>
                <img src={Background} alt="background_image" />
            </div>

            <FrontManSub />
            <FrontManSub />
            <div className='squid_game_doll_wrap'>
                <img 
                    src={getDollImage()} 
                    alt="squid_game_doll" 
                    key={gameState.phase} 
                />
            </div>
            <FrontManSub />
            <FrontManSub />
        </div>
    );
}

export default Content;