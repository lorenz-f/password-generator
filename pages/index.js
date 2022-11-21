import React, { useEffect, useState } from "react";

export default function Home() {
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
  const [password, setPassword] = useState("");
  const [fileName, setFileName] = useState("password");
  const [generateHover, setGenerateHover] = useState(false);
  const [buttonPress, setButtonPress] = useState(false);
  const [copyPress, setCopyPress] = useState(false);
  const [copyHover, setCopyHover] = useState(false);
  const [copy, setCopy] = useState(false);
  const [saveModule, setSaveModule] = useState(false);
  const [saveHover, setSaveHover] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(false);
  const tempPassword = [];

  let params = lowercase + uppercase + number + special;
  const strength = isLowercase + isUppercase + isNumber + isSpecial;

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

  useEffect(() => {
    if (saveSubmit) {
      var saveName = `${fileName}.txt`
      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:attachment/text,' + encodeURI(password);
      hiddenElement.target = '_blank';
      hiddenElement.download = saveName;
      hiddenElement.click();
    }
    setSaveSubmit(false);
  }, [saveSubmit]);
  

  function handleCopy() {
    if (password != "") {
      setCopy(true);
      const element = document.createElement("textarea");
      element.value = password;
      document.body.appendChild(element);
      element.select();
      document.execCommand("copy");
      document.body.removeChild(element);
      setText("Copied!");
      {
        /* setting text to fade after a second */
      }
      setTimeout(() => {
        setCopy(false);
      }, 1000);
    }
  }

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

  {/* below validator is pretty simple and not universal though "safe", checks for alphanumerics and hyphen*/}

  function fileValidator(e) {
    var validChars = new RegExp("/[a-z0-9]|[-]/gi");
    return !!validChars.test(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!fileValidator(fileName)) {
      setSaveSubmit(true);
    } else {
      setError(true);
    }
  }

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col transition-all">
          <h1 className="text-center text-5xl p-10">Password Generator</h1>
          <div className="w-full h-6" />
          <div className="bg-[#18171F] flex flex-row items-center p-3">
            <h2 className="ml-5 text-2xl">{password}</h2>
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
                fill={`${copyHover ? "#fef08a" : "white"}`}
                d="M39 40H13q-1.2 0-2.1-.9-.9-.9-.9-2.1V5q0-1.2.9-2.1.9-.9 2.1-.9h17.4L42 13.6V37q0 1.2-.9 2.1-.9.9-2.1.9ZM28.9 14.9V5H13v32h26V14.9ZM7 46q-1.2 0-2.1-.9Q4 44.2 4 43V12.05h3V43h24.9v3Zm6-41v9.9V5v32V5Z"
              />
            </svg>
          </div>
          <button
            onClick={() => setSaveModule(!saveModule)}
            onMouseEnter={() => setSaveHover(true)}
            onMouseLeave={() => setSaveHover(false)}
            className={`${saveModule ? "text-black bg-yellow-200" : ""} ${
              saveHover ? "text-black bg-yellow-200" : ""
            } text-lg mt-3 ml-auto mr-0 bg-[#18171F] px-4 py-2 rounded transition-all`}
          >
            Save As...
          </button>
          <div className="w-full h-2" />

          {/* below controls "main" box of the generator */}

          <div className="px-12 py-6 text-lg rounded-3xl">
            <div className="flex flex-row text-2xl pb-4 items-center">
              Character Length
              <p
                onChange={handleLengthChange}
                className="ml-[auto] mr-0 text-4xl"
              >
                {input}
              </p>
            </div>
            <input
              className="w-full my-6 bg-yellow-200  rounded-full cursor-pointer appearance-none range-sm [::-webkit-slider-thumb]"
              type="range"
              id="slider"
              min={8}
              max={25}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <ul className="flex flex-col ">
              <li onChange={(e) => handleUpper(e)} className="pt-4">
                <input
                  id="uppercase"
                  type="checkbox"
                  className="bg-zinc-700 border-white rounded-full h-7 w-7 text-transparent"
                ></input>
                <label htmlFor="uppercase">Include Uppercase</label>
              </li>
              <li onChange={(e) => handleLower(e)} className="pt-4">
                <input
                  id="lowercase"
                  type="checkbox"
                  className="bg-zinc-700 border-white rounded-full h-7 w-7 text-transparent"
                ></input>
                <label htmlFor="lowercase">Include Lowercase</label>
              </li>
              <li onChange={(e) => handleNumber(e)} className="pt-4">
                <input
                  id="numbers"
                  type="checkbox"
                  className="bg-zinc-700 border-white rounded-full h-7 w-7 text-transparent"
                ></input>
                <label htmlFor="numbers">Include Numbers</label>
              </li>
              <li onChange={(e) => handleSpecial(e)} className="pt-4">
                <input
                  id="symbols"
                  type="checkbox"
                  className="bg-zinc-700 border-white rounded-full h-7 w-7 text-transparent"
                ></input>
                <label htmlFor="symbols">Include Symbols</label>
              </li>
            </ul>

            {/* controls strength range bar */}

            <div className="flex flex-row w-[460px] h-[80px] bg-zinc-700 items-center text-3xl mt-6">
              STRENGTH:
              <label
                className={`${
                  strength == 0
                    ? "bg-zinc-700 ml-6"
                    : strength == 1
                    ? "bg-red-500 w-[13.75%] rounded-r-none"
                    : strength == 2
                    ? "bg-yellow-200 w-[27.5%] rounded-r-none"
                    : strength == 3
                    ? "bg-lime-200 w-[41.25%] rounded-r-none"
                    : "bg-green-400 w-[55%] rounded-r-full"
                } text-[#E6E5EA] ml-12 h-1/2 rounded-l-full transition-all `}
                htmlFor="strengthTest"
              >
                <p className={`${strength == 0 ? "" : "hidden"} w-[250px]`}>
                  Password not set
                </p>
              </label>
            </div>

            {/* button that handles password generation */}

            <button
              onClick={() => setSubmit(true)}
              onMouseEnter={() => setGenerateHover(true)}
              onMouseLeave={() => setGenerateHover(false)}
              onMouseDown={() => setButtonPress(true)}
              onMouseUp={() => setButtonPress(false)}
              className={`${
                buttonPress
                  ? "bg-[#24232C] text-[#00FFFF] scale-95"
                  : "bg-zinc-700 text-[#24232C]"
              } flex flex-row border-4 border-transparent hover:shadow-2xl w-[460px] h-[80px] hover:bg-yellow-200 hover:text-zinc-700 items-center justify-center mx-0 mt-10 rounded-3xl text-4xl text-[#fef08a] transition-all`}
            >
              GENERATE{" "}
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                <path
                  className={`transition-all`}
                  fill={`${generateHover ? "#3f3f46" : "#fef08a"}`}
                  d="m24 40-2.1-2.15L34.25 25.5H8v-3h26.25L21.9 10.15 24 8l16 16Z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* save module dialog box */}

        {/* "saveModule" and "expanded", while representing the same state, need to handle setTimeout differently to make display: hidden or "hidden" work */}
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className={`${
            !saveModule ? "opacity-0" : "opacity-100"
          } absolute flex flex-col border-2 w-48 h-32 mt-[-34.5%] ml-[29.5%] p-0.5 rounded bg-yellow-200 border-none text-xl text-zinc-700 transition-all delay-100`}
        >
          <p className="text-md mt-0.5 mb-0.5 mx-1 italic">Enter filename...</p>
          <div className="flex flex-row">
            <input
              id="fileName"
              type="text"
              value={fileName}
              onChange={handleFileNameChange}
              className="w-full h-4/5 bg-zinc-700 text-yellow-200 mt-0 mb-0.5 mx-1 rounded"
            />

            {/* elected to go for p tag over label tag as label padding was difficult to work with (wanted the ".txt" extension on screen closer to the input field whereas the "label" element always added extra static padding) */}
          
          </div>
          <button
            type="submit"
            onClick={() => setSaveModule(false)}
            className="mt-0 mb-1 mx-1 border rounded h-full hover:text-yellow-200 hover:bg-zinc-700 transition-all"
          >
            Save
          </button>
        </form>
        {error ? (
            <p className="absolute h-8 mt-[-32.7%] ml-[40%] p-0.5 text-xl rounded italic transition-all text-red-500 delay-100">
              Please enter a valid filename
            </p>
          ) : (
            ""
          )}
      </div>
    </>
  );
}
