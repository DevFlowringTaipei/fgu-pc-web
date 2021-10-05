<template>
  <div class="q-pa-md" style="margin-top:20px;">
    <q-card
      class="q-pa-md"
      :style="$q.screen.lt.sm ? '' : 'width:400px;margin:auto;'"
    >
      <q-card-section
        style="display:flex;flex-direction:column;justify-content:center;align-items:center;"
      >
        <div class="text-h6">註冊帳號</div>
      </q-card-section>

      <q-form>
        <div class="col-12  q-mb-md">
          <label v-if="!$q.screen.lt.sm">
            <span>選擇身分</span>
          </label>
          <q-select
            outlined
            v-model="signupForm.indentity"
            stack-label
            behavior="menu"
            :options="signUpIdentityOptions"
            dense
            emit-value
            map-options
            :option-label="(item) => (item === '' ? '請選擇' : item.label)"
            :style="!$q.screen.lt.sm ? 'width:150px;' : ''"
          >
          </q-select>
        </div>

        <div class="row ">
          <div class="col-12  q-mb-md">
            <label v-if="!$q.screen.lt.sm">
              <span>Lale公號名稱</span>
            </label>
            <q-input
              ref="laleRef"
              v-model="signupForm.lale_name"
              dense
              outlined
              :label="$q.screen.lt.sm ? 'Lale公號名稱' : void 0"
              size="sm"
              hide-bottom-space
              :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
            >
            </q-input>
          </div>
          <div class="col-12  q-mb-md">
            <label v-if="!$q.screen.lt.sm">
              <span>登入帳號</span>
            </label>
            <q-input
              ref="accountRef"
              v-model="signupForm.email"
              dense
              outlined
              :label="$q.screen.lt.sm ? '登入帳號' : void 0"
              size="sm"
              hide-bottom-space
              :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
            >
              <template v-slot:hint>
                請以Email註冊
              </template>
            </q-input>
          </div>
          <div class="col-12 q-mb-md">
            <label v-if="!$q.screen.lt.sm">
              <span>輸入密碼</span>
            </label>
            <q-input
              ref="passwordRef"
              v-model="signupForm.password"
              dense
              outlined
              :label="$q.screen.lt.sm ? '輸入密碼' : void 0"
              size="sm"
              :type="isPwd ? 'password' : 'text'"
              hide-bottom-space
              :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12 q-mb-md">
            <label v-if="!$q.screen.lt.sm">
              <span>確認密碼</span>
            </label>
            <q-input
              ref="passwordcheckRef"
              v-model="signupForm.password_check"
              dense
              outlined
              :label="$q.screen.lt.sm ? '確認密碼' : void 0"
              size="sm"
              :type="isPwd2 ? 'password' : 'text'"
              hide-bottom-space
              :rules="[
                (val) => (val && val === signupForm.password) || '兩次密碼不同',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd2 ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd2 = !isPwd2"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12 q-mb-sm">
            <q-btn
              style="width:100%"
              size="md"
              color="primary"
              text-color="black"
              label="註冊"
              @click="onSubmit"
            />
          </div>
          <div
            class="col-12 "
            style="display:flex;flex-direction:row;justify-content:space-between;align-items:center;"
          >
            <q-btn
              style="width:40%;"
              size="md"
              text-color="black"
              label="忘記密碼"
              @click="goTo('ForgetPwd')"
            />

            <q-btn
              outline
              style="width:40%"
              size="md"
              color="info"
              label="登入"
              @click="goTo('Login')"
            />
          </div>
        </div>
      </q-form>
    </q-card>
  </div>
</template>
<script>
import { signUpIdentityOptions } from "@/utils/common/dropdown-list.js";
import Mixin from '@/utils/mixin'
export default {
  mixins:[Mixin],
  data() {
    return {
      signUpIdentityOptions,
      signupForm: {
        indentity: 1,
        lale_name: "",
        email: "",
        password: "",
        password_check: "",
      },
      isPwd: true,
      isPwd2: true,
    };
  },
  created() {},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    onSubmit() {},
  },
};
</script>
<style lang="scss" scoped></style>
