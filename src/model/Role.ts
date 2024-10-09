export class Role {
  id: string;
  roleName: string;
  description: string;
  quantity: number;
  functionGroupA: string[];
  functionGroupB: string[];

  constructor(
    id: string,
    roleName: string,
    description: string,
    quantity: number,
    functionGroupA: string[],
    functionGroupB: string[],
  ) {
    this.id = id;
    this.description = description;
    this.roleName = roleName;
    this.quantity = quantity;
    this.functionGroupA = functionGroupA;
    this.functionGroupB = functionGroupB;
  }
}
