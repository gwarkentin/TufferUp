
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
        this.getImagesById()
    },
    methods: {
    getImagesById: function() {
        this.axios.get('/image/' + this.id).then((req,res) => {
            if (res.error) {
                console.log(error)
            } 
            this.image = res.data.image
        })
    },
  }
}
</script>
<template>
    <img :img="image" :id='id' class="card-img-bottom" alt="picture of {{ title }}">
</template>