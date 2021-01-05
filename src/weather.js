export class Weather {

    constructor(name) {
        this.name = name;
      }
    
      sayHi() {
        console.log(this.name);
      }

}

let weather = new Weather("Hell0 i am weather")
weather.sayHi()