import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchJobData } from '../utils/api'

export class JobDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      job: {
        title: '',
        description: '',
        company: {
          id: '',
          name: ''
        }
      } 
    };
  }

  async componentDidMount() {
    const { jobId } = this.props.match.params
    const job = await fetchJobData(jobId)
    this.setState({ job })
  }

  render() {
    const { job } = this.state

    return (
      <div>
        <h1 className="title">{ job.title }</h1>
        <h2 className="subtitle">
          <Link to={`/companies/${job.company.id}`}>{ job.company.name }</Link>
        </h2>
        <div className="box">{ job.description }</div>
      </div>
    );
  }
}
