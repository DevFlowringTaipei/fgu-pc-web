<template>
  <div :class="$q.screen.lt.sm? 'q-pa-xs':'q-pa-md'" style="">
    <table-dialog
      ref="myTable"
      :tableColumn="tableColumns"
      :tableData="tableData"
      :opera-show="true"
      rowKey="name"
  
      :show-pagination="false"
      :pagination="page"
    >
      

      <template v-slot:body-opera="{ rowData, rowIndex }">
        <q-btn
          size="xs"
          class="q-mr-sm"
          color="amber"
          label="修改"
          @click="goTo('TourDetail',id=rowData.id)"
        />
        <q-btn
          size="xs"
          color="red"
          label="刪除"
          @click="delRowData(rowData.id, rowIndex)"
        />
      </template>


    </table-dialog>
    <div class="row justify-center q-mt-md ">
      <com-pagination
        class="col-12 justify-center"
        style="align-items:center;margin-right:0px;"
        v-model="page.page"
        :rows-per-page="page.rowsPerPage"
        :total-num="page.totalNum"
        @input="changeCurrentPage"
      ></com-pagination>
    </div>
  </div>
</template>
<script>
import ComForm from "@/components/Common/form/ComForm.vue";
import ComInput from "@/components/Common/form/ComInput.vue";
import TableDialog from "@/components/Common/table/TableDialog.vue";
import ComPagination from "@/components/Common/form/ComPagination";
import Mixin from "@/utils/mixin";
export default {
  mixins: [Mixin],
  // 局部注冊的組件
  components: {ComPagination, TableDialog,ComInput,ComForm},
  data() {
    return {
      page: {
        rowsPerPage: 5,
        page: 1,
        totalNum: 0,
      },

      tableColumns: [
        {
          name: "cid",
          label: "序號",
          field: "cid",
          align: "center",
        },
        {
          name: "name",
          label: "遊程名稱",
          field: "name",
          align: "center",
          
        },
        {
          name: "applicant",
          label: "申請人",
          field: "applicant",
          align: "center",
        },
      ],
      tableData: [
        {
          id: 7,
          cid: 1,
          name: "花蓮一日遊",
          applicant: "王大寶",
        },
        {
          id: 8,
          cid: 2,
          name: "高雄一日遊",
          applicant: "林阿美",
        },
        { id: 9, cid: 3, name: "基隆美食之旅", applicant: "朱曉明" },
      ],
    };
  },
  created() {this.page.totalNum = this.tableData.length;},
  // 計算屬性
  computed: {},
  // 偵聽器
  watch: {},
  // 組件方法
  methods: {
      resetForm() {
      this.dialogForm = {
        id: "",
        name: "",
        status: 0,
        note: "",
      };
    },
    changeCurrentPage(e) {
      
      console.log("changeCurrentPage=>", e);
    },
    openDialog(rowData) {
    //   this.resetForm();
    //   if (rowData.id != 0) {
    //     this.$refs.myTable.openDialog("edit");
    //     this.dialogForm.id = rowData.id;
    //     this.dialogForm.name = rowData.name;
    //     this.dialogForm.status = rowData.status;
    //     this.dialogForm.note = rowData.note;
    //     return;
    //   } else {
    //     this.$refs.myTable.openDialog("add");
    //   }
    },
    delRowData(id, rowIndex) {
    //   this.tableData.splice(rowIndex, 1);
    //   this.page.totalNum = this.tableData.length;
    },
  },
};
</script>
<style lang="scss" scoped></style>
