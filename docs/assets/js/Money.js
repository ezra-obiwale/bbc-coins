var Money = {
    /**
     * The value to work on
     */
    value: "",
    /**
     * Derived sterling coins
     */
    coins: [],
    /**
     * The error message
     */
    error: null,
    /**
     * Initializes the object
     * 
     * @param {any} value 
     * @returns 
     */
    init: function (value) {
        this.value = value || '';
        this.error = null;
        this.coins = [];
        return this;
    },
    /**
     * Checks to ensure the value is in correct format
     * 
     * @returns {Money}
     */
    validate: function () {
        if (!this.value) {
            this.error = 'Empty entry';
        }
        else {
            // check invalid characters
            if (this.value.match(/[^£\.p0-9]/g))
                this.error = 'Invalid character';
            // check digits exists
            else if (!this.value.match(/[0-9]/g))
                this.error = 'Missing value';
            // check value contains £ but not at the beginning
            else if ((!this.value.startsWith('£') && this.value.indexOf('£') !== -1)
                // or value contains p but not at the end
                || (!this.value.endsWith('p') && this.value.indexOf('p') !== -1)
                // or there are more than one £ in the value
                || this.value.indexOf('£') !== this.value.lastIndexOf('£')
                // or there are more than one p in the value
                || this.value.indexOf('p') !== this.value.lastIndexOf('p'))
                this.error = 'Valid character in the wrong position';
        }
        return this;
    },
    /**
     * Converts the value to sterling coins
     * 
     * @param {any} callback Called on each coin denomination found
     * @returns {Money}
     */
    toSterlingCoins: function (callback) {
        // remove £ and p
        money = this.value.replace(/[£p]/g, '');
        // convert to pence integer
        money = money.indexOf('.') !== -1
            ? Number(Math.round(money + 'e2') + 'e-2') * 100
            : parseInt(money);
        while (true) {
            // check £2
            if (money >= 200) {
                this.coin(Math.floor(money / 200) + ' x £2', callback);
                money = money % 200;
            }
            // check £1
            else if (money >= 100) {
                this.coin(Math.floor(money / 100) + ' x £1', callback);
                money = money % 100;
            }
            // check 50p
            else if (money >= 50) {
                this.coin(Math.floor(money / 50) + ' x 50p', callback);
                money = money % 50;
            }
            // check 20p
            else if (money >= 20) {
                this.coin(Math.floor(money / 20) + ' x 20p', callback);
                money = money % 20;
            }
            // check 10p
            else if (money >= 10) {
                this.coin(Math.floor(money / 10) + ' x 10p', callback);
                money = money % 10;
            }
            // check 5p
            else if (money >= 5) {
                this.coin(Math.floor(money / 5) + ' x 5p', callback);
                money = money % 5;
            }
            // check 2p
            else if (money >= 2) {
                this.coin(Math.floor(money / 2) + ' x 2p', callback);
                money = money % 2;
            }
            // check 1p
            else if (money >= 1) {
                this.coin(money + ' x 1p', callback);
                break;
            }
            else break;
        }
        return this;
    },
    /**
     * Keeps the coin
     * 
     * @param {any} str 
     * @param {any} callback 
     */
    coin: function (str, callback) {
        this.coins.push(str);
        if (typeof callback === 'function') callback(str);
    }
};
