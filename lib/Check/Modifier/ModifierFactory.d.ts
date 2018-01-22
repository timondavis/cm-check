export declare abstract class ModifierFactory {
    abstract createNew(name: string, args: {
        key: string[];
        value: string;
    }): any;
}
