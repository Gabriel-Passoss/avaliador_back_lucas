var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_fastify = __toESM(require("fastify"));

// src/routes/user.ts
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
async function userRoutes(app2) {
  app2.post("/user/find", async (request, reply) => {
    const data = createUserSchema.parse(request.body);
    const user = await propertyRepository.findByEmail(data);
    return reply.status(200).send(user);
  });
  app2.post("/user", async (request, reply) => {
    const data = createUserSchema.parse(request.body);
    const user = await propertyRepository.create(data);
    return reply.status(201).send(user);
  });
}

// src/app.ts
var app = (0, import_fastify.default)({
  logger: true
});
app.register(userRoutes);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
