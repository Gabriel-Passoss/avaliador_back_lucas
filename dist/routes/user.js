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

// src/routes/user.ts
var user_exports = {};
__export(user_exports, {
  userRoutes: () => userRoutes
});
module.exports = __toCommonJS(user_exports);
var import_zod = require("zod");

// src/modules/Properties/repositories/propertyRepository.ts
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

// src/routes/user.ts
var propertyRepository = new PropertyRepository();
var createUserSchema = import_zod.z.object({
  email: import_zod.z.string()
});
async function userRoutes(app) {
  app.post("/user/find", async (request, reply) => {
    const data = createUserSchema.parse(request.body);
    const user = await propertyRepository.findByEmail(data);
    return reply.status(200).send(user);
  });
  app.post("/user", async (request, reply) => {
    const data = createUserSchema.parse(request.body);
    const user = await propertyRepository.create(data);
    return reply.status(201).send(user);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRoutes
});
