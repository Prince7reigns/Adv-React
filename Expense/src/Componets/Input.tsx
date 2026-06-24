import React from 'react'
type InputProps = React.InputHTMLAttributes<HTMLInputElement>


const Input = ({...props}:InputProps) => {
  return (
    <input {...props}/>
  )
}

export default Input
