const NetflixDelete = Vue.component('netflix-delete', {
    template: `
<div class="list-group">

        <div class="list-group-item" v-for="event in netflix">
            <h4 class="list-group-item-heading">
                {{ event.title }}
            </h4>

            <h5>
                {{ event.show_id }}
            </h5>

            <p class="list-group-item-text" v-if="event.description">{{ event.description }}</p>

            <button class="btn btn-xs btn-danger" @click="deleteEvent(event)">Delete</button>
        </div>

    </div>
</div>` ,
    data: function() {
        return { netflix: null}
    },
    methods: {
        deleteEvent: function(event) {
          this.events.splice(this.events.indexOf(event), 1);
        }
    }
})
 