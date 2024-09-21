import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [PreviousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    // function to add delay to paragraph
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    // function to send prompt to gemini
    setResultData(""); // clear previous result
    setLoading(true); // set loading to true
    setShowResult(true); // show result
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPreviousPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    // const response = await run(input); // send prompt to gemini
    let responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      // add bold tag to response
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>"); // add line breaks when there is an asterisk in the response
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false); // set loading to false
    setinput(""); // clear input
  };

  const contextValue = {
    // context value for gemini api
    PreviousPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setinput,
    setShowResult,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
