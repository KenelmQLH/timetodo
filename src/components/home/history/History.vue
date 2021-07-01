<template>
    <div>
        历史清单
    </div>
</template>

<style>

</style>

<script>
  export default {
    data(){
        return {
        }
    },
    created(){
        console.log('created history!',this.calendarRange);
    },
    mounted(){
        console.log('mount history!',this.calendarRange);
    },
    methods: {
    }
  }
</script>
