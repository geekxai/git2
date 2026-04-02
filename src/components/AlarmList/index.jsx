import React from 'react'
import { Tag } from 'antd'

const levelColor = { '高': '#ff4d4f', '中': '#faad14', '低': '#52c41a' }
const typeColor = {
  '越界报警': '#ff4d4f',
  'SOS求救': '#ff4d4f',
  '健康异常': '#fa8c16',
  '人员拥挤': '#faad14',
  '设备故障': '#1890ff',
  '气体超标': '#722ed1',
}

export default function AlarmList({ alarms = [], maxHeight = 300 }) {
  return (
    <div style={{ maxHeight, overflowY: 'auto', overflowX: 'hidden' }}>
      {alarms.map(alarm => (
        <div key={alarm.id} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 4px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
            background: levelColor[alarm.level] || '#fff',
            boxShadow: `0 0 6px ${levelColor[alarm.level] || '#fff'}`,
            animation: alarm.level === '高' ? 'pulse 1.2s ease-in-out infinite' : 'none',
          }} />
          <span style={{
            color: typeColor[alarm.type] || '#fff',
            fontSize: 11,
            fontWeight: 600,
            flexShrink: 0,
            minWidth: 56,
          }}>{alarm.type}</span>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {alarm.person} · {alarm.area}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, flexShrink: 0 }}>{alarm.time}</span>
        </div>
      ))}
    </div>
  )
}
