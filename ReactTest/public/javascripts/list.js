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
            comments : []
        };
    }
    componentWillMount(){
        this._loadComments();
    }


    render() {

        let images;


        return (
            <div>
                {this._getComments()}
            </div>
        );
    }
    componentDidMount(){
        // this._timer =  setInterval(() => { this._loadComments()}, 5000);
    }

    componentWillUnmount(){

        clearInterval(this._timer);
    }


    _getComments(){

        return(
            this.state.comments.map((comment) => {
                return(
                    <Listing name={comment.author} body={comment.body} source={comment.img} key={comment.id}  />);
            })
        );
    }

    _loadComments(){

        jQuery.ajax({
            method:'GET',
            url:'/load',
            success: (comment) => {
                this.setState({comments: comment})
            }
        });

    }
}

