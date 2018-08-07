import React from 'react';

const ModalCart = (props) => {
 return(
       <div>
      <Modal isOpen={this.state.deletePopupFlag} toggle={this.deleteConfirmPopup} className={'modal-lg ' + this.props.className}>
      <ModalHeader toggle={this.deleteConfirmPopup}>Confirm</ModalHeader>
      <ModalBody>
          <div>
              <span> Are you sure you want to permanently delete this session ?</span>
          </div>
      </ModalBody>
      <ModalFooter>
          <Button color="success" onClick={this.deleteEvent}>Confirm</Button>&nbsp;
      <Button color="danger" onClick={this.deleteConfirmPopup}>Cancel</Button>
      </ModalFooter>
      </Modal>
      </div>
 )

}

export default ModalCart;






