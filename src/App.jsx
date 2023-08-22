import { useEffect, useState } from 'react'
import StockSelector from './components/StockSelector'
const { VITE_API_URL } = import.meta.env
import './App.css'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

export default function App() {
  const [selectedStock, setSelectedStock] = useState('GOOGL')
  const [price, setPrice] = useState([Math.random() * 1000])

  const fetchPrice = async selectedStock => {
    const res = await fetch(`${VITE_API_URL}/api/price/${selectedStock}`)

    const data = await res.json()
    console.log(data.price)
    setPrice(data.price)
  }

  useEffect(() => {
    fetchPrice(selectedStock)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => fetchPrice(selectedStock), 60 * 1000)

    return () => clearInterval(interval)
  }, [selectedStock])

  const lineData = []
  price.map((item, index) => {
    if (index !== 4) {
      lineData.push({
        name: `-${4 - index} Min`,
        value: item,
      })
    } else
      lineData.push({
        name: 'Now',
        value: item,
      })
  })

  return (
    <main className='container'>
      <StockSelector
        selectedStock={selectedStock}
        setSelectedStock={setSelectedStock}
        fetchPrice={fetchPrice}
      />
      <LineChart width={800} height={600} data={lineData}>
        <Line type='monotone' dataKey='value' stroke='#8884d8' />
        <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
      </LineChart>
      <div>{`${selectedStock} is at ${price.slice(-1)[0]}`}</div>
    </main>
  )
}
