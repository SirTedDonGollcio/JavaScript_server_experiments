const NetflixLista = Vue.component('netflix-lista', {
    data: function () {
        return { netflix: null}
    },
    template: 
    `<div id="netflix-lista">
        <table style="width:100%">
          <tr>
            <th>Show Id</th>
            <th>Type</th> 
            <th>Title</th>
            <th>Director</th>
            <th>Cast</th>
            <th>Country</th>
            <th>Date added</th>
            <th>Release year</th>
            <th>Rating</th>
            <th>Duration</th>
            <th>Listed in</th>
            <th>Description</th>
            <th>Id</th>
            <th>Delete?</th>
          </tr>
          <tr v-for="record in netflix"> <td>{{record.show_id}}</td> <td>{{record.type}}</td> <td>{{record.title}}</td> <td>{{record.director}}</td> <td>{{record.cast}}</td> <td>{{record.country}}</td> <td>{{record.date_added}}</td> <td>{{record.release_year}}</td> <td>{{record.rating}}</td> <td>{{record.duration}}</td> <td>{{record.listed_in}}</td> <td>{{record.description}}</td> <td>(id: {{record._id}})</td> <td><button class="btn btn-xs btn-danger" @click="deleteEvent(event)">Delete</button></td>
          </tr>
        </table>
    
    </div>`,
    created: function() {
      axios.get("/webresources/netflix").then((response) => {
        const data = response.data;
        console.log(data);
        this.netflix = data;
      }).catch(error => {
        alert("Error: " + error)
      });
    }
  })
  