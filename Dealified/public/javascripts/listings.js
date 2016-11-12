import React from 'react';
import {render} from 'react-dom';

export class Listing extends React.Component{
    render(){
        return(<div>
                <table>
                <th>Title</th> <th>Date</th>

                    {this._getItems()}

                </table>
            </div>

        );
    }

    _getItems(){
        // alert(this.props.data);
        return(
          this.props.data.map((item) => {return(

              <tr>
                  <td><a href={item.href}> {item.title} </a></td>
                  
                  <td>{item.postDate}</td>
                  </tr>
              );  }
          )
        );

    }
}

