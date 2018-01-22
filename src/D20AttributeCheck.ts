import { Check } from './Check';

export class D20AttributeCheck extends Check {

    protected attributeName : string = '';

    public constructor( attributeValue : number, target: number ) {

        super( D20AttributeCheck.translateAttributeValue( attributeValue ), target );
        this.dieBag.add( 1, 20 );
    }

    public setAttribute( name : string ) {

        this.attributeName = name;
    }

    public getType() : string {

        return this.attributeName + 'Attribute';
    }

    protected setBaseDieBag(): void {

        this.dieBag.add( 1, 20 );
    }

    protected static translateAttributeValue( value: number ) : number {

        if ( value <= 3 ) { return -3; }
        else if ( value <= 6 ) { return -2; }
        else if ( value <= 9 ) { return -1; }
        else if ( value <= 12 ) { return 0; }
        else if ( value <= 15 ) { return 1; }
        else if ( value <= 18 ) { return 2; }
        else if ( value <= 21 ) { return 3; }
        else { return 4; }
    }
}