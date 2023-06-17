import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    ['bold', 'italic', 'underline', 'strike'],
    
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'align': [] }],
    ['blockquote', 'code-block','link', 'image'],
  
    ['clean']  
  ]};

  const formats= [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image','size',
    'font','color','background','script','direction','align','code-block'
  ];

const Editor = ({value,onChange}) => {
  return (
    <ReactQuill value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}/>
  )
}

export default Editor