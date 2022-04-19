import List from '../../components/List/List'

export default function ResourceList() {
  return (
    <div>
      <div>
        <label>
          <input type="checkbox"/> 
          Food Box    
        </label>
        <label>
          <input type="checkbox"/> 
          Ready to Eat
        </label>
        <label>
          <input type="checkbox"/> 
          Fruit Trees
        </label>
      </div>
      <List />
    </div>
  )
}
