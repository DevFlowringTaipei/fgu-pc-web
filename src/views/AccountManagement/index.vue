<template>
  <div class="">
    <q-btn v-if="$route.name=='PageDetail'" icon="chevron_left" label='返回查詢頁' @click="goBack"></q-btn>
    <q-tabs
      v-else
      v-model="tab"
      dense
      align="left"
      active-color="primary"
      class="text-grey shadow-2"
      :breakpoint="0"
      @input="changeTab"
    >
      <q-tab name="SettingAccount" label="個人設定" />
      <q-tab name="MatchList" label="查詢曾經媒合遊程和專才" />
    </q-tabs>

    <q-separator v-if="$route.name!='PageDetail'" />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel :name="tab">
        <router-view></router-view>
      </q-tab-panel>
    </q-tab-panels> 
  </div>
</template>

<script>
import Mixin from '@/utils/mixin'
export default {
  mixins:[Mixin],
  data() {
    return {
      tab:this.$route.name
    };
  },
  methods: {
    changeTab(e) {
      this.$router.push({
        name: e,
      });
    },
  },
};
</script>

<style></style>
