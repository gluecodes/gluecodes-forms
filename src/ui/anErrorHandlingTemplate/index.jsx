import { handleSearchTermKeyUp } from './logic'

import '@app/commands/setPageSearchTerm'
import '@app/commands/submitPageSearch'

export default ({
  cancelPotentialError,
  onSearchTermChanged,
  onSearchSubmitted,
  potentialError,
  searchTerm,
  submittedSearchTerm
}) => (
  <div>
    <p>Submitted search term: {submittedSearchTerm || ''}</p>
    <input
      type="text"
      onchange={(e) => onSearchTermChanged(e.target.value)}
      onkeyup={(e) => handleSearchTermKeyUp({
        cancelPotentialError: () => potentialError && !potentialError.isCancelled && cancelPotentialError(),
        hasEnterBeenPressed: e.code === 'Enter',
        onSearchTermChanged,
        onSearchSubmitted,
        value: e.target.value
      })}/>
    <button onclick={() => onSearchTermChanged(searchTerm) && onSearchSubmitted(searchTerm)}>Search</button>
    {potentialError && !potentialError.isCancelled ? <p>{potentialError.message}</p> : null}
  </div>
)
