import '../styles/content/content.css'

import Background from "../images/background.png"
import SquidGameDoll_front from "../images/doll_front.png"
import SquidGameDoll_back from "../images/doll_back.png"

import FrontManSub from './frontman.jsx'


function Content(){
    return(
        <div className='content_wrap'>
            <div className='background_img'>
                <img src={Background} alt="background_image" />
            </div>

            <FrontManSub />
            <FrontManSub />
            <div className='squid_game_doll_wrap'>
                {/* <img src= {SquidGameDoll_back} alt="" /> */}
                <img src={SquidGameDoll_back} alt="squid_game_doll" />
            </div>
            <FrontManSub />
            <FrontManSub />
        </div>
    );
}

export default Content;