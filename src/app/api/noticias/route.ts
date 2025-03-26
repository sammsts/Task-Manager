import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest, { params }) {
    const postagens = await prisma.postagem.findMany({
        include: {
            usuario: {
                select: {
                    id: true,
                    nome: true
                }
            }
        }
    })
    return NextResponse.json(postagens)
}

export async function POST(req: NextRequest) {
    const data = await req.json()
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({
            message: 'Usuário precisa estar autenticado!'
        }, {
            status: 400
        })
    }

    const postagem = await prisma.postagem.create({
        data: {
            titulo: data.titulo,
            conteudo: data.conteudo,
            usuario_id: session?.user.id
        }
    })

    return NextResponse.json(postagem)
}