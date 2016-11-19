import React from 'react';
import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Modal, Button, Breadcrumbs,  Select, Switch } from 'react-blur-admin';
import {Chip} from 'react-toolbox/lib/chip';
import _ from 'underscore';
import {Autocomplete} from 'react-toolbox/lib/autocomplete';
import {Slider} from 'react-toolbox/lib/slider';
import StepsComponent from 'src/layout/components/steps';
import SwitchComponent from 'src/layout/components/switch';

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
      tags: [],
      slider:'200'
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value, nvalue){

    var tag = this.state.tags;
    if(nvalue.length >0 && nvalue[0].split('$')[1]) {
      var splitVal = nvalue[0].split('$')[1];
      if( _.indexOf(tag, splitVal) == -1)
        tag.push(splitVal);
    }
    else {
      nvalue[0] = nvalue[0];
      if(_.indexOf(tag, nvalue[0]) == -1)
        tag.push(nvalue[0]);
    }
    this.setState({tags: tag});


  }


  onCloseModal() {
    pubsub.publish('alertClosed', true);
  }

  onSaveModal(){

    jquery.post({
      type: 'POST',
      url: '/api/searchData',
      data: JSON.stringify(this.state.tags),
      dataType:'json',
      contentType: 'application/json; charset=utf-8',
      success: (data) => {
        name = data;
        conole.log(data);
      }
    });

  }
  handleChange(slider, value){
    const newState = {};
    newState[slider] = value;
    this.setState(newState);
  };

  addTag(e){
    if (e.key === 'Enter') {
    }

  }

  renderTags(){
    return(
      this.state.tags.map((tag)=>{
        return(
          <Chip className="tags-component" deletable onDeleteClick={e => this.handleDeleteClick({tag})}>
            {tag}
          </Chip>
        );
      })
    )
  }

  handleDeleteClick (value){
    let tag = this.state.tags;
    let newtag = tag.filter(function(el) {
      return el !== value.tag;
    });
    this.setState({
      tags: newtag
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
    return(<Slider className="slider-component" pinned snaps min={0} max={1000} step={200} editable value={this.state.slider} onChange={this.handleChange.bind(this, 'slider')} />
    );
  }

  returnSwitch(){
    return(<SwitchComponent />);
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
        <Modal type='info' buttonText='Save' title='Create an Alert!' isOpen={true} onRequestClose={this.onCloseModal}>
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


