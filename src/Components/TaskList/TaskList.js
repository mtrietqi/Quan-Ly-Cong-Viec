import React, { Component } from 'react';
import {connect} from 'react-redux';

// import components
import FilterString from '../Controls/FilterString';
import TaskItem from './TaskItem';

import * as actions from '../../actions';


class TaskList extends Component {
    render() {
      const taskItemElm = this.props.taskList.map((item, index) => {
        return <TaskItem 
          key={index} // key không phải props =
          item={item}
          index={index}
          handleDrop={(item)=>this.props.deleteTask(item)}
          id={item.id}
          moveCard={this.props.moveCard}
        />
      })
        return (
            <div className="col-md-9 px-0">
                <div className="container-fluid px-0">
                  <div className="row header header--right d-flex align-items-center mx-0">
                    <div className="col-md-6">
                      <div className=" d-flex justify-content-between" >
                        <h3 className="text-left ml-2 ">Danh sách công việc</h3>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <FilterString />
                    </div>
                    
                  </div>
                </div>
                <div className="px-3">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Công việc</th>
                        <th className="text-center">Nhãn</th>
                        <th className="text-center">Độ ưu tiên</th>
                        <th className="text-center">Người thực hiện</th>
                        <th className="text-center">Xử lý</th>
                        <th className="text-center">Tình trạng</th>
                      </tr>
                    </thead>
                    <tbody>

                      {taskItemElm}
                      
                    </tbody>
                  </table>
                </div>
              </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    taskList: state.taskListReducer.filteredArr
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTask:(task)=>{
      dispatch(actions.deleteTask(task))
  },
    moveCard:(dragIndex, hoverIndex)=>{
      dispatch(actions.moveCard(dragIndex, hoverIndex))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskList);