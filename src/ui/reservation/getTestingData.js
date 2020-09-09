import renderForm from '../form/index.jsx'
import renderCalendar from '../reservationCalendar/index.jsx'
import prerenderCalendar from '../reservationCalendar/prerender'
import renderServiceSelector from '../reservationServiceSelector/index.jsx'
import prerenderServiceSelector from '../reservationServiceSelector/prerender'
import renderContactForm from '../reservationContactForm/index.jsx'
import renderTimeSlots from '../reservationTimeSlots/index.jsx'
import renderProductDescription from '../reservationProductDescription/index.jsx'
import prerenderProductDescription from '../reservationProductDescription/prerender'
import renderOrderSummary from '../reservationOrderSummary/index.jsx'
import shop from '../reservationOrderSummary/images/shop.jpg'
import shop2 from '../reservationOrderSummary/images/shop2.jpg'

export default ({
  actionResults,
  actions,
  isCalledByPrerender
} = {
  actionResults: {},
  isCalledByPrerender: true
}) => ({
  actions,
  actionResults,
  getSlot: (selector) => {
    switch (selector.id) {
      case 'baseForm': {
        return {
          baseForm: renderForm(actionResults.getReservationContactFormRegistry),
          registry: actionResults.getReservationContactFormRegistry
        }
      }
      case 'calendar': {
        return isCalledByPrerender ? prerenderCalendar() : renderCalendar(selector.data)
      }
      case 'contactForm': {
        return renderContactForm(selector.data)
      }
      case 'productDescription': {
        return isCalledByPrerender ? prerenderProductDescription() : renderProductDescription(selector.data)
      }
      case 'reservationCompleteScreen': {
        return renderOrderSummary({
          headline: selector.reservationConfirmMessage,
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
      }
      case 'serviceSelector': {
        return isCalledByPrerender ? prerenderServiceSelector() : renderServiceSelector(selector.data)
      }
      case 'timeSlots': {
        return renderTimeSlots(selector.data)
      }
      default: {
        return null
      }
    }
  },
  googleReCaptchaSiteKey: global.GOOGLE_RECAPTCHA_SITE_KEY,
  headline: 'Book a Table',
  navigationButtons: { prev: 'Previous', next: 'Book', complete: 'New Booking' },
  timeSlotSelector: {
    explanationText: '1. Select a dining time:'
  }
})
