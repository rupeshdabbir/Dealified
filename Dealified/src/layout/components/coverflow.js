/**
 * Created by rdabbir on 11/17/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Coverflow from 'react-coverflow';
import {StyleRoot} from 'radium';

export default class CoverFlow extends React.Component {
  constructor(){
    super();
  }
ma
render(){
  return(
  <Coverflow
    width={960}
    height={480}
    displayQuantityOfSide={2}
    navigation={false}
    enableHeading={false}
  >
    <img src='https://s12.postimg.org/bp9tjj4y5/ipad.png' alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
    <img src='https://s21.postimg.org/hw4zqy85j/pixel.png' alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
    <img src='https://s21.postimg.org/pde765xon/surface.png' alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
    <img src='https://s14.postimg.org/rm2avfqi9/mini2.png' alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
    <img src='https://s22.postimg.org/ur04bfc29/MACBOOKPRO_wid_1200_hei_630_fmt_jpeg_qlt_95_op_s.jpg' alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
  </Coverflow>
  );
}
}
