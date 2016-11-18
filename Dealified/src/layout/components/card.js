import React from 'react';
require('../css/styles.css');

export default class Card extends React.Component {

  constructor() {
    super();
    this.state = {};
      //console.log(this.props.data.href[0]['href']);
    // if(this.props.data.href[0]['href'].indexOf('blank.gif')!==-1)
    //   console.log("hello")

      }


  render() {

    return (
      <div id="make-3D-space">
        <div id="product-card">
          <div id="product-front">
            <div className="shadow"></div>
            <img src={this.props.data.image} alt="" />
            <div className="image_overlay"></div>
            <a href={this.props.data.href} target="_blank"><div id="view_details">Go to Deal</div></a>
            <div className="stats">
              <div className="stats-container">
                {/*<span className="product_price">$39</span>*/}
                <span className="product_name">{this.props.data.title}</span>
                {/*<p>Men's running shirt</p>*/}

                {/*<div className="product-options">*/}
                  {/*<strong>SIZES</strong>*/}
                  {/*<span>XS, S, M, L, XL, XXL</span>*/}
                  {/*<strong>COLORS</strong>*/}
                  {/*<div className="colors">*/}
                    {/*<div className="c-blue"><span></span></div>*/}
                    {/*<div className="c-red"><span></span></div>*/}
                    {/*<div className="c-white"><span></span></div>*/}
                    {/*<div className="c-green"><span></span></div>*/}
                  {/*</div>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


