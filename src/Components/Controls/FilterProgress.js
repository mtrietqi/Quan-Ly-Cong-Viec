import React, { Component } from 'react';

import { connect } from 'react-redux'
import * as actions from '../../actions/index'
class FilterProgress extends Component {
    render() {
        return (
            <div className="filter filter--progress">
                <ul className="list-unstyled text-left">Lọc
                    <li className="py-1 display-5 lead" onClick={this.props.filterStatus.bind(null,"1")}>
                        <i className="fa fa fa-hourglass-start mr-2" />Bắt đầu
                    </li>
                    <li className="py-1 display-5 lead" onClick={this.props.filterStatus.bind(null,"2")}>
                        <i className="fa fa-anchor" />Tạm ngưng</li>
                    <li className="py-1 display-5 lead" onClick={this.props.filterStatus.bind(null,"3")}>
                        <i className="fa fa-check-square-o mr-2" />Hoàn thành
                    </li>
                    <li className="py-1 display-5 lead" onClick={this.props.filterStatus.bind(null,"4")}> 
                        <i className="fa fa-trash-o mr-2" />Hủy bỏ
                    </li>
                </ul>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return{
//     }
//   }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      filterStatus:(filterValue)=>{
        dispatch(actions.filterTask('FILTER_STATUS',filterValue))
      }
    }
  }

export default connect(null,mapDispatchToProps)(FilterProgress);