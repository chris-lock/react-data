// @flow

export type Schema = {};

export default class Data<Record$Schema: Schema> {
  current: Record$Schema;

  constructor(currentData: Record$Schema) {
    this.current = currentData;
  }

  update(newData: $Shape<Record$Schema>): void {

  }
}
