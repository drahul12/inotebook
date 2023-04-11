import React from 'react'

function Alert(props) {
   return (
    <>
       {props.alert && <div class={`alert alert-${props.alert.type}`} role="alert">
        {props.alert.message}
        </div>}
    </>
  )
}

export default Alert
