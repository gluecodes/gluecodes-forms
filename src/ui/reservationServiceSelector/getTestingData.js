export default () => ({
  onServiceChanged: (id) => console.log('service changed', id),
  onQtyChanged: (id) => console.log('number changed', id),
  selectedService: '1',
  selectedQty: '2',
  services: [
    {
      name: 'afternoon Tea',
      id: '1'
    },
    {
      name: 'Chinesse',
      id: '2'
    }
  ],
  qty: [
    {
      name: '1 person',
      id: '1'
    },
    {
      name: '2 people',
      id: '2'
    },
    {
      name: '3 people',
      id: '3'
    },
    {
      name: '4 people',
      id: '4'
    }
  ]
})
