var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/modules/Properties/repositories/propertyRepository.ts
var propertyRepository_exports = {};
__export(propertyRepository_exports, {
  PropertyRepository: () => PropertyRepository,
  prisma: () => prisma
});
module.exports = __toCommonJS(propertyRepository_exports);
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var PropertyRepository = class {
  // function to create a product
  async create(data) {
    const user = await prisma.user.create({
      data: {
        email: data.email
      }
    });
    return user;
  }
  async findByEmail(data) {
    const user = prisma.user.findFirst({
      where: {
        email: data.email
      }
    });
    return user;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PropertyRepository,
  prisma
});
