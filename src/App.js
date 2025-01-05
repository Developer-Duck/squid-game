import './App.css';
import Menu from './menu/menu.jsx'
import Content from './content/content.jsx'
import Video from './video/video.jsx';

function App() {
  return (
    <div className='wrap'>
        <Menu />
        <Content />
        <Video />
    </div>
  );
}

export default App;
