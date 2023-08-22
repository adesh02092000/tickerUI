const stocks = ['GOOGL', 'FB', 'AMZN', 'MSFT']

export default function StockSelector({
  selectedStock,
  setSelectedStock,
  fetchPrice,
}) {
  return (
    <select
      value={selectedStock}
      onChange={e => {
        setSelectedStock(e.target.value)
        fetchPrice(e.target.value)
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
