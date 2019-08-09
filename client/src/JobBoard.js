import React, { Component } from 'react';
import { JobList } from './JobList';
import { fetchJobsData } from './API'

export class JobBoard extends Component {
  state = {
    jobs: []
  }

  async componentDidMount() {
   const jobs = await fetchJobsData()
   this.setState({ jobs })
  }

  render() {
    const { jobs } = this.state;

    return (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={ jobs } />
      </div>
    );
  }
}
