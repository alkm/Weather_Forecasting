class Utils {
    //Getting API description based on environment
    static getAPIDescriptipn(signature){
        let env = process.env.REACT_APP_ENV || 'local';
        let apiGateWay = '';

        if(env === 'DEV'){
            apiGateWay = 'https://c0899yh4e9.execute-api.us-east-1.amazonaws.com/dev/';
        }else{
            apiGateWay = 'http://localhost:3000/dev/';
        }
        switch(signature) {
            case 'wfa-info':
                return apiGateWay+'fetchwfa';
            default:
                return '';
        }
    }

    static formatDate = (date) => {
        let dd = date.getDate();
        let mm = date.getMonth()+1;
        let yyyy = date.getFullYear();
        if(dd<10) {dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        date = dd+'/'+mm+'/'+yyyy;
        return date
     }
}

export default Utils;