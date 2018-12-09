<template>
  <section>
    <el-input v-model="inpContent"></el-input>
    <el-button type="primary" @click.prevent="handleBtn">点击</el-button>
  </section>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      inpContent: ''
    }
  },
  methods: {
    handleBtn () {
    }
  },
  created () {}
}
</script>

<style scoped>

</style>
