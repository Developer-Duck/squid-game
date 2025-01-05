import '../styles/video/video.css'

function Video(){
    return(
        <div className='video_wrap'>
            <div className='cam_show_wrap'>
                <img  id="camera-stream" src="{{ url_for('video_feed') }}" alt=""></img>
            </div>
            <div className='out_show'>
                <img src="" alt="" />
            </div>
        </div>
    );
}

export default Video;