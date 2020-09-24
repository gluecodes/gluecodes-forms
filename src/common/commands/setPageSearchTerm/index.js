class InvalidPageSearchTermError extends Error {
  constructor (...args) {
    super(...args)
    this.name = 'InvalidPageSearchTermError'
  }
}

export default (term) => {
  if (term.trim() === '') {
    throw new InvalidPageSearchTermError('Search term cannot be empty.')
  }

  if (term === 'fuck') {
    throw new InvalidPageSearchTermError('Search term cannot be a swear word.')
  }

  return term
}
