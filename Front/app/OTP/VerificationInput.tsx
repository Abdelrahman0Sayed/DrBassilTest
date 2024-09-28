import { useRef, useState, useEffect } from "react";
import "../globals.css";
import { UserService } from "../Services/UserService";

interface State {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
}

interface CodeInputProps {
  onCorrect: () => void;
  onFail: () => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ onCorrect, onFail }) => {
  const userService = new UserService();
  const fieldsRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<State>({
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  });
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inputFocus = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!fieldsRef.current) return;
    const elements = Array.from(fieldsRef.current.children) as HTMLInputElement[];
    const dataIndex = +e.currentTarget.getAttribute("data-index")!;

    if (e.key === "Backspace" && !e.currentTarget.value) {
      const prevIndex = dataIndex - 1;
      if (prevIndex >= 0) {
        elements[prevIndex].focus();
      }
    } else if (e.key === "ArrowRight") {
      const nextIndex = dataIndex + 1;
      if (nextIndex < elements.length) {
        elements[nextIndex].focus();
      }
    } else if (e.key === "ArrowLeft") {
      const prevIndex = dataIndex - 1;
      if (prevIndex >= 0) {
        elements[prevIndex].focus();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, codeNumber: keyof State) => {
    const value = e.target.value.slice(-1);
    const newState = { ...state, [codeNumber]: value };
    setState(newState);

    if (value) {
      const nextIndex = parseInt(e.target.getAttribute("data-index")!) + 1;
      if (nextIndex < 6) {
        const nextInput = fieldsRef.current?.children[nextIndex] as HTMLInputElement;
        nextInput.focus();
      }
    }

    setTimeout(() => {
      const fullCode = Object.values(newState).join("");
      if (fullCode.length === 6) {
        Array.from(fieldsRef.current?.children || []).forEach((input) => {
          (input as HTMLInputElement).blur();
        });
        const email = userService.getEmail();
        console.log(email);
        
        userService.confirmOTP(fullCode, email).then((response) => {
          if (response.ok) {
            setIsSuccess(true);
            onCorrect();
            window.location.href = "/";
          } else {
            setIsError(true);
            onFail();
            setTimeout(() => {
              setState({ code1: "", code2: "", code3: "", code4: "", code5: "", code6: "" });
              setIsError(false);
              (fieldsRef.current?.children[0] as HTMLInputElement).focus();
            }, 1000);
          }
        });
        // if (fullCode === answer) {
        //   setIsSuccess(true);
        //   onCorrect(); 
        // } else {
        //   setIsError(true);
        //   onFail(); 
        //   setTimeout(() => {
        //     setState({ code1: "", code2: "", code3: "", code4: "", code5: "", code6: "" });
        //     setIsError(false);
        //     (fieldsRef.current?.children[0] as HTMLInputElement).focus();
        //   }, 1000);
        // }
      }
    }, 0);
  };

  useEffect(() => {
    (fieldsRef.current?.children[0] as HTMLInputElement).focus();
  }, []);

  return (
    <div dir="ltr">
      <div ref={fieldsRef} className={`mt-2 flex items-center gap-x-2 ${isError ? "animate-shake" : ""}`}>
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const codeKey = `code${index + 1}` as keyof State;
          return (
            <input
              key={index}
              type="text"
              data-index={index.toString()}
              maxLength={1}
              placeholder="0"
              value={state[codeKey]}
              className={`bg-white w-12 h-12 rounded-lg border-2 outline-none text-center text-2xl text-black ${
                isError ? "border-red-600 border-4" : isSuccess ? "border-green-600 border-4" : "focus:border-indigo-600 border-4"
              }`}
              onChange={(e) => handleChange(e, codeKey)}
              onKeyDown={inputFocus}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CodeInput;
