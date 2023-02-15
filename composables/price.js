export const usePriceToken = () => {

  /** Price per KXA */
  const kxa = useState('priceKxa', () => {
    return {
      EUR: 0.01466,
      USD: 0.01567
    }
  })

  /** Price per KXS */
  const kxs = useState('priceKxs', () => {
    return {
      EUR: 0.00001466,
      USD: 0.00001567
    }
  })

  return {
    kxa,
    kxs
  }

}