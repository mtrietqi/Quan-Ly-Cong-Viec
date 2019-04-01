import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';

const cardSource = {
    beginDrag(props) {
        return props.item,
        {
            id: props.id,
            index: props.index,
        }
    },
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }

        return props.handleDrop(props.item);
    }
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = (findDOMNode(
            component,
        )).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
}



function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

class TaskItem extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        moveCard: PropTypes.func.isRequired,
    }

    getLabelColor = (label) => {
        switch (label) {
            case "Frontend":
                return "#389E0D"
            case "Backend":
                return "#722ED1"
            case "API":
                return "#13C2C2"
            case "Issue":
                return "#CF1322"
            default:
                return ""
        }
    }

    getPriority = (number) => {
        switch (parseInt(number, 10)) {
            case 1:
                return 'Cao'
            case 2:
                return 'Trung bình'
            case 3:
                return 'Thấp'
            default:
                return null;
        }
    }

    getPriorityClass = (number) => {
        switch (parseInt(number, 10)) {
            case 1:
                return 'text-danger'
            case 2:
                return 'text-success'
            case 3:
                return 'text-info'
            default:
                return '';
        }
    }

    getProgressIcon = (number) => {
        switch (number) {
            case "1":
                return "fa-hourglass-start"
            case "2":
                return "fa-anchor"
            case "3":
                return "fa-check-square-o"
            case "4":
                return "fa-trash-o"

            default:
                return ""
        }
    }
    onChange = (item) => (e) => {
        const status = e.target.value;
        const statusEditItem = { ...item, ...{ status } };
        this.props.editTask(statusEditItem);
    }

    render() {
        // const index = this.props.index;
        // const item = this.props.item;

        // destructuring trong ES6
        const { index,isDragging, connectDragSource, item,connectDropTarget } = this.props;
        const opacity = isDragging ? 0 : 1;

        // render label
        const labelElm = item.labelArr.map((label, index) => {
            return <i
                key={index}
                className="fa fa-circle"
                style={{ color: this.getLabelColor(label) }}
            />
        })

        // render users
        const userElm = item.memberIDArr.map((member, index) => {
            return <img
                key={index}
                src={`./img/${member}.jpg`}
                className="user" alt="user"
            />
        })

        return (
            connectDragSource &&
            connectDropTarget &&
            connectDragSource(
                connectDropTarget(
                    <tr style={{ opacity }}>
                        <td className="text-center">
                            {index + 1}
                        </td>
                        <td className="text-center">
                            {item.name}
                        </td>
                        <td className="text-center">
                            {labelElm}
                        </td>
                        <td className={`${this.getPriorityClass(item.priority)} font-weight-bold text-center`}>
                            {this.getPriority(item.priority)}
                        </td>
                        <td className="text-center">
                            {userElm}
                        </td>
                        <td className="text-center d-flex">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={() => {
                                    this.props.getTask(item);
                                    this.props.convertAddToEdit()
                                }}
                                data-toggle="modal"
                                data-target="#modalTask"
                            >Sửa</button>

                            <div className="form-group mx-2 my-0">
                                <select className="form-control" name="status"
                                    onChange={this.onChange(item)}
                                >
                                    <option value={-1}>Chọn tình trạng</option>
                                    <option value={1}>Bắt đầu</option>
                                    <option value={2}>Tạm ngưng</option>
                                    <option value={3}>Hoàn thành</option>
                                    <option value={4}>Hủy bỏ</option>
                                </select>
                            </div>
                        </td>
                        <td className="text-center">
                            <i className={`fa ${this.getProgressIcon(item.status)}  mr-2`} />
                        </td>
                    </tr>),
            )
        );

    }
}

// const mapStateToProps = (state) => {
//     return {
//     }
//   }

const mapDispatchToProps = (dispatch) => {
    return {
        convertAddToEdit: () => {
            dispatch(actions.convertAddToEdit())
        },
        getTask: (task) => {
            dispatch(actions.getTask(task))
        },
        editTask: (task) => {
            dispatch(actions.editTask(task))
        }
    }
}
// TaskItem=DragSource('item', itemSource, collect)(TaskItem);
TaskItem = flow(
    DragSource(
      'item',
      cardSource,
      collect,
    ),
    DropTarget('card', cardTarget, (connect) => ({
      connectDropTarget: connect.dropTarget(),
    }))
  )(TaskItem);
export default connect(null, mapDispatchToProps)(TaskItem);