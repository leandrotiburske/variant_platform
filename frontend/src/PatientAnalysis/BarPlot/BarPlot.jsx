import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer
} from 'recharts';
import styles from './BarPlot.module.css'
import chromosomeIcon from '../../assets/Chromosome_icon.svg'

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/bar-chart-with-customized-event-mmwz85';

  state = {
    data: [
      {
        name: 'Chromosome 1',
        chromosomeNumber: '1',
        density: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Chromosome 2',
        chromosomeNumber: '2',
        density: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Chromosome 3',
        chromosomeNumber: '3',
        density: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Chromosome 4',
        chromosomeNumber: '4',
        density: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Chromosome 5',
        chromosomeNumber: '5',
        density: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Chromosome 6',
        chromosomeNumber: '6',
        density: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Chromosome 7',
        chromosomeNumber: '7',
        density: 3490,
        pv: 4300,
        amt: 2100,
      },
      {
        name: 'Chromosome 8',
        chromosomeNumber: '8',
        density: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Chromosome 9',
        chromosomeNumber: '9',
        density: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Chromosome 10',
        chromosomeNumber: '10',
        density: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Chromosome 11',
        chromosomeNumber: '11',
        density: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Chromosome 12',
        chromosomeNumber: '12',
        density: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Chromosome 13',
        chromosomeNumber: '13',
        density: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Chromosome 14',
        chromosomeNumber: '14',
        density: 3490,
        pv: 4300,
        amt: 2100,
      },
      {
        name: 'Chromosome 15',
        chromosomeNumber: '15',
        density: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Chromosome 16',
        chromosomeNumber: '16',
        density: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Chromosome 17',
        chromosomeNumber: '17',
        density: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Chromosome 18',
        chromosomeNumber: '18',
        density: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Chromosome 19',
        chromosomeNumber: '19',
        density: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Chromosome 20',
        chromosomeNumber: '20',
        density: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Chromosome 21',
        chromosomeNumber: '21',
        density: 3490,
        pv: 4300,
        amt: 2100,
      },
      {
        name: 'Chromosome 22',
        chromosomeNumber: '22',
        density: 1600,
        pv: 4300,
        amt: 2100,
      },
      {
        name: 'Chromosome X',
        chromosomeNumber: 'X',
        density: 3490,
        pv: 4300,
        amt: 2100,
      },
      {
        name: 'Chromosome Y',
        chromosomeNumber: 'Y',
        density: 3490,
        pv: 4300,
        amt: 2100,
      },

    ],
    activeIndex: 0,
  };

  handleClick = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { activeIndex, data } = this.state;
    const activeItem = data[activeIndex];

    return (
      <div className={styles.barplotWrapper}>
      <p className={styles.barplotTitle}>
        Click on a chromosome bar below to view its variant density details.
      </p>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart width={150} height={40} data={data}>
        <Bar 
          dataKey="density" 
          onClick={this.handleClick}
          label={({ x, y, width, height, index }) => {
            
            const item = data[index];
            const centerX = x + width / 2;

            return (
              <g>
                <image
                  href={chromosomeIcon}
                  x={centerX - 10} 
                  y={y + 2} 
                  width={20}
                  height={20}
                />
                <text
                  x={centerX}
                  y={y + 35} 
                  textAnchor="middle"
                  fill="black"
                  fontSize="12"
                  fontFamily="Ubuntu"
                  fontWeight="bold"
                >
                  {item.chromosomeNumber}
                </text>
              </g>
            );
          }}
         >
          {data.map((entry, index) => (
          <Cell
            cursor="pointer"
            fill={index === activeIndex ? '#82ca9d' : '#8884d8'}
            key={`cell-${index}`}
          />
          ))}
        </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className={styles.variantDensity}>
        <strong>{activeItem.name}</strong> — Variant density: <strong>{activeItem.density}</strong>
      </p>
      <p className={styles.unitExplanation}>
        <em>Variant density = Number of variants on chromosome / Chromosome size (Kb)</em>
      </p>
      </div>
    );
  }
}
