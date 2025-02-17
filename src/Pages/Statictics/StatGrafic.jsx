import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

import styles from  "./StatGrafic.module.scss"

const data = [
    { name: 'Категория A', value: 12 },
    { name: 'Категория B', value: 24 },
    { name: 'Категория C', value: 24 },
    { name: 'Категория D', value: 6 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`} {/* Процент */}
       {/*  <tspan x={x} y={y + 15} fontSize={12}> 
          {data[index].name} 
        </tspan> */}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload })=> {
    console.log(active);
    console.log(payload);
    
    if (active && payload && payload.length){
        return(
            <div style={{ backgroundColor: '#fff', padding: '10px', color: "#000", border: '1px solid #ccc' }}>
                <p>{payload[0].name}</p>
                <p>{payload[0].value} ч.</p>
            </div>
        )
    }
  }
 

const StatGrafic = () => {
    return (
        <div className={styles.wrap}>
            <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
        </div>
    )
}

export default StatGrafic