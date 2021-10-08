<template>
  <div :class="$q.screen.lt.sm ? 'q-pa-xs' : 'q-pa-md'" style="">
    <div class="row search-box" v-for="(item, index) in data.data" :key="index">
      <q-card
        class=" q-mb-sm"
        :class="$q.screen.lt.sm ? 'col-12' : 'col-9'"
        style="padding:0px;"
        flat
        bordered
      >
        <q-card-section
          :horizontal="$q.screen.lt.sm ? false : true"
          class=""
          style="height:100%;padding:0px;"
        >
          <q-img
            class="rounded-borders "
            style=""
            :style="$q.screen.lt.sm ? 'max-width:100%' : 'max-width:40%'"
            :src="item.tour_image"
          >
            <div
              v-if="$q.screen.lt.sm"
              class="text-subtitle2 absolute-bottom text-center"
            >
              審核狀況
              <q-btn
                v-if="item.status == '通過'"
                rounded 
                color="primary"
                text-color="white"
                icon-right="touch_app"
                @click="goTo('TourDetail', item.id)"
                >{{ item.status }}</q-btn
              >
              <q-btn
                v-if="item.status == '審核中'"
                rounded 
                color="info"
                text-color="white"
                icon-right="touch_app"
                @click="goTo('TourDetail', item.id)"
                >{{ item.status }}</q-btn
              >
              <q-btn
                v-if="item.status == '退回'"
                rounded
                color="negative"
                text-color="white"
                icon-right="touch_app"
                @click="goTo('TourDetail', item.id)"
                >{{ item.status }}</q-btn
              >

            </div>
          </q-img>

          <q-card-section
            class=""
            style="flex:1;"
            :style="$q.screen.lt.sm ? 'padding-bottom:0px' : ''"
          >
            <div class="">
              <span class="text-h6">{{ item.name }}</span>
            </div>
            <div class="">
              <q-chip
                v-for="t in item.service_list"
                :key="t.id"
                outline
                size="sm"
                square
                color="deep-orange"
                text-color="white"
              >
                {{ t.name }}
              </q-chip>
            </div>
            <div class="q-mt-sm">
              <div :class="$q.screen.lt.sm ? 'q-mb-xs' : 'q-mb-sm'">
                <q-icon
                  name="date_range"
                  class="text-info"
                  style="font-size:30px;margin-right:4px;margin-bottom:4px;"
                />
                <span class="" style="margin:auto 4px;font-size:16px;">{{
                  item.started_date
                }}</span>
                <q-icon
                  name="location_on"
                  class="text-info"
                  style="font-size:30px;margin-right:4px;margin-bottom:4px;"
                />
                <span class="" style="margin:auto 4px;font-size:16px;">{{
                  item.location
                }}</span>
              </div>
              <div
                :class="$q.screen.lt.sm ? 'q-mb-xs' : 'q-mb-sm'"
                style="display:flex;"
              >
                <q-icon
                  name="person_outline"
                  class="text-info"
                  style="font-size:30px;margin-right:4px;margin-bottom:0px;"
                />
                <div class="" style="display:flex;flex-direction:column;">
                  <span class="" style="margin:auto 4px;font-size:16px;"
                    >{{ item.people_num }} 人參加</span
                  >
                  <span class="" style="margin:auto 4px;font-size:16px;"
                    >最低成行人數: {{ item.min_num }}人</span
                  >
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card-section>

        <!-- <q-separator /> -->
      </q-card>
      <div
        v-if="!$q.screen.lt.sm"
        class="col-3 "
        style="display:flex;justify-content:space-evenly;align-items:center;flex-direction:column;"
      >
        <div
          class=" "
          style="display:flex;justify-content:center;align-items:center;"
        >
          <span class="text-h6">審核狀態</span>

          <q-chip
            v-if="item.status == '通過'"
            color="primary"
            text-color="white"
            size="md"
          >
            {{ item.status }}
          </q-chip>
          <q-chip
            v-else-if="item.status == '審核中'"
            color="info"
            text-color="white"
            size="md"
          >
            {{ item.status }}
          </q-chip>
          <q-chip
            v-else-if="item.status == '退回'"
            color="negative"
            text-color="white"
            size="lg"
          >
            {{ item.status }}
          </q-chip>
        </div>
        <q-btn
          outline
          color="info"
          label="遊程詳情"
          @click="goTo('TourDetail', item.id)"
          style="width:90%;"
        />
      </div>
    </div>
    <!-- 彈窗 -->

    <!-- Pagination -->
    <div class="row col-12 q-mt-xs">
      <div
        class="col-12 col-md-6"
        style="display:flex;min-height:40px;align-items:center;padding-right:20px;"
        :style="
          $q.screen.lt.sm
            ? 'justify-content:center;'
            : 'justify-content:flex-end;'
        "
      >
        <span
          class="font-s-size "
          style="margin-right:2px;font-size: 13.2px;width:60px;"
        >
          每頁筆數:
        </span>

        <q-select
          v-model="page.pageSize"
          behavior="menu"
          :outlined="false"
          dense
          emit-value
          map-options
          :options="rowOptions"
          option-label="label"
          option-value="value"
          size="xs"
          style="margin-right:4px;"
        >
        </q-select>
      </div>
      <com-pagination
        class="col-12 col-md-6 "
        style="align-items:center;margin-right:0px;"
        :style="$q.screen.lt.sm ? 'justify-content:center;' : ''"
        v-model="page.currentPage"
        :rows-per-page="page.pageSize"
        :total-num="page.totalNum"
        @input="changeCurrentPage"
      ></com-pagination>
    </div>
  </div>
