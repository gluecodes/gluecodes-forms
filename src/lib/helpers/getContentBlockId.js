export default (headline) => (
  headline
    .split(' ')
    .join('-')
    .replace(/[^\w-]/g, '')
    .toLowerCase()
)
