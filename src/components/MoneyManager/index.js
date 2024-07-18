import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItems from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    mode: '',
    methods: '',
    amount: '',
    totalitem: [],
  }

  addamounttype = event => {
    this.setState({mode: event.target.value})
  }

  addamount = event => {
    this.setState({amount: event.target.value})
  }

  methods = event => {
    if (event.target.value === 'INCOME') {
      this.setState({methods: 'Income'})
    } else {
      this.setState({methods: 'Expenses'})
    }
  }

  updateallamount = event => {
    event.preventDefault()
    const {mode, methods, amount, totalitem} = this.state
    if (methods === '') {
      const latest = {mode, methods: 'Income', amount, id: uuidv4()}
      const updated = [...totalitem, latest]
      if (mode !== '' && amount !== '') {
        this.setState(prevs => ({
          balance: parseInt(prevs.balance) + parseInt(amount),
          income: parseInt(prevs.income) + parseInt(amount),
          totalitem: updated,
          mode: '',
          methods: '',
          amount: '',
        }))
      }
    } else if (methods === 'Expenses') {
      const latest = {mode, methods, amount, id: uuidv4()}
      const updated = [...totalitem, latest]
      if (mode !== '' && amount !== '') {
        this.setState(prevs => ({
          balance: parseInt(prevs.balance) - parseInt(amount),
          income: parseInt(prevs.income),
          expenses: parseInt(prevs.expenses) + parseInt(amount),
          totalitem: updated,
          mode: '',
          methods: '',
          amount: '',
        }))
      }
    } else {
      const latest = {mode, methods: 'Income', amount, id: uuidv4()}
      const updated = [...totalitem, latest]
      if (mode !== '' && amount !== '') {
        this.setState(prevs => ({
          balance: parseInt(prevs.balance) + parseInt(amount),
          income: parseInt(prevs.income) + parseInt(amount),
          totalitem: updated,
          mode: '',
          methods: '',
          amount: '',
        }))
      }
    }
  }

  deleteitems = id => {
    const {totalitem} = this.state
    const mapped = totalitem.filter(each => each.id === id)
    const {amount, methods} = mapped[0]
    const latest = totalitem.filter(eachset => eachset.id !== id)
    if (methods === 'Income') {
      this.setState(prevs => ({
        balance: parseInt(prevs.balance) - parseInt(amount),
        income: parseInt(prevs.income) - parseInt(amount),
        totalitem: latest,
      }))
    } else {
      this.setState(prevs => ({
        balance: parseInt(prevs.balance) + parseInt(amount),
        expenses: parseInt(prevs.expenses) - parseInt(amount),
        totalitem: latest,
      }))
    }
  }

  render() {
    const {
      balance,
      income,
      expenses,
      mode,
      methods,
      amount,
      totalitem,
    } = this.state
    return (
      <div className="background-container">
        <div className="inner-container">
          <div className="persondetails-container">
            <h1 className="headingname">Hi, Richard</h1>
            <p className="headingparagraph">
              Welcome back to your
              <span className="spanelement"> Money Manager</span>
            </p>
          </div>
          <div className="cards-container">
            <div className="each-card-details">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                alt="balance"
                className="imgsetting"
              />
              <div>
                <p className="balanceparagraph">Your Balance</p>
                <p className="amountparagraph" data-testid="balanceAmount">
                  Rs {balance}
                </p>
              </div>
            </div>
            <div className="each-card-details">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
                alt="income"
                className="imgsetting"
              />
              <div>
                <p className="balanceparagraph">Your Income</p>
                <p className="amountparagraph" data-testid="incomeAmount">
                  Rs {income}
                </p>
              </div>
            </div>
            <div className="each-card-details">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                alt="expenses"
                className="imgsetting"
              />
              <div>
                <p className="balanceparagraph">Your Expenses</p>
                <p className="amountparagraph" data-testid="expensesAmount">
                  Rs {expenses}
                </p>
              </div>
            </div>
          </div>
          <div className="all-transactions">
            <div className="transaction">
              <form onSubmit={this.updateallamount}>
                <h1 className="form-heading">Add Transaction</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <br />
                <input
                  type="text"
                  id="title"
                  className="input-style"
                  placeholder="TITLE"
                  onChange={this.addamounttype}
                  value={mode}
                />
                <br />
                <label htmlFor="amount" className="label">
                  AMOUNT
                </label>
                <br />
                <input
                  type="text"
                  className="input-style"
                  id="amount"
                  placeholder="AMOUNT"
                  onChange={this.addamount}
                  value={amount}
                />
                <br />
                <label htmlFor="type" className="label">
                  TYPE
                </label>
                <br />
                <select
                  id="type"
                  className="input-style"
                  onClick={this.methods}
                >
                  {transactionTypeOptions.map(eachitem => (
                    <MoneyDetails eachitem={eachitem} key={eachitem.optionId} />
                  ))}
                </select>
                <br />
                <button type="submit" className="button" data-testid="delete">
                  Add
                </button>
              </form>
            </div>
            <div className="history-container">
              <h1 className="historyheading">History</h1>
              <div className="amountusedtype">
                <div className="label-container">
                  <p className="labelitem">Title</p>
                  <p className="labelitem">Amount</p>
                  <p className="labelitem">Type</p>
                </div>
              </div>
              <ul className="amountusedtype1">
                {totalitem.map(each => (
                  <TransactionItems
                    each={each}
                    key={each.id}
                    deleteitems={this.deleteitems}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
