export default (dateSlot) => {
  if (!dateSlot || !dateSlot.day) {
    return 1
  }

  if (dateSlot) {
    if (dateSlot.day && !dateSlot.hours) {
      return 2
    }

    return 3
  }
}
