<template>
    <div class="deadlineMain">
        <p class="subPageHeader">重要清单</p>
        <div class="deadline-dateSelector-wrapper">
            <span>截止日期</span>
            <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                class="deadline-dateSelector">
            </el-date-picker>
        </div>
        

        <div class="deadlineUnFinishedList">
            <div class="itemUnFinished" v-for="(item, index) in todayListUnFinished" v-bind:key="index + item.title">
                <i @click="finishItem(index)" class="iconfont icon-classradiocircle list-radiocircle icon-unfinished"></i>
                <div class="list-title">
                    {{item.title}}
                </div>
            </div>
        </div>

        <div class="FinishedListToggler">
            <i v-bind:class="{'el-icon-arrow-down': showFinishedList,'el-icon-arrow-up': !showFinishedList}" class="icon-toggle" @click="ToggleFinishedList"></i>
            <span>已结束（{{todayListFinished.length+''}}）</span>
        </div>
        <div v-show="showFinishedList" class="deadlineFinishedList">
            <div class="itemFinished" v-for="(item, index) in todayListFinished" v-bind:key="index + item.title">
                <i @click="unfinishItem(index)" class="iconfont icon-classradioyes list-radioyes icon-finished"></i>
                <div class="list-title">
                    {{item.title}}
                </div>
                <div class="list-date">
                    <i class="iconfont icon-classdate icon-date"></i>
                    <span>06-07</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .subPageHeader{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight:bolder;
        padding-top:10px; 
    }
    .deadlineUnFinishedList, .deadlineFinishedList{
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
    .list-date{
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
    .el-date-picker{
        width:90vw !important;
    }
    .el-popper{
        left:10px !important;
    }
    .el-picker-panel__content{
        margin:auto !important;
    }
    .deadline-dateSelector-wrapper{
        padding: 0px 20px;
        margin:10px 0px;
    }
    .deadline-dateSelector{
        margin-left:10px;
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
                    title:"背单词"
                },
                {
                    title:"健身"
                },
                {
                    title:"前端学习"
                }
            ],
            todayListFinished:[
                {
                    title:"数据处理"
                }
            ],
            showFinishedList:false,
            pickerOptions: {
                // disabledDate(time) {
                //     return time.getTime() > Date.now();
                // },
                // shortcuts: [{
                //     text: '今天',
                //     onClick(picker) {
                //     picker.$emit('pick', new Date());
                //     }
                // },
                // {
                //     text: '昨天',
                //     onClick(picker) {
                //     const date = new Date();
                //     date.setTime(date.getTime() - 3600 * 1000 * 24);
                //     picker.$emit('pick', date);
                //     }
                // },
                // {
                //     text: '一周前',
                //     onClick(picker) {
                //     const date = new Date();
                //     date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                //     picker.$emit('pick', date);
                //     }
                // }]
            },
            value1: '',
            value2: ''
        };
    },
    mounted(){
        console.log('mount in Today!',this.todayListUnFinished);
    },
    methods: {
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
