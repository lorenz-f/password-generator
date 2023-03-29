import React, { useEffect, useState } from "react";
import GithubCorner from "react-github-corner";
import Head from "next/head";

export default function Home() {

  // much of these were developed for "responsive" styles on the site, such as more complex, less typical active states
  const [input, setInput] = useState(10);
  const [submit, setSubmit] = useState(false);
  const [saveSubmit, setSaveSubmit] = useState(false);
  const [text, setText] = useState("");
  const [lowercase, setLowercase] = useState("");
  const [uppercase, setUppercase] = useState("");
  const [number, setNumber] = useState("");
  const [special, setSpecial] = useState("");
  const [isLowercase, setIsLowercase] = useState(0);
  const [isUppercase, setIsUppercase] = useState(0);
  const [isNumber, setIsNumber] = useState(0);
  const [isSpecial, setIsSpecial] = useState(0);
  const [password, setPassword] = useState(""); // initialize empty password 
  const [fileName, setFileName] = useState("password"); // sets default download file filename 
  const [buttonPress, setButtonPress] = useState(false);
  const [copyPress, setCopyPress] = useState(false);
  const [copyHover, setCopyHover] = useState(false);
  const [copy, setCopy] = useState(false);
  const [saveModule, setSaveModule] = useState(false);
  const [saveHover, setSaveHover] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(false);
  const tempPassword = []; // is used to hold the to-be generated password, character by character

  let params = lowercase + uppercase + number + special; // holds the actual type of each, user-selected parameter
  const strength = isLowercase + isUppercase + isNumber + isSpecial; // controls the "strength" bar returned on-screen

  /* below useeffect generates and runs a loop for each length unit the user selects, picking which "type" of character is added each loop */
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

  /* handles password file save */
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

  /* handles user copying*/
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

  /* each character-range handler below enables two separate states, the range of characters used itself and a 1 or 0 */
  function handleUpper(e) {
    e.target.checked
      ? (setUppercase("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), setIsUppercase(1))
      : (setUppercase(""), setIsUppercase(0));
  }
  function handleLower(e) {
    e.target.checked
      ? (setLowercase("abcdefghijklmnopqrstuvwxyz"), setIsLowercase(1))
      : (setLowercase(""), setIsLowercase(0));
  }
  function handleNumber(e) {
    e.target.checked
      ? (setNumber("0123456789"), setIsNumber(1))
      : (setNumber(""), setIsNumber(0));
  }
  function handleSpecial(e) {
    e.target.checked
      ? (setSpecial("!@#$%&'()*+,^-./:;<=>?[]_`{~}|"), setIsSpecial(1))
      : (setSpecial(""), setIsSpecial(0));
  }
  function handleLengthChange(e) {
    setInput(e.target.input);
  }
  function handleFileNameChange(e) {
    setFileName(e.target.value);
  }
 
  /* submits and validates name for basic file name compabitibility */
  function handleSubmit(e) {
    e.preventDefault();
    if (!fileValidator(fileName)) {
      setSaveSubmit(true);
    } else {
      setError(true);
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
      <GithubCorner href = "https://github.com/lorenz-f/password-generator" size = "100" octoColor = "#ccf" bannerColor = "#000000"/>
        <div className="bg-[#CCCCFF] flex flex-col h-screen w-full m-auto items-center justify-center text-black font-didactGothic overflow-hidden">
          <div className="w-[600px] h-[94%] flex flex-col justify-center transition-all border-l border-r border-black p-10">
            <h1 className="w-full text-center text-7xl font-poiretOne py-8">
              Password Generator
            </h1>
            <div className="bg-black my-8 rounded-lg flex flex-row items-center p-3">
              {/* displays password */}
              <h2 className="ml-5 text-white text-2xl tracking-wider">{password}</h2>
              {/* handles the "copy" svg icon and related dialogue */}
              <h3
                className={`${
                  !copy ? "opacity-0" : "opacity-100"
                } ml-auto mr-0 text-lg text-yellow-200 bg-transparent color-[#00FFFF] transition-all`}
              >
                Copied!
              </h3>
              <svg
                onClick={handleCopy}
                onMouseDown={() => setCopyPress(true)}
                onMouseUp={() => setCopyPress(false)}
                onMouseEnter={() => setCopyHover(true)}
                onMouseLeave={() => setCopyHover(false)}
                className={`${
                  copyPress ? "scale-90" : ""
                } ml-[auto] mr-5 cursor-pointer transition-all`}
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
            <div className = "w-full h-20">

            </div>
            {/* container holding all password generation options */}
            <div className="flex flex-col px-12 py-6 text-lg rounded-3xl items-center justify-center">
              <div className="flex flex-row text-3xl items-center">
                Character Length:
                <p
                  onChange={handleLengthChange}
                  className="ml-4 text-5xl"
                >
                  {input}
                </p>
              </div>

              {/* controls password length */}
              <input
                className="w-full my-8 bg-white rounded-lg cursor-pointer appearance-none range-sm [::-webkit-slider-thumb]"
                type="range"
                id="slider"
                min={8}
                max={25}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              {/* enables and disables the selection of certain types of characters */}
              <ul className="flex flex-col text-2xl  w-full">
                <li onChange={(e) => handleUpper(e)} className="sm:text-md pt-4 justify-between flex flex-row">
                  <label className = "sm:text-md" htmlFor="uppercase">Include Uppercase</label>
                  <input
                    id="uppercase"
                    type="checkbox"
                    className="border-white rounded-full h-10 w-10 text-black transition-all"
                  />
                </li>
                <li onChange={(e) => handleLower(e)} className="pt-4 justify-between flex flex-row">
                  <label htmlFor="lowercase">Include Lowercase</label>
                  <input
                    id="lowercase"
                    type="checkbox"
                    className="border-white rounded-full h-10 w-10 text-black transition-all"
                  />
                </li>
                <li onChange={(e) => handleNumber(e)} className="pt-4 justify-between flex flex-row">
                  <label htmlFor="numbers">Include Numbers</label>
                  <input
                    id="numbers"
                    type="checkbox"
                    className="border-white rounded-full h-10 w-10 text-black"
                  />
                </li>
                <li onChange={(e) => handleSpecial(e)} className="pt-4 justify-between flex flex-row">
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
                    onMouseEnter={() => setSaveHover(true)}
                    onMouseLeave={() => setSaveHover(false)}
                    className={`${saveModule ? "text-white bg-black" : ""} font-didactGothic flex flex-row text-white bg-black opacity-30 hover:scale-105 w-1/2 hover:opacity-100 items-center justify-center rounded-l-full transition-all`}
                  >
                    Save As...
                </button>
                {/* separating border between the "save as" and "generate" buttons */}
                <div className = "w-1 bg-transparent"/>
                <button
                  onClick={() => setSubmit(true)} 
                  onMouseDown={() => setButtonPress(true)}
                  onMouseUp={() => setButtonPress(false)}
                  className="font-didactGothic flex flex-row text-white bg-black opacity-30 hover:scale-105 w-1/2 hover:opacity-100 items-center justify-center rounded-r-full transition-all"
                >
                  Generate
                </button> 
              </div>
            </div>
          </div>
           
        </div>
    </>
  );
}
