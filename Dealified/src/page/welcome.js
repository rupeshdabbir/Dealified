import React from 'react';
import { Page, Panel, Modal, Input } from 'react-blur-admin';
import { Row, Col } from 'react-flex-proto';
import {SearchBar} from 'src/layout/components/search-bar';
import Card from 'src/layout/components/card';
import AlertModal from 'src/layout/components/modal';
import {Button} from 'react-blur-admin';
require('../layout/css/welcome.css');
import $ from 'jquery';
var pubsub = require('pubsub-js');



export class Welcome extends React.Component {

  constructor(){
    super();
    this.state = {
      list:[],
      alert:false
    };
  }

  componentDidMount(){
    pubsub.subscribe('searchChange', (message, data) => {
      console.log("Data is: "+data);
      this.setState({list : data});
      this.setState({alert: false});

    });

    $(document).on("mouseover", "#product-card", function(e){
      $(e.currentTarget).addClass('animate');
    });

    $(document).on("mouseout", "#product-card", function(e){
      $(e.currentTarget).removeClass('animate');
    });
  }

  renderCustomizedModals() {
    return (
      <div>
        <Modal type='info' buttonText='Save' title='Create an Alert!' isOpen={this.state.alert} onClose={e => this.onCloseModal('alert')}>
          <Row>
            <Col align='center'>
              Please fill out the following information!
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='col-lg-12'>
                <Input
                  onChange={e => this.onTextChange('firstName', e)}
                  label='Please enter your deal name!'
                  value={this.state.firstName} />
              </div>
              {/*<div className='col-md-6'>*/}
                {/*<Input*/}
                  {/*onChange={e => this.onTextChange('lastName', e)}*/}
                  {/*label='Last Name'*/}
                  {/*value={this.state.lastName} />*/}
              {/*</div>*/}

            </Col>
          </Row>
          <div className='modal-footer'>
            <Button title="close" className="btn btn-default btn-sm modalFooter" onClick={e => this.onCloseModal('alert')}>Close</Button>
          </div>
        </Modal>

      </div>
    );
  }

 renderAlertModal(){
   this.setState({ "alert": true });
   // pubsub.publish('alertClicked');
   // return(
   //   <AlertModal data={this.state.alert} />
   // );
 }

  onCloseModal(modalName) {
    this.setState({ [modalName]: false });
  }

  renderSearch() {
    return (
      <div className="search">
        <SearchBar />
      </div>
    );
  }


  renderCard() {

    return (
      this.state.list.map((item) => {
        return (
          <Col padding={5}>
            <Panel className="panel1">
          <Card data={item}/>
          </Panel>
          </Col>
        );

      })
    );

  }

  render() {
    return (
      <Page title="Dashboard">
        <Row>
          <Col padding={5}>
            <Panel>
              {this.renderSearch()}
            </Panel>
          </Col>

          {this.renderCustomizedModals()}

          <Col padding={11} grow={false}>
              <Button type='info' title='Create Alert!' icon='fa fa-wrench' onClick={e => this.renderAlertModal("alert")} />
          </Col>
        </Row>

        <h2>Search Results</h2>
        <Row>
          {this.renderCard()}
        </Row>
      </Page>
    );
  }
}

