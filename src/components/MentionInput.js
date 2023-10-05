import React, { useState, useEffect, useRef } from "react";
import data from "../data/data.json";

const MentionInput = () => {
  const [inputText, setInputText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const mentionRef = useRef(null);

  useEffect(() => {
    mentionRef.current.focus();
    if (isMentionTriggered(inputText)) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
   
  }, [inputText, showDropdown]);

  const isMentionTriggered = (inputText) => {
    const res = inputText.includes(" @") || inputText.startsWith("@");
    return res;
  };

  const getUserName = (inputText) => {
    if (isMentionTriggered(inputText)) {
      const prefix = inputText.substring(inputText.lastIndexOf("@") + 1);

      if (typeof prefix !== "undefined") {
        return prefix;
      }
    }
    return "";
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setSelectedIndex(-1);
   
  };

  const handleKeyDown = (e) => {
    if (showDropdown) {
      if (e.key === "ArrowDown" && selectedIndex < filteredUsers.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      } else if (e.key === "ArrowUp" && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } else if (e.key === "Enter" && selectedIndex !== -1) {
        e.preventDefault();
        handleSelectMention(filteredUsers[selectedIndex].name);
      }
    }
  };

  const handleSelectMention = (mention) => {
    const regex = /(@[\w]+)/;
    const matches = inputText.match(new RegExp(regex.source, "g"));

    if (matches) {
      const lastIndex = inputText.lastIndexOf(matches[matches.length - 1]);

      let modifiedText = inputText.substring(0, lastIndex) + `@${mention} `;

      setInputText(modifiedText);
    } else {
      setInputText(`@${mention} `);
    }

    setShowDropdown(false);
    setSelectedIndex(-1);
  };
  const handleMouseEnter = (index) => {
    setSelectedIndex(index);
  };

  const prefix = getUserName(inputText);
  let filteredUsers = data.filter(
    (item) =>
      prefix !== "" && item.name.toLowerCase().startsWith(prefix.toLowerCase())
  );
  if (filteredUsers.length === 0) {
    filteredUsers = data;
  }

  return (
    <div className="center">
      <input
        className="large-input"
        ref={mentionRef}
        type="text"
        value={inputText}
        id="mention"
        placeholder="Type @ to mention someone"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <br />
      
      {showDropdown && (
        <ul>
          {filteredUsers.map((item, index) => (
            <li
              key={item.id}
              onClick={() => handleSelectMention(item.name)}
              onMouseEnter={() => handleMouseEnter(index)}
              style={{
                backgroundColor:
                  selectedIndex === index ? "#007BFF" : "transparent",
                color: selectedIndex === index ? "#fff" : "#333",
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentionInput;

