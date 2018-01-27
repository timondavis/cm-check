import { EventEmitter } from 'events';
import { Check } from "./Check";

export class CheckExecutor extends EventEmitter {

    private static instance : CheckExecutor = new CheckExecutor();
    private static locked : boolean = false;

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
     * @returns {Check}
     */
    public execute( check : Check ) : Check {

        while ( CheckExecutor.isThreadLocked() ) { /* wait for other simultaneous processes */ }

        CheckExecutor.engageThreadLock();
        this.on( check.getType() + '_modifiers', CheckExecutor.processModifiers );
        this.emit( check.getType() + '_modifiers', check, 'before');
        while ( CheckExecutor.isThreadLocked() ) { /* wait */ }
        this.removeListener( check.getType() + '_modifiers',  CheckExecutor.processModifiers );

        CheckExecutor.engageThreadLock();
        this.on( check.getType() + '_roll', CheckExecutor.liftThreadLock );
        this.emit( check.getType() + '_roll', check, 'before' );
        while ( CheckExecutor.isThreadLocked() ) { /* wait */ }
        this.removeListener( check.getType() + '_roll',   CheckExecutor.liftThreadLock   );

        CheckExecutor.doCheck( check );

        CheckExecutor.engageThreadLock();
        this.on( check.getType() + '_modifiers', CheckExecutor.processModifiers );
        this.emit( check.getType() + '_modifiers', check, 'after' );
        while ( CheckExecutor.isThreadLocked() ) { /* wait */ }
        this.removeListener( check.getType() + '_modifiers',  CheckExecutor.processModifiers );

        CheckExecutor.engageThreadLock();
        this.on( check.getType() + '_finish', CheckExecutor.liftThreadLock );
        this.emit( check.getType() + '_finish', check, 'after' );
        while ( CheckExecutor.isThreadLocked() ) { /* wait */ }
        this.removeListener( check.getType() + '_finish', CheckExecutor.liftThreadLock );

        // Has the dice bag been affected in a way that affects the final result?  Compare the difference between
        // the adjusted and original dice rolls and apply the difference to the result.
        let difference = check.getDieBag().getTotal() - check.getRawRollResult();
        if ( difference !== 0 ) {
                check.setResult( check.getResult() + difference );
        }

        return check;
    }

    /**
     * Execute a check passed in
     *
     * @param {Check} check
     */
    private static doCheck( check : Check ) {

        check.check();
    }

    private static processModifiers( check : Check, phase: string ) : void {

        let modifiers = check.getModifiers();

        for( let modifierIndex = 0 ; modifierIndex < modifiers.length ; modifierIndex++ ) {

            if ( modifiers[modifierIndex].getPhase() != phase ) { continue; }

            modifiers[modifierIndex].applyTo( check );
        }

        CheckExecutor.liftThreadLock();
    }

    protected static engageThreadLock() { CheckExecutor.locked = true; }
    protected static liftThreadLock() { CheckExecutor.locked = false; }
    protected static isThreadLocked() { return CheckExecutor.locked; }

    private constructor() {

        super();
    }
}

