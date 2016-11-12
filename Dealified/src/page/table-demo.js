import React from 'react';
import Lightbox from 'react-images'

import { Page, Panel, Table, TableHead, TableBody, TableRow, Button, EditableText, Pagination, Breadcrumbs } from 'react-blur-admin';
import { Link } from 'react-router';
import jQuery from 'jquery';

import {Row, Col} from 'react-flex-proto';

export class TableDemo extends React.Component {

  constructor(props) {
    super(props);

    this.count = {
      min: 0,
      max: 15
    };
    this.state = {
      chromeVisits: 1000,
      currentPage: 1,
      list:[],
      currentList: []
    };
  }
  componentWillMount(){
    this._loadItems();
  }

  componentDidMount(){
    setInterval(this._loadItems(), 5000);
  }

  onEditableChange(key, value) {
    this.setState({[key]: value});
  }

  onSetCurrentPage(value) {
    this.setState({currentPage: value});
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/'>
          Home
        </Link>
          Hot Deals
      </Breadcrumbs>
    );
  }

  _loadItems(){
    jQuery.ajax({
      method: 'GET',
      url: '/api/getData',
      success: (listItem) => {
        // console.log(listItem.title);
        this.setState({currentList: listItem.slice(0,15), list: listItem });
        // console.log()
      }
    });
  }

  _getItems(){
    const size = {
      height: '42px',
      width: '42px'
    }

    const style = {
      color: '#FFFFFF'
    }

    return(
      this.state.currentList.map(item => {
        return( <TableRow key={item._id}>
            <td><img src={item.image} height={size.height} width={size.width} /></td>
            <td><a href={item.href} style={style}>{item.title}</a></td>
            <td>{item.postDate} {item.postTime}</td>
            <td><Button type='success' title='Active' size='sm'/></td>
          </TableRow>
        );
      })
    );



  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title='Hot Deals'>
        <Panel title='CLick on Your Favourite Deals'>
          <Table>
            <TableHead>
              <th>Item</th>
              <th>Title</th>
              <th>Posted Date & Time</th>
              <th>Status</th>
            </TableHead>
            <TableBody>

              {this._getItems()}

            </TableBody>
          </Table>
          <Row>
            <Col align='center'>
              <Pagination currentPage={Number(this.state.currentPage)} totalPages={this.state.list.length/15}
                          onChange={value =>
              {this.onSetCurrentPage(value);
            this.setState({currentList: this.state.list.slice((15 * (value -1) + 1 ),(15 * value))})

            }}/>
            </Col>
          </Row>
        </Panel>

        <Panel title='Condensed Table'>
          <h5>There will be less spacing between components</h5>
          <Table hover={false} condense={true}>
            <TableHead blackMutedBackground={false}>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Status</th>
            </TableHead>
            <TableBody>
              <TableRow>
                <td>1</td>
                <td>Ashley</td>
                <td>ashley@email.com</td>
                <td>555-555-5555</td>
                <td><Button type='warning' title='Inactive' size='sm'/></td>
              </TableRow>
              <TableRow>
                <td>2</td>
                <td>Jason</td>
                <td>jason@email.com</td>
                <td>555-555-5555</td>
                <td><Button type='success' title='Active' size='sm'/></td>
              </TableRow>
              <TableRow>
                <td>3</td>
                <td>Matt</td>
                <td>matt@email.com</td>
                <td>555-555-5555</td>
                <td><Button type='danger' title='Deactivated' size='sm'/></td>
              </TableRow>
              <TableRow>
                <td>4</td>
                <td>Other Matt</td>
                <td>othermatt@email.com</td>
                <td>555-555-5555</td>
                <td><Button type='success' title='Active' size='sm'/></td>
              </TableRow>
            </TableBody>
          </Table>
        </Panel>


      </Page>
    );
  }
}

