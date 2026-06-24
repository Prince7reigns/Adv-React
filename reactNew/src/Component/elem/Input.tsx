import React from 'react'
// type InputProps ={
//     title:string,
//     type:string,
//     placeholder:string,
//     value:string,
//     onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
//     className?:string
// }

//Instead of manually defining every prop, extend React's built-in input props.
type InputProps = React.InputHTMLAttributes<HTMLInputElement>



const Input = ({...props}:InputProps) => {
  return  <input {...props}/>
}

export default Input
