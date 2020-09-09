import image from './images/image.png'

export default ({ isCalledByPrerender } = { isCalledByPrerender: true }) => ({
  headline: 'Afternoon Tea',
  summary: 'Afternoon Tea with Prosseco for 2 people for 19.99',
  fullDescription: 'It comes with 4 sandwiches 2 fruit scones toped up with clotted cream and jam, and 4 beautiful tiny cakes',
  image: {
    src: isCalledByPrerender ? image.placeholder : image.src,
    alternateText: 'afternooon tea'
  }
})
