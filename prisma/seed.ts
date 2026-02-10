import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "default@local.app";

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        email,
        name: "Default User",
      },
    });
    console.log("✅ Default user created");
  } else {
    console.log("ℹ️ Default user already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
