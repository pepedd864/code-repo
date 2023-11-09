<script setup>
import {computed, reactive, ref} from 'vue'
import request from '@/utils/request.js'
import {usePagination} from 'vue-request'
import {message} from "ant-design-vue";

const columns = ref(null)
// 获取数据
const getData = async (params) => {
  const {data} = await request.post('/list', {
    current: params?.current,
    pageSize: params?.pageSize,
    sortField: params?.sortField,
    sortOrder: params?.sortOrder,
  })
  if (data.code === 0) {
    return
  }
  dataSource.value = data.data
  // 从数据中获取表头
  columns.value = Object.keys(data.data[0]).map((item) => ({
    title: item,
    dataIndex: item,
    sorter: item === 'id' || item === 'createTime',
  }))
  //添加操作列
  columns.value.push({
    title: '操作',
    dataIndex: 'action',
  })
  return data
}

const {data, run, loading, current, pageSize, total} = usePagination(
    getData,
    {
      pagination: {
        currentKey: 'current',
        pageSizeKey: 'pageSize',
        totalKey: 'total',
        sortFieldKey: 'sortField',
        sortOrderKey: 'sortOrder',
      },
    },
)
const dataSource = ref(data.data)
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
}))
const handleTableChange = (pag, filters, sorter) => {
  run({
    pageSize: pag.pageSize,
    current: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  })
}

const formRef = ref()
const modalState = reactive({
  open: false,
  title: '',
  data: {},
  rules: {
    companyName: [{required: true, message: '请输入公司名称'}],
    productName: [{required: true, message: '请输入产品名称'}],
    code: [{required: true, message: '请输入产品代码'}],
    price: [{required: true, message: '请输入产品价格'}],
    skuType: [{required: true, message: '请输入sku类型'}],
    colorType: [{required: true, message: '请输入颜色类型'}],
    stock: [{required: true, message: '请输入库存'}],
    status: [{required: true, message: '请输入状态'}],
  },
  handleOk: () => {
  },
  handleCancel: () => {
  },
})

// 删除
const confirmDelete = async (record) => {
  let formData = new FormData()
  formData.append('ids', [record.id])
  const {data} = await request.post('/delete', formData)
  if (data.code === 0) {
    message.error(data.msg)
    return
  }
  message.success('删除成功')
  // 重新获取数据
  await run()
}

// 修改
const editData = (record) => {
  modalState.title = '编辑'
  // 浅拷贝
  modalState.data = {...record}
  modalState.open = true
  modalState.handleOk = async () => {
    formRef.value.validate().then(async () => {
      modalState.open = false
      const {data} = await request.post('/update', modalState.data)
      if (data.code === 0) {
        message.error(data.msg)
        return
      }
      message.success('编辑成功')
      run()
    })
  }
}

// 新增
const addData = () => {
  modalState.title = '新增'
  modalState.data = {}
  modalState.open = true
  modalState.handleOk = async () => {
    formRef.value.validate().then(async () => {
      modalState.open = false
      const {data} = await request.post('/add', modalState.data)
      if (data.code === 0) {
        message.error(data.msg)
        return
      }
      message.success('新增成功')
      run()
    })
  }
}

</script>
<template>
  <a-button type="primary" @click="addData" style="margin-bottom: 20px">添加</a-button>

  <a-table
      :data-source="dataSource"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      bordered
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'action'">
        <a-button-group>
          <a-button type="link" @click="editData(record)"> 编辑</a-button>
          <a-popconfirm
              title="确定要删除么？"
              @confirm="confirmDelete(record)"
          >
            <a-button type="link">删除</a-button>
          </a-popconfirm>
        </a-button-group>
      </template>
    </template>
  </a-table>

  <a-modal
      v-model:open="modalState.open"
      :title="modalState.title"
      @ok="modalState.handleOk"
      @cancel="modalState.handleCancel"
      destroy-on-close
  >
    <a-form
        ref="formRef"
        :model="modalState.data"
        :rules="modalState.rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="companyName" name="companyName">
        <a-input v-model:value="modalState.data.companyName"/>
      </a-form-item>
      <a-form-item label="productName" name="productName">
        <a-input v-model:value="modalState.data.productName"/>
      </a-form-item>
      <a-form-item label="code" name="code">
        <a-input v-model:value="modalState.data.code"/>
      </a-form-item>
      <a-form-item label="price" name="price">
        <a-input v-model:value="modalState.data.price"/>
      </a-form-item>
      <a-form-item label="skuType" name="skuType">
        <a-input v-model:value="modalState.data.skuType"/>
      </a-form-item>
      <a-form-item label="colorType" name="colorType">
        <a-input v-model:value="modalState.data.colorType"/>
      </a-form-item>
      <a-form-item label="stock" name="stock">
        <a-input v-model:value="modalState.data.stock"/>
      </a-form-item>
      <a-form-item label="status" name="status">
        <a-input v-model:value="modalState.data.status"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
