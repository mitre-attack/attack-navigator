export class Note {
    public readonly abstract?: string; // brief summary of note content
    public readonly content: string; // content of the note
    public readonly object_refs: string[]; // list of STIX objects the note is applied to

    /**
     * Creates an instance of Note.
     * @param {any} stixSDO for the note
     */
    constructor(stixSDO: any) {
        if (stixSDO.abstract) this.abstract = stixSDO.abstract;
        this.content = stixSDO.content;
        this.object_refs = stixSDO.object_refs;
    }
}
