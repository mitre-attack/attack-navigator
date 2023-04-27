export class LayoutOptions {
    // current layout selection
    public readonly layoutOptions: string[] = ["side", "flat", "mini"];
    private _layout = this.layoutOptions[0]; //current selection
    public set layout(newLayout) {
        if (!this.layoutOptions.includes(newLayout)) {
            console.warn("invalid matrix layout", newLayout);
            return;
        }
        let oldLayout = this._layout;
        this._layout = newLayout;
        if (this._layout == "mini") { //mini-table cannot show ID or name
            this.showID = false;
            this.showName = false;
        }
        if (oldLayout == "mini" && newLayout != "mini") {
            this.showName = true; //restore default show value for name
        }
    }
    public get layout(): string { return this._layout; }

    public readonly aggregateFunctionOptions: string[] = ["average", "min", "max", "sum"];
    private _aggregateFunction = this.aggregateFunctionOptions[0];
    public set aggregateFunction(newAggregateFunction) {
        if (!this.aggregateFunctionOptions.includes(newAggregateFunction)) {
            console.warn("invalid aggregate fx option", newAggregateFunction);
            return;
        }
        this._aggregateFunction = newAggregateFunction;
    }

    public get aggregateFunction(): string { return this._aggregateFunction; }

    //show technique/tactic IDs in the view?
    public _showID: boolean = false;
    public set showID(newval: boolean) {
        this._showID = newval;
        if (newval && this._layout == "mini") this._layout = "side";
    }
    public get showID(): boolean { return this._showID; }

    //show technique/tactic names in the view?
    public _showName: boolean = true;
    public set showName(newval: boolean) {
        this._showName = newval;
        if (newval && this._layout == "mini") this._layout = "side";
    }
    public get showName(): boolean { return this._showName; }

    public _showAggregateScores: boolean = false;
    public set showAggregateScores(newval: boolean) { this._showAggregateScores = newval; }
    public get showAggregateScores(): boolean { return this._showAggregateScores; }

    public _countUnscored: boolean = false;
    public set countUnscored(newval: boolean) { this._countUnscored = newval; }
    public get countUnscored(): boolean { return (this.aggregateFunction === "average") ? this._countUnscored : false; }

    public serialize(): object {
        return {
            "layout": this.layout,
            "aggregateFunction": this.aggregateFunction,
            "showID": this.showID,
            "showName": this.showName,
            "showAggregateScores": this.showAggregateScores,
            "countUnscored": this.countUnscored
        };
    }

    public deserialize(rep: any) {
        if ("showID" in rep) {
            if (typeof (rep.showID) === "boolean") this.showID = rep.showID;
            else console.error("TypeError: layout field 'showID' is not a boolean:", rep.showID, "(", typeof (rep.showID), ")");
        }
      if ("showName" in rep) {
          if (typeof (rep.showName) === "boolean") this.showName = rep.showName;
          else console.error("TypeError: layout field 'showName' is not a boolean:", rep.showName, "(", typeof (rep.showName), ")");
      }
      //make sure this one goes last so that it can override name and ID if layout == 'mini'
      if ("layout" in rep) {
          if (typeof (rep.layout) === "string") this.layout = rep.layout;
          else console.error("TypeError: layout field 'layout' is not a string:", rep.layout, "(", typeof (rep.layout), ")");
      }
      if ("aggregateFunction" in rep) {
          if (typeof (rep.aggregateFunction) === "string") this.aggregateFunction = rep.aggregateFunction;
          else console.error("TypeError: layout field 'aggregateFunction' is not a boolean:", rep.aggregateFunction, "(", typeof (rep.aggregateFunction), ")");
      }
      if ("showAggregateScores" in rep) {
          if (typeof (rep.showAggregateScores) === "boolean") this.showAggregateScores = rep.showAggregateScores;
          else console.error("TypeError: layout field 'showAggregateScores' is not a boolean:", rep.showAggregateScores, "(", typeof (rep.showAggregateScores), ")");
      }
      if ("countUnscored" in rep) {
          if (typeof (rep.countUnscored) === "boolean") this.countUnscored = rep.countUnscored;
          else console.error("TypeError: layout field 'countUnscored' is not a boolean:", rep.countUnscored, "(", typeof (rep.countUnscored), ")");
      }
  }
}