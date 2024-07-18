import './index.css'

const TransactionItem = props => {
  const {each, deleteitems} = props
  const {amount, id, mode, methods} = each
  const deleteset = () => {
    deleteitems(id)
  }
  return (
    <li className="label-direction">
      <div className="label-container1">
        <p className="labelitem1">{mode}</p>
        <p className="labelitem1">Rs {amount}</p>
        <p className="labelitem1">{methods}</p>
      </div>
      <button type="button" className="buttonset" onClick={deleteset}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="deleteicon"
          data-testid="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
