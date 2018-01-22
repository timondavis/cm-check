import { Modifier } from "./Modifier";
export declare abstract class ModifierFactory {
    abstract create(name: string, args: {
        key: string[];
        value: string;
    }): Modifier;
}
