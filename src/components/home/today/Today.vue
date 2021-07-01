<template>
    <div class="todayMain">
        <p class="subPageHeader">今日任务({{todayString}})</p>
        <div class="btnAddList" @click="showNewDialog">
            <span class="iconfont icon-classaddlist btnAddList-icon"></span>
            <span class="btnAddList-text">添加任务</span>
        </div>
        <!-- 添加任务弹出框 -->
        <el-dialog title="新建任务" :visible.sync="dialogNewFormVisible" width="90%">
            <el-form :model="newform">
                <el-form-item label="任务名称" :label-width="formLabelWidth">
                    <el-input v-model="newform.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务备注" :label-width="formLabelWidth">
                    <el-input v-model="newform.notes" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hideNewDialog">取 消</el-button>
                <el-button type="primary" @click="addList">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 未完成的清单 -->
        <div class="todayUnFinishedList">
            <div class="itemUnFinished" v-for="(item, index) in todayListUnFinished" v-bind:key="index + item.title">
                <i @click="finishItem(index)" class="iconfont icon-classradiocircle list-radiocircle icon-unfinished"></i>
                <div class="list-title">
                    {{item.title}}
                </div>
                <div class="list-title" v-show="false">
                    {{item.notes}}
                </div>
                <div class="list-info" @click="showEditDialog(item)">
                    <i class="iconfont icon-classedit icon-edit"></i>
                    <!-- <span>06-07</span> -->
                    <!-- <i class="iconfont icon-classdate icon-delete"></i> -->
                </div>
            </div>
        </div>
        <!-- 编辑任务弹出框 -->
        <el-dialog title="编辑任务" :visible.sync="dialogEditFormVisible" width="90%">
            <el-form :model="editform">
                <el-form-item label="任务名称" :label-width="formLabelWidth">
                    <el-input v-model="editform.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务备注" :label-width="formLabelWidth">
                    <el-input v-model="editform.notes" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hideEditDialog">取 消</el-button>
                <el-button type="primary" @click="editList">确 定</el-button>
            </div>
        </el-dialog>

        <div class="FinishedListToggler">
            <i v-bind:class="{'el-icon-arrow-down': showFinishedList,'el-icon-arrow-up': !showFinishedList}" class="icon-toggle" @click="ToggleFinishedList"></i>
            <span>已完成（{{todayListFinished.length+''}}）</span>
        </div>
        <div v-show="showFinishedList" class="todayFinishedList">
            <div class="itemFinished" v-for="(item, index) in todayListFinished" v-bind:key="index + item.title">
                <i @click="unfinishItem(index)" class="iconfont icon-classradioyes list-radioyes icon-finished"></i>
                <div class="list-title">
                    {{item.title}}
                </div>
                <div class="list-info">
                    <i class="iconfont icon-classdate icon-date"></i>
                    <span>06-07</span>
                    <!-- <i class="iconfont icon-classdate icon-delete"></i> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .subPageHeader{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight:bold;
        padding-top:10px; 
    }
    .todayUnFinishedList, .todayFinishedList{
        width:100%;
        padding:0px 10px;
    }
    .itemUnFinished,.itemFinished{
        display: flex;
        align-items: center;
        position: relative;
        /* width:100%; */
        padding:5px 10px;
        margin:10px 0px;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0px 0px 1px #e0cccc;
    }
    .list-title{
        margin-left: 10px;
        font-size:12px;
        font-weight: bold;
    }
    .list-info{
        position: absolute;
        right:10px;
        display: flex;
        align-items: center;
    }
    
    .icon-unfinished{
        font-size: 16px;
        color: #DB4C3F;
    }
    .icon-finished{
        font-size: 16px;
        color: #E1E1E1;
    }
    .icon-date{
        margin-right:5px;
        font-size: 20px;
        color: #f0685c;
    }
    .icon-edit{
        margin-right:5px;
        font-size: 20px;
        /* color: #f0685c; */
    }

    .FinishedListToggler{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height:35px;
        font-size:16px;
        background-color: #ffe5e3;
        color: #c4372b;
    }
    .icon-toggle{
        font-size: 16px;
        font-weight:bold;
        height:35px;
        line-height: 35px;;
        padding:0px 10px;
        /* border-radius: 50%; */
        /* background-color: #f8867c; */
        /* box-shadow: 0 0 -5px #b62d21; */
    }
    .FinishedListToggler span{
        height:35px;
        line-height: 35px;;
        font-size:14px;
        padding: 0px;
        text-align:start;
    }

    /* ---------------------------------------------- */
    .btnAddList{
        display: flex;
        justify-content: flex-end;
        color: #DB4C3F;
        margin:10px 20px;
        line-height: 20px;
        height:20px;
    }
    .btnAddList .btnAddList-icon{
        font-size:14px;
    }
    .btnAddList .btnAddList-text{
        padding-left:5px;
        font-size:12px;
    }

