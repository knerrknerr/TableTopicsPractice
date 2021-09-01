<template>
    <v-navigation-drawer absolute left temporary class="blue-grey darken-3" v-bind:width="350" v-bind:value="value" v-on:input="$emit('input', $event)">
        <v-list-item class="mt-4">
            <span class="text-h4 white--text">
                Help
            </span>
            <v-spacer></v-spacer>
            <v-btn x-large icon aria-label="back" v-on:click="$emit('input', false)">
                <v-icon color="white">mdi-chevron-left</v-icon>
            </v-btn>
        </v-list-item>
        <v-divider class="mt-4 mb-4 mr-4 ml-4"></v-divider>
        <v-list-item>
            <span class="text-body-1 white--text">
                This tool is designed to assist users in practicing impromptu speaking on arbitrary topics. While it was particularly designed with Table Topics in mind, it is not affiliated with Toastmasters International. 
                <br><br>
                Click on the "Get Random Topic" topic button to generate a random topic and the "Start Speaking" button to kick off the timer. The background will become green at the minimum time, yellow halfway between the minimum and maximum time, and red at the maximum time. Once you finish speaking, click the "Stop Speaking" button to receive a report.
                <br><br>
                In order to change the default speaking times, visit the settings panel by clicking on the cog in the top left corner of the page. Increment or decrement the min and max times with the plus and minus buttons. Toggle the "Display Times" switch to determine whether or not the clock is shown as you speak. Click the "Change Settings" button to finalize your changes.
            </span>
        </v-list-item>
    </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'HelpDrawer',
    data() {
        return {
        };
    },
    props: {
        value:  {
            type: Boolean,
            default: false
        }
    },
  };
</script>
