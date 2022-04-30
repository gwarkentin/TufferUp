
<script>
export default {
    data() {
        return {
            image: null 
        }
    },
  //these are public variables that parents can v-bind to
    props: {
        'id': String,
    },
    mounted() {
        this.getImagesById()
    },
    methods: {
    getImagesById: function() {
        if (this.id) {
            this.axios({
                method:'get', 
                url:'/api/image/get/' + this.id
            })
            .then((res)=>{
                if(res.data.error) { console.log(res.data.error)}
                else {
                    this.image = res.data.image
                }
            })
        }
    },
  }
}
</script>
<template>
    <template v-if="!image">
        <img class="card-img-bottom bg-secondary">
    </template>
    <template v-else-if="image"  >
        <img :src="image" :id='id' class="card-img-bottom" alt="picture of ">
    </template>
</template>