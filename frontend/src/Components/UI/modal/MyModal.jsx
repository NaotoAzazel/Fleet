import React from 'react'
import classes from "./Modal.module.css"

function MyModal({active, setActive, children}) {
  const rootClassesModal = [classes.modal];
  if(active)
    rootClassesModal.push(classes.active);

  const rootClassesContent = [classes.modal_content]
  if(active)
    rootClassesContent.push(classes.active)

  return (
    <div className={rootClassesModal.join(" ")} onClick={() => setActive(false)}>
      <div className={rootClassesContent.join(" ")} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default MyModal