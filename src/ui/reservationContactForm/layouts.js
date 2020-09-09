export const form = () => [
  [
    {
      property: 'reservationDateTime',
      customUiControl: 'reservationDateTime'
    }
  ],
  [
    {
      property: 'title',
      width: 'col-lg-4'
    },
    {
      property: 'name',
      placeholder: 'Full name',
      width: 'col-lg-8'
    },
    {
      property: 'email',
      placeholder: 'Email'
    },
    {
      property: 'phone',
      placeholder: 'Phone number'
    }
  ],
  [
    {
      property: 'message',
      placeholder: 'Message'
    }
  ],
  [
    {
      property: 'captchaToken',
      customUiControl: 'captcha'
    }
  ]
]
