export class BaseAPI {

    apisResultObject = {}

    async parsedData(url) {

        if (localStorage.APIs) {

            this.apisResultObject = JSON.parse(localStorage.getItem('APIs'));

        }
        if (url in this.apisResultObject) {
            data = this.apisResultObject[url];

        } else {

            try {

                var time = performance.now();

                let response = await fetch(url);
                var data = await response.json();

                time = performance.now() - time;
                console.log('Время выполнения = ', time);
                console.log('!!!!!!!!', url, Date.now());

                data['timestamp'] = Date.now();
                //  apisResultObject[url] = {"data": data, "t": Date.now()}
                this.apisResultObject[url] = data;
                localStorage.setItem('APIs', JSON.stringify(this.apisResultObject));


            } catch (e) {

                alert(` Извините,произошла ошибка, Name: ${e.name} Message: ${e.message} `);

            }
        }
        return data;
    }

    removeOldApis() {

        this.apisResultObject = JSON.parse(localStorage.getItem('APIs'));
        for (let key in this.apisResultObject) {
            if (Date.now() - this.apisResultObject[key].timestamp > 3600000) {
                delete this.apisResultObject[key];

            }
        }
        localStorage.setItem('APIs', JSON.stringify(this.apisResultObject));
    }
}