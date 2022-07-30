<template>
  <div class="navbar">

    <!-- title -->
    <div class="left flex-item-center het-100">
      <img :src="imgUrl.logo" class="wth_100">
      <div class="mr-left-5 title">浙科信息抗疫互助平台</div>
    </div>

    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />
    <div class="right flex-item-center het-100">
      <!-- 头像 -->
      <div class="flex-item-center mr-right-30">
        <img :src="imgUrl.user" class="wth_20">
        <div class="mr-left-5">username</div>
      </div>
      <!-- 退出 -->
      <div class="flex-item-center mr-right-30">
        <img :src="imgUrl.exits" class="wth_20">
        <div class="mr-left-5">退出</div>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'

  export default {
    data() {
      return {
        imgUrl: {
          user: require('@/assets/img/user2.png'),
          exits: require('@/assets/img/exits.png'),
          logo: require('@/assets/img/logo.png'),
        }
      }
    },
    components: {
      Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .left {
      float: left;
    }

    .right {
      float: right;
    }
    .title{
      font-weight: bold;
      font-size: 20px;
      color: #0b2563;
    }
  }
</style>
