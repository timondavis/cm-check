const d: any = require( 'dice-bag' );

export class Die {

    protected value: number = 1;
    protected locked: boolean = false;

    public constructor( public sides: number ) {

        this.roll();
    }

    public roll() {

        if ( ! this.isLocked() ) {

            return this.value = d( 1, this.sides );
        }

        return this.value;
    }

    public getValue() {

        return this.value;
    }

    public setValue( newValue: number ) {

        if ( this.value > 0 && this.value <= this.sides ) {
            this.value = newValue;
        }
    }

    public setLock( locked : boolean = true ) {

        this.locked = locked;
    }

    public isLocked() : boolean {
        return this.locked;
    }
}