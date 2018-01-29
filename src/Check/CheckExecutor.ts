import { EventEmitter } from 'events';
import { Check } from "./Check";
import { SimpleCheck } from "./SimpleCheck";
import { D20AttributeCheck } from "./D20AttributeCheck";
import { Modifier } from "./Modifier/Modifier";

export class CheckExecutor extends EventEmitter {

    private static instance : CheckExecutor = new CheckExecutor();
    private static locked : boolean = false;
    protected checkTypes : { [key:string] : Function } = {};
    protected modifierTypes : { [key:string] : Function } = {};

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
     * @TODO is there a better way to thread-lock on this method?
     *
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
     * Generate a new check.  Returns a simple check by default, but you can pass in the key of a check type to get
     * an instance.
     *
     * @param {string} type
     * @returns {Check}
     */
    public generateCheck( type : string = 'simple') : Check {

        if ( ! this.checkTypes.hasOwnProperty( type ) ) { throw ( "Check Type '" + type + "' does not exist."); }

        return this.checkTypes[type]();
    }

    /**
     * Register a check type to the CheckExecutor.  The callback provided should return an instance of the check
     * being paired with it.
     *
     * @param {string} type
     * @param {Function} callback
     */
    public registerCheckType( type: string, callback : Function ) {

        this.checkTypes[type] = callback;
    }

    /**
     * Get an array of the available check names
     * @returns {string[]}
     */
    public getCheckTypes() : string[] {

        return Object.keys( this.checkTypes );
    }

    /**
     * Generate a new modifier instance
     *
     * @param {string} type
     * @returns {Modifier}
     */
    public generateModifier( type : string ) : Modifier {

        if ( ! this.modifierTypes.hasOwnProperty( type ) ) { throw ( "Modifier Type '" + type + "' does not exist."); }
        return this.modifierTypes[type]();
    }

    /**
     * Register a new modifier type
     *
     * @param {string} type
     * @param {Function} callback
     */
    public registerModifierType( type: string, callback : Function ) {

        this.modifierTypes[type] = callback;
    }

    /**
     * Get an array of available modifier names
     *
     * @returns {string[]}
     */
    public getModifierTypes() : string[] {

        return Object.keys( this.modifierTypes );
    }

    protected static doCheck( check : Check ) {

        check.roll();
    }

    protected static processModifiers( check : Check, phase: string ) : void {

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

        this.registerCheckType( 'simple', () => { return new SimpleCheck() } );
        this.registerCheckType( 'd20-attribute', () => { return new D20AttributeCheck() })
    }
}

