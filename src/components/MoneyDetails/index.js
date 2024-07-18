const MoneyDetails = props => {
  const {eachitem} = props
  const {optionId, displayText} = eachitem
  return <option value={optionId}>{displayText}</option>
}
export default MoneyDetails
