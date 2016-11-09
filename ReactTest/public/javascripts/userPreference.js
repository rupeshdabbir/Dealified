/**
 * Created by Nrsimha on 11/8/16.
 */
import React from 'react';
import $ from 'jquery';
// import {List} from './List';

export class Selection extends React.Component{




    render() {

        return (
            <div>
                <form onSubmit={this._handleSubmit.bind(this)}>
            <div class="row">  <input type="date"  class="datepicker" ref={(input) => this._start=input}></input> <input type="date" class="datepicker" ref={(input) => this._end=input}></input></div>
            <div class="row">
                <p class="range-field">
                    <input type="range" id="range" min="10" max="1000" ref={(input) => this._range=input}/>
                </p>
            </div>
            </form>
                </div>
        );
    }

    componentDidMount(){
        


    }
    
    _handleSubmit(){
        
    }



}
