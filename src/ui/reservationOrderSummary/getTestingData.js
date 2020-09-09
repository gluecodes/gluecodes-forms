import shop from './images/shop.jpg'
import shop2 from './images/shop2.jpg'

export default () => ({
  headline: 'Thank You for booking!\nYour Reservation Time is:\n20/04/20 at 18:00',
  items: [
    {
      image: shop.src,
      title: 'Menu',
      href: '#'
    },
    {
      image: shop2.src,
      title: 'Shop',
      href: '#'
    }
  ]
})
