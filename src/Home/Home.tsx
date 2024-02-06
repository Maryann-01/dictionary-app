import { FaAngleDown, FaSun, FaPlay } from "react-icons/fa6";
import { FaMoon, FaSearch, FaBook } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../Home/Home.css"
const Home = () => {
  const [themeIcon, setThemeIcon] = useState("light")
  const [value, setValue] = useState("")
  const [post, setPost] = useState([])

  const fetchData = async () => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
    const response = await fetch(url); // Wait for the promise to resolve
    const data = await response.json();

    console.log(data[0])
    setPost(data);
  }

  useEffect(() => {
    fetchData()
      .catch(console.error);

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }
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
            {themeIcon === "light" ? <FaSun /> : <FaMoon />}
          </div>
        </div>
      </section>
      <section className="part-two">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Search for any word..." value={value} onKeyDown={handleKeyDown} onChange={(e) => setValue(e.target.value)} />
          <FaSearch className="faSearch" />
        </form>
      </section>
      <section className="part-three">
        <div className="word">
          {post.length > 0 && (
            <h1 key={post[0].word}>{post[0].word}</h1> // Display only first word
          )}
          <div className="play">
            <FaPlay className="playIcon" />
          </div>
        </div>
        <p className="phonetics">{post[0].phonetic}</p>
      </section>
      <section className="partsOfSpeech">
        <div className="non">
          <h2 className="speech">{post[0].meanings[0].partOfSpeech}</h2>
          <div className="line"></div>
        </div>
      </section>
    </div>
  )
}

export default Home