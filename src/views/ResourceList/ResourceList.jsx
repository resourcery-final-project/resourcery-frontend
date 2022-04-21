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

  if (loading) return <h2>Loading list of resources...</h2>;

  return (
    <div>
      <div>
        <label>
          <input type="checkbox" />
          Food Box
        </label>
        <label>
          <input type="checkbox" />
          Ready to Eat
        </label>
        <label>
          <input type="checkbox" />
          Fruit Trees
        </label>
      </div>
      <List list={list} />
    </div>
  );
}
