import React, { Component } from 'react';

import { connect } from 'react-redux'
import * as actions from '../../actions/index'
class FilterLabel extends Component {
    render() {
        return (
            <div className="filter filter--label">
                <ul className="list-unstyled text-left">Nhãn
                    <li 
                        className="py-1 display-5 lead"
                        onClick={this.props.filterLabel.bind(null,"Frontend")}
                    >
                        <i className="fa fa-circle mr-2" />Frontend
                    </li>
                    <li 
                        className="py-1 display-5 lead"
                        onClick={this.props.filterLabel.bind(null,"Backend")}
                    >
                        <i className="fa fa-circle mr-2" />Backend
                    </li>
                    <li 
                        className="py-1 display-5 lead"
                        onClick={this.props.filterLabel.bind(null,"API")}
                    >
                        <i className="fa fa-circle mr-2" />API
                    </li>
                    <li 
                        className="py-1 display-5 lead"
                        onClick={this.props.filterLabel.bind(null,"Issue")}
                    >
                        <i className="fa fa-circle mr-2" />Issue
                    </li>
                </ul>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      filterLabel:(filterValue)=>{
        dispatch(actions.filterTask('FILTER_LABEL',filterValue))
      }
    }
  }

export default connect(null,mapDispatchToProps)(FilterLabel);