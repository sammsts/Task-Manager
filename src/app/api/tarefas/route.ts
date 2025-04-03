import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest, { }) {
    const tarefas = await prisma.tarefas.findMany({
        include: {
            usuario: {
                select: {
                    id: true,
                    nome: true
                }
            }
        }
    })
    return NextResponse.json(tarefas)
}

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { message: 'Usuário precisa estar autenticado!' },
                { status: 400 }
            );
        }

        if (!data.id) {
            return NextResponse.json(
                { message: 'ID da tarefa é obrigatório!' },
                { status: 400 }
            );
        }

        console.log('ESTA AQUI | data: ', JSON.stringify(data, null, 2));

        const tarefa = await prisma.tarefas.update({
            where: { id: data.id },
            data: {
                concluida: data.concluida,
                dt_atualizacao: new Date()
            }
        });

        return NextResponse.json(tarefa);
    } catch (error) {
        console.error('Erro ao atualizar a tarefa:', error);
        return NextResponse.json(
            { message: 'Erro ao atualizar a tarefa.' },
            { status: 500 }
        );
    }
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
    
    console.log('ESTA AQUI | data: ', JSON.stringify(data, null, 2))

    const tarefas = await prisma.tarefas.create({
        data: {
            titulo: data.titulo,
            conteudo: data.conteudo,
            usuario_id: data.usuario_id,
            concluida: data.concluida || false,
            dt_criacao: new Date(),
            dt_atualizacao: new Date(),
            dt_delecao: new Date(),
        }
    })

    return NextResponse.json(tarefas)
}