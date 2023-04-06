<template>
    <div>

    </div>
</template>
<script>
import config from '../config'

export default {
    data()
    {
        return {
            title: '',
            owner: '',
            description: ''
        };
    },
    methods: {
        submitForm()
        {
            this.axios.post(config.API_LIVE_CREATE + '?title=' + this.title + '&description=' + this.description + '&owner=' + this.owner).then((response) =>
            {
                this.$router.push('/')
            })
        }
    }
}
</script>