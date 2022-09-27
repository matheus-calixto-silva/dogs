import { useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryPie } from 'victory';

import styles from './UserStatsGraphs.module.css';

const UserStatsGraphs = ({ data }) => {
  const [graph, setGraph] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setGraph(
      data.map(({ title, acessos }) => {
        return {
          x: title,
          y: Number(acessos),
        };
      })
    );
    setTotal(
      data
        .map(({ acessos }) => Number(acessos))
        .reduce((total, current) => total + current, 0)
    );
  }, [data]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={`${styles.graphItem}`}>
        <VictoryPie
          data={data}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#FFF',
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: '#433',
            },
          }}
        />
      </div>
      <div className={`${styles.graphItem}`}>
        <VictoryChart>
          <VictoryBar alignment={'start'} data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraphs;
