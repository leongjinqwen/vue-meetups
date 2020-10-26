<template>
    <v-alert error dismissible @input="onClose" dense text type="error">
        {{text}}
    </v-alert>
</template>

<script>
export default {
    props: ['text'],
    methods: {
        onClose(){
            this.$emit('dismissed')
        }
    }
}
</script>