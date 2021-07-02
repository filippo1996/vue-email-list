const app = new Vue({
    el: '#app',
    data: {
        emails: [],
        qty: null,
        error: '',
        start: false,
        load: true
    },
   async mounted(){
        /*
        for(let i = 0; i < this.qty; i++){
            axios
            .get('https://flynn.boolean.careers/exercises/api/random/mail')
            .then(result => {
                this.emails.push(result.data.response);
            }).catch(error => {
                this.error = error;
            });
        }
        */

        //Questo ci permette di interrompere subito il ciclo in caso il server restituisca un errore
        /*
        mails:for(let i = 0; i < this.qty; i++){
            try{
               let response = await axios
                .get('https://flynn.boolean.careers/exercises/api/random/mail');
               this.emails.push(response.data.response);
               if(this.emails.length === this.qty) this.load = false;
            }catch(e){
                this.error = e;
                this.load = false;
                break mails;
            }
        }
        */

    },
    methods: {
        async downloadEmails(){
            mails:for(let i = 0; i < this.qty; i++){
                this.start = true;
                try{
                   let response = await axios
                    .get('https://flynn.boolean.careers/exercises/api/random/mail');
                   this.emails.push(response.data.response);
                   if(this.emails.length === this.qty) this.load = false;
                }catch(e){
                    this.error = e;
                    this.load = false;
                    break mails;
                }
            }
        }
    }
});