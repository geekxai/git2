import React from 'react'

const statusColor = { running: '#1890ff', stopped: '#8c8c8c', fault: '#ff4d4f' }

export default function DeviceMarker({ device, onClick }) {
  const color = statusColor[device.status] || '#fff'

  return (
    <div
      onClick={() => onClick && onClick(device)}
      title={`${device.name} (${device.type})`}
      style={{
        position: 'absolute',
        left: device.x,
        top: device.y,
        transform: 'translate(-50%, -50%)',
        width: 16,
        height: 16,
        borderRadius: 2,
        background: `${color}33`,
        border: `1.5px solid ${color}`,
        cursor: 'pointer',
        boxShadow: `0 0 6px ${color}88`,
        zIndex: 8,
      }}
    />
  )
}
