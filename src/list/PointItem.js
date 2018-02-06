import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class PointItem extends React.Component {
  constructor(props) {
    super(props);
  };
  removeClick() {
    this.props.commonProps.removePoint(this.props.item.name )
  }

  render() {
    const {item, itemSelected, dragHandle} = this.props;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15 + 1;
    const dragged = itemSelected !== 0;

    return (
      <div>
        {dragHandle(<div
          className={cx('item', {dragged}, "dragHandle")}
          style={{
            transform: `scale(${scale})`,
            boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`,
            'borderRadius':'5px'
          }}>
            <input className="remove-btn" type="button" value={'X'} 
              onClick={ ()=>this.removeClick()} />
            <span>{ item.name }</span>
        </div>)}
      </div>
    );
  }
}
PointItem.propTypes = {
  commonProps: PropTypes.shape({
    removePoint: PropTypes.func.isRequired,
  }).isRequired
};
export default PointItem;