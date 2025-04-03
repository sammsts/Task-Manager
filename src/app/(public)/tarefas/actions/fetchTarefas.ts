import { useMutation, useQuery } from "@tanstack/react-query";

async function getTarefas() {
    const res = await fetch('/api/tarefas')
    if (!res.ok) {
        throw new Error("Erro na busca de Tarefas")
    }
    return res.json();
}

async function updatetarefa(data: any) {
    const res = await fetch('/api/tarefas', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Erro na busca de Tarefas")
    }
    return res.json();
}

export function useTarefas() {
    return useQuery({
      queryKey: ["Tarefas"],
      queryFn: getTarefas,
      refetchOnWindowFocus: false
    });
  }

  
export function useUpdateTarefas() {
    return useMutation({
        mutationFn: (data) => updatetarefa(data)
    });
  }

export function useCreatetarefa() {
    return useMutation({
        mutationFn: (data) => createtarefa(data)
    });
}

async function createtarefa(data: any) {
    console.log('createtarefa: ', data);

    try {
        const userObj = await getUsuario(); // Obtém o objeto do usuário
        console.log('userObj: ', userObj);

        if (!userObj || !userObj.id) {
            throw new Error("Usuário inválido ou não encontrado");
        }

        data.usuario_id = userObj.id; // Adiciona o Id do usuário à requisição

        const res = await fetch('/api/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error("Erro ao criar notícia");
        }

        return res.json();
    } catch (error) {
        console.error("Erro ao criar notícia:", error);
        throw error;
    }
}

export async function getUsuario() {
    const res = await fetch('/api/usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!res.ok) {
        throw new Error("Erro ao buscar usuário");
    }

    const data = await res.json();
    return data;
}


export function useDeletetarefa() {
    return useMutation({
        mutationFn: (data: any) => deletetarefa(data.id)
    });
}

async function deletetarefa(id: number) {
    const res = await fetch(`/api/tarefas/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (!res.ok) {
        throw new Error("Erro ao deletear tarefa")
    }
    return res.json();
}