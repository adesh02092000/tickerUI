import { useEffect, useState } from 'react'
import StockSelector from './components/StockSelector'
const { VITE_API_URL } = import.meta.env
import './App.css'

export default function App() {
  const [selectedStock, setSelectedStock] = useState('AAPL')
  const [price, setPrice] = useState(Math.random() * 1000)

  const fetchPrice = async selectedStock => {
    const res = await fetch(`${VITE_API_URL}/api/price/${selectedStock}`)

    const data = await res.json()
    setPrice(data.price)
  }

  useEffect(() => {
    const interval = setInterval(() => fetchPrice(selectedStock), 60 * 1000)

    return () => clearInterval(interval)
  }, [selectedStock])

  return (
    <main className='container'>
      <StockSelector
        selectedStock={selectedStock}
        setSelectedStock={setSelectedStock}
        fetchPrice={fetchPrice}
      />
      <div>{`${selectedStock} is at ${price}`}</div>
    </main>
  )
}
