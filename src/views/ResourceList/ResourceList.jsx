import { useEffect, useState } from 'react';
import { getAllResources } from '../../services/resources';
import List from '../../components/List/List';

export default function ResourceList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllResources();
      setList(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleFilter = (value) => {
    const newList = list.filter((item) => item.type === value);
    console.log(newList);
  };

  if (loading) return <h2>Loading list of resources...</h2>;

  return (
    <div>
      <div>
        <label>
          <input
            value="Food Box"
            type="checkbox"
            onChange={(e) => handleFilter(e.target.value)}
          />
          Food Box
        </label>
        <label>
          <input
            value="Ready to Eat"
            type="checkbox"
            onChange={(e) => handleFilter(e.target.value)}
          />
          Ready to Eat
        </label>
        <label>
          <input
            value="Fruit Trees"
            type="checkbox"
            onChange={(e) => handleFilter(e.target.value)}
          />
          Fruit Trees
        </label>
      </div>
      <List list={list} />
    </div>
  );
}
