
<script>
export default {
    data() {
        return {
            image: {} 
        }
    },
  //these are public variables that parents can v-bind to
    props: {
        'id': String,
    },
    mounted() {
        this.getUserById()
    },
    methods: {
    getUserById: function() {
        this.axios({
            method:'get', 
            url:'/api/user/get/' + this.id
        })
        .then((res)=>{
            if(res.data.error) { console.log(res.data.error)}
            else {
                this.image = res.data.image
            }
        })
    },
  }
}
</script>
<template>
    <img :src="image" :id='id' class="card-img-bottom" alt="picture of ">
</template>