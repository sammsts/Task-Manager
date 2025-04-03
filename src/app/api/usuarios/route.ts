import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return new Response(JSON.stringify({ error: "Não autenticado" }), { status: 401 });
    }
    
    const usuario = await prisma.usuarios.findFirst({
        where: { email: session.user.email }
    });

    if (!usuario) {
        return new Response(JSON.stringify({ error: "Usuário não encontrado" }), { status: 404 });
    }

    return NextResponse.json(usuario);
}
