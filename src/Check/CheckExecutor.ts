import { EventEmitter } from 'events';
import { Check } from "./Check";

export class CheckExecutor extends EventEmitter {

    private static instance : CheckExecutor = new CheckExecutor();
    private  isExecutingHook : boolean = false;

    /**
     * Get the global instance of the Check Machine
     * @returns {CheckExecutor}
     */
    public static getInstance() : CheckExecutor {

        return CheckExecutor.instance;
    }

    /**
     * Execute a check
     *
     * @TODO THREAD LOCKING IS VERY RUDIMENTARY.  IMPROVE
     * @param {Check} check
     * @param entity
     * @param {number} target
     * @returns {Check}
     */
    public execute( check : Check ) : boolean {

        this.isExecutingHook = true;
        this.on( check.getType() + '_add_die_modifiers_before', this.processDieModifiers );
        this.emit( check.getType() + '_add_die_modifiers_before', check, 'before' );
        while ( this.isExecutingHook ) { /* wait */ };

        this.isExecutingHook = true;
        this.on( check.getType() + '_add_target_modifiers', this.processTargetModifiers );
        this.emit( check.getType() + '_add_target_modifiers', check, 'before' );
        while ( this.isExecutingHook ) { /* wait */ };

        this.doCheck( check );

        this.isExecutingHook = true;
        this.on( check.getType() + '_add_result_modifiers', this.processResultModifiers );
        this.emit( check.getType() + '_add_result_modifiers', check, 'after' );
        while ( this.isExecutingHook ) { /* wait */ };

        this.isExecutingHook = true;
        this.on( check.getType() + '_add_die_modifiers_after', this.processDieModifiers );
        this.emit( check.getType() + '_add_die_modifiers_after', check, 'after' );
        while ( this.isExecutingHook ) { /* wait */ };

        // Has the dice bag been affected in a way that affects the final result?  Compare the difference between
        // the adjusted and original dice rolls and apply the difference to the result.

        let difference = check.getDieBag().getTotal() - check.getRawRollResult();
        if ( difference !== 0 ) {
                check.setResult( check.getResult() + difference );
        }

        this.removeListener( check.getType() + '_add_die_modifiers_before', this.processDieModifiers );
        this.removeListener( check.getType() + '_add_target_modifiers', this.processTargetModifiers );
        this.removeListener( check.getType() + '_add_result_modifiers', this.processResultModifiers );
        this.removeListener( check.getType() + '_add_die_modifiers_after', this.processDieModifiers );

        return check.isPass();
    }

    private doCheck( check : Check ) {

        check.check();
    }

    private processTargetModifiers( check : Check, phase: string ) : void {

        let counter: number;
        let targetModifiers = check.getTargetModifiers();

        for ( counter = 0 ; counter < targetModifiers.length ; counter++ ) {

            check.setTarget( check.getTarget() + targetModifiers[counter].value );
        }

        this.isExecutingHook = false;
    }

    private processResultModifiers( check : Check, phase: string ) : void {

        let counter: number;
        let resultModifiers = check.getResultModifiers();

        for ( counter = 0 ; counter < resultModifiers.length ; counter++ ) {

            check.setResult( check.getResult() + resultModifiers[counter].value );
        }

        this.isExecutingHook = false;
    }

    private processDieModifiers( check : Check, phase: string ) : void {

        let counter: number;
        let dieModifiers = check.getDieModifiers();

        for ( counter = 0 ; counter < dieModifiers.length ; counter++ ) {

            if ( dieModifiers[counter].phase != phase ) { continue; }

            if ( dieModifiers[counter].remove ) {

                check.getDieBag().removeBag( dieModifiers[counter].dieBag, dieModifiers[counter].strictRemove);
            } else {

                check.getDieBag().addBag( dieModifiers[counter].dieBag );
            }
        }

        this.isExecutingHook = false;
    }


    private constructor() {

        super();
    }
}

