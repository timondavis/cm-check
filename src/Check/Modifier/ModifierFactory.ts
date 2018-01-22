import { Modifier } from "./Modifier";

export abstract class ModifierFactory {

    public abstract create( name: string, args: { [key: string]: string } ) : Modifier;
}

