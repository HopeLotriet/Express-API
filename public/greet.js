document.addEventListener('alpine:init', () => {
    Alpine.data('greetAPI', () => {
        return {
            username: '',
            greeting: '',
            language: '',
            //greetings: [],
            new_greeting: '',
            new_language: '',
            new_message: '',

            greet() {

                // call the api and get a greeting back
                axios
                    .get(`/api/greet?username=${this.username}&language=${this.language}`)
                    .then(result => {
                        if (result.data.error) {
                            console.log(result.data)
                            this.greeting = result.data.error;
                        } else {
                            this.greeting = result.data.message;
                        }
                    })
            },

            addLanguage() {
                axios.post('/api/greet', {
                    "language": this.new_language,
                    "greeting": this.new_greeting
                })
                .then(result => {
                    if (this.new_language && this.new_greeting) {
                        console.log(result.data)
                        this.new_message = result.data.message;
                    } else {
                        this.new_message = 'Please enter a valid language and greeting'
                    }
                });

                // init () {
                //     this.greet();
                //     this.addLanguage();
                // }
                // if (this.new_language && this.new_greeting) {
                //     this.greetings.push({
                //         language: this.new_language,
                //         greeting: this.new_greeting
                //     });
                //     this.new_language = '';
                //     this.new_greeting = '';
                // }
}
        }
        });
});