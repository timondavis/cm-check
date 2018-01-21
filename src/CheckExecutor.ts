import { EventEmitter } from 'events';
import { Check } from "./Check";

export class CheckExecutor extends EventEmitter {

    private instance : CheckExecutor;

    /**
     * Get the global instance of the Check Machine
     * @returns {CheckMachine}
     */
    public getInstance() : CheckExecutor {

        if ( this.instance === null ) {
            this.instance = new CheckExecutor();
        }

        return this.instance;
    }

    /**
     * Execute a check
     *
     * @param {Check} check
     * @param entity
     * @param {number} target
     * @returns {Check}
     */
    public execute( check : Check, target : number, entity : any = null ) : boolean {

        this.on( check.getType() + '_add_die_modifiers', CheckExecutor.processDieModifiers );
        this.emit( check.getType() + '_add_die_modifiers', check );

        this.on( check.getType() + '_add_target_modifiers', CheckExecutor.processTargetModifiers );
        this.emit( check.getType() + '_add_target_modifiers', check );

        CheckExecutor.doCheck( check );

        this.on( check.getType() + '_add_target_modifiers', CheckExecutor.processTargetModifiers );
        this.emit( check.getType() + '_add_target_modifiers', check );

        this.removeListener( check.getType() + '_add_target_modifiers', CheckExecutor.processTargetModifiers );
        this.removeListener( check.getType() + '_add_die_modifiers', CheckExecutor.processDieModifiers );
        this.removeListener( check.getType() + '_add_result_modifiers', CheckExecutor.processResultModifiers );

        return check.isPass();
    }

    private static doCheck( check : Check ) {

        check.getDieBag().roll();
    }

    private static processTargetModifiers( check : Check ) : void {

        let counter: number;
        let targetModifiers = check.getTargetModifiers();

        for ( counter = 0 ; counter < targetModifiers.length ; counter++ ) {

            check.setTarget( check.getTarget() + targetModifiers[counter].value );
        }
    }

    private static processResultModifiers( check : Check ) : void {

        let counter: number;
        let resultModifiers = check.getResultModifiers();

        for ( counter = 0 ; counter < resultModifiers.length ; counter++ ) {

            check.setResult( check.getResult() + resultModifiers[counter].value );
        }
    }

    private static processDieModifiers( check : Check ) : void {

        let counter: number;
        let dieModifiers = check.getDieModifiers();

        for ( counter = 0 ; counter < dieModifiers.length ; counter++ ) {

            //@TODO Implement This
        }
    }


    private constructor() {
        super();
    }
}

