"use client";

import { useEffect, useId, useRef, useState } from "react";

type SpeechResult = {
  readonly isFinal: boolean;
  readonly length: number;
  readonly [index: number]: { readonly transcript: string };
};

type SpeechResultList = {
  readonly length: number;
  readonly [index: number]: SpeechResult;
};

type SpeechRecognitionEventLike = Event & {
  readonly resultIndex: number;
  readonly results: SpeechResultList;
};

type SpeechRecognitionErrorEventLike = Event & {
  readonly error: string;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

const ghostPrompts = [
  "Analyse the latest global threat activities.",
  "Provide details of threat actor campaigns.",
  "What are the latest ransomware campaigns?",
  "Show leaked credentials from third-party breaches.",
  "Which accounts appear in stealer malware data?",
  "Summarise breached accounts secured this week.",
  "Analyse vulnerabilities affecting our technologies.",
  "Show vulnerabilities with available public exploits.",
  "Which latest exploits should we prioritise first?",
  "Analyse our latest supply chain findings.",
  "Show suppliers with leaked passwords or stealer infections.",
  "Generate supplier remediation reports.",
];

export function GhostPromptForm({ action }: { action: string }) {
  const inputId = useId();
  const [typedPrompt, setTypedPrompt] = useState("");
  const [promptValue, setPromptValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let promptIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const clearTimer = () => {
      if (timeout) clearTimeout(timeout);
      timeout = undefined;
    };

    const tick = () => {
      const prompt = ghostPrompts[promptIndex];

      if (!deleting) {
        characterIndex += 1;
        setTypedPrompt(prompt.slice(0, characterIndex));

        if (characterIndex === prompt.length) {
          deleting = true;
          timeout = setTimeout(tick, 1800);
        } else {
          timeout = setTimeout(tick, 42);
        }
        return;
      }

      characterIndex -= 1;
      setTypedPrompt(prompt.slice(0, characterIndex));

      if (characterIndex === 0) {
        deleting = false;
        promptIndex = (promptIndex + 1) % ghostPrompts.length;
        timeout = setTimeout(tick, 320);
      } else {
        timeout = setTimeout(tick, 22);
      }
    };

    const configure = () => {
      clearTimer();
      promptIndex = 0;
      characterIndex = 0;
      deleting = false;

      if (reducedMotion.matches) {
        setTypedPrompt(ghostPrompts[0]);
      } else {
        setTypedPrompt("");
        timeout = setTimeout(tick, 450);
      }
    };

    configure();
    reducedMotion.addEventListener("change", configure);

    return () => {
      clearTimer();
      reducedMotion.removeEventListener("change", configure);
    };
  }, []);

  useEffect(() => () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    recognition.onstart = null;
    recognition.onresult = null;
    recognition.onerror = null;
    recognition.onend = null;
    recognition.abort();
    recognitionRef.current = null;
  }, []);

  const toggleVoiceInput = () => {
    if (recognitionRef.current) {
      setVoiceStatus("Finishing voice input...");
      recognitionRef.current.stop();
      return;
    }

    const speechWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (!Recognition) {
      setVoiceStatus("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new Recognition();
    let receivedResult = false;
    let failed = false;

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = navigator.language || "en-US";
    recognition.onstart = () => {
      setIsListening(true);
      setVoiceStatus("Listening...");
    };
    recognition.onresult = (event) => {
      receivedResult = true;
      let transcript = "";

      for (let index = 0; index < event.results.length; index += 1) {
        transcript += event.results[index][0]?.transcript || "";
      }

      setPromptValue(transcript.trimStart());

      const latestResult = event.results[event.results.length - 1];
      if (latestResult?.isFinal) setVoiceStatus("Voice captured. Press Enter to send.");
    };
    recognition.onerror = (event) => {
      failed = true;
      setIsListening(false);

      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setVoiceStatus("Microphone access was blocked. Allow it in your browser settings.");
      } else if (event.error === "audio-capture") {
        setVoiceStatus("No microphone was found.");
      } else if (event.error === "no-speech") {
        setVoiceStatus("No speech was detected. Try again.");
      } else {
        setVoiceStatus("Voice input could not start. Try again.");
      }
    };
    recognition.onend = () => {
      setIsListening(false);
      if (recognitionRef.current === recognition) recognitionRef.current = null;
      if (!failed) setVoiceStatus(receivedResult ? "Voice captured. Press Enter to send." : "Voice input stopped.");
    };

    recognitionRef.current = recognition;
    setVoiceStatus("Preparing microphone...");

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setIsListening(false);
      setVoiceStatus("Voice input could not start. Try again.");
    }
  };

  return <div className="ghostCloneHeroPromptGroup">
    <label htmlFor={inputId}>Chat with Ghost</label>
    <form className="ghostCloneHeroPrompt" action={action} method="get">
      <input
        id={inputId}
        name="prompt"
        type="text"
        value={promptValue}
        onChange={(event) => setPromptValue(event.target.value)}
        placeholder={typedPrompt}
        aria-label="Chat with Ghost"
        autoComplete="off"
      />
      <button
        className={isListening ? "ghostClonePromptMic isListening" : "ghostClonePromptMic"}
        type="button"
        aria-label={isListening ? "Stop listening" : "Start voice input for Ghost"}
        aria-pressed={isListening}
        title={isListening ? "Stop listening" : "Speak to Ghost"}
        onClick={toggleVoiceInput}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8.5" y="3" width="7" height="12" rx="3.5"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6"/></svg>
      </button>
    </form>
    <p className="ghostCloneVoiceStatus" aria-live="polite">{voiceStatus}</p>
  </div>;
}
