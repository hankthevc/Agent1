import React from 'react';
import './TileWheel.css';

function TileWheel({ center, outer, onLetterClick }) {
  const radius = 110, cx = 130, cy = 130;
  const angleStep = 360 / outer.length;

  return (
    <svg width={260} height={260} className="tile-wheel">
      <circle cx={cx} cy={cy} r={radius} fill="#f5f5f5" />
      {outer.map((letter, i) => {
        const angle = (angleStep * i - 90) * Math.PI / 180;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        return (
          <g key={letter+i} onClick={() => onLetterClick(letter)}>
            <circle cx={x} cy={y} r={30} fill="#fff" stroke="#555" strokeWidth="3"/>
            <text x={x} y={y} textAnchor="middle" dy=".35em" fontSize={28} fontWeight="bold">{letter}</text>
          </g>
        );
      })}
      <g onClick={() => onLetterClick(center)}>
        <circle cx={cx} cy={cy} r={36} fill="#ffc800" stroke="#222" strokeWidth="4"/>
        <text x={cx} y={cy} textAnchor="middle" dy=".35em" fontSize={32} fontWeight="bold">{center}</text>
      </g>
    </svg>
  );
}

export default TileWheel;
