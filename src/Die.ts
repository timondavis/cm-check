const d: any = require( 'dice-bag' );

export class Die {

    protected value: number = 1;

    public constructor( public sides: number ) {

        this.roll();
    }

    public roll() {

        return this.value = d( 1, this.sides );
    }

    public getValue() {

        return this.value;
    }

    public setValue( newValue: number ) {

        if ( this.value > 0 && this.value <= this.sides ) {
            this.value = newValue;
        }
    }
}