</template>
<script>
import ComPagination from "@/components/Common/form/ComPagination";
import { rowOptions } from "@/utils/common/dropdown-list.js";
import Mixin from "@/utils/mixin";

export default {
  mixins: [Mixin],
  // 局部注冊的組件
  components: { ComPagination },
  data() {
    return {
      rowOptions,
      page: {
        pageSize: 20,
        currentPage: 1,
        totalNum: 110,
      },
      data: {
        type: null,
        totalNum: null, //總筆數

        data: [
          {
            id: 1,
            tour_image: "https://cdn.quasar.dev/img/parallax1.jpg",
            name: "這是遊程主題1(This is title 1)",
            service_list: [
              {
                id: 1,
                name: "帆船",
              },
              {
                id: 2,
                name: "打靶",
              },
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
            total_price: "3999", //

            status: "通過",
          },
          {
            id: 2,
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
            price: 1999,
            status: "審核中",
          },
          {
            id: 3,
            tour_image: "https://cdn.quasar.dev/img/parallax1.jpg",
            name: "這是遊程主題3(This is title 3)",
            service_list: [
              {
                id: 1,
                name: "帆船",
              },
              {
                id: 4,
                name: "油畫",
              },
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
            price: 1599,
            status: "退回",
          },
          {
            id: 4,
            tour_image: "https://cdn.quasar.dev/img/parallax1.jpg",
            name: "這是遊程主題4(This is title 4)",
            service_list: [
              {
                id: 5,
                name: "登山",
              },
            ],

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
            price: 1799,
            status: "退回",
          },
          {
            id: 5,
            tour_image: "https://cdn.quasar.dev/img/parallax2.jpg",
            name: "這是遊程主題5(This is title 5)",
            service_list: [
              {
                id: 6,
                name: "露營",
              },
            ],

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
            price: 999,
            status: "通過",
          },
          {
            id: 6,
            tour_image: "https://cdn.quasar.dev/img/parallax1.jpg",
            name: "這是遊程主題6(This is title 6)",
            service_list: [
              {
                id: 7,
                name: "採茶",
              },
              {
                id: 8,
                name: "拉坏",
              },
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
            price: 4999,
            status: "審核中",
          },
        ],
      },
    };
  },
  created() {},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
    changeCurrentPage(e) {
      // 重新call api
      console.log("changeCurrentPage=>", e);
    },

    buttonProps({ href, route }) {
      const props = {
        color: "black",
        noCaps: true,
        label: `查看詳情`,
        outline: true,
        to: href,
      };

      return props;
    },
  },
};
</script>
<style lang="scss" scoped>
.image-avatar {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto 8px;
}
.info-content {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
