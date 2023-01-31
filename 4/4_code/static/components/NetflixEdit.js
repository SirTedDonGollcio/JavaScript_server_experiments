const NetflixEdit = Vue.component('netflix-edit', {
    template: `
<form id="netflix-edit" @submit.prevent="process()" >    
    <table style="width: 800px;">
        <tr>
            <td style="width: 15%;"><label for="title">Title</label></td>
            <td style="width: 85%;"><input type="text" id="title" name="title" v-model="title"></td>
        </tr>
        <tr>
            <td><label for="show_id">Show Id</label></td>
            <td><input type="number" id="show_id" name="show_id" v-model="show_id"></td>
        </tr>
        <tr>
            <td><label for="type">Type</label></td>
            <td><input type="text" id="type" name="type" v-model="type"></td>
        </tr>
        <tr>
            <td><label for="director">Director</label></td>
            <td><input type="text" id="director" name="director" v-model="director"></td>
        </tr>
        <tr>
            <td><label for="cast">Cast</label></td>
            <td><input type="text" id="cast" name="cast" v-model="cast"></td>
        </tr>
        <tr>
            <td><label for="country">Country</label></td>
            <td><input type="country" id="country" name="country" v-model="country"></td>
        </tr>
        <tr>
            <td><label for="date_added">Date Added</label></td>
            <td><input type="text" id="date_added" name="date_added" v-model="date_added"></td>
        </tr>
        <tr>
            <td><label for="release_year">Release Year</label></td>
            <td><input type="number" id="release_year" name="release_year" v-model="release_year"></td>
        </tr>
        <tr>
            <td><label for="rating">Rating</label></td>
            <td><input type="text" id="rating" name="rating" v-model="rating"></td>
        </tr>
        <tr>
            <td><label for="duration">Duration</label></td>
            <td><input type="text" id="duration" name="duration" v-model="duration"></td>
        </tr>
        <tr>
            <td><label for="listed_in">Listed In</label></td>
            <td><input type="text" id="listed_in" name="listed_in" v-model="listed_in"></td>
        </tr>
        <tr>
            <td><label for="description">Description</label></td>
            <td><input type="text" id="description" name="description" v-model="description"></td>
        </tr>
        
            <td colspan="2">
                <button type="submit" style="width: 80px; display: block; margin: auto">OK</button>
            </td>
        </tr>
    </table>
</form>` ,
    data: function() {
        return {
            show_id: "00000",
            type: "Film",
            title: "Typical Film",
            director: "Default Director",
            cast: "Nobody",
            country: "Independent",
            date_added: "Today",
            release_year: "2021",
            rating: "No rating",
            duration: "Infinity",
            listed_in: "Nowhere",
            description: "Yada Yada Yada"
        }
    }, 
    methods: {
        process: function() {
            console.log("edit: show_id=", this.show_id, "type=", this.type, "title=", this.title, 'director=', this.director, 'cast=', this.cast, 'country=', this.country, 'date_added=', this.date_added, 'director=', this.release_year, 'rating=', this.rating, 'duration=', this.duration, 'listed_in=', this.listed_in, 'description=', this.description);
            record = {
                show_id: this.show_id,
                type: this.type,
                title: this.title,
                director: this.director,
                cast: this.cast,
                country: this.country,
                date_added: this.date_added,
                release_year: this.release_year,
                rating: this.rating,
                duration: this.duration,
                listed_in: this.listed_in,
                description: this.description
            }
            axios.post("/webresources/netflix", 
                       JSON.stringify(record), 
                        {   
                            headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                            }
                        }
            ).then((response) => {
                console.log(response);
                this.$router.push('/lista');
            }).catch(error => {
                alert("Error: " + error)
            });
        }
    }
})
 