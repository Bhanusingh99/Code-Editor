'use client'
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import MonacoEditor, { EditorDidMount } from 'react-monaco-editor';

interface CodeSubmissionFormProps {
  onSubmit: (formData: FormData) => void;
}

const CodeSubmissionForm: React.FC<CodeSubmissionFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState(63);
  const[sourceCode,setSourceCode] = useState(``);

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // try {
    //   // Make a POST request to your backend API endpoint
    //    const res = await axios.post('http://localhost:4000/api/v1/submit-code', {
    //     username,
    //     language,
    //     stdin:"5\n10\n",
    //     code:sourceCode
    //   });
    //   if(res.data.output){
    //     console.log(res.data.output)
    //   }else{
    //     console.log(res.data.stderr)
    //   }
    // } catch (error) {
    //   console.error('Error submitting code:', error);
    // }

    console.log(sourceCode)
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-12 p-4 border border-gray-300 rounded shadow-lg">

      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
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
          <option value="63">JavaScript</option>
          <option value="71">Python</option>
          <option value="62">Java</option>
          <option value="54">C++</option>
        </select>
      </div>

      {/* <div className="mb-4">
        <label htmlFor="sourceCode" className="block text-sm font-medium text-gray-700">Source Code:</label>
        <textarea
          id="sourceCode"
          name="sourceCode"
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
          required
          className="mt-1 block w-full border h-[10rem] px-2 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div> */}

      <div className="mb-4">
        <label htmlFor="sourceCode" className="block text-sm font-medium text-gray-700">Source Code:</label>
        <MonacoEditor
          height="200"
          language={language === 63 ? 'javascript' : language === 71 ? 'python' : language === 62 ? 'java' : 'cpp'}
          theme="vs-dark"
          value={sourceCode}
          onChange={(value) => setSourceCode(value)}
          options={{
            selectOnLineNumbers: true,
            suggest: {
              showIcons: true, // Show icons in suggestions
              completeFunctionCalls: true // Enable suggestions for function calls
            },
            wordBasedSuggestions: true, // Enable word-based suggestions
            quickSuggestions: true, // Show suggestions as you type
            tabSize: 2, // Set tab size to 2 spaces
            autoClosingBrackets: 'always', // Automatically close brackets
            matchBrackets: 'always', // Highlight matching brackets
            renderIndentGuides: true, // Render indent guides
            scrollBeyondLastLine: false // Disable scrolling beyond last line
          }}
        />
      </div>

      <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
    </form>
  );
};

export default CodeSubmissionForm;
