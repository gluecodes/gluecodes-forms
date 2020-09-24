export const handleSearchTermKeyUp = ({
  cancelPotentialError,
  hasEnterBeenPressed,
  onSearchTermChanged,
  onSearchSubmitted,
  value
}) => {
  if (hasEnterBeenPressed) {
    if (onSearchTermChanged(value)) {
      onSearchSubmitted(value)
    }

    return
  }

  cancelPotentialError()
}
