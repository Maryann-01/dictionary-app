import { FaAngleDown, FaSun, FaPlay } from "react-icons/fa6";
import { FaMoon, FaSearch, FaBook } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import PartsOfSpeech from "../partsOfSpeech/partsOfSpeech";
import "../Home/Home.css"
interface Definition {
  themeIcon: string; // Add themeIcon property
  toggleTheme: () => void;
  post: {
    word?: string | undefined;
    phonetics?: Dictionary[];
  }[]
}
interface Dictionary {
  text?: string;
  audio?: string;
}


const Home: React.FC<Definition> = ({ themeIcon, toggleTheme }) => {
  // const [themeIcon, setThemeIcon] = useState("light")
  const [value, setValue] = useState("")
  const [post, setPost] =useState<any[]>([])
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null); // Ref for the <audio> element

  const handleToggleTheme = () => {
    toggleTheme();
  }
  const fetchData = async () => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
    const response = await fetch(url);
    const data = await response.json();

    console.log(data[0])
    setPost(data);
  }


  useEffect(() => {
    fetchData()
      .catch(console.error);

  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {

      } else {
        const audioUrl = post[0].phonetics.find((dict:Dictionary) => dict.audio)?.audio;// Find the first dictionary with "audio" and display its audio
        if (audioUrl) {
          audioRef.current.src = audioUrl;
          audioRef.current.play().catch((error) =>
            console.error("Audio playback error:", error)
          );
          setIsPlaying(true);
        }
      }
    }
  };

  return (
    <div className="body">
      <section className='navbar'>
        <FaBook className="bookIcon" />
        <div className="left">
          <div className='font-fam'>
            <p>Sans-serif</p>
            <FaAngleDown />
          </div>
          <div className="theme">
            <div className="toggle-theme">
              <div></div>
            </div>
            {themeIcon === "light" ? <FaSun onClick={handleToggleTheme} /> : <FaMoon onClick={handleToggleTheme} />}
          </div>
        </div>
      </section>
      <section className="part-two">
        <form onSubmit={handleSubmit}>
          <input type="text" className="input-field" placeholder="Search for any word..." value={value} onKeyDown={handleKeyDown} onChange={(e) => setValue(e.target.value)} />
          <FaSearch className="faSearch" />
        </form>
      </section>
      {post.length > 0 && (
        <section className="part-three">
          <div className="word">
            {post.length > 0 && (
              <h1 key={post[0].word}>{post[0].word}</h1> // Display only first word
            )}

            <div className="play" onClick={handlePlay}>
              <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
              <FaPlay className="playIcon" />
            </div>
          </div>
          <p className="phonetics">
            {post.length > 0  && (
              // Find the first dictionary with "text" and display its text
              <span>
                {post[0].phonetics?.find((dict: Dictionary) => dict.text)?.text ?? "No phonetics found"}
              </span>
            )}
          </p>
        </section>
      )}
      {post.length > 0 && (
        <PartsOfSpeech post={post} />
      )}

    </div>
  )
}

export default Home