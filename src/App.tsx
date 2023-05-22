import React, { useEffect, useState } from "react";

const MyExtension = () => {
  const [selectedText, setSelectedText] = useState("");

  const handleGetSelectedText = () => {
    chrome.runtime.sendMessage({ action: "getSelectedText" });
  };

  useEffect(() => {
    const handleReceivedMessage = (request: {
      action: string;
      selectedText: React.SetStateAction<string>;
    }) => {
      if (request.action === "sendSelectedText") {
        setSelectedText(request.selectedText);
      }
    };
    chrome.runtime.onMessage.addListener(handleReceivedMessage);
    // return () => {
    //   chrome.runtime.onMessage.removeListener(handleReceivedMessage);
    // };
  }, []);

  return (
    <div>
      <button onClick={handleGetSelectedText}>Get Selected Text</button>
      <div>{selectedText}</div>
    </div>
  );
};

export default MyExtension;
