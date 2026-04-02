import React from 'react'

export default function StatCard({ title, value, unit, color, icon }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(13,27,46,0.9) 0%, rgba(15,32,64,0.9) 100%)',
      border: `1px solid ${color}44`,
      borderRadius: 8,
      padding: '12px 16px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: `0 0 12px ${color}33, inset 0 0 12px ${color}11`,
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginBottom: 6 }}>{title}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{
              color,
              fontSize: 28,
              fontWeight: 700,
              textShadow: `0 0 10px ${color}`,
              fontFamily: 'monospace',
            }}>{value}</span>
            {unit && <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{unit}</span>}
          </div>
        </div>
        {icon && (
          <div style={{
            fontSize: 28,
            color,
            opacity: 0.7,
            filter: `drop-shadow(0 0 6px ${color})`,
          }}>{icon}</div>
        )}
      </div>
      <div style={{
        position: 'absolute', bottom: -10, right: -10,
        width: 60, height: 60, borderRadius: '50%',
        background: `${color}11`,
        border: `1px solid ${color}22`,
      }} />
    </div>
  )
}
