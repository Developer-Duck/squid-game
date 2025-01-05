import '../styles/menu/menu.css'

import SchoolLogo from '../images/high_school_logo.png';
import SquidGameLogo from '../images/Squid-Game-Logo.png';
import { IoCloseOutline } from "react-icons/io5";


function Menu(){
    return(
        <div className='menu_wrap'>
            <div className='game_controls'>
                <div className='game_start'>
                    <button className='start'>시작하기</button>
                </div>
                <div className='game_end'>
                    <button className='end'>종료</button>
                </div>
            </div>
            <div className='time_control'>
                <span className='time'> 현재 남은 시간 : 5 : 00</span>
            </div>
            <div className='logo'>
                <div className='high_school_logo'>
                    <img src={SchoolLogo} alt="" />
                </div>
                    <IoCloseOutline className='close_icon' />
                <div className='squid_game_logo'>
                    <img src={SquidGameLogo} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Menu;