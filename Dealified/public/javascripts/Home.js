import React from 'react';
import FullWidthSection from './FullWidthSection'
import Widget from './Widget';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-title">Dashboard</h1>
        <FullWidthSection useContent={true}>
          <Widget
            heading="Card Widget"
            firstChild={true}
            content={<p>Content goes here</p>}
          />
          <Widget
            heading="Expandable Widget"
            content={<p>Content goes here</p>}
          />
          <Widget
            heading="Chart Widget"
            lastChild={true}
            content={<p>Content goes here</p>}
          />
        </FullWidthSection>
      </div>
    );
  }
}

export default Home;
