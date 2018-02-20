module.exports = class {
    constructor(delay){
        this._cooldown = new Map();
        this._delay = delay;
    }

    /**
     * Adds a value with key in Cooldown._cooldown map.
     *
     * @param key
     * @param val
     * @returns {Promise<void>}
     */
    add(key, val){
        this._cooldown.set(key, val);
    }

    /**
     * Checks if user is in map
     *
     * @param key
     * @returns {boolean}
     */
    check(key){
        if (!this._cooldown.has(key)) {
            return false;
        } else {
            if (Date.now() - this._cooldown.get(key) < this.delay) return true; else return false;
        }
    }

    /**
     * Removes user from cooldown map
     *
     * @param key
     */
    remove(key){
        this._cooldown.delete(key);
    }

    /**
     * Returns the remaining time until user is being removed from map (in milliseconds).
     *
     * @param key
     * @returns {number}
     */
    getTimeDiff(key){
        if(this._cooldown.has(key)){
            return Date.now() - this._cooldown.get(key);
        }else return 0;
    }

    get cooldowns(){
        return this._cooldown;
    }

    get delay(){
        return this._delay;
    }
}
