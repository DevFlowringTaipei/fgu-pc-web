<template>
  <div
    class="q-pa-md"
    :style="$q.screen.lt.sm ? 'margin-top:100px;' : 'margin-top:10%;'"
  >
    <q-card
      class="q-pa-md"
      :style="$q.screen.lt.sm ? '' : 'width:400px;margin:auto;'"
    >
      <q-card-section
        style="display:flex;flex-direction:column;justify-content:center;align-items:center;"
      >
        <div class="text-h6">佛光育成後臺管理系統</div>
        <div class="text-subtitle2">使用愉快</div>
      </q-card-section>

      <q-form>
        <div class="row ">
          <div class="col-12  q-mb-md">
            <label v-if="!$q.screen.lt.sm">
              <span>登入帳號</span>
            </label>
            <q-input
              ref="accountRef"
              v-model="loginForm.account"
              dense
              outlined
              :label="$q.screen.lt.sm ? '登入帳號' : void 0"
              size="sm"
              hide-bottom-space
              :rules="[(val) => (val && val.length > 0) || '此欄位為必填項']"
            >
            </q-input>
          </div>
          <div class="col-12 q-mb-md">
            <label v-if="!$q.screen.lt.sm">
              <span>登入密碼</span>
            </label>
            <q-input
              ref="passwordRef"
              v-model="loginForm.password"
              dense
              outlined
              :label="$q.screen.lt.sm ? '登入密碼' : void 0"
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
         
          <div class="col-12 q-mb-sm">
            <q-btn
              style="width:100%"
          
              size="md"
              color="primary"
              text-color="black"
              label="登入"
              @click="onSubmit"
            />
          </div>
          <div class="col-12 " style="display:flex;flex-direction:row;justify-content:space-between;align-items:center;">
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
              
              label="註冊"
              @click="goTo('SignUp')"
            />
            
          </div>
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import ComInput from "@/components/Common/form/ComInput";
import Mixin from '@/utils/mixin'
export default {
  mixins:[Mixin],
  // 局部注冊的組件
  components: { ComInput },
  data() {
    return {
      
      loginForm: {
        account: "",
        password: "",
      },
      isPwd: true,
    };
  },
  created() {},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    onSubmit () {
      console.log(this.$refs.accountRef)
      if(this.loginForm.account!=''&&this.loginForm.password!=''){
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'success',
          message: '登入成功'
        })
        this.goTo('SettingAccount')
      }
      if(this.loginForm.account==''){
        this.$refs.accountRef.innerError=true
        this.$refs.accountRef.innerErrorMessage= this.$refs.accountRef.rules[0]()
      }
      if(this.loginForm.password==''){
        this.$refs.passwordRef.innerError=true
        this.$refs.passwordRef.innerErrorMessage= this.$refs.passwordRef.rules[0]()
      }
      
    },

  },
};
</script>
<style lang="scss" scoped></style>
