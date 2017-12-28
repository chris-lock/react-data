// @flow

type Network$Node = $Subtype<Network<*>>;

export default class Network<Node: Network$Node> {
  _subNetwork: Array<Node> = [];

  add(node: Node): void {
    if (this._subNetwork.indexOf(node) === -1) {
      this._subNetwork.push(node);
      node.add(this);
    }
  }

  remove(node: Node): void {
    var index: number = this._subNetwork.indexOf(node);

    if (index > -1) {
      this._subNetwork.splice(index, 1);
      node.remove(this);
    }
  }

  forEach(method: (node: Node) => void): void {
    this._subNetwork.forEach((node: Node): void => method(node));
  }
}
