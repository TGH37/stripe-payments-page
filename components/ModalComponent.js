import React, { useContext, useRef, useEffect  } from 'react'
import { Modal } from 'bootstrap'

import { SubscriptionContext } from '../contexts/subscriptionState'

function ModalComponent() {
  const { setModal, modal } = useContext(SubscriptionContext);
  const exampleModal = useRef()

  useEffect( async () => {
    setModal(new Modal(exampleModal.current))
  }, [])

  return (
    <div className="modal fade" ref={exampleModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Non-Functional Link</h5>
            <button type="button" className="btn-close" onClick={() => modal.hide()} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            This web application is a showcase only and therefore this link is not functional,<br/>
            Please return to the site and keep looking around if you are interested.
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => modal.hide()}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalComponent
