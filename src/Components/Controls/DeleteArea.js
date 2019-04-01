import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
  }
}
class DeleteArea extends Component {
    render() {
        const { connectDropTarget, hovered, item } = this.props;
        const backgroundColor = hovered ? 'red' : 'white';
    
        return connectDropTarget(
          <div className="deleteArea" style={{ background: backgroundColor }}>
            Drag here to delete
          </div>
        );
    }
}

export default DropTarget('item', {}, collect)(DeleteArea);