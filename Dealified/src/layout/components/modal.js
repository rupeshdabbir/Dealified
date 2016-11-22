import React from 'react';
import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Modal, Button, Breadcrumbs,  Select } from 'react-blur-admin';
import {Chip} from 'react-toolbox/lib/chip';
import _ from 'underscore';
import {Autocomplete} from 'react-toolbox/lib/autocomplete';
import {Slider} from 'react-toolbox/lib/slider';
import StepsComponent from 'src/layout/components/steps';
// import SwitchComponent from 'src/layout/components/switch';
import Switch from 'react-toolbox/lib/switch';
import jquery from 'jquery';


require('../css/modal.css');
var pubsub = require('pubsub-js');

const suggestionExamples = [
  'Vizio', 'iPad','iPhone'
];


export class AlertModal extends React.Component {

  constructor(){
    super();
    this.state = {
      value: '',
      username: '',
      useremail:'',
      phone:'',
      tags: '',
      priceRange:'200',
      sms: true,
      email: true,
      push: false
    };

    // console.log(this.props.profile);
    this.onChange = this.onChange.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    pubsub.subscribe('modalFinished', (message, data) => {
      console.log(message);
      console.log(data);
      this.onSaveModal();
    });
  }

  componentWillMount(){
    this.lock = new Auth0Lock(process.env.AUTH0_PUB_KEY, process.env.AUTH0_DOMAIN);
    const idToken = localStorage.getItem('userToken');
    this.lock.getProfile(idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      console.log(profile.name);
      console.log(profile.email);
      this.setState({useremail: profile.email});
      this.setState({username: profile.name});

      console.log(this.state);
      // localStorage.setItem('userEmail', profile);
    }.bind(this));
    console.log(this.state.username);

  }

  handleSwitchChange = (field, value) => {
    this.setState({...this.state, [field]: value});
  };
  onChange(value, nvalue){

    var tag = this.state.tags;
    if(nvalue.length >0 && nvalue[0].split('$')[1]) {
      var splitVal = nvalue[0].split('$')[1];
      if( _.indexOf(tag, splitVal) == -1)
        tag = splitVal;
    }
    else {
      nvalue[0] = nvalue[0];
      if(_.indexOf(tag, nvalue[0]) == -1)
        tag = nvalue[0];
    }
    this.setState({tags: tag});


  }


  onCloseModal() {
    var tag = '';
    this.setState({tags: tag});
    pubsub.publish('alertClosed', true);
  }

  componentWillUnMount(){

  }

  onSaveModal(){
    console.log(this.state);

    jquery.post({
      type: 'POST',
      url: '/users/searchData',
      data: JSON.stringify(this.state),
      dataType:'json',
      cache: false,
      contentType: 'application/json; charset=utf-8',
      success: (data) => {
        // this.setState({
        //   value: '',
        //   tags: [],
        //   slider:'200',
        //   sms: true,
        //   email: true,
        //   push: false
        // });
      }
    });

  }
  handleChange(priceRange, value){
    const newState = {};
    newState[priceRange] = value;
    this.setState(newState);
  };

  addTag(e){
    if (e.key === 'Enter') {
    }

  }

  renderTags(){
    let tag = this.state.tags;
    return(
          <Chip className="tags-component" deletable onDeleteClick={e => this.handleDeleteClick({tag})}>
            {tag}
          </Chip>
      
    )
  }

  handleDeleteClick (value){
    // let tag = this.state.tags;
    // let newtag = tag.filter(function(el) {
    //   return el !== value.tag;
    // });
    this.setState({
      tags: ''
    });
  };

  returnAutoComplete(){
    return (<Autocomplete
      allowCreate="true"
      suggestionMatch="anywhere"
      showSuggestionsWhenValueIsSet="true"
      direction="down"
      selectedPosition="below"
      onChange={this.onChange.bind(this, 'value')}
      label="Enter Your Products"
      source={suggestionExamples}
      value={this.state.value}
    />);
  }

  returnSlider(){
    return(<Slider className="slider-component" pinned snaps min={0} max={1000} step={200} editable value={this.state.priceRange} onChange={this.handleChange.bind(this, 'priceRange')} />
    );
  }

  returnSwitch(){
    return (
      <section>
        <Switch
          checked={this.state.sms}
          label="SMS Notification"
          onChange={this.handleSwitchChange.bind(this, 'sms')}
        />
        <Switch
          checked={this.state.email}
          label="Mail notifications"
          onChange={this.handleSwitchChange.bind(this, 'email')}
        />
        <Switch
          checked={this.state.push}
          label="Push Notification (Web/Mobile)"
          onChange={this.handleSwitchChange.bind(this, 'push')}
        />
      </section>
    );
  }

  // returnTags(){
  //   return({this.renderTags});
  // }

  render(){

    const { value} = this.state;
    const inputProps = {
      placeholder: 'Try me! Search for iPad, iPhone',
      value,
      onChange: this.onChange
    };
    return(

      <div>
        {this.lock.show}
        <Modal type='info' buttonText='Save' title='Create an Alert!' isOpen={this.props.open} closeTimeoutMS={150} shouldCloseOnOverlayClick={true} onRequestClose={this.onCloseModal}>
          <i className="fa fa-times fa-3" style={{"right": "-98%", "position": "relative", "top": "-48px", "fontSize":"17px", "color":"white"}} aria-hidden="true" onClick={this.onCloseModal}></i>
          <StepsComponent
            firstStep={this.returnAutoComplete.bind(this)}
            secondStep={this.returnSlider.bind(this)}
            thirdStep={this.returnSwitch.bind(this)}
            renderTags={this.renderTags.bind(this)}
          />
          {/*{this.renderTags()}*/}
          <Row>
            <Col>
              <div className='col-lg-12'>
                {/*<Input type='text' label='Product' value={this.state.value} onChange={this.onChange.bind(this, 'value')} onKeyDown={e => this.addTag(e)} maxLength={16} />*/}
              </div>
            </Col>
          </Row>
        </Modal>

      </div>

    );
  }
}



