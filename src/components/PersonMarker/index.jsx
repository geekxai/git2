import React from 'react'

const statusColor = { normal: '#52c41a', alarm: '#ff4d4f', offline: '#8c8c8c' }

export default function PersonMarker({ person, onClick }) {
  const color = statusColor[person.status] || '#fff'
  const initials = person.name.slice(0, 2)

  return (
    <div
      onClick={() => onClick && onClick(person)}
      title={`${person.name} (${person.dept})`}
      style={{
        position: 'absolute',
        left: person.x,
        top: person.y,
        transform: 'translate(-50%, -50%)',
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: color,
        border: `2px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 9,
        color: '#fff',
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: `0 0 8px ${color}`,
        animation: person.status === 'alarm' ? 'pulse 1s ease-in-out infinite' : 'none',
        zIndex: 10,
      }}
    >
      {initials}
    </div>
  )
}
