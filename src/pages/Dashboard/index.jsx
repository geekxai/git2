import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactECharts from 'echarts-for-react'
import dayjs from 'dayjs'
import StatCard from '../../components/StatCard'
import AlarmList from '../../components/AlarmList'
import MapCanvas from '../../components/MapCanvas'
import { persons, devices, alarms, areas, stats, areaPersonCounts } from '../../mock'

const PANEL = '#0d1b2e'
const BG    = '#060d1f'
const BORDER = 'rgba(24,144,255,0.2)'

function SectionTitle({ children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      marginBottom: 10, paddingBottom: 6,
      borderBottom: '1px solid rgba(24,144,255,0.15)',
    }}>
      <div style={{ width: 3, height: 14, background: '#1890ff', borderRadius: 2, boxShadow: '0 0 6px #1890ff' }} />
      <span style={{ color: '#40a9ff', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>{children}</span>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [clock, setClock] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'))

  useEffect(() => {
    const t = setInterval(() => setClock(dayjs().format('YYYY-MM-DD HH:mm:ss')), 1000)
    return () => clearInterval(t)
  }, [])

  const barOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', backgroundColor: '#0d1b2e', borderColor: '#1890ff44', textStyle: { color: '#fff' } },
    grid: { left: 8, right: 8, top: 16, bottom: 28, containLabel: true },
    xAxis: {
      type: 'category',
      data: areaPersonCounts.map(a => a.name.length > 5 ? a.name.slice(0, 5) + '…' : a.name),
      axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 9 },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 9 },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
    },
    series: [{
      type: 'bar',
      data: areaPersonCounts.map(a => a.count),
      itemStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#40a9ff' },
            { offset: 1, color: '#0050b3' },
          ],
        },
        borderRadius: [3, 3, 0, 0],
      },
      label: { show: true, position: 'top', color: '#40a9ff', fontSize: 9 },
    }],
  }

  const alarmTypeCount = alarms.reduce((acc, a) => {
    acc[a.type] = (acc[a.type] || 0) + 1
    return acc
  }, {})

  const pieOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item', backgroundColor: '#0d1b2e', borderColor: '#1890ff44', textStyle: { color: '#fff' } },
    legend: {
      orient: 'vertical', right: 0, top: 'center',
      textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },
      icon: 'circle', itemWidth: 8, itemHeight: 8,
    },
    series: [{
      type: 'pie',
      radius: ['42%', '68%'],
      center: ['38%', '50%'],
      data: areaPersonCounts.map((a, i) => ({
        name: a.name.slice(0, 5),
        value: a.count,
      })),
      label: { show: false },
      emphasis: { label: { show: false } },
      itemStyle: { borderWidth: 2, borderColor: BG },
    }],
    color: ['#1890ff','#36cfc9','#52c41a','#faad14','#ff4d4f','#722ed1','#eb2f96'],
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: BG, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{
        height: 56,
        background: 'linear-gradient(90deg, #0a1628 0%, #0d1f40 50%, #0a1628 100%)',
        borderBottom: `1px solid ${BORDER}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, #1890ff, transparent)',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 4, height: 24, background: 'linear-gradient(180deg, #40a9ff, #0050b3)', borderRadius: 2, boxShadow: '0 0 8px #1890ff' }} />
          <span style={{ color: '#fff', fontSize: 20, fontWeight: 700, letterSpacing: 3, textShadow: '0 0 20px #1890ff' }}>
            人员定位安全管理系统
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ color: '#40a9ff', fontSize: 14, fontFamily: 'monospace' }}>{clock}</span>
          <button
            onClick={() => navigate('/monitor')}
            style={{
              background: 'linear-gradient(135deg, #0050b3, #1890ff)',
              border: '1px solid #40a9ff',
              borderRadius: 4, color: '#fff', fontSize: 12,
              padding: '4px 14px', cursor: 'pointer',
              boxShadow: '0 0 8px #1890ff44',
            }}
          >监控地图</button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', gap: 12, padding: '12px', overflow: 'hidden' }}>
        {/* Left panel */}
        <div style={{
          width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10,
          background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 12,
          overflow: 'hidden',
        }}>
          <SectionTitle>实时统计</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <StatCard title="在线人员" value={stats.online} unit="人" color="#52c41a" icon="👤" />
            <StatCard title="离线人员" value={stats.offline} unit="人" color="#8c8c8c" icon="💤" />
            <StatCard title="总人员数" value={stats.total}   unit="人" color="#1890ff" icon="👥" />
            <StatCard title="报警人员" value={stats.alarm}   unit="人" color="#ff4d4f" icon="🚨" />
          </div>

          <SectionTitle>区域人员分布</SectionTitle>
          <div style={{ flex: 1, minHeight: 140 }}>
            <ReactECharts option={barOption} style={{ height: 150 }} opts={{ renderer: 'canvas' }} />
          </div>

          <SectionTitle>今日报警统计</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {Object.entries(alarmTypeCount).map(([type, count]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, flex: 1 }}>{type}</span>
                <div style={{ flex: 2, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 3,
                    width: `${(count / alarms.length) * 100}%`,
                    background: 'linear-gradient(90deg, #0050b3, #40a9ff)',
                  }} />
                </div>
                <span style={{ color: '#40a9ff', fontSize: 11, minWidth: 20, textAlign: 'right' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center map */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 12,
          overflow: 'hidden',
        }}>
          <SectionTitle>实时位置地图</SectionTitle>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <MapCanvas
              areas={areas}
              persons={persons}
              devices={devices}
              showHeatmap={false}
              width={Math.max(600, window.innerWidth - 280 - 280 - 72)}
              height={Math.max(380, window.innerHeight - 56 - 56 - 56)}
            />
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, paddingTop: 8, borderTop: '1px solid rgba(24,144,255,0.1)' }}>
            {[
              { color: '#52c41a', label: '正常' },
              { color: '#ff4d4f', label: '报警' },
              { color: '#595959', label: '离线' },
              { color: '#1890ff', label: '设备运行' },
              { color: '#ff4d4f', label: '设备故障' },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 4px ${color}` }} />
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div style={{
          width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10,
          background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 12,
          overflow: 'hidden',
        }}>
          <SectionTitle>实时报警</SectionTitle>
          <div style={{ flex: '0 0 auto', maxHeight: 200, overflow: 'hidden' }}>
            <AlarmList alarms={alarms.slice(0, 12)} maxHeight={200} />
          </div>

          <SectionTitle>设备状态</SectionTitle>
          <div style={{ flex: '0 0 auto', maxHeight: 140, overflowY: 'auto' }}>
            {devices.map(dev => (
              <div key={dev.id} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '4px 2px', borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: 1,
                  background: dev.status === 'running' ? '#52c41a' : dev.status === 'fault' ? '#ff4d4f' : '#8c8c8c',
                  boxShadow: `0 0 4px ${dev.status === 'running' ? '#52c41a' : dev.status === 'fault' ? '#ff4d4f' : '#8c8c8c'}`,
                }} />
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dev.name}</span>
                <span style={{
                  fontSize: 10, padding: '1px 5px', borderRadius: 2,
                  background: dev.status === 'running' ? '#52c41a22' : dev.status === 'fault' ? '#ff4d4f22' : '#8c8c8c22',
                  color: dev.status === 'running' ? '#52c41a' : dev.status === 'fault' ? '#ff4d4f' : '#8c8c8c',
                }}>
                  {dev.status === 'running' ? '运行' : dev.status === 'fault' ? '故障' : '停止'}
                </span>
              </div>
            ))}
          </div>

          <SectionTitle>区域占用率</SectionTitle>
          <div style={{ flex: 1, minHeight: 160 }}>
            <ReactECharts option={pieOption} style={{ height: 170 }} opts={{ renderer: 'canvas' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
