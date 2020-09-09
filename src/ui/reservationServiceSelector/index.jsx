import styles from './styles.css'

export default ({
  onServiceChanged,
  onQtyChanged,
  selectedService,
  selectedQty,
  services,
  qty = []
}) => (
  <div className={styles.selectorWrapper}>
    <select
      onchange={(e) => onServiceChanged(e.target.value) }
      className={`${styles.service} ${styles.dropDown}`}>
      {
        services.map(service => (
          <option selected={service.id === selectedService} value={service.id}>{service.name}</option>
        ))
      }
    </select>
    {
      qty.length > 0 ? (
        <select
          onchange={(e) => onQtyChanged(e.target.value)}
          className={`${styles.qty} ${styles.dropDown}`}>
          {
            qty.map(amount => (
              <option selected={amount.id === selectedQty} value={amount.id}>{amount.name}</option>
            ))
          }
        </select>
      ) : null
    }
  </div>
)
