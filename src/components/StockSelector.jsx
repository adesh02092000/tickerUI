const stocks = ['AAPL', 'GOOGL', 'FB', 'AMZN', 'MSFT']

export default function StockSelector({
  selectedStock,
  setSelectedStock,
  fetchPrice,
}) {
  return (
    <select
      value={selectedStock}
      onChange={e => {
        fetchPrice()
        setSelectedStock(e.target.value)
      }}
    >
      {stocks.map(stock => (
        <option key={stock} value={stock}>
          {stock}
        </option>
      ))}
    </select>
  )
}
