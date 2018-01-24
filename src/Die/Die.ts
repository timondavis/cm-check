const d: any = require( 'dice-bag' );

export class Die {

    protected value: number = 1;
    protected locked: boolean = false;

    public constructor( public sides: number ) {

        this.roll();
    }

    /**
     * Roll the die and return the new result.
     *
     * @mutator
     * @returns {Die}
     */
    public roll() : Die {

        if ( ! this.isLocked() ) {

            this.value = d( 1, this.sides );
        }

        return this;
    }

    /**
     * Get the value of the die
     * @returns {number}
     */
    public getValue() {

        return this.value;
    }

    /**
     * Set the value of the die
     * @param {number} newValue
     * @returns {Die}
     */
    public setValue( newValue: number ) : Die {

        if ( this.value > 0 && this.value <= this.sides ) {
            this.value = newValue;
        }

        return this;
    }

    /**
     * Lock/Unlock the die from being removed or affected
     * @param {boolean} locked
     * @returns {Die}
     */
    public setLock( locked : boolean = true ) : Die{

        this.locked = locked;
        return this;
    }

    /**
     * Is the die locked?
     * @returns {boolean}
     */
    public isLocked() : boolean {
        return this.locked;
    }
}