</style>

<script>
  export default {
    data() {
        return {
            isCollapse: true,
            ifMobile: false,
            todayListUnFinished:[
                {
                    title:"背单词",
                    notes:''
                },
                {
                    title:"健身",
                    notes:''
                },
                {
                    title:"前端学习",
                    notes:''
                }
            ],
            todayListFinished:[
                {
                    title:"数据处理",
                    notes:''
                }
            ],
            showFinishedList:false,
            today:new Date(),
            todayString:'',
            dialogNewFormVisible: false,
            dialogEditFormVisible:false,
            newform:{
                title:'',
                notes:''
            },
            editform:{
                title:'',
                notes:''
            },
            formLabelWidth: '80px'

        };
    },
    created(){
        console.log('created today!',this.calendarRange);
        this.todayString = this.data2string(this.today,1);
    },
    mounted(){
        console.log('mount in Today!',this.todayListUnFinished);
    },
    methods: {
        /**
         * 
        param:
            date: Date()类型
            flag: 0表示YY-MM-DD,1表示MM-DD,2表示DD
        **/
        data2string(date,flag = 0){
            let year =  date.getFullYear();//4位
            let month =  date.getMonth() + 1; //(0-11,0代表1月)
            let day =  date.getDate();//1-31
            
            let stringDate = "";
            if(flag == 0){
                stringDate += year + "年";
            }
            if(flag == 0 || flag == 1){
                if(month < 10) stringDate += "0";
                stringDate += month + "月";
            }
            if(flag == 0 || flag == 1 || flag == 2){
                if(day < 10) stringDate += "0";
                stringDate += day + '日';
            }
            return stringDate;
        },
        /* -------------------------------- */
        showNewDialog(){
            this.resetNewForm()
            this.dialogNewFormVisible = true;
        },
        hideNewDialog(){
            this.dialogNewFormVisible = false;
        },
        resetNewForm(){
            this.newform.title = '';
            this.newform.notes = '';
        },
        addList(){
            let data = {};
            console.log("[addList] this.newform : ", this.newform);
            for (let k in this.newform) {
                // params.append(k, this.newform[k]);
                data[k] = this.newform[k];
            }
            
            let params = new FormData();     
            params.data = data;
            
            console.log("[addList] params : ", params)

            this.$http.post('addTodayList', params)
            .then(res => {
                console.log("[addList] http res: ",res);
            }).catch(function (err) {
                console.log("[addList] http err: ",err);
            });
            
            // if (res.meta.status !== 200) return this.$message.error('api请求失败!');
            // else{
            //     this.$message.success('api请求成功!');
            //     this.dialogNewFormVisible = false;
            //     this.todayListUnFinished.push({title:this.newform.title});
            // }

            
            // 1. 将登录成功之后的 token,保存到客户端的 sessionStorage(会话机制/只在当前页面生效)中 localStorage(持久话机制/关闭页面也不会忘记数据)
            //   1.1 项目中除了登录之外的API接口,必须在登录之后才能访问
            //   1.2 token 只应在当前网站打开期间生效, 所以将 token 保存在 sessionStorage中
            // window.sessionStorage.setItem('token', res.data.token)
            // 2. 通过编程式路由导航跳转到后台主页,路由地址是 /home
            // this.$router.push('/home')


        },
        /* -------------------------------- */
        showEditDialog(item){
            this.editform.title = item.title;
            this.editform.notes = item.notes;
            console.log("showEditDialog: ",item)
            this.dialogEditFormVisible = true;
        },
        hideEditDialog(){
            this.dialogEditFormVisible = false;
        },
        editList(){
            this.hideEditDialog();
            console.log(this.editform);  
        },
        /* -------------------------------- */
        ToggleFinishedList(){
            this.showFinishedList = !this.showFinishedList;
        },
        finishItem(index){
            console.log('finishItem ',index);
            let item = this.todayListUnFinished[index];
            this.todayListUnFinished.splice(index, 1);
            this.todayListFinished.push(item);
        },
        unfinishItem(index){
            console.log('finishItem ',index);
            let item = this.todayListFinished[index];
            this.todayListFinished.splice(index, 1);
            this.todayListUnFinished.push(item);
        }
        
    }
  }
</script>
