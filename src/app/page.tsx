'use client'
import React, { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import MonacoEditor from 'react-monaco-editor';

interface CodeSubmissionFormProps {
  onSubmit: (formData: FormData) => void;
}

const CodeSubmissionForm: React.FC<CodeSubmissionFormProps> = ({ onSubmit }) => {
  const [running,setRunning] = useState(false);
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState(52);
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");
  const [sourceCode, setSourceCode] = useState(`#include <iostream>

  using namespace std;
  
  // Entry point of the program
  int main() {
      // Your code here
      
      cout << "Hello, World!" << endl; // Example output
      
      return 0;
  }
  `);

  useEffect(() => {
      if(language === 71){
        setSourceCode("print('hello world')");
      }else if(language === 63){
        setSourceCode("console log('hello world')");
      }else if(language === 62){
        setSourceCode(`public class Main {
          public static void main(String[] args) {
              System.out.println("Hello, World!");
          }
      }
      `);}else{
        setSourceCode(`#include <iostream>

        using namespace std;
        
        int main() {
            // Your code here
            
            cout << "Hello, World!" << endl; // Example output
            
            return 0;
        }
        `)
      }
  },[language])

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRunning(true)

    try {
      // Make a POST request to your backend API endpoint
      const res = await axios.post('http://localhost:4000/api/v1/submit-code', {
        username,
        language,
        stdin: "5\n10\n",
        code: sourceCode
      });
      console.log(res.data)
      if (res.data.output) {
        setOutput(res.data.output)
        setRunning(false)
        setError("")
      }
    } catch (error) {
      setError("error in your code")
      setRunning(false)
      console.error('Error submitting code:', error);
    }
  };


  return (
    <>
      {error || output ? (
        <div className='w-[24.90%] h-screen  absolute z-99 right-0 py-4 px-2'>
          <div>
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700">output</label>
          {output ?
          <textarea
            type="text"
            id="username"
            name="username"
            value={output}
            required
            className="mt-1 block h-[90vh] text-white bg-[#222] w-full mx-auto border py-2 px-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          /> :
            <textarea
            type="text"
            id="username"
            name="username"
            value={error}
            required
            className="mt-1 block h-[90vh] text-red-500 bg-[#222] w-full mx-auto border py-2 px-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />}
          </div>
        </div>
      ) : null}

      <form className="max-w-3xl h-screen mx-auto p-4 border border-gray-300 rounded shadow-lg">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full border py-2 px-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className='mb-4'>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">Preferred Code Language:</label>
          <select
            id="language"
            name="language"
            value={language}
            onChange={(e) => setLanguage(Number(e.target.value))}
            className='mt-1 block w-full py-2 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            required
          >
            <option value="52">c++</option>
            <option value="71">Python</option>
            <option value="62">Java</option>
            <option value="63">JavaScript</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="sourceCode" className="block text-sm font-medium text-gray-700">Source Code:</label>
          <MonacoEditor
            height="350"
            language={language === 63 ? 'javascript' : language === 71 ? 'python' : language === 62 ? 'java' : language === 52 ? "cpp" : ""}
            theme="vs-dark"
            value={sourceCode}
            onChange={(value) => setSourceCode(value)}
            options={{
              selectOnLineNumbers: true,
              suggest: {
                showIcons: true, // Show icons in suggestions
              },
              wordBasedSuggestions: true, // Enable word-based suggestions
              quickSuggestions: true, // Show suggestions as you type
              tabSize: 2, // Set tab size to 2 spaces
              autoClosingBrackets: 'always', // Automatically close brackets
              matchBrackets: 'always', // Highlight matching brackets
              scrollBeyondLastLine: false, // Disable scrolling beyond last line
            }}
          />
        </div>

        <div className="w-full flex justify-end gap-4 my-2 text-white">
          <button 
          //@ts-ignore
          onClick={handleSubmit}
          className="py-1.5 px-6 rounded-xl text-semibold flex justify-center items-center bg-[#222]">{`${running ? "running...." : "run code"}`}</button>
        </div>

        <button
          className={`w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 mt-6 ${error ? "bg-red-500 cursor-not-allowed hover:bg-red-700" : ""}`}
          disabled={!!error} // Disable the button if there are syntax errors
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CodeSubmissionForm;
