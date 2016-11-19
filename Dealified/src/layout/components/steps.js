/**
 * Created by rdabbir on 11/17/16.
 */
import React from 'react';
import { Row, Col } from 'react-flex-proto';
import { Steps, Button, message, Icon, Card} from 'antd';
const Step = Steps.Step;
var pubsub = require('pubsub-js');
require('../css/steps.css');

export default class StepsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.steps = [{
      title: 'Product',
      content: this.props.firstStep,
      description : "What are you looking for?",
      icon: "laptop"
    }, {
      title: 'Price',
      content: this.props.secondStep,
      description : "What is your budget?",
      icon: "credit-card"
    }, {
      title: 'Set your Alert',
      content: this.props.thirdStep,
      description : "What kind of alerts do you want?",
      icon: "clock-circle"
    }];
    //console.log(this.props.data);
    this.state = {
      current: 0
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  onFinishModal(){
    // alert('true');
    pubsub.publishSync('modalFinished', true);
    this.setState({ current: 0});
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {this.steps.map(item => <Step key={item.title} title={item.title} icon={item.icon} description={item.description}/>)}
        </Steps>
        {this.state.current==1?
          <Row>
            <Col align='center'>
              <h5> Notify me if the price falls <b>BELOW:</b></h5>
            </Col></Row> : null}

        <Row>
          <Col>
            <Card style={{ "width": "550px", "margin-bottom": "15px","background-color": "rgba(162, 162, 162, 0.08)" }}>
              <div className="steps-content">{this.steps[this.state.current].content()}</div>
            </Card>
          </Col>
        </Row>
        {this.state.current==0?
          <Row>
            <Col>
              {this.props.renderTags()}
            </Col>
          </Row>: null}
        <div className="steps-action" style={{"float": "right"}}>
          {
            this.state.current < this.steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            this.state.current === this.steps.length - 1
            &&
            <Button type="primary" onClick={() => this.onFinishModal()}>Finish</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} type="ghost" onClick={() => this.prev()}>
              Previous
            </Button>
          }
        </div>
      </div>
    );
  }
}
