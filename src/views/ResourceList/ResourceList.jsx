import { useEffect, useState } from 'react';
import { getAllResources } from '../../services/resources';
import List from '../../components/List/List';
import styles from '../../App.module.css';


export default function ResourceList() {
  const { listview, filter } = styles;
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
      <>
      <div className={filter}>
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
    </div><div className={listview}>
        <List list={list} />
      </div>
      </>
  );
}
