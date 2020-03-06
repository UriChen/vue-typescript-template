<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img
          class="pic-404__parent"
          src="@/assets/404-images/404.png"
          alt="404"
        >
        <img
          class="pic-404__child left"
          src="@/assets/404-images/404-cloud.png"
          alt="404"
        >
        <img
          class="pic-404__child mid"
          src="@/assets/404-images/404-cloud.png"
          alt="404"
        >
        <img
          class="pic-404__child right"
          src="@/assets/404-images/404-cloud.png"
          alt="404"
        >
      </div>
      <div class="text-404">
        <div class="text-404__oops">
          OOPS!
        </div>
        <div class="text-404__headline">
          {{ message }}
        </div>
        <div class="text-404__info">
          Please check that the URL you entered is correct, or click the button below to return to the homepage.
        </div>
        <router-link
          to="/account"
          class="text-404__return-home"
        >Back to home</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Page404'
})
export default class Page404 extends Vue {
  private message = '404 Page Not Found'
}
</script>

<style lang="scss" scoped>
.wscn-http404-container {
  transform: translate(-50%,-50%);
  @apply absolute;
  top: 40%;
  left: 50%;
}

.wscn-http404 {
  @apply relative overflow-hidden;
  width: 1200px;
  padding: 0 50px;

  .pic-404 {
    @apply relative float-left overflow-hidden;
    width: 600px;

    &__parent {
      @apply w-full;
    }

    &__child {
      @apply absolute;

      &.left {
        width: 80px;
        top: 17px;
        left: 220px;
        @apply opacity-0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }

      &.mid {
        width: 46px;
        top: 10px;
        left: 420px;
        @apply opacity-0;
        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }

      &.right {
        width: 62px;
        top: 100px;
        left: 500px;
        @apply opacity-0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }

      @keyframes cloudLeft {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }

        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }

        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }

        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
      }

      @keyframes cloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }

        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }

        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }

        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }

      @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }

        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }

        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }

        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }
    }
  }

  .text-404 {
    @apply relative float-left overflow-hidden;
    width: 300px;
    padding: 30px 0;

    &__oops {
      font-size: 32px;
      @apply font-bold;
      line-height: 40px;
      color: #1482f0;
      @apply opacity-0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }

    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      @apply font-bold;
      @apply opacity-0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }

    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      @apply opacity-0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }

    &__return-home {
      @apply block float-left text-center cursor-pointer;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      color: #ffffff;
      @apply opacity-0;
      font-size: 14px;
      line-height: 36px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }

    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        @apply opacity-0;
      }

      100% {
        transform: translateY(0);
        @apply opacity-100;
      }
    }
  }
}
</style>
