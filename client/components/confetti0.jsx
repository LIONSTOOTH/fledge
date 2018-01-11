import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import sizeMe from 'react-sizeme';
import Confetti from 'react-confetti';

const Fetti0 = sizeMe({
  monitorHeight: true,
  monitorWidth: true,
})(
  class Example0 extends React.PureComponent {
    static propTypes = {
      size: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
      })
    };
    render() {
      return (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Confetti
            width={this.props.size.width}
            height={this.props.size.height}
            recycle={false}
            run={false}
          />
        </div>
      );
    }
  }
);

export default Fetti0;
