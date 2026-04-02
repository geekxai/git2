import React, { useRef, useEffect } from 'react'

const areaColors = {
  normal:     { fill: 'rgba(24,144,255,0.08)', stroke: 'rgba(24,144,255,0.5)',  label: '#40a9ff' },
  restricted: { fill: 'rgba(250,173,20,0.08)', stroke: 'rgba(250,173,20,0.5)', label: '#ffc53d' },
  danger:     { fill: 'rgba(255,77,79,0.08)',  stroke: 'rgba(255,77,79,0.5)',   label: '#ff7875' },
}
const personColors = { normal: '#52c41a', alarm: '#ff4d4f', offline: '#595959' }

export default function MapCanvas({
  areas = [], persons = [], devices = [],
  showHeatmap = false,
  onPersonClick, onDeviceClick,
  width = 900, height = 520,
}) {
  const canvasRef = useRef(null)
  const hitRef = useRef([]) // store clickable regions

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    ctx.scale(dpr, dpr)

    // Background
    ctx.fillStyle = '#060d1f'
    ctx.fillRect(0, 0, width, height)

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'
    ctx.lineWidth = 0.5
    const gridSize = 40
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke()
    }
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
    }

    // Heatmap layer
    if (showHeatmap) {
      persons.filter(p => p.status !== 'offline').forEach(p => {
        const r = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 60)
        const base = p.status === 'alarm' ? '255,77,79' : '24,144,255'
        r.addColorStop(0, `rgba(${base},0.35)`)
        r.addColorStop(1, `rgba(${base},0)`)
        ctx.fillStyle = r
        ctx.beginPath()
        ctx.arc(p.x, p.y, 60, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Areas
    areas.forEach(area => {
      const c = areaColors[area.type] || areaColors.normal
      ctx.fillStyle = c.fill
      ctx.fillRect(area.x, area.y, area.width, area.height)
      ctx.strokeStyle = c.stroke
      ctx.lineWidth = 1.5
      ctx.strokeRect(area.x + 0.75, area.y + 0.75, area.width - 1.5, area.height - 1.5)
      // Label
      ctx.fillStyle = c.label
      ctx.font = 'bold 11px PingFang SC, Microsoft YaHei, sans-serif'
      ctx.fillText(area.name, area.x + 8, area.y + 16)
    })

    // Devices
    const deviceHits = []
    devices.forEach(dev => {
      const colors = { running: '#1890ff', stopped: '#8c8c8c', fault: '#ff4d4f' }
      const col = colors[dev.status] || '#fff'
      const sz = 8
      ctx.fillStyle = col + '33'
      ctx.fillRect(dev.x - sz, dev.y - sz, sz * 2, sz * 2)
      ctx.strokeStyle = col
      ctx.lineWidth = 1.5
      ctx.strokeRect(dev.x - sz, dev.y - sz, sz * 2, sz * 2)
      // glow
      ctx.shadowColor = col
      ctx.shadowBlur = 6
      ctx.strokeRect(dev.x - sz, dev.y - sz, sz * 2, sz * 2)
      ctx.shadowBlur = 0
      deviceHits.push({ type: 'device', data: dev, x: dev.x - sz, y: dev.y - sz, w: sz * 2, h: sz * 2 })
    })

    // Persons
    const personHits = []
    persons.forEach(p => {
      const col = personColors[p.status] || '#fff'
      const r = 10
      ctx.beginPath()
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
      ctx.fillStyle = col + '33'
      ctx.fill()
      ctx.strokeStyle = col
      ctx.lineWidth = 1.5
      ctx.stroke()
      if (p.status === 'alarm') {
        ctx.beginPath()
        ctx.arc(p.x, p.y, r + 4, 0, Math.PI * 2)
        ctx.strokeStyle = col + '66'
        ctx.lineWidth = 1
        ctx.stroke()
      }
      ctx.shadowColor = col
      ctx.shadowBlur = p.status === 'alarm' ? 10 : 4
      ctx.beginPath()
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
      ctx.stroke()
      ctx.shadowBlur = 0
      // Initials
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 8px PingFang SC, Microsoft YaHei, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(p.name.slice(0, 2), p.x, p.y)
      ctx.textAlign = 'left'
      ctx.textBaseline = 'alphabetic'
      personHits.push({ type: 'person', data: p, x: p.x - r, y: p.y - r, w: r * 2, h: r * 2 })
    })

    hitRef.current = [...personHits, ...deviceHits]
  }, [areas, persons, devices, showHeatmap, width, height])

  function handleClick(e) {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    for (const hit of hitRef.current) {
      if (mx >= hit.x && mx <= hit.x + hit.w && my >= hit.y && my <= hit.y + hit.h) {
        if (hit.type === 'person' && onPersonClick) onPersonClick(hit.data)
        if (hit.type === 'device' && onDeviceClick) onDeviceClick(hit.data)
        return
      }
    }
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      style={{ cursor: 'crosshair', display: 'block', borderRadius: 4 }}
    />
  )
}
