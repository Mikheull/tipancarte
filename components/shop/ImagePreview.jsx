import React, {  useEffect, useState } from "react";

export default function ImagePreview({product}) {
  const [choosenColor, setChoosenColor] = useState({})
  const colors = [
    {
      color: '#f7b168',
      color_contrast: '#f8ba79',
      logo: 'dark'
    },
    {
      color: '#fcd5ce',
      color_contrast: '#fde2dd',
      logo: 'dark'
    },
    {
      color: '#f8edeb',
      color_contrast: '#fcf8f7',
      logo: 'dark'
    },
    {
      color: '#e8e8e3',
      color_contrast: '#fafaf9',
      logo: 'dark'
    },
    {
      color: '#ebe4db',
      color_contrast: '#f7f4f1',
      logo: 'dark'
    },
    {
      color: '#ffcdb2',
      color_contrast: '#ffdcc9',
      logo: 'dark'
    },
    {
      color: '#e5989b',
      color_contrast: '#e8a2a5',
      logo: 'dark'
    },
    {
      color: '#e1ecf7',
      color_contrast: '#f0f6fb',
      logo: 'dark'
    },
    {
      color: '#b5c99a',
      color_contrast: '#cbd9b8',
      logo: 'dark'
    },
    {
      color: '#6d6875',
      color_contrast: '#7c7783',
      logo: 'light'
    },
    {
      color: '#caeff8',
      color_contrast: '#dff5fb',
      logo: 'dark'
    },
    {
      color: '#e2d7fc',
      color_contrast: '#e8dffd',
      logo: 'dark'
    },
  ]

  useEffect(() => {
    setChoosenColor(colors[Math.floor(Math.random() * colors.length)])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(!product){return 'loading'}

  return (
    <>
      <div className="absolute top-0" style={{left: "200%"}}>
        <div id="preview_sharing" className="relative" style={{height: '720px', width: '540px', backgroundColor: choosenColor.color}}>
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
            {choosenColor.logo == 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199.44 42">
                <g id="Calque_2" data-name="Calque 2">
                  <g id="Calque_1-2" data-name="Calque 1">
                    <rect x="15.85" width="4.84" height="42" rx="1.15"/>
                      <path d="M.11,24.5h0l5.83,6.16,27.35.75A2.65,2.65,0,0,0,36,28.84l.18-6.7a2.65,2.65,0,0,0-2.57-2.72L6.27,18.67Z"/>
                      <path d="M36.17,7.05v0l-5.31,6.6-27.21,3A2.64,2.64,0,0,1,.74,14.27L0,7.61A2.64,2.64,0,0,1,2.36,4.69l27.2-2.95Z"/>
                      <path d="M49.81,30.13V28l3.32-.84-.77,1.09V11.45l.87.66H48.34l.95-.85-.81,3.81H45.94V9H63.09v6.06H60.54l-.75-3.62.9.66H55.81l.86-.66V28.22l-.75-1.09,3.31.84v2.16Z"/>
                      <path d="M70.42,27.68l-.31-.36,2.31.65v2.16H64.21V28l2.31-.65-.31.36v-11l.27.27-2.27-.63V14.2L70.42,14Zm-2.23-16A2.49,2.49,0,0,1,66.41,11a2.35,2.35,0,0,1-.68-1.81,2.35,2.35,0,0,1,.71-1.87,2.61,2.61,0,0,1,1.79-.61A2.51,2.51,0,0,1,70,7.35a2.36,2.36,0,0,1,.69,1.85A2.3,2.3,0,0,1,70,11,2.57,2.57,0,0,1,68.19,11.65Z"/>
                      <path d="M82,22.66H79.6l.86-.65v6l-.59-.83,3.44.77v2.16H74V28l2.88-.84-.67.9V11.18l.75.93-3-.79V9.16L80.56,9h2.73a8.63,8.63,0,0,1,4.08.86,5.56,5.56,0,0,1,2.35,2.33,7.1,7.1,0,0,1,.76,3.33,7.34,7.34,0,0,1-.91,3.64,6.3,6.3,0,0,1-2.79,2.57A10.87,10.87,0,0,1,82,22.66Zm.64-10.59H79.81l.65-.66v8.83l-.86-.67H82a4.07,4.07,0,0,0,3.06-1.08,4,4,0,0,0,1-2.88A3.65,3.65,0,0,0,85.22,13,3.43,3.43,0,0,0,82.6,12.07Z"/>
                      <path d="M105,28l-.57-.88L107,28v2.16l-5.25.21-.57-2.85.3.1a8.5,8.5,0,0,1-2.62,2.17,6.27,6.27,0,0,1-2.9.73,4.33,4.33,0,0,1-3.18-1.23,4.69,4.69,0,0,1-1.26-3.54A4.51,4.51,0,0,1,92.3,23a4.15,4.15,0,0,1,2.14-1.46,11.7,11.7,0,0,1,3.42-.44h3.24l-.27.32v-2a2.57,2.57,0,0,0-.67-2,2.88,2.88,0,0,0-2-.61,9.67,9.67,0,0,0-1.36.11,8.88,8.88,0,0,0-1.55.37l.42-.48-.39,2.5H92.7l-.24-4.45c1.36-.36,2.61-.63,3.74-.84a18.83,18.83,0,0,1,3.1-.29A6.65,6.65,0,0,1,103.56,15,4.54,4.54,0,0,1,105,18.68Zm-9.24-2.67A2.23,2.23,0,0,0,96.32,27a1.7,1.7,0,0,0,1.3.54,3.47,3.47,0,0,0,1.7-.48A7.65,7.65,0,0,0,101,25.72l-.21.73V23l.3.29H98.55a3.49,3.49,0,0,0-2.16.5A1.86,1.86,0,0,0,95.79,25.34Z"/>
                      <path d="M108.27,30.13V28l2.52-.71-.51.6V16.43l.51.68-2.52-.75V14.2l5.28-.23.54,2.87-.54-.21a9.9,9.9,0,0,1,3.06-2.17,7.73,7.73,0,0,1,3.09-.7A4.74,4.74,0,0,1,123.09,15a5,5,0,0,1,1.32,3.85v9l-.39-.6,2.4.71v2.16h-8V28l2.28-.65-.48.63V19.78a3.07,3.07,0,0,0-.64-2.15,2.23,2.23,0,0,0-1.7-.7,4.36,4.36,0,0,0-1.77.45,6.89,6.89,0,0,0-1.89,1.36l.27-.63V28l-.39-.63,2.19.65v2.16Z"/>
                      <path d="M134.91,30.49a7.23,7.23,0,0,1-3.73-1,6.85,6.85,0,0,1-2.63-2.8,9.48,9.48,0,0,1-1-4.44,10.24,10.24,0,0,1,.69-4,7,7,0,0,1,1.86-2.62,7.49,7.49,0,0,1,2.61-1.46,9.89,9.89,0,0,1,3-.44,12.71,12.71,0,0,1,2.91.35,13,13,0,0,1,2.4.82l-.12,4.41h-2.7l-.45-2.46.33.23a4.69,4.69,0,0,0-1.09-.27,8.59,8.59,0,0,0-1.19-.08,3.44,3.44,0,0,0-2.14.64,3.82,3.82,0,0,0-1.28,1.83A8.38,8.38,0,0,0,132,22a7.86,7.86,0,0,0,.48,2.94,3.87,3.87,0,0,0,1.37,1.82,3.49,3.49,0,0,0,2.05.61,6,6,0,0,0,2-.39,10.05,10.05,0,0,0,2.31-1.17L141.63,28a12.5,12.5,0,0,1-3.36,1.91A9.71,9.71,0,0,1,134.91,30.49Z"/>
                      <path d="M156.15,28l-.57-.88,2.58.84v2.16l-5.25.21-.57-2.85.3.1A8.5,8.5,0,0,1,150,29.76a6.27,6.27,0,0,1-2.9.73,4.33,4.33,0,0,1-3.18-1.23,4.69,4.69,0,0,1-1.26-3.54,4.51,4.51,0,0,1,.74-2.71,4.15,4.15,0,0,1,2.14-1.46,11.7,11.7,0,0,1,3.42-.44h3.24l-.27.32v-2a2.57,2.57,0,0,0-.67-2,2.88,2.88,0,0,0-2-.61A9.67,9.67,0,0,0,148,17a8.88,8.88,0,0,0-1.55.37l.42-.48-.39,2.5h-2.61l-.24-4.45c1.36-.36,2.61-.63,3.74-.84a18.83,18.83,0,0,1,3.1-.29A6.65,6.65,0,0,1,154.68,15a4.54,4.54,0,0,1,1.47,3.73Zm-9.24-2.67a2.23,2.23,0,0,0,.53,1.61,1.7,1.7,0,0,0,1.3.54,3.47,3.47,0,0,0,1.7-.48,7.65,7.65,0,0,0,1.72-1.29l-.21.73V23l.3.29h-2.58a3.49,3.49,0,0,0-2.16.5A1.86,1.86,0,0,0,146.91,25.34Z"/>
                      <path d="M159.39,30.13V28l2.43-.69-.42.63V16.39l.48.72-2.49-.75V14.2l5.28-.23.54,2.85-.54-.12a12.37,12.37,0,0,1,2.67-2.18,5.53,5.53,0,0,1,2.82-.76,8,8,0,0,1,2,.29l-.27,5.56H169.5l-.45-3.25.39.82a1.54,1.54,0,0,0-.37-.09,2.58,2.58,0,0,0-.38,0,3.46,3.46,0,0,0-1.84.58,5.62,5.62,0,0,0-1.58,1.46L165.6,18v10l-.48-.63,3,.69v2.16Z"/>
                      <path d="M179.34,30.49a3.88,3.88,0,0,1-3.13-1.24,5.56,5.56,0,0,1-1.07-3.7V16.36l.54.54H172.8V14.65l2.94-.68-.6.71V10.61l4.23-.75v4.82l-.45-.57h4.56l-.06,2.79h-4.5l.45-.54V25a3.21,3.21,0,0,0,.42,1.87,1.46,1.46,0,0,0,1.26.56,4,4,0,0,0,1.07-.16,11.41,11.41,0,0,0,1.27-.44l.78,2.31A10,10,0,0,1,179.34,30.49Z"/>
                      <path d="M192.21,30.49a7.68,7.68,0,0,1-3.82-.91,6.33,6.33,0,0,1-2.57-2.72,9.55,9.55,0,0,1-.93-4.43,10.29,10.29,0,0,1,1-4.65,7,7,0,0,1,2.74-3,8.11,8.11,0,0,1,4.17-1,7.12,7.12,0,0,1,3.81.92,5.52,5.52,0,0,1,2.16,2.54,9.09,9.09,0,0,1,.69,3.62c0,.34,0,.67,0,1s-.08.7-.14,1.09h-11V20.45h7.38l-.54.39a7.66,7.66,0,0,0-.21-2.12,2.7,2.7,0,0,0-.84-1.42,2.47,2.47,0,0,0-1.65-.52,2.61,2.61,0,0,0-1.86.68,3.73,3.73,0,0,0-1,1.82,9.89,9.89,0,0,0-.3,2.52,10.1,10.1,0,0,0,.38,2.88,3.83,3.83,0,0,0,1.27,2,3.64,3.64,0,0,0,2.34.73,7.34,7.34,0,0,0,2.16-.38,11.57,11.57,0,0,0,2.46-1.12l1.44,2.25a14.17,14.17,0,0,1-3.57,1.78A11.31,11.31,0,0,1,192.21,30.49Z"/>
                  </g>
                </g>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199.44 42">
                <g id="Calque_2" data-name="Calque 2">
                  <g id="Calque_1-2" data-name="Calque 1">
                    <rect fill="#FFF" x="15.85" width="4.84" height="42" rx="1.15"/>
                    <path fill="#FFF" d="M.11,24.5h0l5.83,6.16,27.35.75A2.65,2.65,0,0,0,36,28.84l.18-6.7a2.65,2.65,0,0,0-2.57-2.72L6.27,18.67Z"/>
                    <path fill="#FFF" d="M36.17,7.05v0l-5.31,6.6-27.21,3A2.64,2.64,0,0,1,.74,14.27L0,7.61A2.64,2.64,0,0,1,2.36,4.69l27.2-2.95Z"/>
                    <path fill="#FFF" d="M49.81,30.13V28l3.32-.84-.77,1.09V11.45l.87.66H48.34l.95-.85-.81,3.81H45.94V9H63.09v6.06H60.54l-.75-3.62.9.66H55.81l.86-.66V28.22l-.75-1.09,3.31.84v2.16Z"/>
                    <path fill="#FFF" d="M70.42,27.68l-.31-.36,2.31.65v2.16H64.21V28l2.31-.65-.31.36v-11l.27.27-2.27-.63V14.2L70.42,14Zm-2.23-16A2.49,2.49,0,0,1,66.41,11a2.35,2.35,0,0,1-.68-1.81,2.35,2.35,0,0,1,.71-1.87,2.61,2.61,0,0,1,1.79-.61A2.51,2.51,0,0,1,70,7.35a2.36,2.36,0,0,1,.69,1.85A2.3,2.3,0,0,1,70,11,2.57,2.57,0,0,1,68.19,11.65Z"/>
                    <path fill="#FFF" d="M82,22.66H79.6l.86-.65v6l-.59-.83,3.44.77v2.16H74V28l2.88-.84-.67.9V11.18l.75.93-3-.79V9.16L80.56,9h2.73a8.63,8.63,0,0,1,4.08.86,5.56,5.56,0,0,1,2.35,2.33,7.1,7.1,0,0,1,.76,3.33,7.34,7.34,0,0,1-.91,3.64,6.3,6.3,0,0,1-2.79,2.57A10.87,10.87,0,0,1,82,22.66Zm.64-10.59H79.81l.65-.66v8.83l-.86-.67H82a4.07,4.07,0,0,0,3.06-1.08,4,4,0,0,0,1-2.88A3.65,3.65,0,0,0,85.22,13,3.43,3.43,0,0,0,82.6,12.07Z"/>
                    <path fill="#FFF" d="M105,28l-.57-.88L107,28v2.16l-5.25.21-.57-2.85.3.1a8.5,8.5,0,0,1-2.62,2.17,6.27,6.27,0,0,1-2.9.73,4.33,4.33,0,0,1-3.18-1.23,4.69,4.69,0,0,1-1.26-3.54A4.51,4.51,0,0,1,92.3,23a4.15,4.15,0,0,1,2.14-1.46,11.7,11.7,0,0,1,3.42-.44h3.24l-.27.32v-2a2.57,2.57,0,0,0-.67-2,2.88,2.88,0,0,0-2-.61,9.67,9.67,0,0,0-1.36.11,8.88,8.88,0,0,0-1.55.37l.42-.48-.39,2.5H92.7l-.24-4.45c1.36-.36,2.61-.63,3.74-.84a18.83,18.83,0,0,1,3.1-.29A6.65,6.65,0,0,1,103.56,15,4.54,4.54,0,0,1,105,18.68Zm-9.24-2.67A2.23,2.23,0,0,0,96.32,27a1.7,1.7,0,0,0,1.3.54,3.47,3.47,0,0,0,1.7-.48A7.65,7.65,0,0,0,101,25.72l-.21.73V23l.3.29H98.55a3.49,3.49,0,0,0-2.16.5A1.86,1.86,0,0,0,95.79,25.34Z"/>
                    <path fill="#FFF" d="M108.27,30.13V28l2.52-.71-.51.6V16.43l.51.68-2.52-.75V14.2l5.28-.23.54,2.87-.54-.21a9.9,9.9,0,0,1,3.06-2.17,7.73,7.73,0,0,1,3.09-.7A4.74,4.74,0,0,1,123.09,15a5,5,0,0,1,1.32,3.85v9l-.39-.6,2.4.71v2.16h-8V28l2.28-.65-.48.63V19.78a3.07,3.07,0,0,0-.64-2.15,2.23,2.23,0,0,0-1.7-.7,4.36,4.36,0,0,0-1.77.45,6.89,6.89,0,0,0-1.89,1.36l.27-.63V28l-.39-.63,2.19.65v2.16Z"/>
                    <path fill="#FFF" d="M134.91,30.49a7.23,7.23,0,0,1-3.73-1,6.85,6.85,0,0,1-2.63-2.8,9.48,9.48,0,0,1-1-4.44,10.24,10.24,0,0,1,.69-4,7,7,0,0,1,1.86-2.62,7.49,7.49,0,0,1,2.61-1.46,9.89,9.89,0,0,1,3-.44,12.71,12.71,0,0,1,2.91.35,13,13,0,0,1,2.4.82l-.12,4.41h-2.7l-.45-2.46.33.23a4.69,4.69,0,0,0-1.09-.27,8.59,8.59,0,0,0-1.19-.08,3.44,3.44,0,0,0-2.14.64,3.82,3.82,0,0,0-1.28,1.83A8.38,8.38,0,0,0,132,22a7.86,7.86,0,0,0,.48,2.94,3.87,3.87,0,0,0,1.37,1.82,3.49,3.49,0,0,0,2.05.61,6,6,0,0,0,2-.39,10.05,10.05,0,0,0,2.31-1.17L141.63,28a12.5,12.5,0,0,1-3.36,1.91A9.71,9.71,0,0,1,134.91,30.49Z"/>
                    <path fill="#FFF" d="M156.15,28l-.57-.88,2.58.84v2.16l-5.25.21-.57-2.85.3.1A8.5,8.5,0,0,1,150,29.76a6.27,6.27,0,0,1-2.9.73,4.33,4.33,0,0,1-3.18-1.23,4.69,4.69,0,0,1-1.26-3.54,4.51,4.51,0,0,1,.74-2.71,4.15,4.15,0,0,1,2.14-1.46,11.7,11.7,0,0,1,3.42-.44h3.24l-.27.32v-2a2.57,2.57,0,0,0-.67-2,2.88,2.88,0,0,0-2-.61A9.67,9.67,0,0,0,148,17a8.88,8.88,0,0,0-1.55.37l.42-.48-.39,2.5h-2.61l-.24-4.45c1.36-.36,2.61-.63,3.74-.84a18.83,18.83,0,0,1,3.1-.29A6.65,6.65,0,0,1,154.68,15a4.54,4.54,0,0,1,1.47,3.73Zm-9.24-2.67a2.23,2.23,0,0,0,.53,1.61,1.7,1.7,0,0,0,1.3.54,3.47,3.47,0,0,0,1.7-.48,7.65,7.65,0,0,0,1.72-1.29l-.21.73V23l.3.29h-2.58a3.49,3.49,0,0,0-2.16.5A1.86,1.86,0,0,0,146.91,25.34Z"/>
                    <path fill="#FFF" d="M159.39,30.13V28l2.43-.69-.42.63V16.39l.48.72-2.49-.75V14.2l5.28-.23.54,2.85-.54-.12a12.37,12.37,0,0,1,2.67-2.18,5.53,5.53,0,0,1,2.82-.76,8,8,0,0,1,2,.29l-.27,5.56H169.5l-.45-3.25.39.82a1.54,1.54,0,0,0-.37-.09,2.58,2.58,0,0,0-.38,0,3.46,3.46,0,0,0-1.84.58,5.62,5.62,0,0,0-1.58,1.46L165.6,18v10l-.48-.63,3,.69v2.16Z"/>
                    <path fill="#FFF" d="M179.34,30.49a3.88,3.88,0,0,1-3.13-1.24,5.56,5.56,0,0,1-1.07-3.7V16.36l.54.54H172.8V14.65l2.94-.68-.6.71V10.61l4.23-.75v4.82l-.45-.57h4.56l-.06,2.79h-4.5l.45-.54V25a3.21,3.21,0,0,0,.42,1.87,1.46,1.46,0,0,0,1.26.56,4,4,0,0,0,1.07-.16,11.41,11.41,0,0,0,1.27-.44l.78,2.31A10,10,0,0,1,179.34,30.49Z"/>
                    <path fill="#FFF" d="M192.21,30.49a7.68,7.68,0,0,1-3.82-.91,6.33,6.33,0,0,1-2.57-2.72,9.55,9.55,0,0,1-.93-4.43,10.29,10.29,0,0,1,1-4.65,7,7,0,0,1,2.74-3,8.11,8.11,0,0,1,4.17-1,7.12,7.12,0,0,1,3.81.92,5.52,5.52,0,0,1,2.16,2.54,9.09,9.09,0,0,1,.69,3.62c0,.34,0,.67,0,1s-.08.7-.14,1.09h-11V20.45h7.38l-.54.39a7.66,7.66,0,0,0-.21-2.12,2.7,2.7,0,0,0-.84-1.42,2.47,2.47,0,0,0-1.65-.52,2.61,2.61,0,0,0-1.86.68,3.73,3.73,0,0,0-1,1.82,9.89,9.89,0,0,0-.3,2.52,10.1,10.1,0,0,0,.38,2.88,3.83,3.83,0,0,0,1.27,2,3.64,3.64,0,0,0,2.34.73,7.34,7.34,0,0,0,2.16-.38,11.57,11.57,0,0,0,2.46-1.12l1.44,2.25a14.17,14.17,0,0,1-3.57,1.78A11.31,11.31,0,0,1,192.21,30.49Z"/>
                  </g>
                </g>
              </svg>
            )}
          
          </div>

          <div className="absolute bottom-0">
            <div className="preview_sharing_bottom_shape" style={{height: '80px', width: '540px', backgroundColor: choosenColor.color_contrast}}></div>
            <div style={{height: '40px', width: '540px', backgroundColor: choosenColor.color_contrast}}></div>
          </div>

          <div className="absolute bottom-0 w-full">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-t-md" style={{height: '500px', width: '25px', backgroundColor: '#000'}}></div>
            
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2" style={{height: '500px'}}>
              {product.map((plank, index) => (
                <div className="mb-3 relative overflow-hidden" key={index}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 245.06 61.27" fill={plank.color_background} className={(plank.direction == 'left') ? 'rotate-180' : ''}>
                    <g id="a"/>
                    <g id="b">
                      <g id="c">
                        <path d="M.5,1.96c.27-.79,.8-1.18,.8-1.18,.57-.41,1.24-.42,1.6-.39,71.55-.13,143.1-.26,214.64-.39,4.81,4.69,9.76,9.78,14.76,15.3,4.61,5.08,8.86,10.07,12.77,14.91-2.92,3.27-5.85,6.54-8.78,9.81-6.36,7.08-12.74,14.15-19.15,21.19-42.99-1.36-76.94-1.41-100.54-1.18-11.58,.11-29.15,.42-66.23,.78-19.67,.2-35.86,.32-46.68,.39-.3,.05-1.35,.21-2.39-.39-.66-.38-1.03-.9-1.2-1.18-.03-13.18-.06-26.37-.1-39.55,.2-.51,.42-1.2,.5-2.03,.13-1.37-.17-2.49-.4-3.14C-.08,8.17,.08,3.18,.5,1.96Z"/>
                      </g>
                    </g>
                  </svg>
                  <span className="absolute left-1/2 transform -translate-x-1/2 top-0 font-plank whitespace-nowrap" style={
                    {
                      fontSize: (plank.text.length <= 10) ? '50px' : (plank.text.length >= 10 && plank.text.length < 12) ? '45px' : (plank.text.length >= 12 && plank.text.length < 14) ? '40px' : (plank.text.length >= 14) ? '30px' : '30px', 
                      color: plank.color_text,
                      height: "67px",
                      lineHeight: "67px"
                    }}>{plank.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
