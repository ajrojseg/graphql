import { isLoggedIn, getAccessToken } from "./auth";

const URL = 'http://localhost:9000/graphql'

const graphqlRequest = async (query, variables = {}) => {
  const request = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables })
  }
  if (isLoggedIn()) {
    request.headers['authorization'] = `Bearer ${getAccessToken()}`
  }
  const response = await fetch(URL, request)
  const parsedResponse = await response.json()
  if (parsedResponse.errors) {
    throw new Error(parsedResponse.errors.map(error => error.message).join('\n'))
  }
  return parsedResponse.data
}

export const createAccount = async input => {
  const mutation = `
    mutation CreateAccountMutation($input: CreateAccountInput){
      accountCreated: createAccount(input: $input) {
        status
        message
      }
    }
  `
  const { accountCreated } = await graphqlRequest(mutation, { input })
  return accountCreated
}

export const postJobData = async input => {
  const mutation = `
    mutation CreateJobMutation($input: CreateJobInput) {
      job: createJob(input: $input) {
        id
        title
        description
        company {
          id
          name
        }
      }
    }
  `
  const { job } = await graphqlRequest(mutation, { input })
  return job
}


export const fetchCompanyData = async id => {
  const query = `
    query CompanyQuery($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
          description
        }
      }
    }
  `
  const { company } = await graphqlRequest(query, { id })
  return company
}

export const fetchCompaniesData = async () => {
  const query = `
    query CompanyQuery {
      companies {
        id
        name
      }
    }
  `
  const { companies } = await graphqlRequest(query)
  return companies
}

export const fetchJobData = async id => {
  const query = `
    query JobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        description
        company {
          id
          name
        }
      }
    }
  `
  const { job } = await graphqlRequest(query, { id })
  return job;
}

export const fetchJobsData = async () => {
  const query = `
    {
      jobs {
        id
        title
        company {
          id
          name
        }
      }
    }
  `
  const { jobs } = await graphqlRequest(query)
  return jobs
}