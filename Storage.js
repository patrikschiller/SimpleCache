/**
 * @summary - Chapter content Cache implementation
 * @author - Patrik Schiller
 * @date - 29/03/2020
 */

class Storage {
    constructor(){
        this.Storage = {};
        this.iterator = 0;
        setTimeout(this.memorySentry.bind(this), 10000);
    }

    /**
     * @summary - Returns item with given key
     * @param {String} key 
     */
    getItem(key){
        return this.Storage[key];
    }

    /**
     * @summary - Sets new data into cache with given key
     * @param {String} key 
     * @param {JavaScript Object} value 
     */
    setItem(key, value){
        if(!this.Storage.hasOwnProperty(key)){
            this.Storage[key] = value;
            return true;
        }else{
            console.log("[Error][Storage] The key '"+key+"' is already taken!");
            return false;
        }
    }

    /**
     * 
     * @param {String} key 
     */
    removeItem(key){
        if(!this.Storage.hasOwnProperty(key)){
            delete this.Storage[key];
            return true;
        }else{
            console.log("[Error][Storage] There is no key in the storage with value " + key);
            return false;
        }
    }

    /**
     * @summary - Converts content of cache into String (for debugging)
     */
    toString(){
        for(let key in this.Storage){
            console.log(`{${key} : ${this.Storage[key]}}`);
        }
    }

    /**
     * @summary - automatic sentry for deleting old data
     */
    memorySentry(){
        const thisTime = (new Date()).getTime();
        /* Future date (lifetime of item) comparison with real time */
        if(Object.keys(this.Storage).length > 0){
            for(let key in this.Storage){
                if(this.Storage[key]['lifetime'] <= thisTime){
                    console.log(this.Storage[key]['lifetime'] + " < " + thisTime);
                    delete this.Storage[key];
                    console.log("Value deleted");
                }
            }
        }
        
        console.log("Sentry " + this.iterator++);
        setTimeout(this.memorySentry.bind(this), 10000);
    }
}

export default new Storage();