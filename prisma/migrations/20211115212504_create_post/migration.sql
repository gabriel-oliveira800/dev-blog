-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "images" TEXT[],
    "likes" INTEGER NOT NULL,
    "isFullAccess" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
