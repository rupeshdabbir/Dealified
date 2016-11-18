/**
 * Created by rdabbir on 11/17/16.
 */

import React from 'react';
import Switch from 'react-toolbox/lib/switch';

export default class SwitchComponent extends React.Component {
  state = {
    switch_1: true,
    switch_2: false,
    switch_3: true
  };

  handleChange = (field, value) => {
    this.setState({...this.state, [field]: value});
  };

  render () {
    return (
      <section>
        <Switch
          checked={this.state.switch_1}
          label="SMS Notification"
          onChange={this.handleChange.bind(this, 'switch_1')}
        />
        <Switch
          checked={this.state.switch_2}
          label="Mail notifications"
          onChange={this.handleChange.bind(this, 'switch_2')}
        />
        <Switch
          checked={this.state.switch_3}
          disabled
          label="Push Notification (Web/Mobile)"
          onChange={this.handleChange.bind(this, 'switch_3')}
        />
      </section>
    );
  }
}
