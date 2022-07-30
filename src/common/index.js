const C = {
  isolationOptions: [{
    value: 0,
    label: '未隔离'
  }, {
    value: 1,
    label: '集中隔离'
  }, {
    value: 2,
    label: '居家隔离'
  }, {
    value: 3,
    label: '校内隔离'
  }, {
    value: 4,
    label: '医院隔离'
  }],
  quarantineStatus: {
    '0': '未隔离',
    '1': '集中隔离',
    '2': '居家隔离',
    '3': '校内隔离',
    '4': '医院隔离'
  },
  isVaccinations3: {

  },
  healthCodeColor: {
    '-1': {
      label: '红',
      class: 'red'
    },
    '0': {
      label: '黄',
      class: 'yellow'
    },
    '1': {
      label: '绿',
      class: 'green'
    }
  },
  nucleicAcidTestResult: {
    '1': {
      label: '阳性',
      class: 'red'
    },
    '0': {
      label: '阴性',
      class: ''
    }
  },
  code: [{
    value: -1,
    label: '红色'
  }, {
    value: 0,
    label: '黄色'
  }, {
    value: 1,
    label: '绿色'
  }],
  status: [{
    value: 0,
    label: '未派发'
  }, {
    value: 1,
    label: '已派发'
  }],

  dormitoryType: [{
    value: 1,
    label: '东和'
  }, {
    value: 2,
    label: '西和'
  }],

  
  typeOptions: [
    {
      value: 0,
      label: '阴性',
      key: 1
    },
    {
      value: 1,
      label: '阳性',
      key: 2
    }
  ]
}

export default C
