import { DieBag } from "../Die/DieBag";
import { Modifier } from "./Modifier/Modifier";

export abstract class Check {

    protected modifiers : Modifier[] = [];

    protected rawResult: number = 0;
    protected result: number = 0;

    protected testCondition : string = '>=';

    protected dieBag : DieBag;

    /**
     * @pre The attribute defined must exist on any entities tested against this check.
     *
     * @param {number} target
     */
    public constructor( protected target: number = 0 ) {

        this.dieBag = new DieBag();
        this.setCheckDie();
    }

    /**
     * Add a new modifier to the check's target number before the roll
     *
     * @param {TargetModifier} modifier
     * @return { Check }
     */
    public addModifier( modifier: Modifier ) : Check {

        this.modifiers.push( modifier );
        return this;
    }

    /**
     * Get the modifiers attributed to this check.
     *
     * @returns {Modifier[]}
     */
    public getModifiers() : Modifier[] {

        return this.modifiers;
    }

    /**
     * Has the check passed?
     *
     * @returns {boolean}
     */
    public isPass() : boolean {

        let isPass : boolean = false;

        switch( this.getTestCondition() ) {

            case( '>=' ) : {
                isPass = ( this.getResult() >= this.getTarget() );
                break;
            }
            case( '>' ) : {
                isPass = ( this.getResult() > this.getTarget() );
                break;
            }
            case( '<=' ) : {
                isPass = ( this.getResult() <= this.getTarget() );
                break;
            }
            case( '<' ) : {
                isPass = ( this.getResult() < this.getTarget() );
                break;
            }
            default:
                throw ( "Invalid test operator '" + this.getTestCondition() + "', cannot perform test");
        }

        return isPass;
    }

    /**
     * Set or reset the target number for the check
     *
     * @param {number} target
     *
     * @returns {Check}
     */
    public setTarget( target : number ) : Check {
        this.target = target;
        return this;
    }

    /**
     * Get the target number for the check
     *
     * @returns {number}
     */
    public getTarget() : number {
        return this.target;
    }

    /**
     * Set or reset the result of the check
     *
     * @param {number} result
     * @returns {Check}
     */
    public setResult( result : number ) : Check {

        this.result = result;
        return this;
    }

    /**
     * Get the current result value on the check
     * @returns {number}
     */
    public getResult() : number {

        return this.result;
    }

    /**
     * Get the result of dice rolled, without modifiers.
     * @returns {number}
     */
    public getRawRollResult() : number {

        return this.rawResult;
    }

    /**
     * Roll the dice for the check
     *
     * @returns {Check}
     */
    public roll() : Check {

        this.dieBag.roll();
        this.rawResult = this.dieBag.getTotal();
        this.setResult( this.dieBag.getTotal() );

        return this;
    }

    /**
     * Get the die bag belonging to the check
     *
     * @returns {DieBag}
     */
    public getDieBag() : DieBag {

        return this.dieBag;
    }


    /**
     * Add die to the check
     *
     * @param {number} count
     * @param {number} sides
     *
     * @returns {Check}
     */
    public addDie( count : number, sides : number ) : Check {

        this.getDieBag().add( count, sides );
        return this;
    }


    /**
     * Remove die from the check
     *
     * @param {number} count
     * @param {number} sides
     *
     * @returns {Check}
     */
    public removeDie( count : number, sides : number ) : Check {

        this.getDieBag().remove( count, sides );
        return this;
    }

    /**
     * Set the comparison operator for the check pass test.  Result on left, Target on right.
     * For example, 'result < target' is a pass if the result is less than the target, and the operator is '<'
     *
     * @param {string} operator
     *
     * @returns {Check}
     */
    public setTestCondition( operator : string ) : Check {

        if ( operator != '>' && operator != '>=' && operator != '<' && operator != '<=' ) {
            throw( 'Invalid success operator provided.  Value values include "<", "<=", ">", ">="');
        }

        this.testCondition = operator;
        return this;
    }

    /**
     * Get the test condition for the check pass test.  Result is left of the symbol, target on the right.
     * For example, 'result < target' is a pass if the result is less than the target, and the operator is '<'
     *
     * @returns {string}
     */
    public getTestCondition() : string {

        return this.testCondition;
    }

    /**
     * Get a report on the status of the check
     * @param {boolean} getReportAsString
     *
     * @returns {string | {{isPass: boolean; target: number; result: number, modifiers: []any, number}}
     */
    public report( getReportAsString : boolean ) : any {

        let report = new CheckReport(
            this.isPass(),
            this.getTarget(),
            this.getResult(),
            this.getModifiers(),
            this.getRawRollResult(),
            this.getDieBag()
        );

        return ( getReportAsString ) ? JSON.stringify( report ) : report;
    }

    /**
     * Get the typename of this check
     *
     * @returns {string}
     */
    public abstract getType() : string;

    /**
     * Set a new DieBag on this check.
     */
    protected abstract setCheckDie() : void;

    public toString() : string {
        let str = '';

        this.dieBag.dieMap

        return null;
    }

}

export class CheckReport {

    public constructor(
        public isPass : boolean,
        public target : number,
        public result : number,
        public modifiers : Modifier[],
        public rollResult : number,
        public dieBag: DieBag
    ) {

    }
}
