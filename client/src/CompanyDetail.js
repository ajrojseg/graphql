import React, { Component } from 'react'
import { JobList } from './JobList'
import { fetchCompanyData } from './API'

export class CompanyDetail extends Component {
  state = { 
    company: {} 
  };
  
  async componentDidMount() {
    const { companyId } = this.props.match.params
    const company = await fetchCompanyData(companyId)
    this.setState({ company })
  }

  render() {
    const { company } = this.state

    return (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>

        <h2 className="title">Job Openings</h2>
        <JobList jobs={ company.jobs || [] } />
      </div>
    );
  }
}
