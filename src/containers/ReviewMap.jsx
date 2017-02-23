import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { getReview } from '../actions/index.jsx'
import { bindActionCreators } from 'redux'
import axios from 'axios'

/* Container component handling states, event handlers, and passing down props */

export class ReviewMap extends Component {

  constructor(props) {
    super(props);

  }

  loadReviewsFromServer() {
    const url = '/api/neighborhoods/reviews';
    var that = this;
    const request = axios.get(url).then(function(response) {
      console.log('get review response', response);
      var mappedData = response.data.map(function(review) {
        console.log(review.name);
        return {
          name: review.name
        }
      })
      console.log(mappedData);
      that.props.getReview(mappedData);
    });
  }

  componentDidMount() {
    console.log('ReviewMap component mounted');
    this.loadReviewsFromServer();
  }


  renderList() {
    return this.props.reviews.map((review) => {
      return (
        <li key={review.review} className="review-list-item"> {review.review} </li>
      );
    });
  }

  render() {
    return (
        <ul className="list-item col-sm-4">
          {this.renderList()}
        </ul>
      );
  }
}


function mapStateToProps(state) {
  return {
    reviews: state.reviews
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getReview }, dispatch);
}


/*
connect() is a function that injecst Redux-related props into your component
Inject data and callbacks that change that data by dispatching actions
The purpose of connect() is that you don't have to think about subscribing to the store
and instead specify hwo to get props based on Redux store state
Given redux state, return props.
Given redux dispatch, return callback props
*/
export default connect(mapStateToProps, mapDispatchToProps)(ReviewMap);