const db = require('./db');

const Query = {
  company: (root, { id }) => db.companies.get(id),
  companies: () => db.companies.list(),
  job: (root, { id }) => db.jobs.get(id),
  jobs: () => db.jobs.list()
};

const Mutation = {
  createJob: (root, { input }, { user, isBodyEmpty }) => {
    try {
      if (user) {    
        if (isBodyEmpty(input)) throw new Error('Properties should not contain empty values.')

          const id = db.jobs.create({ companyId: user.companyId, ...input })
          return db.jobs.get(id)
        } else {
          throw new Error('Unauthenticated...')
        }
    } catch (error) {
      return error
    }
  },
  createAccount: (root, { input }) => {
    const { name, description, email, password } = input
    const companyId = db.companies.create({ name, description })
    const userId = db.users.create({ email, password, companyId })

    return companyId && userId 
      ? { status: 201, message: "Account Created" }
      : { status: 400, message: "Account could not be created :(" }
  }
}

const Company = {
  jobs: company => db.jobs.list().filter(job => job.companyId === company.id)
};

const Job = {
  company: job => db.companies.get(job.companyId)
};

module.exports = { Query, Mutation, Company, Job }