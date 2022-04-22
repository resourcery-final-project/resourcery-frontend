import { useEffect, useState } from 'react';
import { getAllResources, getByType } from '../../services/resources';
import List from '../../components/List/List';
import styles from '../../App.module.css';

export default function ResourceList() {
  const { listview, filter } = styles;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('all');

  useEffect(() => {
    async function fetchData() {
      const data = await getAllResources();
      setList(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getByType(type);
      setList(data);
      setLoading(false);
    }
    if (type !== 'all') {
      fetchData();
    }
  }, [type]);

  if (loading) return <h2>Loading list of resources...</h2>;

  return (
    <div className={listview}>
      <label>
        Filter By:
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setLoading(true);
          }}
        >
          <option value="all">All</option>
          <option value="Food Box">Food Box</option>
          <option value="Food Pantry">Food Pantry</option>
          <option value="Ready To Eat">Ready To Eat</option>
          <option value="Fruit Trees">Fruit Trees</option>
        </select>
      </label>
      <List list={list} />
    </div>
  );
}
