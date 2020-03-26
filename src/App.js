import React, { useState, Component } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState("");
  const [new_link, setNewLink] = useState("");
  const [mssg, setMssg] = useState("");


  function handleChange(e) {
    setUrl(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();

    setMssg('Fething shortened URL....');

    const response = await fetch('/shorten?url=' + url);

    if (response.ok) {
      const data = await response.json();
      setMssg('Your shortened URL is: ');
      setNewLink(data.link);
    }
    else {
      setMssg('Opps! Something went wrong, please try again.');
    }
  }

  return (
    <div className="app">
      <h1>Link Shortener - ReactJS</h1>
      <input placeholder="Enter your link here" name="url"  onChange={handleChange}></input><br></br>
      <button className="btn" onClick={onSubmit}>Shorten URL</button>
      <p>{mssg}</p><a href={new_link}>{new_link}</a>
    </div>
  );
}

export default App;
