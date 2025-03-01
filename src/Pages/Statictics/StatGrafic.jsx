import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import styles from "./StatGrafic.module.scss";

const StatGrafic = ({ filtredSumArray }) => {
  const sortedArrayHours = filtredSumArray.map((elem) => {
    return {
      name: elem.name,
      value: elem.hours,
    };
  });
  const sortedArrayRubles = filtredSumArray.map((elem) => {
    return {
      name: elem.name,
      value: elem.finalResult,
    };
  });

  const COLORS = filtredSumArray.map((elem) => elem.color);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          <p>{payload[0].name}</p>
          <p>{payload[0].value} ч.</p>
        </div>
      );
    }
  };
  const CustomTooltip2 = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          <p>{`${payload[0].payload.name} - ${payload[0].value} руб`}</p>
        </div>
      );
    }
  };

  return (
    <div className={styles.wrap}>



      <h3>Распределение по часам</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={sortedArrayHours}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {sortedArrayHours.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              fontSize: "14px",
              backgroundColor: "#fff",
              borderRadius: "7px",
              padding: "7px 10px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <h3 style={{ marginBottom: "15px" }}>Распределение по деньгам</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={400}
          height={300}
          data={sortedArrayRubles}
          margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
        >
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip content={<CustomTooltip2 />} />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>

  );
};

export default StatGrafic;
