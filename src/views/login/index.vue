<template>
  <div class="login-container">
    <div class="flex justify-center items-center h-full px-6">
      <div class="w-full xl:w-3/4 lg:w-11/12 flex">
        <div
          class="login-bg w-full h-auto bg-white hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
        />
        <div class="w-full lg:w-1/2 p-5 rounded-lg lg:rounded-l-none">
          <h3 class="pt-4 text-2xl text-center">{{ $t('login.title') }}</h3>
          <form
            class="login-form"
            @keyup.enter.prevent="handleLogin"
          >
            <div class="mb-4">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="username">
                Username
              </label>
              <input
                v-model="loginForm.username"
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                :placeholder="$t('login.username')"
              >
            </div>
            <div class="mb-4">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                Password
              </label>
              <input
                v-model="loginForm.password"
                class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                :placeholder="$t('login.password')"
              >
            </div>
            <div class="mb-6 text-center">
              <button
                class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="button"
                @click.prevent="handleLogin"
              >
                Sign In
              </button>
            </div>
            <hr class="mb-6 border-t">
            <div class="text-center">
              <router-link
                to="/account/register"
                class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              >
                Create an Account!
              </router-link>
            </div>
            <div class="text-center">
              <router-link
                to="/account/forget"
                class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              >
                Forgot Password?
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Dictionary } from 'vue-router/types/router'
import { Action } from 'vuex-class'
import to from 'await-to-js'

@Component({
  name: 'Login'
})
export default class Login extends Vue {
  private loginForm = {
    username: '',
    password: ''
  }
  private loading = false
  private redirect?: string
  private otherQuery: Dictionary<string> = {}

  @Action('user/userLogin')
  private userLogin!: (userInfo: { username: string, password: string }) => Promise<any>

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  private async handleLogin() {
    this.loading = true
    const [err, data] = await to(this.userLogin(this.loginForm))
    this.loading = false
    if (err || !data) {
      this.$alert('登录失败!')
      return
    }
    if (data.success !== 1) {
      this.$alert(data.message)
      return
    }
    this.$router.push({
      path: this.redirect || '/',
      query: this.otherQuery
    })
  }

  /**
   * 获取url query参数
   * @param query
   * @return {...query}
   */
  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    @apply mx-auto h-full;
    background-color: #F6F6F6;

    .login-bg {
      background-image: url('~@/assets/login-images/bg.jpg');
    }

    .login-form {
      @apply relative overflow-hidden max-w-full my-0 mx-auto;
      width: 520px;
      padding: 100px 35px 0;
    }
  }
</style>
