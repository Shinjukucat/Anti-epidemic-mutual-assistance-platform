<template>
  <div class="login-container">
    <img :src="imgUrl.bkg_img" class="bkg">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="column-item-center">
        <img :src="imgUrl.logo" class="wth_250">
        <div class="fs_35 dark_blue">浙科信息抗疫互助平台</div>
      </div>

      <el-form-item prop="username" class=" mr-top-20">
        <img :src="imgUrl.user" class="wth_20">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <img :src="imgUrl.lock" class="wth_20">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <!-- 后期优化加入 -->
      <!-- 7天免登录 -->
      <!-- 忘记密码 -->

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:10px;"
        class="bkg-light_blue border-none"
        @click.native.prevent="handleLogin"
      >登 录</el-button>

      <el-button
        type="primary"
        style="width:100%;"
        class="bkg-none mr-left-0 border-none black"
        @click.native.prevent="handleLogin"
      >统一身份认证</el-button>

    </el-form>
  </div>
</template>

<script>
import {
  validUsername
} from '@/utils/validate'
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      imgUrl: {
        bkg_img: require('@/assets/img/login_bg.png'),
        logo: require('@/assets/img/logo.png'),
        user: require('@/assets/img/user.png'),
        lock: require('@/assets/img/lock.png')
      },
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    axios({
      method: 'get',
      url: '/client/materialInfo/list'
    }).then((res) => {
      console.log(res)
    })
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true

          this.loading = false
          this.$router.replace({ path: `/console` })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */

  $bg:#283443;
  $light_gray:#8c8c8c;
  $cursor: #8c8c8c;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        height: 20px;
        border-radius: 0px;
        border-left: 1px solid rgba(61, 94, 124, 0.5);
        padding: 0px 20px 0 15px;
        color: $light_gray;
        width: 100%;
        caret-color: $cursor;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border-bottom: 1px solid rgba(140, 140, 140, 0.2);
    }

    .el-form-item__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    position: relative;

    .bkg {
      position: absolute;
      width: 100%;
    }

    .login-form {
      position: absolute;
      right: 220px;
      top: 20%;
      padding: 50px 60px;
      margin: 0 auto;
      background-color: rgba($color: #FFF, $alpha: .8);
      border-radius: 25px;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
