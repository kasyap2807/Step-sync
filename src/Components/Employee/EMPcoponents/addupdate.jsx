import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = ({ userdata, data }) => {
  const [postError, setPostError] = useState(false);
  const postTextboxRef = useRef(null);
  const boldButtonRef = useRef(null);
  const italicButtonRef = useRef(null);
  const leftAlignButtonRef = useRef(null);
  const centerAlignButtonRef = useRef(null);
  const rightAlignButtonRef = useRef(null);
  const navigate = useNavigate();

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JS
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`; // Format date as YYYY-MM-DD

  const [empupdate, setEmpupdate] = useState({
    date: formattedDate,
    subject: "todays work details",
    attachment: "na"
  });

  const formatText = (command) => {
    document.execCommand(command, false, null);
    updateToolbar();
  };

  const updateToolbar = () => {
    boldButtonRef.current.classList.toggle('active', document.queryCommandState('bold'));
    italicButtonRef.current.classList.toggle('active', document.queryCommandState('italic'));
    leftAlignButtonRef.current.classList.toggle('active', document.queryCommandState('justifyLeft'));
    centerAlignButtonRef.current.classList.toggle('active', document.queryCommandState('justifyCenter'));
    rightAlignButtonRef.current.classList.toggle('active', document.queryCommandState('justifyRight'));

    setEmpupdate((prevState) => ({
      ...prevState,
      details: postTextboxRef.current.innerHTML
    }));
  };

  const handleFileChange = (event) => {
    setEmpupdate((prevState) => ({
      ...prevState,
      attachment: event.target.files
    }));
  };

  const handleDateChange = (event) => {
    setEmpupdate((prevState) => ({
      ...prevState,
      date: event.target.value
    }));
  };

  const submitPost = async() => {
    const response = await axios.post("http://127.0.0.1:5000/empupdate", empupdate, {
        headers: {
          'token': data
        }
      });

      window.location.reload()
  };

  return (
    <div className="bg-gray-100 flex justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Today's Work Update</h1>
        <form id="postForm">
          <div className="mb-4">
            <div className="toolbar mb-2">
              <button
                type="button"
                ref={boldButtonRef}
                onClick={() => formatText('bold')}
                className="mr-2 py-1 px-2 border border-gray-300 bg-gray-100 cursor-pointer"
              >
                <b>B</b>
              </button>
              <button
                type="button"
                ref={italicButtonRef}
                onClick={() => formatText('italic')}
                className="mr-2 py-1 px-2 border border-gray-300 bg-gray-100 cursor-pointer"
              >
                <i>I</i>
              </button>
              <button
                type="button"
                ref={leftAlignButtonRef}
                onClick={() => formatText('justifyLeft')}
                className="mr-2 py-1 px-2 border border-gray-300 bg-gray-100 cursor-pointer"
              >
                Left
              </button>
              <button
                type="button"
                ref={centerAlignButtonRef}
                onClick={() => formatText('justifyCenter')}
                className="mr-2 py-1 px-2 border border-gray-300 bg-gray-100 cursor-pointer"
              >
                Center
              </button>
              <button
                type="button"
                ref={rightAlignButtonRef}
                onClick={() => formatText('justifyRight')}
                className="mr-2 py-1 px-2 border border-gray-300 bg-gray-100 cursor-pointer"
              >
                Right
              </button>
            </div>
            <div
              ref={postTextboxRef}
              className="post-textbox"
              contentEditable="true"
              onInput={updateToolbar}
            ></div>
            {postError && (
              <p className="text-red-500 text-xs italic" style={{ display: 'block' }}>
                Please write your post.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="attachments">
              Attachments
            </label>
            <input
              type="file"
              id="attachments"
              multiple
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={submitPost}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
