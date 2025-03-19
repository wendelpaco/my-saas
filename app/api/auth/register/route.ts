import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { TUser } from "@/app/@types";

// Método para registrar um usuário
export async function POST(req: NextRequest) {
  // Receber dados da requisição
  const { email, password, name }: TUser = await req.json();

  // Verificar se os dados estão presentes
  if (!email || !password || !name) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  // Verificar se o usuário já existe
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar novo usuário
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name: name },
  });

  // Retornar o usuário criado
  return NextResponse.json(user, { status: 201 });
}
