import { DieBag } from "../Die/DieBag";
import { Modifier } from "./Modifier/Modifier";
import { DieModifier} from "./Modifier/DieModifier";
import {ResultModifier} from "./Modifier/ResultModifier";
import {TargetModifier} from "./Modifier/TargetModifier";

export class Check {

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
    public getType() : string { return 'check';}

    /**
     * Set a new DieBag on this check.
     */
    protected setCheckDie() : void {};

    /**
     * Serialize the contents (not state!) of a check.
     */
    public static serialize(check: Check) : string {
        let dieBag = check.getDieBag();
        let testCondition = check.getTestCondition();
        let modifiers = check.getModifiers();
        let target = check.target;
        let type = check.getType();

        return JSON.stringify({
            dieBag: DieBag.serialize(dieBag),
            testCondition: testCondition,
            modifiers: Modifier.serialize(modifiers),
            target: target,
            type: type
        });
    }

    public static deserialize(serializedCheck : string) : Check {
        let obj = JSON.parse(serializedCheck);
        let dieBag: DieBag = DieBag.deserialize(obj.dieBag);
        let testCondition: string = obj.testCondition;
        let strModifiers: any[] = JSON.parse(obj.modifiers);
        let modifiers: Modifier[] = [];
        let target = obj.target;

        strModifiers.forEach((objM) => {
            switch(objM.type) {
                case('die'): {
                    let dm = new DieModifier();
                    dm.setName(objM.name);
                    dm.setValue(objM.value);
                    dm.setPhase(objM.phase);
                    modifiers.push(objM);
                    break;
                }
                case('result'): {
                    let rm = new ResultModifier();
                    rm.setName(objM.name);
                    rm.setValue(objM.value);
                    rm.setPhase(objM.phase);
                    modifiers.push(objM);
                    break;
                }
                case('target'): {
                    let tm = new TargetModifier();
                    tm.setName(objM.name);
                    tm.setValue(objM.value);
                    tm.setPhase(objM.phase);
                    modifiers.push(objM);
                    break;
                }
                default: break;
            }
        });

        let c = new Check();
        c.dieBag = dieBag;
        c.testCondition = testCondition;
        c.modifiers = modifiers;
        c.target = target;

        return c;
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
