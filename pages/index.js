import React, { useEffect, useState } from "react";
import GithubCorner from "react-github-corner";
import Head from "next/head";

export default function Home() {

  const [input, setInput] = useState(10);
  const [submit, setSubmit] = useState(false);
  const [saveSubmit, setSaveSubmit] = useState(false); 
  const [lowercase, setLowercase] = useState("");
  const [uppercase, setUppercase] = useState("");
  const [number, setNumber] = useState("");
  const [special, setSpecial] = useState("");
  const [password, setPassword] = useState("");  
  const [fileName, setFileName] = useState("password"); // default file name 
  const [copyPress, setCopyPress] = useState(false); 
  const [copy, setCopy] = useState(false);
  const [saveModule, setSaveModule] = useState(false); 
  const [text, setText] = useState("");
  const tempPassword = []; // holds space to generate password

  let params = lowercase + uppercase + number + special;
  /* generates character on each loop, based on user-requested length */
  useEffect(() => {
    if (submit) {
      if (!params == "") {
        for (let i = 0; tempPassword.length < input; i++) {
          tempPassword.push(params[Math.floor(Math.random() * params.length)]);
        }
        setPassword(tempPassword.join(""));
        setText("");
      } else if (params.length == 0) {
        setText("No parameters");
      }
      setSubmit(false);
    }
  }, [submit]);

  /* password file name + download handler */
  useEffect(() => {
    if (saveSubmit) {
      var saveName = `${fileName}.txt`;
      var hiddenElement = document.createElement("a");
      hiddenElement.href = "data:attachment/text," + encodeURI(password);
      hiddenElement.target = "_blank";
      hiddenElement.download = saveName;
      hiddenElement.click();
    }
    setSaveSubmit(false);
  }, [saveSubmit]);

  /* handles user copying */
  function handleCopy() {
    if (password != "") {
      setCopy(true);
      const element = document.createElement("textarea");
      element.value = password;
      document.body.appendChild(element);
      element.select();
      document.execCommand("copy");
      document.body.removeChild(element);
      setText("Copied!"); // handles the text on-screen after a successful copy to clipboard, below setTimeout fades it out after a second
      setTimeout(() => {
        setCopy(false);
      }, 1000);
    }
  }

  /* character and length password options */

  function handleUpper(e) {
    e.target.checked
      ? setUppercase("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
      : setUppercase("");
  }
  function handleLower(e) {
    e.target.checked
      ? setLowercase("abcdefghijklmnopqrstuvwxyz")
      : setLowercase("");
  }
  function handleNumber(e) {
    e.target.checked ? setNumber("0123456789") : setNumber("");
  }
  function handleSpecial(e) {
    e.target.checked
      ? setSpecial("!@#$%&'()*+,^-./:;<=>?[]_`{~}|")
      : setSpecial("");
  }
  function handleLengthChange(e) {
    setInput(e.target.input);
  }
  function handleFileNameChange(e) {
    setFileName(e.target.value);
  }

  /* file name validators */
  function handleSubmit(e) {
    e.preventDefault();
    if (!fileValidator(fileName)) {
      setSaveSubmit(true);
    } 
  }

  function fileValidator(e) {
    var validChars = new RegExp("/[a-z0-9]|[-]/gi");
    return !!validChars.test(e);
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GithubCorner href="https://github.com/lorenz-f/password-generator" target="_blank" rel="noreferrer" size="100" octoColor="#ccf" bannerColor="#000000" />
      <div className="bg-[#CCCCFF] flex flex-col h-screen w-full m-auto items-center justify-center text-black font-didactGothic overflow-hidden">
        <div className="w-[600px] sm:w-screen sm:border-none h-[94%] flex flex-col justify-center transition-all border-l border-r border-black px-10 sm:px-5">
          <h1 className="w-full text-center text-7xl sm:text-5xl sm:mt-24 sm:py-0 font-poiretOne py-8">
            Password Generator
          </h1>
          <div className="bg-black my-8 rounded-lg flex flex-row items-center p-3">
            <h2 className="ml-5 text-white text-2xl tracking-wider">
              {password}
            </h2>
            <h3 className={`${!copy ? "opacity-0" : "opacity-100"} ml-auto mr-0 text-lg text-yellow-200 bg-transparent color-[#00FFFF] transition-all`}>
              Copied!
            </h3>
            <svg
              onClick={handleCopy}
              onMouseDown={() => setCopyPress(true)}
              onMouseUp={() => setCopyPress(false)} 
              className={`${
                copyPress ? "scale-90" : ""
              } ml-auto mr-5 cursor-pointer transition-all`}
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              width="48"
            >
              <path
                fill="white"
                d="M39 40H13q-1.2 0-2.1-.9-.9-.9-.9-2.1V5q0-1.2.9-2.1.9-.9 2.1-.9h17.4L42 13.6V37q0 1.2-.9 2.1-.9.9-2.1.9ZM28.9 14.9V5H13v32h26V14.9ZM7 46q-1.2 0-2.1-.9Q4 44.2 4 43V12.05h3V43h24.9v3Zm6-41v9.9V5v32V5Z"
              />
            </svg>
          </div>

          <div className="flex flex-col px-12 py-6 sm:py-0 sm:px-0 text-lg rounded-3xl items-center justify-center">
            <div className="flex flex-row text-3xl items-center">
              Character Length:
              <p onChange={handleLengthChange} className="ml-4 text-5xl">
                {input}
              </p>
            </div>

            <input
              className="w-full my-8 bg-white rounded-lg cursor-pointer appearance-none"
              type="range"
              id="slider"
              min={8}
              max={25}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <ul className="flex flex-col text-2xl w-full">
              <li
                onChange={(e) => handleUpper(e)}
                className="sm:text-md pt-4 justify-between flex flex-row"
              >
                <label className="sm:text-md" htmlFor="uppercase">
                  Include Uppercase
                </label>
                <input
                  id="uppercase"
                  type="checkbox"
                  className="border-white rounded-full h-10 w-10 text-black transition-all"
                />
              </li>
              <li
                onChange={(e) => handleLower(e)}
                className="pt-4 justify-between flex flex-row"
              >
                <label htmlFor="lowercase">Include Lowercase</label>
                <input
                  id="lowercase"
                  type="checkbox"
                  className="border-white rounded-full h-10 w-10 text-black transition-all"
                />
              </li>
              <li
                onChange={(e) => handleNumber(e)}
                className="pt-4 justify-between flex flex-row"
              >
                <label htmlFor="numbers">Include Numbers</label>
                <input
                  id="numbers"
                  type="checkbox"
                  className="border-white rounded-full h-10 w-10 text-black"
                />
              </li>
              <li
                onChange={(e) => handleSpecial(e)}
                className="pt-4 justify-between flex flex-row"
              >
                <label htmlFor="symbols">Include Symbols</label>
                <input
                  id="symbols"
                  type="checkbox"
                  className="border-white rounded-full h-10 w-10 text-black"
                />
              </li>
            </ul>

            {/* button that handles password generation */}
            <div className="font-bold flex flex-row w-full mt-12 text-4xl h-20">
              <button
                onClick={() => setSaveModule(!saveModule)} 
                className={`${
                  saveModule ? "text-white bg-black" : ""
                } font-didactGothic flex flex-row text-white bg-black opacity-30 hover:scale-105 w-1/2 sm:hover:scale-100 hover:opacity-100 items-center justify-center rounded-l-lg transition-all sm:hidden`}
              >
                Save As...
              </button>
              {/* separating border between the "save as" and "generate" buttons */}
              <div className="w-1 bg-transparent"/>
              <button
                onClick={() => setSubmit(true)}
         
                className="font-didactGothic flex flex-row text-white bg-black opacity-30 hover:scale-105 sm:hover:scale-100 w-1/2 hover:opacity-100 items-center justify-center rounded-r-lg transition-all sm:rounded-lg sm:mx-auto sm:w-full"
              >
                Generate
              </button>
            </div>
            <div>
              <form
                onSubmit={handleSubmit}
                className={`${
                  !saveModule ? "opacity-0" : "opacity-100"
                }  flex flex-row mt-4 text-center justify-center items-center w-80 h-14 rounded-lg bg-black text-2xl text-white transition-all delay-100`}
              >
                <p className="w-1/3">Name: </p>
                <div className="flex flex-row">
                  <input
                    id="fileName"
                    type="text"
                    value={fileName}
                    onChange={handleFileNameChange}
                    className="w-full h-4/5 bg-white text-black rounded"
                    pattern="[a-zA-Z0-9]{1,30}"
                  />
                </div>
                <button
                  type="submit"
                  onClick={() => setSaveModule(false)}
                  className="w-1/3 h-full text-white rounded-r-lg hover:bg-gray-900 transition-all"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
