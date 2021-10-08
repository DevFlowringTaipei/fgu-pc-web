<template>
  <div :class="$q.screen.lt.sm ? 'q-pa-xs' : 'q-pa-md'" style="">
    <div
      class="row col-12 justify-center q-mb-sm"
      style="align-items:center"
      :style="
        $q.screen.lt.sm ? 'flex-direction:column;' : 'flex-direction:row;'
      "
    >
      <span class="text-center" style="font-size:24px;font-weight:bold;"
        >{{ id_data.name }} 遊程詳情</span
      >
      <q-select
        outlined
        v-model="id_data.picked_template"
        stack-label
        :options="templateOptions"
        dense
        behavior="menu"
        emit-value
        map-options
        :option-label="(item) => (item === '' ? '請選擇套用範本' : item.label)"
        :style="$q.screen.lt.sm ? 'width:200px;' : 'width:200px;margin-left:10px;'"
        @input="useTemplate"
      >
      </q-select>

    </div>
    <!-- 基本資料 -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >一.活動流程</span
        >
      </div>
      <div class="col-12 col-md-3" :style="$q.screen.lt.sm ? 'order:1;' : ''">
        <base-image-input
          v-model="id_data.tour_image"
          class=""
          ref="imageBox"
          style="margin:auto;"
          :style="$q.screen.lt.sm ? 'width:250px;height:200px;' : ''"
        ></base-image-input>
      </div>
      <div class="col-12 col-md-9 " :style="$q.screen.lt.sm ? 'order:2' : ''">
        <div class="row q-col-gutter-x-sm q-col-gutter-y-md">
          <div class="col-6 col-md-4">
            <com-input
              :readonly="id_data.status !== '退回'||id_data.status !== '草稿'"
              v-model="id_data.name"
              form-label="活動名稱"
            ></com-input>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              :readonly="id_data.status !== '退回'||id_data.status !== '草稿'"
              v-model="id_data.location"
              form-label="活動地點"
            ></com-input>
          </div>

          <div class="col-6 col-md-4">
            <com-select-date
              :readonly="id_data.status !== '退回'||id_data.status !== '草稿'"
              :range="false"
              :required="false"
              v-model="id_data.started_date"
              form-label="活動日期"
              :style="$q.screen.lt.sm ? 'width:100%;' : ''"
            ></com-select-date>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              :readonly="id_data.status !== '退回'||id_data.status !== '草稿'"
              v-model="id_data.leader_num"
              form-label="帶領人需求人數"
              :style="$q.screen.lt.sm ? 'width:100%;' : ''"
            ></com-input>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              :readonly="id_data.status !== '退回'||id_data.status !== '草稿'"
              v-model="id_data.people_num"
              form-label="活動人數"
            ></com-input>
          </div>
          <div class="col-6 col-md-4">
            <com-input
              :readonly="id_data.status !== '退回'||id_data.status !== '草稿'"
              v-model="id_data.min_num"
              form-label="最低開團人數"
            ></com-input>
          </div>
        </div>
      </div>
      <!-- 活動遊程介紹(Editor)  -->
      <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >活動遊程介紹</span
        >
      </div>
      <div
        class="col-12"
        :style="$q.screen.lt.sm ? 'order:2' : ''"
        style="overflow:hidden;"
      >
        <tiny-mce
          v-if="id_data.status == '退回'||id_data.status == '草稿'"
          ref="editor"
          v-model="id_data.desc"
          @onClick="onClick"
        />
        <p v-else v-html="id_data.desc"></p>
      </div>
      <div class="col-12" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          :readonly="id_data.status !== '退回'||id_data.status !== '草稿'"
          v-model="id_data.notice"
          form-label="注意事項/安全守則"
          type="textarea"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          :readonly="id_data.status !== '退回'||id_data.status !== '草稿'"
          v-model="id_data.contact_person"
          form-label="聯絡人"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          :readonly="id_data.status !== '退回'||id_data.status !== '草稿'"
          v-model="id_data.contact_phone"
          form-label="聯絡人手機"
        ></com-input>
      </div>
      <div class="col-12 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          :readonly="id_data.status !== '退回'||id_data.status !== '草稿'"
          v-model="id_data.contact_email"
          form-label="聯絡人Email"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          :readonly="id_data.status !== '退回'||id_data.status !== '草稿'"
          v-model="id_data.total_hour"
          form-label="活動時程(小時)"
        ></com-input>
      </div>
      <div class="col-6 col-md-4" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <com-input
          :readonly="id_data.status !== '退回'||id_data.status !== '草稿'"
          v-model="id_data.total_price"
          form-label="活動費用"
        ></com-input>
      </div>
    </div>

    <!-- 服務類型選單 -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div v-if="!$q.screen.lt.sm" class="col-8">
        <q-markup-table>
          <thead>
            <tr>
              <th
                class="`text-${col.align}`"
                v-for="(col, index) in tableColumns"
                :key="index"
              >
                {{ col.label }}
              </th>
              <th v-if="id_data.status == '退回'||id_data.status == '草稿'" class="`text-center`">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="id_data.status == '退回'||id_data.status == '草稿'">
              <td class="text-center">
                <q-select
                  dense
                  outlined
                  :option-label="
                    (item) => (item === '' ? '請選擇' : item.label)
                  "
                  v-model="serviceItem.name"
                  :options="typeOptions"
                  behavior="menu"
                  emit-value
                  map-options
                  :style="!$q.screen.lt.sm ? 'width:200px;' : ''"
                  style="margin:0px auto;"
                >
                </q-select>
              </td>
              <td class="text-center" style="">
                <q-select
                  outlined
                  :option-label="
                    (item) => (item === '' ? '請選擇' : item.label)
                  "
                  v-model="serviceItem.picked_time"
                  :options="asistancetimeOptions"
                  dense
                  behavior="menu"
                  emit-value
                  map-options
                  :style="!$q.screen.lt.sm ? 'width:200px;' : ''"
                  style="margin:0px auto;"
                >
                </q-select>
              </td>

              <td class="text-center">
                <q-btn
                  round
                  class="q-mr-xs"
                  size="xs"
                  color="secondary"
                  icon="add_circle"
                  @click="addRow(serviceItem, 'service')"
                />
              </td>
            </tr>
            <tr v-for="(item, index) in id_data.service_list" :key="index">
              <!-- <td class="text-center">{{ item.id }}</td> -->
              <td class="text-center">{{ item.name | transServiceName }}</td>
              <td class="text-center">
                {{ item.picked_time | transPickedTimeName }}
              </td>

              <td v-if="id_data.status == '退回'||id_data.status == '草稿'" class="text-center">
                <q-btn
                  round
                  size="xs"
                  color="secondary"
                  icon="remove_circle"
                  @click="delRow(index, 'service')"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>

      <div v-if="$q.screen.lt.sm" class="col-12">
        <div v-if="id_data.status == '退回'||id_data.status == '草稿'" class="q-mb-sm ">
          <com-select
            ref="comCheck"
            v-model="serviceItem.name"
            outlined
            behavior="menu"
            :options="typeOptions"
            dense
            emit-value
            map-options
            form-label="服務類型設定"
            :required-valid="false"
          ></com-select>
        </div>
        <div v-if="id_data.status == '退回'||id_data.status == '草稿'" class="q-mb-sm ">
          <com-select
            ref="comCheck"
            v-model="serviceItem.picked_time"
            outlined
            behavior="menu"
            :options="asistancetimeOptions"
            dense
            emit-value
            map-options
            form-label="時間"
            :required-valid="false"
          ></com-select>
        </div>

        <div v-if="id_data.status == '退回'||id_data.status == '草稿'" class="q-mb-sm ">
          <q-btn
            style="font-size:12px;width:100%;"
            class=""
            color="secondary"
            icon="add"
            @click="addRow(serviceItem, 'service')"
          ></q-btn>
        </div>
      </div>
      <!-- 表單已有東西 -->
      <div
        v-if="$q.screen.lt.sm && id_data.service_list.length != 0"
        class="col-12"
      >
        <q-table
          grid
          :data="id_data.service_list"
          :columns="tableColumns"
          row-key="name"
          hide-pagination
          hide-header
        >
          <template v-slot:item="props">
            <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-card :class="props.selected ? 'bg-grey-2' : ''">
                <q-card-section v-if="id_data.status == '退回'||id_data.status == '草稿'">
                  <div
                    class=""
                    style="display:flex;flex-direction:row;align-items:center;justify-content:space-between;"
                  >
                    <span class="" style="font-size:16px;"
                      >移除<span style="font-weight:bold">{{
                        props.row.school
                      }}</span
                      >該項目</span
                    >
                    <q-btn
                      size="sm"
                      color="secondary"
                      icon="remove"
                      @click="delRow(props.rowindex, 'service')"
                    />
                  </div>
                </q-card-section>
                <q-separator />
                <q-list dense>
                  <q-item v-for="col in props.cols" :key="col.name">
                    <q-item-section>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label v-if="col.name == 'name'" caption>{{
                        col.value | transServiceName
                      }}</q-item-label>
                      <q-item-label v-else caption>{{
                        col.value | transPickedTimeName
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
    </div>

     <!-- 是否建立範本 -->
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div
        class="col-12 col-md-6 "
        style="display:flex;flex-direction:column;"
        :style="
          $q.screen.lt.sm
            ? 'flex-direction:row;border:1px solid rgba(0,0,0,0.24);padding-top:0px;margin-left:8px;padding-left:4px;width:inherit;flex:1;margin-top:8px;border-radius:4px;'
            : ''
        "
      >
        <span class="" :style="$q.screen.lt.sm ? 'padding-top:10px;' : ''"
          >狀態</span
        >

        <q-option-group
          style="margin-left:-12px;"
          v-model="id_data.is_template"
          :options="isTemplateOptions"
          inline
          type="radio"
          class=""
        />
      </div>
    </div>
    <!-- 審核 -->
    <div v-if="id_data.status !== '草稿'" class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm q-mt-sm">
      <div
        class="col-12 q-mb-sm"
        style="border-bottom:1px solid rgba(0,0,0,0.21)"
      >
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >審核結果</span
        >
      </div>

      <div class="col-12" :style="$q.screen.lt.sm ? 'order:2' : ''">
        <q-markup-table v-if="id_data.approval_history.length > 0">
          <thead>
            <tr>
              <th
                class="`text-${col.align}`"
                v-for="(col, index) in tableApprovalColumns"
                :key="index"
              >
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in id_data.approval_history" :key="item.id">
              <td class="text-center">{{ item.id }}</td>
              <td class="text-center">{{ item.type }}</td>
              <td class="text-center">
                <div class="" style="display:flex;flex-direction:column;">
                  <span
                    class=""
                    v-for="(item, index) in item.applicant_info.split(',')"
                    :key="item"
                    >{{ item }}</span
                  >
                </div>
              </td>
              <td class="text-center">{{ item.applied_date }}</td>
              <td class="text-center">{{ item.approval_result }}</td>
              <td class="text-center">{{ item.approval_suggestion }}</td>
            </tr>
          </tbody>
        </q-markup-table>
        <q-card flat  v-else >
          <div style="display:flex;justify-content:center;align-items:center;">
            
            <q-spinner-comment size="xl" color="deep-purple" ></q-spinner-comment>
            <span class="text-h6">審核處理中</span>
          </div>

        </q-card>
      </div>
    </div>
    <!--  -->
    <div
      class="row col-12 q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md "
      :class="$q.screen.lt.sm ? 'justify-center' : 'justify-end'"
    >
      <div v-if="id_data.status == '退回'||id_data.status == '草稿'"  class="q-pa-md q-gutter-sm">
        <q-btn
          type="reset"
          size="sm"
          color="white"
          text-color="black"
          label="取消"
          @click="goBack"
        />
        <q-btn
          type="submit"
          size="sm"
          color="white"
          text-color="black"
          label="保存"
          @click="onSave()"
        />
        <q-btn
          type="submit"
          size="sm"
          color="primary"
          label="送審"
          @click="onSubmit()"
        />
      </div>
      <div v-else>
          <q-btn
          size="md"
          color="primary"
          text-color="white"
          label="回上頁"
          @click="goBack"
        />
      </div>
    </div>
  </div>
</template>
<script>
import TinyMce from "@/components/TinyMce/TinyMce.vue";
import BaseImageInput from "@/components/Common/BaseImageInput";
import ComInput from "@/components/Common/form/ComInput";
import ComSelect from "@/components/Common/form/ComSelect";
import ComSelectDate from "@/components/Common/form/ComSelectDate";
import { asistancetimeOptions,isTemplateOptions } from "@/utils/common/dropdown-list.js";
import Mixin from "@/utils/mixin";
const typeOptions = [
  { label: "帆船", value: 1 },
  { label: "打靶", value: 2 },
  { label: "書法", value: 3 },
  { label: "油畫", value: 4 },
  { label: "登山", value: 5 },
  { label: "露營", value: 6 },
  { label: "採茶", value: 7 },
  { label: "拉坏", value: 8 },
];
const templateOptions = [
  { label: "範本1", value: 1 },
  { label: "範本2", value: 2 },
  { label: "範本3", value: 3 },
  { label: "範本4", value: 4 },
  { label: "範本5", value: 5 },
  { label: "範本6", value: 6 },
];


export default {
  mixins: [Mixin],
  // 局部注冊的組件
  components: { TinyMce, ComInput, ComSelect, BaseImageInput, ComSelectDate },
  data() {
    return {
      typeOptions,
      asistancetimeOptions,
      isTemplateOptions,
      templateOptions,
      data: [
        {
          id: 1,
          picked_template:1,
          tour_image: "https://cdn.quasar.dev/img/parallax1.jpg",
          name: "這是遊程主題1(This is title 1)",
          service_list: [
            { name: 1, picked_time: 4 },
            { name: 2, picked_time: 5 },
          ],

          location: "宜蘭礁溪", // 活動地點
          started_date: "2021-12-12", // 活動日期
          leader_num: "2", // 帶領人需求數=> 與媒合老師數量要相同
          people_num: "30", // 活動人數
          min_num: "10", // 開團最低人數
          desc:
            '<p><img src="https://cdn.quasar.dev/img/parallax1.jpg" alt="" width="412" height="275" /></p> <p><strong>這是遊程測試</strong></p> <h6>希望各位玩得愉快，我也不知道這些要寫些甚麼。宜蘭就是好山好水不無聊，可以來逛逛夜市吃吃美食，與家人共遊....之類的，非常好，我語塞了。</h6>', // 遊程介紹
          notice:
            "注意事項注意事項注意事項.....注意事項注意事項注意事項注意事項......注意事項注意事項注意事項.....", // 注意事項
          contact_person: "超人", // 聯絡人
          contact_phone: "0912345676", // 聯絡人手機
          contact_email: "superman@gmail.com", // 聯絡人email
          total_hour: "8", //
          total_price: 3999, //
          is_template:0,
          approval_history: [
            {
              id: "1",
              type: "遊程上架申請",
              applicant_info: "林泰山,財政局秘書室_承辦人,財政局秘書室",
              applied_date: "2021-02-25",
              approval_result: "通過",
              approval_suggestion: "經審核後，符合規定，故該游程給予通過。",
            },
          ],
          status: "通過",
        },
        {
          id: 2,
          picked_template:2,
          tour_image: "https://cdn.quasar.dev/img/parallax2.jpg",
          name: "這是遊程主題2(This is title 2)",
          service_list: [
            { name: 3, picked_time: 1 },
            { name: 4, picked_time: 2 },
          ],

          location: "基隆", // 活動地點
          started_date: "2021-12-20", // 活動日期
          leader_num: "2", // 帶領人需求數=> 與媒合老師數量要相同
          people_num: "30", // 活動人數
          min_num: "10", // 開團最低人數
          desc:
            '<p><img src="https://cdn.quasar.dev/img/parallax1.jpg" alt="" width="412" height="275" /></p> <p><strong>這是遊程測試</strong></p> <h6>希望各位玩得愉快，我也不知道這些要寫些甚麼。宜蘭就是好山好水不無聊，可以來逛逛夜市吃吃美食，與家人共遊....之類的，非常好，我語塞了。</h6>', // 遊程介紹
          notice:
            "注意事項注意事項注意事項.....注意事項注意事項注意事項注意事項......注意事項注意事項注意事項.....", // 注意事項
          contact_person: "超人", // 聯絡人
          contact_phone: "0912345676", // 聯絡人手機
          contact_email: "superman@gmail.com", // 聯絡人email
          total_hour: "8", //
          total_price: 1999,
          is_template:1,
          approval_history: [
            // 審核中不會有任何審核資訊
          ],
          status: "審核中",
        },
        {
          id: 3,
          picked_template:3,
          tour_image: "https://cdn.quasar.dev/img/parallax1.jpg",
          name: "這是遊程主題3(This is title 3)",
          service_list: [
            { name: 1, picked_time: 7 },
            { name: 4, picked_time: 8 },
          ],

          location: "台東", // 活動地點
          started_date: "2021-10-25", // 活動日期
          leader_num: "2", // 帶領人需求數=> 與媒合老師數量要相同
          people_num: "30", // 活動人數
          min_num: "10", // 開團最低人數
          desc:
            '<p><img src="https://cdn.quasar.dev/img/parallax1.jpg" alt="" width="412" height="275" /></p> <p><strong>這是遊程測試</strong></p> <h6>希望各位玩得愉快，我也不知道這些要寫些甚麼。宜蘭就是好山好水不無聊，可以來逛逛夜市吃吃美食，與家人共遊....之類的，非常好，我語塞了。</h6>', // 遊程介紹
          notice:
            "注意事項注意事項注意事項.....注意事項注意事項注意事項注意事項......注意事項注意事項注意事項.....", // 注意事項
          contact_person: "超人", // 聯絡人
          contact_phone: "0912345676", // 聯絡人手機
          contact_email: "superman@gmail.com", // 聯絡人email
          total_hour: "8", //
          total_price: 1599,
          is_template:0,
          approval_history: [
            {
              id: "1",
              type: "遊程上架申請",
              applicant_info: "白晶晶,財政局支付科_承辦人,財政局支付科",
              applied_date: "2019-12-25",
              approval_result: "退回",
              approval_suggestion:
                "資訊不完全，行程排太滿，價格過高，請重新訂價再送審。資訊不完全，行程排太滿，價格過高，請重新訂價再送審。",
            },
          ],
          status: "退回",
        },
        {
          id: 4,
          picked_template:4,
          tour_image: "https://cdn.quasar.dev/img/parallax1.jpg",
          name: "這是遊程主題4(This is title 4)",
          service_list: [{ name: 5, picked_time: 3 }],

          location: "台東", // 活動地點
          started_date: "2021-11-12", // 活動日期
          leader_num: "2", // 帶領人需求數=> 與媒合老師數量要相同
          people_num: "30", // 活動人數
          min_num: "10", // 開團最低人數
          desc:
            '<p><img src="https://cdn.quasar.dev/img/parallax1.jpg" alt="" width="412" height="275" /></p> <p><strong>這是遊程測試</strong></p> <h6>希望各位玩得愉快，我也不知道這些要寫些甚麼。宜蘭就是好山好水不無聊，可以來逛逛夜市吃吃美食，與家人共遊....之類的，非常好，我語塞了。</h6>', // 遊程介紹
          notice:
            "注意事項注意事項注意事項.....注意事項注意事項注意事項注意事項......注意事項注意事項注意事項.....", // 注意事項
          contact_person: "超人", // 聯絡人
          contact_phone: "0912345676", // 聯絡人手機
          contact_email: "superman@gmail.com", // 聯絡人email
          total_hour: "8", //
          total_price: 1799,
          is_template:1,
          approval_history: [
            {
              id: "1",
              type: "遊程上架申請",
              applicant_info: "白晶晶,財政局支付科_承辦人,財政局支付科",
              applied_date: "2019-12-25",
              approval_result: "退回",
              approval_suggestion:
                "資訊不完全，行程排太滿，價格過高，請重新訂價再送審。資訊不完全，行程排太滿，價格過高，請重新訂價再送審。",
            },
          ],
          status: "退回",
        },
        {
          id: 5,
          picked_template:5,
          tour_image: "https://cdn.quasar.dev/img/parallax2.jpg",
          name: "這是遊程主題5(This is title 5)",
          service_list: [{ name: 6, picked_time: 4 }],

          location: "南投", // 活動地點
          started_date: "2021-12-30", // 活動日期
          leader_num: "2", // 帶領人需求數=> 與媒合老師數量要相同
          people_num: "30", // 活動人數
          min_num: "10", // 開團最低人數
          desc:
            '<p><img src="https://cdn.quasar.dev/img/parallax1.jpg" alt="" width="412" height="275" /></p> <p><strong>這是遊程測試</strong></p> <h6>希望各位玩得愉快，我也不知道這些要寫些甚麼。宜蘭就是好山好水不無聊，可以來逛逛夜市吃吃美食，與家人共遊....之類的，非常好，我語塞了。</h6>', // 遊程介紹
          notice:
            "注意事項注意事項注意事項.....注意事項注意事項注意事項注意事項......注意事項注意事項注意事項.....", // 注意事項
          contact_person: "超人", // 聯絡人
          contact_phone: "0912345676", // 聯絡人手機
          contact_email: "superman@gmail.com", // 聯絡人email
          total_hour: "8", //
          total_price: 999,
          is_template:1,
          approval_history: [
            {
              id: "1",
              type: "遊程上架申請",
              applicant_info: "白晶晶,財政局支付科_承辦人,財政局支付科",
              applied_date: "2019-12-25",
              approval_result: "退回",
              approval_suggestion:
                "資訊不完全，行程排太滿，價格過高，請重新訂價再送審。資訊不完全，行程排太滿，價格過高，請重新訂價再送審。",
            },
            {
              id: "2",
              type: "遊程上架申請",
              applicant_info: "林泰山,財政局秘書室_承辦人,財政局秘書室",
              applied_date: "2021-02-25",
              approval_result: "通過",
              approval_suggestion: "經審核後，符合規定，故該游程給予通過。",
            },
          ],
          status: "通過",
        },
        {
          id: 6,
          picked_template:6,
          tour_image: "https://cdn.quasar.dev/img/parallax1.jpg",
          name: "這是宜蘭礁溪遊程主題6(This is title 6)",
          service_list: [
            { name: 7, picked_time: 6 },
            { name: 8, picked_time: 7 },
          ],

          location: "宜蘭礁溪", // 活動地點
          started_date: "2021-12-12", // 活動日期
          leader_num: "2", // 帶領人需求數=> 與媒合老師數量要相同
          people_num: "30", // 活動人數
          min_num: "10", // 開團最低人數
          desc:
            '<p><img src="https://cdn.quasar.dev/img/parallax1.jpg" alt="" width="412" height="275" /></p> <p><strong>這是遊程測試</strong></p> <h6>希望各位玩得愉快，我也不知道這些要寫些甚麼。宜蘭就是好山好水不無聊，可以來逛逛夜市吃吃美食，與家人共遊....之類的，非常好，我語塞了。</h6>', // 遊程介紹
          notice:
            "注意事項注意事項注意事項.....注意事項注意事項注意事項注意事項......注意事項注意事項注意事項.....", // 注意事項
          contact_person: "超人", // 聯絡人
          contact_phone: "0912345676", // 聯絡人手機
          contact_email: "superman@gmail.com", // 聯絡人email
          total_hour: "8", //
          total_price: 4999,
          is_template:0,
          approval_history: [],
          status: "審核中",
        },
        {
          id: 7,
          picked_template:3,
          tour_image: "https://cdn.quasar.dev/img/parallax1.jpg",
          name: "花蓮一日遊",
          service_list: [
            { name: 7, picked_time: 6 },
            { name: 8, picked_time: 7 },
          ],

          location: "花蓮", // 活動地點
          started_date: "2021-12-12", // 活動日期
          leader_num: "2", // 帶領人需求數=> 與媒合老師數量要相同
          people_num: "30", // 活動人數
          min_num: "10", // 開團最低人數
          desc:
            '<p><img src="https://cdn.quasar.dev/img/parallax1.jpg" alt="" width="412" height="275" /></p> <p><strong>這是遊程測試</strong></p> <h6>希望各位玩得愉快，我也不知道這些要寫些甚麼。宜蘭就是好山好水不無聊，可以來逛逛夜市吃吃美食，與家人共遊....之類的，非常好，我語塞了。</h6>', // 遊程介紹
          notice:
            "注意事項注意事項注意事項.....注意事項注意事項注意事項注意事項......注意事項注意事項注意事項.....", // 注意事項
          contact_person: "王超人", // 聯絡人
          contact_phone: "0912345676", // 聯絡人手機
          contact_email: "superman@gmail.com", // 聯絡人email
          total_hour: "8", //
          total_price: 4999,
          is_template:1,
          approval_history: [],
          status: "草稿",
        },
        {
          id: 8,
          picked_template:4,
          tour_image: "https://cdn.quasar.dev/img/parallax1.jpg",
          name: "高雄一日遊",
          service_list: [
            { name: 7, picked_time: 6 },
            { name: 8, picked_time: 7 },
          ],

          location: "高雄", // 活動地點
          started_date: "2021-12-12", // 活動日期
          leader_num: "2", // 帶領人需求數=> 與媒合老師數量要相同
          people_num: "30", // 活動人數
          min_num: "10", // 開團最低人數
          desc:
            '<p><img src="https://cdn.quasar.dev/img/parallax1.jpg" alt="" width="412" height="275" /></p> <p><strong>這是遊程測試</strong></p> <h6>希望各位玩得愉快，我也不知道這些要寫些甚麼。宜蘭就是好山好水不無聊，可以來逛逛夜市吃吃美食，與家人共遊....之類的，非常好，我語塞了。</h6>', // 遊程介紹
          notice:
            "注意事項注意事項注意事項.....注意事項注意事項注意事項注意事項......注意事項注意事項注意事項.....", // 注意事項
          contact_person: "林超人", // 聯絡人
          contact_phone: "0912345676", // 聯絡人手機
          contact_email: "superman@gmail.com", // 聯絡人email
          total_hour: "8", //
          total_price: 4999,
          is_template:0,
          approval_history: [],
          status: "草稿",
        },
        {
          id: 9,
          picked_template:1,
          tour_image: "https://cdn.quasar.dev/img/parallax1.jpg",
          name: "基隆美食之旅",
          service_list: [
            { name: 7, picked_time: 6 },
            { name: 8, picked_time: 7 },
          ],

          location: "基隆", // 活動地點
          started_date: "2021-12-12", // 活動日期
          leader_num: "2", // 帶領人需求數=> 與媒合老師數量要相同
          people_num: "30", // 活動人數
          min_num: "10", // 開團最低人數
          desc:
            '<p><img src="https://cdn.quasar.dev/img/parallax1.jpg" alt="" width="412" height="275" /></p> <p><strong>這是遊程測試</strong></p> <h6>希望各位玩得愉快，我也不知道這些要寫些甚麼。宜蘭就是好山好水不無聊，可以來逛逛夜市吃吃美食，與家人共遊....之類的，非常好，我語塞了。</h6>', // 遊程介紹
          notice:
            "注意事項注意事項注意事項.....注意事項注意事項注意事項注意事項......注意事項注意事項注意事項.....", // 注意事項
          contact_person: "林超人", // 聯絡人
          contact_phone: "0912345676", // 聯絡人手機
          contact_email: "superman@gmail.com", // 聯絡人email
          total_hour: "8", //
          total_price: 4999,
          is_template:1,
          approval_history: [],
          status: "草稿",
        },
      ],
      id_data: {},

      dataForm: {
        tour_image: "", // 活動圖片
        name: "", // 活動名稱
        location: "", // 活動地點
        started_date: "", // 活動日期
        leader_num: "", // 帶領人需求數
        people_num: "", // 活動人數
        min_num: "", // 開團最低人數
        desc: "", // 遊程介紹
        notice: "", // 注意事項
        contact_person: "", // 聯絡人
        contact_phone: "", // 聯絡人手機
        contact_email: "", // 聯絡人email
        total_hour: "", //
        total_price: "", //
        service_list: [
          // 服務類型設定
          // {name:1,picked_time:3}  //example
        ],
        approval_suggestion: "", // 簽核意見
        approval_ststus: "", // 下個簽核流程
      },
      // 服務類型表格
      tableColumns: [
        {
          name: "name",
          label: "服務類型設定",
          field: "name",
          align: "center",
        },
        {
          name: "picked_time",
          label: "時間",
          field: "picked_time",
          align: "center",
        },
      ],
      serviceItem: {
        name: "", // 服務類型名(以id 表示)
        picked_time: "", // 時間段(以id 表示)
      },

      tableApprovalColumns: [
        // 審核流程表格 =>要對應db
        {
          name: "id",
          label: "序號",
          field: "id",
          align: "center",
        },
        {
          name: "type",
          label: "種類",
          field: "type",
          align: "center",
        },
        {
          name: "applicant_info", // 申請人資訊
          label: "姓名/職務/部門",
          field: "name",
          align: "center",
        },
        {
          name: "applied_date", // 對應 db 申請時間
          label: "處理時間",
          field: "applied_date",
          align: "center",
        },
        {
          name: "approval_result",
          label: "審核結果",
          field: "approval_result",
          align: "center",
        },
        {
          name: "approval_suggestion",
          label: "審核意見",
          field: "approval_suggestion",
          align: "center",
        },
      ],
      tableApprovalData: [
        {
          id: "1",
          type: "遊程上架申請",
          applicant_info: "白晶晶,財政局支付科_承辦人,財政局支付科",
          applied_date: "2019-12-25",
          approval_result: "退回",
          approval_suggestion:
            "資訊不完全，行程排太滿，價格過高，請重新訂價再送審。資訊不完全，行程排太滿，價格過高，請重新訂價再送審。",
        },
        {
          id: "2",
          type: "遊程上架申請",
          applicant_info: "林泰山,財政局秘書室_承辦人,財政局秘書室",
          applied_date: "2021-02-25",
          approval_result: "通過",
          approval_suggestion: "經審核後，符合規定，故該游程給予通過。",
        },
      ],
    };
  },
  filters: {
    transServiceName(val) {
      return typeOptions.find((item) => item.value == val).label;
    },
    transPickedTimeName(val) {
      return asistancetimeOptions.find((item) => item.value == val).label;
    },
  },
  created() {
    this.id_data = this.data.find((item) => item.id == this.$route.query.id);
  },
  // 計算屬性
  computed: {},

  // 組件方法
  methods: {
    reset(type) {
      switch (type) {
        case "service":
          this.serviceItem = {
            name: "", // 服務類型名
            picked_time: "", // 時間段
          };
          break;
        case "all":
          this.id_data = {
            tour_image: "", // 活動圖片
            name: "", // 活動名稱
            location: "", // 活動地點
            started_date: "", // 活動日期
            leader_num: "", // 帶領人需求數
            people_num: "", // 活動人數
            min_num: "", // 開團最低人數
            desc: "", // 遊程介紹
            notice: "", // 注意事項
            contact_person: "", // 聯絡人
            contact_phone: "", // 聯絡人手機
            contact_email: "", // 聯絡人email
            total_hour: "", //
            total_price: "", //
            service_list: [
              // 服務類型設定
              // { service_id: "", asistancetime_id: "" },
            ],
            approval_suggestion: "", // 簽核意見
            approval_ststus: "", // 下個簽核流程
          };
          break;
      }
    },
    addRow(item, type) {
      if (type === "service") {
        if (this.serviceItem.name == "" || this.serviceItem.picked_time == "") {
          // 驗證
          return this.$q.notify({
            message: `服務類型資訊未填寫完整!`,
            timeout: 1500,
            type: "warning",
            position: "top-right",
          });
        }
        this.id_data.service_list.push(item);
        this.reset((type = "service"));
      }
    },
    delRow(idx, type) {
      if (type === "service") {
        this.id_data.service_list.splice(idx, 1);
      }
    },
    onSubmit() {
      // 送審
    },
    onSave() {
      //保存
    },
    useTemplate() {
      //套用
      this.showLoading(`選擇id為${e}的範本`);
    },
    onClick(e, editor) {
      console.log("Element clicked");
      console.log(e);
      console.log(editor);
    },
  },
};
</script>
<style lang="scss" scoped></style>
