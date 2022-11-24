import fs from "fs/promises";

export interface BaseEntry {
  id: number;
}

export default class Base<T extends BaseEntry> {
  private path: string;
  protected entries: T[] = [];
  public loaded: Promise<void>;

  constructor(path: string) {
    this.path = path;
    this.loaded = this.load();
  }

  public async save() {
    await fs.writeFile(this.path, JSON.stringify(this.entries));
  }

  public getLastId(): number {
    return this.entries.length
  }

  public async getById(id: number) {
    return this.entries.find((entry) => entry.id === id);
  }

  public async toJSON() {}

  public async load() {
    const buffer = await fs.readFile(this.path);
    this.entries = JSON.parse(buffer.toString() || "[]");
  }
}
