<template>
  <div class="q-pa-md" style="">
    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >與此遊程合作的專才共{{ data.talents.length }}位</span
        >
      </div>
      <!-- 人才卡片 -->
      <q-item
        class="rounded-borders col-12 col-sm-4 col-md-4 "
        :class="$q.screen.lt.sm ?'q-mb-xs':'q-ml-xs'"
        style="border:1px solid rgba(0, 0, 0, 0.12);padding-right:8px;"
        v-for="(talent, index) in data.talents"
        :key="index"
      >
        <q-item-section avatar top>
          <q-avatar size="100px" class="image-avatar">
            <img :src="talent.avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section top>
          <q-item-label
            lines="1"
            style="display:flex;flex-direction:column;justify-content:space-between;"
          >
            <span class="" style="margin:auto 4px;">{{ talent.name }}</span>
            <span class="" style="margin:auto 4px;"
              >專長: {{ talent.services.join(",") }}</span
            >
            <span class="" style="margin:auto 4px;"
              >價格: {{ talent.hourly_wage }} 元/小時</span
            >
          </q-item-label>
          <q-item-label caption lines="4" class="">
            <q-chip
              v-for="(t, t_index) in talent.guide_time"
              :key="t_index"
              outline
              size="xs"
              square
              color="deep-orange"
              text-color="white"
            >
              {{ t }}
            </q-chip>
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >{{data.name}}</span
        >
      </div>
    <q-card class="col-12 q-mb-sm" style="padding:0px;" flat bordered>
      <q-card-section
        :horizontal="$q.screen.lt.sm ? false : true"
        
        style="height:100%;padding:0px;"
      >
        <q-img
          class="rounded-borders "
          style=""
          :style="$q.screen.lt.sm ? 'max-width:100%' : 'flex:1;'"
          :src="data.tour_image"
        />

        <q-card-section
          class=""
          style="flex:1;"
          :style="$q.screen.lt.sm ? 'padding-bottom:0px' : ''"
        >
          <div
            :class="$q.screen.lt.sm ? 'q-mb-xs' : 'q-mb-sm'"
            style="display:flex;"
          >
            <q-icon
              name="date_range"
              class="text-info"
              style="font-size:30px;margin-right:4px;margin-bottom:4px;"
            />
            <span class="" style="margin:auto 4px;font-size:16px;">{{
              data.started_date
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
                >{{ data.people_num }} 人參加</span
              >
              <span class="" style="margin:auto 4px;font-size:16px;"
                >最低成行人數: {{ data.min_num }}人</span
              >
            </div>
          </div>
          <div
            :class="$q.screen.lt.sm ? 'q-mb-xs' : 'q-mb-sm'"
            style="display:flex;"
          >
            <q-icon
              name="location_on"
              class="text-info"
              style="font-size:30px;margin-right:4px;margin-bottom:4px;"
            />
            <span class="" style="margin:auto 4px;font-size:16px;">{{
              data.location
            }}</span>
          </div>
        </q-card-section>
        <q-card-section
          class=""
          style="flex:1;"
          :style="$q.screen.lt.sm ? 'padding-top:0px' : ''"
        >
          <div class="q-mb-sm" style="font-size:16px;">
            聯絡人:
            <span
              class=""
              style="font-size:16px;"
              :style="$q.screen.lt.sm ? 'float:right;' : ''"
              >{{ data.contact_person }}</span
            >
          </div>
          <div class="q-mb-sm" style="font-size:16px;">
            聯絡人電話:
            <span
              class=""
              style="font-size:16px;"
              :style="$q.screen.lt.sm ? 'float:right;' : ''"
              >{{ data.contact_phone }}</span
            >
          </div>
          <div class="q-mb-sm" style="font-size:16px;">
            聯絡人電子郵件:
            <span
              class=""
              style="font-size:16px;"
              :style="$q.screen.lt.sm ? 'float:right;' : ''"
              >{{ data.contact_email }}</span
            >
          </div>
          <div class="q-mb-sm" style="font-size:16px;">
            活動時程:
            <span
              class=""
              style="font-size:16px;"
              :style="$q.screen.lt.sm ? 'float:right;' : ''"
              >{{ data.total_hour }}小時</span
            >
          </div>
          <div class="q-mb-sm" style="font-size:16px;">
            活動費用:
            <span
              style="font-size:24px;"
              :style="$q.screen.lt.sm ? 'float:right;' : ''"
              >{{ data.total_price }}元</span
            >
          </div>
        </q-card-section>
      </q-card-section>

      <!-- <q-separator /> -->
    </q-card>

    <div class="row  q-col-gutter-x-sm q-col-gutter-y-sm  q-mb-sm">
      <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >活動游程介紹</span
        >
      </div>
      <div class="col-12" style="overflow:hidden;">
        <p class="" v-html="data.desc"></p>
      </div>
      <div class="col-12 q-mb-sm">
        <span class="text-center" style="font-size:16px;font-weight:bold;"
          >注意事項</span
        >
      </div>
      <div class="col-12">
        <p class="" >{{data.notice}}</p>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  beforeRouteEnter(to, from, next) {
    if (to.query.id !== "0") {
      next();
    } else {
      console.log(from);
      next({ name: "MatchList" });
    }
    //   console.log(to)
    //   console.log(from)
    //   console.log(next)
    // //   return store.fetchSpecial(to.params.slug).then(next)
  },
  // 局部注冊的組件
  components: {},
  data() {
    return {
      datas: [
        {
          id: 1,
          tour_image: "https://cdn.quasar.dev/img/parallax1.jpg",
          name: "這是遊程主題1(This is title 1)",
          talents: [
            {
              name: "劉文聰",
              avatar: "https://cdn.quasar.dev/img/avatar1.jpg",
              services: ["帆船", "打靶"],
              guide_time: [
                "周一 10:00~12:00",
                "周三 10:00~12:00",
                "周五 14:00~16:00",
              ],
              hourly_wage: 2000,
            },
            {
              name: "王美美",
              avatar: "https://cdn.quasar.dev/img/avatar2.jpg",
              services: ["拉坏", "紙傘"],
              guide_time: [
                "周三 10:00~12:00",
                "周三 14:00~16:00",
                "周五 14:00~16:00",
              ],
              hourly_wage: 2000,
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
        },
        {
          id: 2,
          img: "https://cdn.quasar.dev/img/parallax2.jpg",
          name: "這是主題(This is title)2",
          services: ["服務類型1", "服務類型2", "服務類型3"],
          guide_time: [
            "周一 10:00~12:00",
            "周三 10:00~12:00",
            "周五 14:00~16:00",
          ],
          match: ["過去媒合1", "過去媒合2", "過去媒合3"],
          price: 1999,
        },
        {
          id: 3,
          img: "https://cdn.quasar.dev/img/parallax1.jpg",
          name: "這是主題(This is title)3",
          services: [
            "服務類型1",
            "服務類型2",
            "服務類型3",
            "服務類型5",
            "服務類型6",
          ],
          guide_time: [
            "周一 10:00~12:00",
            "周三 10:00~12:00",
            "周五 14:00~16:00",
          ],
          match: ["過去媒合1", "過去媒合2", "過去媒合3"],
          price: 1599,
        },
        {
          id: 4,
          img: "https://cdn.quasar.dev/img/parallax2.jpg",
          name: "這是主題(This is title)4",
          services: ["服務類型1", "服務類型2", "服務類型3"],
          guide_time: [
            "周一 10:00~12:00",
            "周三 10:00~12:00",
            "周五 14:00~16:00",
          ],
          match: ["過去媒合1", "過去媒合2", "過去媒合3"],
          price: 1799,
        },
        {
          id: 5,
          img: "https://cdn.quasar.dev/img/parallax1.jpg",
          name: "這是主題(This is title)5",
          services: ["服務類型1", "服務類型2", "服務類型3"],
          guide_time: [
            "周一 10:00~12:00",
            "周三 10:00~12:00",
            "周五 14:00~16:00",
          ],
          match: ["過去媒合1", "過去媒合2", "過去媒合3"],
          price: 999,
        },
        {
          id: 6,
          img: "https://cdn.quasar.dev/img/parallax2.jpg",
          name: "這是主題(This is title)6",
          services: ["服務類型1", "服務類型2", "服務類型3"],
          guide_time: [
            "周一 10:00~12:00",
            "周三 10:00~12:00",
            "周五 14:00~16:00",
          ],
          match: ["過去媒合1", "過去媒合2", "過去媒合3"],
          price: 4999,
        },
      ],
      data: {
        id: 1,
        tour_image: "https://cdn.quasar.dev/img/parallax1.jpg",
        name: "這是遊程主題1(This is title 1)",
        talents: [
          {
            name: "劉文聰",
            avatar: "https://cdn.quasar.dev/img/avatar1.jpg",
            services: ["帆船", "打靶"],
            guide_time: [
              "周一 10:00~12:00",
              "周三 10:00~12:00",
              "周五 14:00~16:00",
            ],
            hourly_wage: 2000,
          },
          {
            name: "王美美",
            avatar: "https://cdn.quasar.dev/img/avatar2.jpg",
            services: ["拉坏", "紙傘"],
            guide_time: [
              "周三 10:00~12:00",
              "周三 14:00~16:00",
              "周五 14:00~16:00",
            ],
            hourly_wage: 2000,
          },
        ],

        location: "宜蘭礁溪", // 活動地點
        started_date: "2021-12-12", // 活動日期
        leader_num: "2", // 帶領人需求數=> 與媒合老師數量要相同
        people_num: "30", // 活動人數
        min_num: "10", // 開團最低人數
        desc:
          '<p><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2gTrZpxTRgYL8abvbiTrs0gdlHLgYGsLqaw&usqp=CAU" alt="" width="412" height="275" /></p> <p><strong>這是遊程測試</strong></p> <h6>希望各位玩得愉快，我也不知道這些要寫些甚麼。宜蘭就是好山好水不無聊，可以來逛逛夜市吃吃美食，與家人共遊....之類的，非常好，我語塞了。</h6>', // 遊程介紹
        notice:
          "注意事項注意事項注意事項.....注意事項注意事項注意事項注意事項......注意事項注意事項注意事項.....", // 注意事項
        contact_person: "超人", // 聯絡人
        contact_phone: "0912345676", // 聯絡人手機
        contact_email: "superman@gmail.com", // 聯絡人email
        total_hour: "8", //
        total_price: "3999", //
      },
    };
  },
  created() {},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {},
};
</script>
<style lang="scss" scoped></style>
