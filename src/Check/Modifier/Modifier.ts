import { Check } from "../Check";

export abstract class Modifier {

    abstract applyTo( check: Check ): void;
    abstract deserialize( serialized: string ) : Modifier;
    abstract getType(): string;

    protected phase: string = 'after';

    public constructor( protected name: string = '', protected value: string | number | string[] | number[] = [] ) { }

    /**
     * Get the name of this modifier
     * @returns {string}
     */
    public getName() : string {

        return this.name;
    }

    /**
     * Set the name of this modifier
     *
     * @param {string} name
     * @returns {Modifier}
     */
    public setName( name : string) : Modifier {

        this.name = name;
        return this;
    }

    /**
     * Get the value of this modifier
     *
     * @returns {string | number | string[] | number[]}
     */
    public getValue() : string | number | string[] | number[] { return this.value; }

    /**
     * Set the value of this modifier
     *
     * @param {string | number | string[] | number[]} value
     * @returns {Modifier}
     */
    public setValue( value : string | number | string[] | number[] ) : Modifier {
        this.value = value;
        return this;
    }

    /**
     * Define the check phase in which this modifier should execute
     *
     * @returns {string}
     */
    public getPhase() : string {
        return this.phase;
    }

    /**
     * Get the check phase in which this modifier should execute
     * @param {string} phase
     * @returns {Modifier}
     */
    public setPhase( phase : string ) : Modifier {

        this.phase = phase;
        return this;
    }

    /**
     * Convenience method for summing values stored in the value array.  Only works if they're all numbers.
     *
     * @pre  All items in this.value must be numbers - they can be strings in there, but they must be numeric strings.
     *
     * @returns {number | boolean} Will return false if NaN is found in value array or as value.
     */
    protected sumOfValues() : number | boolean {

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

    public static serialize(modifier: Modifier | Modifier[]) : string {

        if (Array.isArray(modifier)) {
            let arr = [];

            modifier.forEach((m) => {
                arr.push({
                    name: m.getName(),
                    value: m.getValue(),
                    phase: m.getPhase()
                })
            });

            return JSON.stringify(arr);

        } else {
            let obj = {
                name: modifier.getName(),
                value: modifier.getValue(),
                phase: modifier.getPhase()
            };
            return JSON.stringify(obj);
        }
    }
}
