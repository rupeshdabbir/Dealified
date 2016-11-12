/**
 * Created by Nrsimha on 11/5/16.
 */
import React from 'react';
import {render} from 'react-dom';
import {Listing} from './listings';
import jQuery from 'jquery';
import userPreference from './userPreference';

export class List extends React.Component{
    constructor() {
        super();

        this.state = {
            list: []
        };
    }
    componentWillMount(){
        this._loadItems();
    }


    render() {
        return (
            <div>
                <Listing data={this.state.list} />
            </div>
        );
    }
    componentDidMount(){
         this._timer =  setInterval(() => { this._loadItems()}, 100000);
    }

    componentWillUnmount(){

        clearInterval(this._timer);
    }


    // _getComments(){
    //
    //     return(
    //         this.state.comments.map((comment) => {
    //             return(
    //                 <Listing {...list}  />);
    //         })
    //     );
    // }

    _loadItems(){

        jQuery.ajax({
            method:'GET',
            url:'/getData',
            success: (listItem) => {
                this.setState({list: listItem})
                console.log()
            }
        });

    }
}

