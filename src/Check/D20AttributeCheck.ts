import { Check } from './Check';
import { ResultModifier } from "./Modifier/ResultModifier";

export class D20AttributeCheck extends Check {

    public constructor( target: number = 0, protected attributeValue : number = 0, protected name: string = 'Natural' +
    ' Attribute Modifier' ) {

        super( target );

        this.addModifier( new ResultModifier( name,
            D20AttributeCheck.translateAttributeValue( attributeValue ) ) );
    }

    /**
     * Get the formal typename of this check
     * @returns {string}
     */
    public getType() : string {

        return 'd20-attribute'
    }

    /**
     * Update the attribute being checked against
     * @param {number} attributeValue
     */
    // @TODO Brute force is not efficient, sort then search
    public setAttributeValue( attributeValue : number ) {

        this.attributeValue = attributeValue;

        let modifiers = this.getModifiers();

        for ( let modifierIndex = 0 ; modifierIndex < modifiers.length ; modifierIndex++ ) {

            if ( modifiers[modifierIndex].getName() == this.name ) {

                modifiers[modifierIndex].setValue( D20AttributeCheck.translateAttributeValue( attributeValue ) );
                break;
            }
        }
    }

    protected setCheckDie(): void {

        this.dieBag.add( 1, 20 );
    }

    protected static translateAttributeValue( value: number ) : number {

        let isNegative = false;

        if ( value < 10 ) {

            isNegative = true;
            value = Math.abs( 10 - value );
        }
        else if ( value === 10 || value === 11 ) {

            return 0;
        }
        else { value -= 11 }



        return ( Math.ceil( value / 2 ) * ( ( isNegative ) ? -1 : 1 ) );
    }
}