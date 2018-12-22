import { Check } from "../Check";

export abstract class Modifier {

    abstract ApplyTo( check: Check ): void;

    abstract get Type(): string;

    protected _phase: string = 'after';

    public constructor( protected name: string = '', protected value: string | number | string[] | number[] = [] ) { }

    /**
     * Get the name of this modifier
     * @returns {string}
     */
    public get Name(): string {
        return this.name;
    }

    /**
     * Set the name of this modifier
     *
     * @param {string} name
     * @returns {Modifier}
     */
    public set Name( name : string ) {
        this.name = name;
    }

    /**
     * Get the value of this modifier
     *
     * @returns {string | number | string[] | number[]}
     */
    public get Value() : string | number | string[] | number[] { return this.value; }

    /**
     * Set the value of this modifier
     *
     * @param {string | number | string[] | number[]} value
     * @returns {Modifier}
     */
    public set Value( value : string | number | string[] | number[] ) {
        this.value = value;
    }

    /**
     * Define the check phase in which this modifier should execute
     *
     * @returns {string}
     */
    public get Phase() : string {
        return this._phase;
    }

    /**
     * Get the check phase in which this modifier should execute
     * @param {string} phase
     * @returns {Modifier}
     */
    public set Phase( phase : string ) {
        this._phase = phase;
    }

    /**
     * Convenience method for summing values stored in the value array.  Only works if they're all numbers.
     *
     * @pre  All items in this.value must be numbers - they can be strings in there, but they must be numeric strings.
     *
     * @returns {number | boolean} Will return false if NaN is found in value array or as value.
     */
    protected SumOfValues() : number | boolean {

        let valueIndex = 0;
        let accumulatedValue = 0;

        // Add numerical arrays, return false if NaN is found in array.
        if ( Array.isArray( this.value ) ) {

            for ( valueIndex = 0 ; valueIndex < this.value.length ; valueIndex++ ) {

                let localValue = Number( this.value[valueIndex] );
                if ( isNaN( localValue ) ) { return false; }
                accumulatedValue += localValue;
            }

            return accumulatedValue;
        }

        // Return the value if not an array, and only if its a number.  False otherwise.
        return ( isNaN( Number( this.value ) ) ? false : Number( this.value ) );
    }
}

