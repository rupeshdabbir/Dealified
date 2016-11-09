import React from 'react';
import {render} from 'react-dom';

export class Listing extends React.Component{
    render(){
        return(<div>

                <p>{this._getImages()}</p>
            </div>

        );
    }

    _getImages(){
        alert(this.props.source[0].src);
        return(
          this.props.source.map((image) => {return(
              <img src={image.src}></img>);  }
          )
        );

    }
}

