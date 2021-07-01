<template>
    <div>
        <el-calendar v-model="value" :first-day-of-week="1" :range="calendarRange" id="calendar" >
            <!-- :range="calendarRange" -->
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template
            slot="dateCell"
            slot-scope="{data}">
                <!--自定义内容-->
                <div class="mycalendarCell">
                    <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
                    <div v-for="(item,index) in calendarData" v-bind:key="index">
                        <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
                            <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                                <el-tooltip class="item" effect="dark" :content="item.things" placement="right">
                                    <div class="is-selected"></div>
                                    <!-- {{item.things}} -->
                                </el-tooltip>
                            </div>
                            <div v-else></div>
                        </div>
                        <div v-else></div>
                    </div>
                </div>
            </template>
        </el-calendar>
    </div>
</template>

<style>
    .calendar-day{
        text-align: center;
        color: #202535;
        line-height: 25px;
        font-size: 12px;
    }
    .is-selected{
        color: #F8A535;
        font-size: 10px;
        margin-top: 5px;
        width:100%;
        height:100%;
    }
    #calendar .el-button-group>.el-button:not(:first-child):not(:last-child):after{
        content: '当月';
    }
    #calendar .el-calendar-day{
        box-sizing: content-box;
        height:25px !important;
    }
    .el-calendar{
        width:400px;
        height:400px;
    }
</style>

<script>
  export default {
    data(){
        return {
            calendarData: [
                { months: ['05', '06'],days: ['15'],things: '看电影' },
                { months: ['05', '06'], days: ['02'],things: '去公园野炊' },
                { months: ['06'], days: ['02'],things: '看星星' },
                { months: ['06'], days: ['03'],things: '看月亮' }   
            ],
            value: new Date(),
            today:{
                year: -1,
                month: -1,
                day:-1
            },
            calendarRange:[],

        }
    },
    created(){
        console.log('created history!',this.calendarRange);
        let year =  this.value.getFullYear();
        let month =  this.value.getMonth(); //获取当前月份(0-11,0代表1月)
        this.setRange(year,month);
    },
    mounted(){
        console.log('mount history!',this.calendarRange);
    },
    methods: {
        data2string(date){
            let year =  date.getFullYear();//4位
            let month =  date.getMonth() + 1; //(0-11,0代表1月)
            let day =  date.getDate();//1-31
            let stringDate = "" + year + "-";
            if(month < 10) stringDate += "0";
            stringDate += month + "-";
            if(day < 10) stringDate += "0";
            stringDate += day;
            return stringDate;
        },
        setRange(year,month){
            let monthStart = new Date(year,month,1);
            // this.value = monthStart;
            console.log(' monthStart：',monthStart,year,month);
            let oneDay = 1000 * 60 * 60 * 24;
            let nextMonthFisrt = new Date(year,month+1,1);
            let monthEnd = new Date(nextMonthFisrt - oneDay);
            console.log(monthStart,' ----------month-----------',monthEnd);

            // 以周一为一周的开始
            console.log(monthStart.getDay()," ==== month ==== ",monthEnd.getDay())
            let calendarStart = monthStart.getDay() == 0 ? monthStart : new Date(monthStart - (monthStart.getDay() - 1)*oneDay); 
            let calendarEnd =  monthEnd.getDay() == 0 ? monthEnd : new Date(monthEnd - (monthEnd.getDay() - 7)*oneDay);
            
            console.log("fuck 0? = ",calendarStart,"fuck 1? = ",calendarEnd);
            console.log(calendarStart,' ----- calendar ------',calendarEnd);
            this.calendarRange.push(this.data2string(calendarStart));
            // 由于element-ui组件本身的问题，某些范围无法正确显示：
            // 如：非7天的整数倍、超过一个月的范围等情况
            this.calendarRange.push(this.data2string(calendarEnd)); 
            // this.calendarRange.push('2021-06-07');
            // this.calendarRange.push('2021-06-27');
            console.log(this.calendarRange)
        }
    }
  }
</script>
