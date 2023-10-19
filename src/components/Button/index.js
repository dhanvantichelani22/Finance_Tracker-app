import React from 'react'
import "./style.css";
function Button({text,onClick,green,disabled}) {
  return (
    <div onClick={onClick} disabled={disabled} className={green ? "btn btn-green":"btn"}>{text}</div>
  )
}

export default Button