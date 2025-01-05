import React, { useState, useEffect } from 'react';
import '../styles/menu/menu.css';
import Video from '../video/video.jsx';
import SchoolLogo from '../images/high_school_logo.png';
import SquidGameLogo from '../images/Squid-Game-Logo.png';
import { IoCloseOutline } from 'react-icons/io5';

function Menu() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [remainingTime, setRemainingTime] = useState(300);

    useEffect(() => {
        let timer;
        if (isGameStarted) {
            timer = setInterval(() => {
                fetch('http://localhost:5000/game_status')
                    .then(response => response.json())
                    .then(data => {
                        setRemainingTime(data.remaining_time);
                        if (data.remaining_time <= 0) {
                            handleEnd();
                        }
                    });
            }, 1000);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isGameStarted]);

    const handleStart = async () => {
        try {
            const response = await fetch('http://localhost:5000/start_game', {
                method: 'POST',
            });
            if (response.ok) {
                // 게임 시작 요청이 성공한 후에 비디오 피드를 시작합니다.
                await fetch('http://localhost:5000/start_video_feed'); // 추가된 부분
                setIsGameStarted(true);
                setRemainingTime(300);
            }
        } catch (error) {
            console.error('Failed to start game:', error);
        }
    };

    const handleEnd = async () => {
        try {
            // 게임 중지
            const stopGameResponse = await fetch('http://localhost:5000/stop_game', {
                method: 'POST',
            });
            
            // 비디오 피드 중지
            await fetch('http://localhost:5000/stop_video_feed');
            
            // 제거된 플레이어 이미지 삭제
            const clearImagesResponse = await fetch('http://localhost:5000/clear_eliminated_players', {
                method: 'POST',
            });

            if (stopGameResponse.ok && clearImagesResponse.ok) {
                setIsGameStarted(false);
                setRemainingTime(300);
            }
        } catch (error) {
            console.error('Failed to stop game:', error);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} : ${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="menu_wrap">
            <div className="game_controls">
                {isGameStarted ? (
                    <div className="game_end">
                        <button className="end" onClick={handleEnd}>
                            종료
                        </button>
                    </div>
                ) : (
                    <div className="game_start">
                        <button className="start" onClick={handleStart}>
                            시작하기
                        </button>
                    </div>
                )}
            </div>
            <div className="time_control">
                <span className="time">현재 남은 시간 : {formatTime(remainingTime)}</span>
            </div>
            <div className="logo">
                <div className="high_school_logo">
                    <img src={SchoolLogo} alt="School Logo" />
                </div>
                <IoCloseOutline className="close_icon" />
                <div className="squid_game_logo">
                    <img src={SquidGameLogo} alt="Squid Game Logo" />
                </div>
            </div>
            {isGameStarted && <Video />}
        </div>
    );
}

export default Menu;