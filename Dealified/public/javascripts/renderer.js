import React from 'react';
import {render} from 'react-dom';
import {List} from './list';
import {Selection} from './userPreference';

class FinalClass extends React.Component{

    render(){
return(

 <div><Selection /> <List /></div>
);

}

}

let target = document.getElementById('app');

render(<FinalClass />, target );
