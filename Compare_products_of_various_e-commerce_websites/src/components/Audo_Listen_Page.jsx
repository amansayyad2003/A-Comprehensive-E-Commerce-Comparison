import React, { useState, useEffect} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Inputcontext from "../../context/searchBar/Inputcontext";
export default function Audo_Listen_Page() {
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [timeoutId, setTimeoutId] = useState(null);

    const fetchData = async (value) => {
        try {
          props.setProgress(20);
          props.setProgress(40);
          const url = `http://localhost:3000/api/python?searchTerm=${encodeURIComponent(value)}`;
          props.setProgress(60);
    
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          props.setProgress(80);
    
          if (!response.ok) {
            throw new Error("Failed to execute Python script");
          }
    
          const result = await response.json();
          props.setProgress(100);
          console.log("Result from backend:", result["result"]);
    
          const dead = result["result"];
          console.log("Printing type of dead:", typeof dead);
          console.log("Original JSON string:", dead);
    
          const cleanedStr = dead.replace(/'/g, '"').replace(/,\s+/g, ",");
          console.log("Cleaned JSON string:", cleanedStr);
    
          const list = JSON.parse(cleanedStr);
    
          console.log("Parsed JSON data:", list);
    
          console.log("Printing type of list:", typeof list);
    
          setProducts(list);
          setLoading(false);
          props.setProgress(100);
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
    
    useEffect(() => {
        if (transcript) {
            clearTimeout(timeoutId); // Clear the existing timeout
            const newTimeoutId = setTimeout(() => {
                console.log("No voice detected for 2 seconds. Stopping listening.");
                SpeechRecognition.stopListening();
                fetchData(transcript)
                resetTranscript();
            }, 2000); // Set a new timeout to stop listening after 2 seconds of no voice input
            setTimeoutId(newTimeoutId);
        }
    }, [transcript, resetTranscript]);

  return (
    <div>
        {/* <h1>Listening...</h1> */}
        <div style={{ width: '100%', display: 'flex'}}>
            <div style={{ width: '80%',fontSize: '45px',paddingTop: '94px'  }}  onClick={() => setTextToCopy(transcript)}>
                {transcript}
            </div>
            <i style={{ width: '50%', textAlign: 'right', fontSize: '240px' }} className="fa-solid fa-microphone" onClick={startListening}></i>
        </div>

      
    </div>
  )
}
