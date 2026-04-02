import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Select, Input, Button, Drawer, Tag, Badge } from 'antd'
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import MapCanvas from '../../components/MapCanvas'
import { persons, devices, alarms, areas } from '../../mock'

const statusConfig = {
  all:     { label: '全部',   color: '#1890ff' },
  normal:  { label: '正常',   color: '#52c41a' },
  alarm:   { label: '报警',   color: '#ff4d4f' },
  offline: { label: '离线',   color: '#8c8c8c' },
}

const areaOptions = [
  { value: 'all', label: '全部区域' },
  ...areas.map(a => ({ value: a.name, label: a.name })),
]

export default function MonitorMap() {
  const navigate = useNavigate()
  const [selectedArea, setSelectedArea] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [selectedType, setSelectedType] = useState(null)

  const filteredPersons = persons.filter(p => {
    const areaOk = selectedArea === 'all' || p.area === selectedArea
    const statusOk = statusFilter === 'all' || p.status === statusFilter
    const searchOk = !searchText || p.name.includes(searchText) || p.dept.includes(searchText)
    return areaOk && statusOk && searchOk
  })

  const handlePersonClick = useCallback((person) => {
    setSelected(person)
    setSelectedType('person')
    setDrawerOpen(true)
  }, [])

  const handleDeviceClick = useCallback((device) => {
    setSelected(device)
    setSelectedType('device')
    setDrawerOpen(true)
  }, [])

  const personAlarms = selected ? alarms.filter(a => a.person === selected.name) : []

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f0f2f5', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top toolbar */}
      <div style={{
        height: 56, background: '#fff', borderBottom: '1px solid #e8e8e8',
        display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px',
        flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        <Button
          type="text" icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
          style={{ marginRight: 4 }}
        >返回</Button>
        <div style={{ width: 1, height: 24, background: '#e8e8e8' }} />
        <span style={{ fontWeight: 700, fontSize: 15, color: '#1a2030', whiteSpace: 'nowrap' }}>监控地图</span>

        <Select
          value={selectedArea}
          onChange={setSelectedArea}
          options={areaOptions}
          style={{ width: 140 }}
          size="small"
        />
        <Input
          prefix={<SearchOutlined style={{ color: '#bbb' }} />}
          placeholder="搜索人员/部门"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 160 }}
          size="small"
          allowClear
        />
        <div style={{ display: 'flex', gap: 4 }}>
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <Button
              key={key}
              size="small"
              type={statusFilter === key ? 'primary' : 'default'}
              onClick={() => setStatusFilter(key)}
              style={statusFilter === key ? { background: cfg.color, borderColor: cfg.color } : {}}
            >{cfg.label}</Button>
          ))}
        </div>
        <Button
          size="small"
          type={showHeatmap ? 'primary' : 'default'}
          onClick={() => setShowHeatmap(v => !v)}
          style={showHeatmap ? { background: '#722ed1', borderColor: '#722ed1' } : {}}
        >热力图</Button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
          <span style={{ fontSize: 12, color: '#666' }}>
            显示: <strong style={{ color: '#1890ff' }}>{filteredPersons.length}</strong> 人
          </span>
          <span style={{ fontSize: 12, color: '#666' }}>
            报警: <strong style={{ color: '#ff4d4f' }}>{filteredPersons.filter(p => p.status === 'alarm').length}</strong>
          </span>
        </div>
      </div>

      {/* Map area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 16, overflow: 'hidden',
        }}>
          <MapCanvas
            areas={areas}
            persons={filteredPersons}
            devices={devices}
            showHeatmap={showHeatmap}
            onPersonClick={handlePersonClick}
            onDeviceClick={handleDeviceClick}
            width={Math.max(700, window.innerWidth - 48)}
            height={Math.max(400, window.innerHeight - 56 - 60 - 32)}
          />
        </div>
      </div>

      {/* Bottom info bar */}
      <div style={{
        height: 52, background: '#fff', borderTop: '1px solid #e8e8e8',
        display: 'flex', alignItems: 'center', gap: 0,
        padding: '0 16px', flexShrink: 0,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', gap: 16, paddingRight: 16, borderRight: '1px solid #e8e8e8', flexShrink: 0 }}>
          {areas.map(area => {
            const cnt = filteredPersons.filter(p => p.area === area.name).length
            return (
              <div key={area.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: area.type === 'danger' ? '#ff4d4f' : area.type === 'restricted' ? '#faad14' : '#52c41a',
                }} />
                <span style={{ fontSize: 12, color: '#666', whiteSpace: 'nowrap' }}>
                  {area.name.slice(0, 5)}: <strong>{cnt}</strong>
                </span>
              </div>
            )
          })}
        </div>
        <div style={{ flex: 1, overflow: 'hidden', paddingLeft: 16 }}>
          <div style={{ display: 'flex', gap: 20, overflow: 'hidden' }}>
            {alarms.slice(0, 6).map(alarm => (
              <span key={alarm.id} style={{ fontSize: 11, color: '#666', whiteSpace: 'nowrap', flexShrink: 0 }}>
                <span style={{ color: alarm.level === '高' ? '#ff4d4f' : alarm.level === '中' ? '#faad14' : '#52c41a', marginRight: 4 }}>●</span>
                [{alarm.time}] {alarm.type}: {alarm.person} · {alarm.area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      <Drawer
        title={selectedType === 'person' ? '人员详情' : '设备详情'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={320}
        styles={{ body: { padding: '16px' } }}
      >
        {selected && selectedType === 'person' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{
                width: 60, height: 60, borderRadius: '50%', margin: '0 auto 12px',
                background: selected.status === 'normal' ? '#52c41a' : selected.status === 'alarm' ? '#ff4d4f' : '#8c8c8c',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, color: '#fff', fontWeight: 700,
                boxShadow: `0 0 16px ${selected.status === 'alarm' ? '#ff4d4f' : '#52c41a'}`,
              }}>{selected.name}</div>
              <Tag color={selected.status === 'normal' ? 'success' : selected.status === 'alarm' ? 'error' : 'default'}>
                {selected.status === 'normal' ? '正常' : selected.status === 'alarm' ? '报警' : '离线'}
              </Tag>
            </div>
            {[
              ['姓名', selected.name],
              ['部门', selected.dept],
              ['工号', `EMP${String(selected.id).padStart(4, '0')}`],
              ['当前区域', selected.area],
              ['位置坐标', `(${selected.x}, ${selected.y})`],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ color: '#999', fontSize: 13 }}>{label}</span>
                <span style={{ color: '#333', fontSize: 13, fontWeight: 500 }}>{val}</span>
              </div>
            ))}
            {personAlarms.length > 0 && (
              <>
                <div style={{ marginTop: 8, fontWeight: 600, color: '#333' }}>历史报警</div>
                {personAlarms.map(a => (
                  <div key={a.id} style={{ background: '#fff7e6', border: '1px solid #ffd591', borderRadius: 4, padding: '6px 10px' }}>
                    <div style={{ fontSize: 12, color: '#fa8c16' }}>{a.type} · {a.level}级</div>
                    <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{a.time} · {a.area}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
        {selected && selectedType === 'device' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{
                width: 60, height: 60, borderRadius: 8, margin: '0 auto 12px',
                background: selected.status === 'running' ? '#e6f7ff' : selected.status === 'fault' ? '#fff2f0' : '#fafafa',
                border: `2px solid ${selected.status === 'running' ? '#1890ff' : selected.status === 'fault' ? '#ff4d4f' : '#d9d9d9'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24,
              }}>📡</div>
              <Tag color={selected.status === 'running' ? 'processing' : selected.status === 'fault' ? 'error' : 'default'}>
                {selected.status === 'running' ? '运行中' : selected.status === 'fault' ? '故障' : '停止'}
              </Tag>
            </div>
            {[
              ['设备名称', selected.name],
              ['设备类型', selected.type],
              ['设备编号', `DEV${String(selected.id).padStart(4, '0')}`],
              ['位置坐标', `(${selected.x}, ${selected.y})`],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ color: '#999', fontSize: 13 }}>{label}</span>
                <span style={{ color: '#333', fontSize: 13, fontWeight: 500 }}>{val}</span>
              </div>
            ))}
          </div>
        )}
      </Drawer>
    </div>
  )
}
