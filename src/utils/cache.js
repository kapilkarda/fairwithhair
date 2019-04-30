class Cache {
  constructor() {
    this.currentUser = null;
    this.router = [];
    this.token = null;
    this.cacheId = null
  }
}

export default new Cache();