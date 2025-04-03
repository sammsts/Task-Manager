/*
  Warnings:

  - Made the column `concluida` on table `tarefas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dt_atualizacao` on table `tarefas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dt_criacao` on table `tarefas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dt_delecao` on table `tarefas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `senha` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tarefas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT,
    "usuario_id" INTEGER NOT NULL,
    "concluida" BOOLEAN NOT NULL,
    "dt_criacao" DATETIME NOT NULL,
    "dt_atualizacao" DATETIME NOT NULL,
    "dt_delecao" DATETIME NOT NULL,
    CONSTRAINT "tarefas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_tarefas" ("concluida", "conteudo", "dt_atualizacao", "dt_criacao", "dt_delecao", "id", "titulo", "usuario_id") SELECT "concluida", "conteudo", "dt_atualizacao", "dt_criacao", "dt_delecao", "id", "titulo", "usuario_id" FROM "tarefas";
DROP TABLE "tarefas";
ALTER TABLE "new_tarefas" RENAME TO "tarefas";
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_usuarios" ("criado_em", "email", "id", "nome", "senha") SELECT "criado_em", "email", "id", "nome", "senha" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
