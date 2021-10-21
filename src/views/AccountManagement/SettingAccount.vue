<template>
  <div class="q-pa-md" style="">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="editPersonal" label="修改個人資料" />
        <q-tab name="editPwd" label="修改密碼" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="editPersonal">
          <!-- 設定 -->
          <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm">
            <div class="col-12 col-md-3 q-mb-sm">
              <base-image-input
                style="margin:auto;"
                :style="$q.screen.lt.sm ? 'width:200px;height:200px;' : ''"
              ></base-image-input>
            </div>
            <div class="col-12 col-md-2 q-mb-sm"></div>
            <div class="col-12 col-md-4">
              <com-input
                v-model="settingForm.loginId"
                readonly
                form-label="帳號"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
              <com-input
                v-model="settingForm.laleLoginId"
                form-label="Lale帳號"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
              <com-input
                v-model="settingForm.name"
                form-label="姓名"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
              <com-input
                v-model="settingForm.email"
                form-label="Email"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
              <com-input
                v-model="settingForm.phone"
                form-label="電話號碼"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
            </div>
          </div>

          <!-- 送出鍵 -->
          <div
            class="row col-12 q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md justify-end"
          >
            <div class="q-pa-md q-gutter-sm">
              <q-btn
                type="reset"
                size="sm"
                color="white"
                text-color="black"
                label="取消"
              />
              <q-btn
                type="submit"
                size="sm"
                color="primary"
                label="保存更新"
                @click="onSave"
              />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="editPwd">
          <!-- 修改密碼 -->
          <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm">
            <div class="col-12 col-md-4 q-mb-sm">
              <com-input
                v-model="editPwdForm.oldPassword"
                form-label="舊密碼"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
              ></com-input>
            </div>
            <div class="col-12 col-md-4 q-mb-sm">
              <com-input
                v-model="editPwdForm.newPassword"
                form-label="新密碼"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
                :type="isPwd ? 'password' : 'text'"
                hide-bottom-space
                :rules="[
                  (val) => (val !== null && val !== '') || '此欄位為必填項',
                  (val) =>
                    (val.length > 6 && val.length < 20) ||
                    '請輸入6~20位英文字母或符號(不得為空白)或數字混合',
                ]"
              >
                <template v-slot:hint>
                  請輸入6~20位英文字母或符號(不得為空白)或數字混合
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </com-input>
            </div>
            <div class="col-12 col-md-4 q-mb-sm">
              <com-input
                v-model="editPwdForm.newPassword_again"
                form-label="請再輸入一次新密碼"
                style="width:250px;margin-bottom:10px;"
                :style="$q.screen.lt.sm ? 'width:100%;' : ''"
                :type="isPwd2 ? 'password' : 'text'"
                hide-bottom-space
                :rules="[
                  (val) =>
                    (val && val === editPwdForm.newPassword) ||
                    '兩次密碼不同',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd2 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd2 = !isPwd2"
                  />
                </template>
              </com-input>
            </div>
          </div>
          <!-- 送出鍵 -->
          <div
            class="row col-12 q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md justify-end"
          >
            <div class="q-pa-md q-gutter-sm">
              <q-btn
                type="reset"
                size="sm"
                color="white"
                text-color="black"
                label="取消"
              />
              <q-btn
                type="submit"
                size="sm"
                color="primary"
                label="保存"
                @click="updatePwd"
              />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { updatePassword } from "@/api/user";
import BaseImageInput from "@/components/Common/BaseImageInput";
import ComInput from "@/components/Common/form/ComInput";
import Mixin from "@/utils/mixin";
export default {
  mixins: [Mixin],

  components: { BaseImageInput, ComInput },
  data() {
    return {
      tab: "editPersonal",
      settingForm: {
        email: "",
        phone: "",
        name: "", // 名稱
        laleLoginId: "", // lale 帳號
        loginId: "", //  帳號
      },
      editPwdForm: {
        oldPassword: "",
        newPassword: "",
        newPassword_again: "",
      },
      isPwd: true,
      isPwd2: true,
    };
  },
  created() {
    this.initUser();
  },
  // 計算屬性
  computed: {
    // ...mapState({
    //   user: (state) => state.user.user,
    // }),
    ...mapGetters(["getUser"]),
  },
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    initUser() {
      this.settingForm = this.getUser;
    },
    async updatePwd() {
      // 修改密碼

      await updatePassword(this.editPwdForm)
        .then((res) => {
          if (res.status === 200) {
            this.$q.notify({
              color:'blue',
              textColor: "white",
              icon: "success",
              message: "密碼修改成功，請重新登入。",
            });
            // 刪除用戶所有資料
            this.$store.commit("logout");
            this.goTo("Login");
          }
        })
        .catch((err) => {
          console.log("updatePassword err=>", err);
        });
    },
    onSave() {},
  },
};
</script>
<style lang="scss" scoped></style>
