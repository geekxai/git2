import dayjs from 'dayjs'

export const areas = [
  { id: 1, name: '生产车间A区', type: 'normal',    x: 50,  y: 50,  width: 250, height: 180, maxPeople: 30 },
  { id: 2, name: '生产车间B区', type: 'normal',    x: 330, y: 50,  width: 250, height: 180, maxPeople: 30 },
  { id: 3, name: '危险品仓库',  type: 'danger',    x: 620, y: 50,  width: 200, height: 180, maxPeople: 5  },
  { id: 4, name: '限制作业区',  type: 'restricted',x: 50,  y: 280, width: 200, height: 200, maxPeople: 10 },
  { id: 5, name: '办公区',      type: 'normal',    x: 290, y: 280, width: 180, height: 200, maxPeople: 50 },
  { id: 6, name: '设备机房',    type: 'restricted',x: 510, y: 280, width: 160, height: 200, maxPeople: 8  },
  { id: 7, name: '原料仓库',    type: 'normal',    x: 710, y: 280, width: 150, height: 200, maxPeople: 20 },
]

const depts = ['生产部', '安全部', '维修部', '物流部', '管理部']
const statuses = ['normal', 'normal', 'normal', 'normal', 'alarm', 'offline']

function makePerson(id, name, dept, status, x, y, area) {
  return { id, name, dept, status, x, y, area }
}

export const persons = [
  makePerson(1,  '张伟', '生产部', 'normal',  80,  90,  '生产车间A区'),
  makePerson(2,  '李娜', '生产部', 'normal',  120, 130, '生产车间A区'),
  makePerson(3,  '王芳', '生产部', 'alarm',   160, 90,  '生产车间A区'),
  makePerson(4,  '赵明', '生产部', 'normal',  200, 160, '生产车间A区'),
  makePerson(5,  '陈静', '生产部', 'normal',  250, 110, '生产车间A区'),
  makePerson(6,  '刘洋', '生产部', 'offline', 100, 200, '生产车间A区'),
  makePerson(7,  '周磊', '生产部', 'normal',  360, 80,  '生产车间B区'),
  makePerson(8,  '吴霞', '生产部', 'normal',  400, 120, '生产车间B区'),
  makePerson(9,  '郑浩', '生产部', 'normal',  440, 80,  '生产车间B区'),
  makePerson(10, '孙丽', '生产部', 'alarm',   480, 160, '生产车间B区'),
  makePerson(11, '马超', '生产部', 'normal',  520, 100, '生产车间B区'),
  makePerson(12, '胡琴', '生产部', 'normal',  400, 200, '生产车间B区'),
  makePerson(13, '朱刚', '安全部', 'normal',  370, 190, '生产车间B区'),
  makePerson(14, '何燕', '维修部', 'normal',  560, 200, '生产车间B区'),
  makePerson(15, '高峰', '安全部', 'alarm',   650, 80,  '危险品仓库'),
  makePerson(16, '林云', '安全部', 'normal',  700, 130, '危险品仓库'),
  makePerson(17, '黄鑫', '维修部', 'normal',  750, 90,  '危险品仓库'),
  makePerson(18, '梁倩', '维修部', 'offline', 780, 180, '危险品仓库'),
  makePerson(19, '钱博', '物流部', 'normal',  80,  320, '限制作业区'),
  makePerson(20, '韩雪', '物流部', 'alarm',   130, 360, '限制作业区'),
  makePerson(21, '罗杰', '物流部', 'normal',  180, 430, '限制作业区'),
  makePerson(22, '宋涛', '物流部', 'normal',  100, 460, '限制作业区'),
  makePerson(23, '谢华', '管理部', 'normal',  310, 310, '办公区'),
  makePerson(24, '邓婷', '管理部', 'normal',  350, 360, '办公区'),
  makePerson(25, '许磊', '管理部', 'normal',  400, 320, '办公区'),
  makePerson(26, '傅娟', '管理部', 'normal',  430, 420, '办公区'),
  makePerson(27, '曾敏', '管理部', 'offline', 370, 460, '办公区'),
  makePerson(28, '彭亮', '管理部', 'normal',  320, 440, '办公区'),
  makePerson(29, '蒋龙', '维修部', 'normal',  540, 310, '设备机房'),
  makePerson(30, '韦娜', '维修部', 'alarm',   580, 370, '设备机房'),
  makePerson(31, '方杰', '维修部', 'normal',  620, 440, '设备机房'),
  makePerson(32, '石磊', '物流部', 'normal',  730, 310, '原料仓库'),
  makePerson(33, '姚静', '物流部', 'normal',  770, 360, '原料仓库'),
  makePerson(34, '邹鑫', '物流部', 'normal',  820, 420, '原料仓库'),
  makePerson(35, '熊伟', '物流部', 'offline', 750, 450, '原料仓库'),
  makePerson(36, '廖云', '生产部', 'normal',  170, 320, '限制作业区'),
  makePerson(37, '江涛', '安全部', 'normal',  460, 350, '办公区'),
  makePerson(38, '史娟', '安全部', 'normal',  290, 380, '办公区'),
  makePerson(39, '贺强', '维修部', 'normal',  555, 460, '设备机房'),
  makePerson(40, '龚燕', '管理部', 'alarm',   340, 300, '办公区'),
  makePerson(41, '陶磊', '生产部', 'normal',  230, 70,  '生产车间A区'),
  makePerson(42, '毛静', '生产部', 'normal',  270, 180, '生产车间A区'),
  makePerson(43, '邱博', '生产部', 'normal',  600, 110, '生产车间B区'),
  makePerson(44, '秦雪', '安全部', 'offline', 680, 160, '危险品仓库'),
  makePerson(45, '侯鹏', '物流部', 'normal',  800, 310, '原料仓库'),
  makePerson(46, '邵婷', '物流部', 'normal',  840, 360, '原料仓库'),
  makePerson(47, '覃超', '生产部', 'normal',  500, 130, '生产车间B区'),
  makePerson(48, '舒华', '管理部', 'normal',  460, 290, '办公区'),
  makePerson(49, '阮丽', '维修部', 'normal',  590, 350, '设备机房'),
  makePerson(50, '尹磊', '生产部', 'alarm',   450, 170, '生产车间B区'),
  makePerson(51, '卢静', '安全部', 'normal',  150, 340, '限制作业区'),
  makePerson(52, '崔强', '物流部', 'normal',  760, 400, '原料仓库'),
]

