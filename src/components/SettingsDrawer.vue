<template>
    <v-navigation-drawer absolute left temporary class="blue-grey darken-3" v-bind:value="value" v-on:input="changeSettings(); $emit('input', $event)">
        <v-list-item class="mt-4">
            <span class="text-h4 white--text">
                Settings
            </span>
            <v-spacer></v-spacer>
            <v-btn x-large icon aria-label="back" v-on:click="changeSettings(); $emit('input', false)">
                <v-icon color="white">mdi-chevron-left</v-icon>
            </v-btn>
        </v-list-item>
        <v-divider class="mt-4 mb-4 mr-4 ml-4"></v-divider>
        <v-row class="mt-4 mb-0">
            <v-col cols="12" class="pt-0 pb-0">
                <span class="text-h5 ml-4 white--text">
                    Minimum Time:
                </span>
            </v-col>
        </v-row>
        <v-row class="mt-2 mb-0">
            <v-col cols="5" class="pt-0 pb-0">
                <span class="text-h3 ml-4 white--text">
                    {{formattedMinTime}}
                </span>
            </v-col>
            <v-col cols="2">
                <v-btn icon aria-label="increase min time" v-on:click="increaseMinTime">
                    <v-icon color="white">mdi-plus</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="2">
                <v-btn icon aria-label="decrease min time" v-on:click="decreaseMinTime">
                    <v-icon color="white">mdi-minus</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="3"></v-col>
        </v-row>
        <v-row class="mt-4 mb-0">
            <v-col cols="12" class="pt-0 pb-0">
                <span class="text-h5 ml-4 white--text">
                    Maximum Time:
                </span>
            </v-col>
        </v-row>
        <v-row class="mt-2 mb-0">
            <v-col cols="5" class="pt-0 pb-0">
                <span class="text-h3 ml-4 white--text">
                    {{formattedMaxTime}}
                </span>
            </v-col>
            <v-col cols="2">
                <v-btn icon aria-label="increase max time" v-on:click="increaseMaxTime">
                    <v-icon color="white">mdi-plus</v-icon>
                </v-btn>
            </v-col>
                <v-col cols="2">
                <v-btn icon aria-label="decrease max time" v-on:click="decreaseMaxTime">
                    <v-icon color="white">mdi-minus</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="3"></v-col>
        </v-row>
        <v-row class="mt-2 mb-0">
            <v-col cols="8" class="pt-4 pb-0">
                <span class="text-h5 ml-4 white--text">
                    Display Time:
                </span>
            </v-col>
            <v-col cols="4" class="pl-0 pt-0 pb-0">
                <v-switch inset aria-label="toggle time display" color="white" v-model="displayTimes"></v-switch>
            </v-col>
        </v-row>
    </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'SettingsDrawer',
    data() {
        return {
            minTime: 60,
            maxTime: 120,
            displayTimes: false,
        };
    },
    props: {
        value:  {
            type: Boolean,
            default: false
        }
    },
    computed: {
        formattedMinTime() {
            // format time from seconds to minutes and seconds
            const minTime = this.minTime
            const minutes = Math.floor(minTime / 60);
            let seconds = minTime % 60;
            if (seconds < 10) {
                seconds = `0${seconds}`;
            }
            return `${minutes}:${seconds}`
        },
        formattedMaxTime() {
            // format time from seconds to minutes and seconds
            const maxTime = this.maxTime
            const minutes = Math.floor(maxTime / 60);
            let seconds = maxTime % 60;
            if (seconds < 10) {
                seconds = `0${seconds}`;
            }
            return `${minutes}:${seconds}`
        },
    },
    methods: {
      increaseMinTime() {
        // increment min time by 30 seconds
        if (this.minTime < this.maxTime && this.minTime < 3570) {
          this.minTime += 30
        }
      },
      decreaseMinTime() {
        // decrement min time by 30 seconds
        if (this.minTime > 30) {
          this.minTime -= 30
        }
      },
      increaseMaxTime() {
        // increment max time by 30 seconds
        if (this.maxTime < 3570) {
          this.maxTime += 30
        }
      },
      decreaseMaxTime() {
        // decrement max time by 30 seconds
        if (this.maxTime > this.minTime && this.maxTime > 30) {
          this.maxTime -= 30
        }
      },
      changeSettings() {
        this.$emit('settingsChanged', {
            minTime: this.minTime, 
            maxTime: this.maxTime, 
            displayTimes: this.displayTimes
        });
      },
    }
  };
</script>
