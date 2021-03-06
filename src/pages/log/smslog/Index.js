import api from '../../../api/index' // eslint-disable-line
import Base from '../../Base/index'

export default class extends Base {
  constructor (vm) {
    super(vm)
    let nowTimeDate = new Date()
    nowTimeDate.setHours(0, 0, 0, 0)
    this.vm.time = [Math.round(nowTimeDate.getTime()), Math.round(new Date().getTime())]
  }

  disabled () {
    if (!this.vm.time) {
      return '请选择查询时间'
    } else if (this.vm.phone) {
      if (!this.vm.$utils.Validate.chkFormat(this.vm.phone, 'phone')) {
        return '请输入正确的手机号'
      }
    }
    return null
  }

  async init () {
    if (this.disabled()) {
      this.$message.error(this.disabled())
      return
    }
    const res = await api.getsmscodelog({ stime: this.vm.time[0], etime: this.vm.time[1], phone: this.vm.phone })
    if (res) {
      this.vm.dataList = res.Data
    }
  }
}
