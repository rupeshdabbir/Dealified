import React from 'react';
import { Page, Panel, Modal, Button, Breadcrumbs, Input, Select, Switch } from 'react-blur-admin';
var pubsub = require('pubsub-js');

export default class AlertModal extends React.Component {

  constructor(){
    super();
    this.state = {};
    //console.log("Im here");
  }

  componentDidMount() {
    //console.log("Before Mount")
    //this.setState({alert: false});
    pubsub.subscribe('alertClicked', ()=>{console.log("Alert")});
  }

  render(){
    console.log("From MODAL:",this.props.alert);

    return(
    <Modal type='info' buttonText='Save' title='Add alert' isOpen={this.state.alertModal} onClose={e => this.onCloseModal('customizedModal1')}>
      <Row>
        <Col align='center'>
          Update your information below
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='col-md-6'>
            <Input
              onChange={e => this.onTextChange('firstName', e)}
              label='First Name'
              value={this.state.firstName} />
          </div>
          <div className='col-md-6'>
            <Input
              onChange={e => this.onTextChange('lastName', e)}
              label='Last Name'
              value={this.state.lastName} />
          </div>
        </Col>
      </Row>
    </Modal>);
  }
}



