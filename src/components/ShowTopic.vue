<template>
    <v-container>
        <v-card class="mt-15 card" v-bind:color="backgroundColor">
            <v-card-text class="text-center">
                <div>
                    <span class="text-xl-h4 text-lg-h4 text-md-h4 text-sm-h6 text-xs-h6 black--text">
                        {{ topic }}
                    </span>
                </div>
                <div class="mt-5" v-if="displayTimes">
                    <span class="text-xl-h4 text-lg-h4 text-md-h4 text-sm-h6 text-xs-h6 black--text">
                        {{ formattedTimeElapsed }}
                    </span>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-row class="text-center">
                    <v-col xl="2" lg="2" md="2" sm="2" xs="1" :class="{'pt-0': $vuetify.breakpoint.smAndDown, 'pb-1': $vuetify.breakpoint.smAndDown}"></v-col>
                    <v-col xl="8" lg="8" md="8" sm="8" xs="10" :class="{'pt-0': $vuetify.breakpoint.smAndDown, 'pb-1': $vuetify.breakpoint.smAndDown}">
                        <v-btn :large="$vuetify.breakpoint.mdAndUp" :medium="$vuetify.breakpoint.smAndDown" color="green" class="mb-2" v-if="!timerInProgress" v-on:click="startTimer">
                            Start Speaking
                        </v-btn>
                        <v-btn :large="$vuetify.breakpoint.mdAndUp" :medium="$vuetify.breakpoint.smAndDown" color="secondary" class="mb-2" v-if="timerInProgress" v-on:click="stopTimer">
                            Stop Speaking
                        </v-btn>
                    </v-col>
                    <v-col xl="2" lg="2" md="2" sm="2" xs="1" :class="{'pt-0': $vuetify.breakpoint.smAndDown, 'pb-01': $vuetify.breakpoint.smAndDown}">
                        <v-btn icon aria-label="get new topic" v-on:click="getTopic">
                            <v-icon color="secondary">mdi-reload</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
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
                backgroundColor: "white",
                timerInProgress: false,
                displayTimes: false,
                minTime: 0,
                maxTime: 0,
                medTime: 0,
                timeElapsed: 0,
            };
        },
        props: {
            topic: {
                type: String,
                default: ""
            }
        },
        computed: {
            formattedTimeElapsed() {
                // format time from seconds to minutes and seconds
                const timeElapsed = this.timeElapsed
                const minutes = Math.floor(timeElapsed / 60);
                let seconds = timeElapsed % 60;
                if (seconds < 10) {
                    seconds = `0${seconds}`;
                }
                return `${minutes}:${seconds}`
            },
        },
        methods: {
            startTimer() {
                // prepare to start timer
                this.displayTimes = this.$root.displayTimes;
                this.minTime = this.$root.minTime;
                this.maxTime = this.$root.maxTime;
                this.medTime = ((this.maxTime - this.minTime) / 2) + this.minTime;
                this.timeElapsed = 0;
                
                // start timer
                this.timerInProgress = true;
                this.countDownTimer();
            },
            countDownTimer() {
                // as long as the timer is running
                if(this.timerInProgress) {
                    setTimeout(() => {
                        // add one second to timeElapsed per second
                        this.timeElapsed += 1;

                        // when the min time is reached, change the background color to green 
                        if (this.backgroundColor != "green" && this.timeElapsed >= this.minTime && this.timeElapsed < this.medTime) {
                            this.backgroundColor = "green";
                        }
                        // when the med time is reached, change the background color to yellow
                        if (this.backgroundColor != "yellow" && this.timeElapsed >= this.medTime && this.timeElapsed < this.maxTime) {
                            this.backgroundColor = "yellow";
                        }
                        // when the max time is reached, change the background color to red
                        if (this.backgroundColor != "red" && this.timeElapsed >= this.maxTime) {
                            this.backgroundColor = "red";
                        }

                        // call the timer again
                        this.countDownTimer();
                    }, 1000)
                }
            },
            stopTimer() {
                // stop the timer and reset the variables
                this.backgroundColor = "white";
                this.timerInProgress = false;

                // send the elapsed time
                this.$emit('topicComplete', this.timeElapsed)

                // reset the elapsed time
                this.timeElapsed = 0;
            },
            getTopic() {
                // reset variables
                this.backgroundColor = "white";
                this.timerInProgress = false;
                this.displayTimes = false;
                this.timeElapsed = 0;

                // fetch random topic
                let topic = this.topics[Math.floor(Math.random() * this.topics.length)];
                this.$emit('topicFetched', topic);
            },
        },
    };
</script>