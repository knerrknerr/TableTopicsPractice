<template>
    <v-container>
        <v-card class="mt-15 card">
            <v-card-title primary-title class="justify-center" style="word-break: break-word">
                <span class="text-center text-xl-h4 text-lg-h4 text-md-h4 text-sm-h6 text-xs-h6">
                    Timing Report
                </span>
            </v-card-title>
            <v-card-text class="text-center">
                <div class="text-xl-h5 text-lg-h5 text-md-h5 text-sm-body-1 text-xs-body-1">
                    You spoke for 
                    <span v-if="formattedTimeElapsed[0] == 1">
                        {{ formattedTimeElapsed[0] }} minute 
                    </span>
                    <span v-if="formattedTimeElapsed[0] > 1">
                        {{ formattedTimeElapsed[0] }} minutes 
                    </span>
                    <span v-if="formattedTimeElapsed[0] >= 1">
                        and
                    </span> 
                    <span v-if="formattedTimeElapsed[1] == 1">
                        {{ formattedTimeElapsed[1] }} second.
                    </span>
                    <span v-else>
                        {{ formattedTimeElapsed[1] }} seconds.
                    </span> 
                    <br>                   
                    <span v-if="underTime">
                        You were under your minimum time by 
                        <span v-if="formattedTimeDifference[0] == 1">
                            {{ formattedTimeDifference[0] }} minute 
                        </span>
                        <span v-if="formattedTimeDifference[0] > 1">
                            {{ formattedTimeDifference[0] }} minutes 
                        </span>
                        <span v-if="formattedTimeDifference[0] >= 1">
                            and
                        </span> 
                        <span v-if="formattedTimeDifference[1] == 1">
                            {{ formattedTimeDifference[1] }} second.
                        </span>
                        <span v-else>
                            {{ formattedTimeDifference[1] }} seconds.
                        </span>
                    </span>
                    <span v-if="!overTime && !underTime">
                        You were within time.
                    </span>
                    <span v-if="overTime">
                        You were over your maximum time by 
                        <span v-if="formattedTimeDifference[0] == 1">
                            {{ formattedTimeDifference[0] }} minute 
                        </span>
                        <span v-if="formattedTimeDifference[0] > 1">
                            {{ formattedTimeDifference[0] }} minutes 
                        </span>
                        <span v-if="formattedTimeDifference[0] >= 1">
                            and
                        </span> 
                        <span v-if="formattedTimeDifference[1] == 1">
                            {{ formattedTimeDifference[1] }} second.
                        </span>
                        <span v-else>
                            {{ formattedTimeDifference[1] }} seconds.
                        </span>
                    </span>
                </div>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn :large="$vuetify.breakpoint.mdAndUp" :medium="$vuetify.breakpoint.smAndDown" color="primary" class="mb-2" v-on:click="getTopic">
                    Get New Topic
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
        name: 'ShowTopic',
        data() {
            return {
                topics: topics.topics,
                minTime: 0,
                maxTime: 0,
                medTime: 0,
                timeDifference: 0,
                underTime: false,
                overTime: false,
            };
        },
        props: {
            timeElapsed: {
                type: Number,
                default: 0,
            }
        },
        computed: {
            formattedTimeElapsed() {
                // format time from seconds to minutes and seconds
                const timeElapsed = this.timeElapsed;
                const minutes = Math.floor(timeElapsed / 60);
                let seconds = timeElapsed % 60;
                return [minutes, seconds]
            },
            formattedTimeDifference() {
                // format time from seconds to minutes and seconds
                const timeDifference = this.timeDifference
                const minutes = Math.floor(timeDifference / 60);
                let seconds = timeDifference % 60;

                return [minutes, seconds]
            },
        },
        methods: {
            generateReport() {
                // get user times
                this.minTime = this.$root.minTime;
                this.maxTime = this.$root.maxTime;
                this.medTime = ((this.maxTime - this.minTime) / 2) + this.minTime;

                // check if the time was over or under the time goals and by how much
                if (this.timeElapsed > this.maxTime) {
                    this.overTime = true;
                    this.underTime = false;
                    this.timeDifference = this.timeElapsed - this.maxTime;
                }
                else if (this.timeElapsed < this.minTime) {
                    this.overTime = false;
                    this.underTime = true;
                    this.timeDifference = this.minTime - this.timeElapsed;
                }
                else if (this.timeElapsed >= this.minTime && this.timeElapsed <= this.maxTime) {
                    this.overTime = false;
                    this.underTime = false;
                    this.timeDifference = 0;
                }
            },
            getTopic() {
                // reset variables
                this.timeDifference = 0;
                this.underTime = false;
                this.overTime = false;
                
                // fetch random topic
                let topic = this.topics[Math.floor(Math.random() * this.topics.length)];
                this.$emit('topicFetched', topic);
            },
        },
        created() {
            this.generateReport();
        }
    };
</script>