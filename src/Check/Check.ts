import { DieBag } from "../Die/DieBag";
import { Modifier } from "./Modifier/Modifier";

export abstract class Check {

    protected _modifiers : Modifier[] = [];

    protected _rawResult: number = 0;
    protected _result: number = 0;

    protected _testCondition : string = '>=';

    protected _dieBag : DieBag;

    /**
     * @pre The attribute defined must exist on any entities tested against this check.
     *
     * @param {number} target
     */
    public constructor( protected target: number = 0 ) {

        this._dieBag = new DieBag();
        this.SetCheckDie();
    }

    /**
     * Add a new modifier to the check's target number before the roll
     *
     * @param {TargetModifier} modifier
     * @return { Check }
     */
    public AddModifier( modifier: Modifier ) : Check {

        this._modifiers.push( modifier );
        return this;
    }

    /**
     * Get the modifiers attributed to this check.
     *
     * @returns {Modifier[]}
     */
    public get Modifiers() : Modifier[] {
        return this._modifiers;
    }

    /**
     * Has the check passed?
     *
     * @returns {boolean}
     */
    public IsPass() : boolean {

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
    public set Target( target : number ) {
        this._target = target;
    }

    /**
     * Get the target number for the check
     *
     * @returns {number}
     */
    public getTarget() : number {
        return this._target;
    }

    /**
     * Set or reset the result of the check
     *
     * @param {number} result
     * @returns {Check}
     */
    public set Result( result : number ) {

        this._result = result;
    }

    /**
     * Get the current result value on the check
     * @returns {number}
     */
    public get Result(): number {

        return this._result;
    }

    /**
     * Get the result of dice rolled, without modifiers.
     * @returns {number}
     */
    public get RawRollResult() : number {
        return this._rawResult;
    }

    /**
     * Roll the dice for the check
     *
     * @returns {Check}
     */
    public Roll() : Check {

        this._dieBag.roll();
        this._rawResult = this._dieBag.Total;
        this.Result =  this._dieBag.Total;

        return this;
    }

    /**
     * Get the die bag belonging to the check
     *
     * @returns {DieBag}
     */
    public get DieBag() : DieBag {

        return this.DieBag;
    }


    /**
     * Add die to the check
     *
     * @param {number} count
     * @param {number} sides
     *
     * @returns {Check}
     */
    public AddDie( count : number, sides : number ) : Check {

        this.DieBag.Add( count, sides );
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
    public RemoveDie( count : number, sides : number ) : Check {

        this.DieBag.remove( count, sides );
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
    public set TestCondition( operator : string ) : Check {

        if ( operator != '>' && operator != '>=' && operator != '<' && operator != '<=' ) {
            throw( 'Invalid success operator provided.  Value values include "<", "<=", ">", ">="');
        }

        this._testCondition = operator;
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