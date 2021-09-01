<template>
    <v-container>
        <v-row>
            <v-col xl="2" lg="2" md="2" sm="2" xs="1"></v-col>
            <v-col xl="8" lg="8" md="8" sm="8" xs="10">
                <GetTopic 
                    v-if="!topicInProgress && !reportInProgress" 
                    v-on:topicFetched="showTopic"
                ></GetTopic>
                <ShowTopic 
                    v-if="topicInProgress" 
                    v-on:topicComplete="showReport" 
                    v-on:topicFetched="showTopic"
                    :topic="topic"
                ></ShowTopic>
                <ReportTime 
                    v-if="reportInProgress"
                    v-on:topicFetched="showTopic"
                    :timeElapsed="timeElapsed">
                </ReportTime>
            </v-col>
            <v-col xl="2" lg="2" md="2" sm="2" xs="1"></v-col>
        </v-row>
    </v-container>
</template>

<script>
    import GetTopic from '@/components/GetTopic.vue'
    import ShowTopic from '@/components/ShowTopic.vue'
    import ReportTime from '@/components/ReportTime.vue'

    export default {
        name: 'Home',
        components: {
            GetTopic,
            ShowTopic,
            ReportTime
        },
        data() {
            return {
                topic: "",
                timeElapsed: 0,
                topicInProgress: false,
                reportInProgress: false
            };
        },
        methods: {
            showTopic(topic) {
                // show topic when generate button is clicked
                this.topic = topic;
                this.reportInProgress = false;
                this.topicInProgress = true;
            },
            showReport(timeElapsed) {
                // show report upon topic completion
                this.timeElapsed = timeElapsed;
                this.topicInProgress = false;
                this.reportInProgress = true;
            },
        },
    };
</script>