export const devices = [
  { id: 1, name: 'A区摄像头01', type: '摄像头', status: 'running', x: 55,  y: 55  },
  { id: 2, name: 'A区摄像头02', type: '摄像头', status: 'running', x: 280, y: 55  },
  { id: 3, name: 'B区摄像头01', type: '摄像头', status: 'fault',   x: 335, y: 55  },
  { id: 4, name: 'B区摄像头02', type: '摄像头', status: 'running', x: 565, y: 55  },
  { id: 5, name: '危险区摄像头', type: '摄像头', status: 'running', x: 625, y: 55  },
  { id: 6, name: 'A区读卡器01', type: '读卡器', status: 'running', x: 55,  y: 220 },
  { id: 7, name: 'B区读卡器01', type: '读卡器', status: 'running', x: 335, y: 220 },
  { id: 8, name: '限制区读卡器', type: '读卡器', status: 'stopped', x: 55,  y: 285 },
  { id: 9, name: '机房读卡器',   type: '读卡器', status: 'running', x: 515, y: 285 },
  { id: 10,'name': '仓库读卡器', type: '读卡器', status: 'running', x: 715, y: 285 },
  { id: 11, name: '气体探测器01', type: '传感器', status: 'running', x: 800, y: 60  },
  { id: 12, name: '气体探测器02', type: '传感器', status: 'fault',   x: 55,  y: 470 },
  { id: 13, name: '温度传感器01', type: '传感器', status: 'running', x: 660, y: 285 },
]

const alarmTypes = ['越界报警', '健康异常', '人员拥挤', 'SOS求救', '设备故障', '气体超标']
const alarmLevels = ['高', '中', '低']
const alarmPersons = persons.filter(p => p.status === 'alarm' || Math.random() > 0.6).map(p => p.name)

function makeAlarm(id, type, person, area, level, minutesAgo) {
  return {
    id,
    type,
    person,
    area,
    level,
    time: dayjs().subtract(minutesAgo, 'minute').format('HH:mm:ss'),
  }
}

export const alarms = [
  makeAlarm(1,  '越界报警', '高峰', '危险品仓库', '高', 2),
  makeAlarm(2,  'SOS求救',  '王芳', '生产车间A区', '高', 5),
  makeAlarm(3,  '健康异常', '孙丽', '生产车间B区', '高', 8),
  makeAlarm(4,  '人员拥挤', '办公区',   '办公区',   '中', 12),
  makeAlarm(5,  '越界报警', '郑浩', '危险品仓库', '高', 15),
  makeAlarm(6,  '健康异常', '韩雪', '限制作业区', '中', 18),
  makeAlarm(7,  '设备故障', 'B区摄像头01', '生产车间B区', '中', 22),
  makeAlarm(8,  '气体超标', '韦娜', '设备机房',  '高', 25),
  makeAlarm(9,  '越界报警', '龚燕', '限制作业区', '中', 30),
  makeAlarm(10, '健康异常', '韦娜', '设备机房',  '高', 33),
  makeAlarm(11, '人员拥挤', '生产部门', '生产车间B区', '低', 40),
  makeAlarm(12, 'SOS求救',  '尹磊', '生产车间B区', '高', 45),
  makeAlarm(13, '越界报警', '郑浩', '危险品仓库', '中', 50),
  makeAlarm(14, '气体超标', '危险品仓库', '危险品仓库', '高', 58),
  makeAlarm(15, '设备故障', '气体探测器02', '限制作业区', '中', 65),
  makeAlarm(16, '健康异常', '周磊', '生产车间B区', '低', 70),
  makeAlarm(17, '越界报警', '石磊', '危险品仓库', '高', 78),
  makeAlarm(18, '人员拥挤', '生产车间A区', '生产车间A区', '低', 85),
  makeAlarm(19, 'SOS求救',  '赵明', '生产车间A区', '高', 92),
  makeAlarm(20, '气体超标', '设备机房', '设备机房', '中', 100),
  makeAlarm(21, '越界报警', '梁倩', '危险品仓库', '高', 110),
  makeAlarm(22, '健康异常', '廖云', '限制作业区', '中', 120),
  makeAlarm(23, '设备故障', 'A区读卡器01', '生产车间A区', '低', 135),
  makeAlarm(24, '人员拥挤', '原料仓库', '原料仓库', '低', 150),
  makeAlarm(25, 'SOS求救',  '邓婷', '办公区', '高', 160),
]

export const stats = {
  total: persons.length,
  online: persons.filter(p => p.status === 'normal').length,
  alarm: persons.filter(p => p.status === 'alarm').length,
  offline: persons.filter(p => p.status === 'offline').length,
}

export const areaPersonCounts = areas.map(area => ({
  name: area.name,
  count: persons.filter(p => p.area === area.name).length,
  max: area.maxPeople,
}))
