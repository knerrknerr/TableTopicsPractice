<template>
    <v-container>
        <v-card class="mt-15 card">
            <v-card-title primary-title class="justify-center" style="word-break: break-word">
                <span class="text-center text-xl-h4 text-lg-h4 text-md-h4 text-sm-h6 text-xs-h6">
                    Table Topics Practice
                </span>
            </v-card-title>
            <v-card-subtitle class="text-center">
                <span class="text-body-1">
                    Click the button below to get a random table topic!
                </span>
            </v-card-subtitle>
            <v-card-actions class="justify-center">
                <v-btn :large="$vuetify.breakpoint.kgAndUp" :medium="$vuetify.breakpoint.smAndDown" color="primary" class="mb-2" v-on:click="getTopic">
                    Get Random Topic
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<style>
    .card {
        transform: scale(1.5);
        transform-origin: center;
    }
</style>

<script>
    import topics from '@/assets/topics.json'

    export default {
        name: 'GetTopic',
        data() {
            return {
                topics: topics.topics
            };
        },
        methods: {
            getTopic() {
                // fetch random topic
                let topic = this.topics[Math.floor(Math.random() * this.topics.length)];
                this.$emit('topicFetched', topic);
            },
        },
    };
</script>