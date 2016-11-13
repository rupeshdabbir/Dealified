import React from 'react';
import { Page, Panel } from 'react-blur-admin';
import { Row, Col } from 'react-flex-proto';
import {SearchBar} from 'src/layout/components/search-bar';
import Card from 'src/layout/components/card';
require('../layout/css/welcome.css');
import $ from 'jquery';
var pubsub = require('pubsub-js');


export class Welcome extends React.Component {

  constructor(){
    super();
    this.state = {
      list:[]
    };
  }

  //Before
  // componentWillMount(){
  //   this.loadDashboard();
  // }

  componentDidMount(){
    pubsub.subscribe('searchChange', (message, data) => {
      console.log(data);
      this.setState({list : data});

    });

    $(document).on("mouseover", "#product-card", function(e){
      $(e.currentTarget).addClass('animate');
    });

    $(document).on("mouseout", "#product-card", function(e){
      $(e.currentTarget).removeClass('animate');
    });

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
        </Row>

        <h2>Search Results</h2>
        <Row>
          {this.renderCard()}
        </Row>
      </Page>
    );
  }
}

