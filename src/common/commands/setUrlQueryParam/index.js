import { setUrlQueryParam } from '@app/reusableFunctions'

export default ({
  name,
  value
}) => {
  setUrlQueryParam({ name, value })
}
