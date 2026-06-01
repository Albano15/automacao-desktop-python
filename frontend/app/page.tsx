// app/page.tsx
"use client";

import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  Panel,
  ReactFlowProvider, // Necessário para o Custom Node acessar os dados
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import Sidebar from "../components/Sidebar";
import ActionNode from "../components/ActionNode";

// Registra o componente customizado para que o React Flow saiba desenhá-lo
const nodeTypes = {
  actionNode: ActionNode,
};

export default function FluxogramaBuilder() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  const onNodesChange = useCallback((changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

  // --- Função chamada pelo Sidebar para adicionar nova caixa ---
  const handleAddAction = (actionModel: any) => {
    const novoNo = {
      id: `node_${Date.now()}`,
      type: "actionNode", // Indica que é o nosso bloco customizado
      position: { x: 300, y: nodes.length * 100 + 50 }, // Posiciona um pouco abaixo do anterior
      data: {
        label: actionModel.label,
        acao: actionModel.acao,
        parametros: actionModel.defaultParams,
        inativo: false,
      },
    };
    setNodes((nds) => [...nds, novoNo]);
  };

  // --- Funções de Ferramentas (Painel Superior) ---
  const inativarSelecionados = () => {
    setNodes((nds) => nds.map((n) => n.selected ? { ...n, data: { ...n.data, inativo: !n.data.inativo } } : n));
  };

  const removerSelecionados = () => {
    setNodes((nds) => nds.filter((n) => !n.selected));
  };

  // --- Exportar JSON ---
  const salvarFluxo = async () => {
    const passos = nodes
      .filter((node) => !node.data.inativo)
      .map((node) => ({
        acao: node.data.acao,
        parametros: node.data.parametros,
      }));

    const jsonFinal = { nome_processo: "Automacao Refatorada", passos };

    try {
      const response = await fetch("/api/salvar-fluxo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonFinal),
      });
      const resultado = await response.json();
      if (resultado.success) alert("Fluxo exportado para o Banco com sucesso!");
      else alert("Erro ao salvar: " + resultado.error);
    } catch (error) {
      alert("Erro na requisição para o servidor frontend.");
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      {/* Navbar Superior */}
      <div style={{ padding: "10px 20px", background: "#1e293b", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: "20px" }}>FlowBot RPA</h2>
        <button onClick={salvarFluxo} style={{ padding: "8px 24px", cursor: "pointer", background: "#10b981", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold" }}>
          Salvar (Gerar JSON)
        </button>
      </div>

      {/* Área de Trabalho Dividida */}
      <div style={{ display: "flex", flexGrow: 1 }}>
        <Sidebar onAddAction={handleAddAction} />
        
        <div style={{ flexGrow: 1, backgroundColor: "#f1f5f9", position: "relative" }}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
            >
              <Background color="#cbd5e1" gap={16} />
              <Controls />
              
              <Panel position="top-right" style={{ background: "white", padding: "8px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", display: "flex", gap: "8px" }}>
                <button onClick={inativarSelecionados} style={{ cursor: "pointer", padding: "6px 10px", borderRadius: "4px", border: "1px solid #ccc", background: "#fff", color: "#333" }}>👁️ Ativar/Inativar</button>
                <button onClick={removerSelecionados} style={{ cursor: "pointer", padding: "6px 10px", borderRadius: "4px", border: "1px solid #fecaca", background: "#fee2e2", color: "#b91c1c" }}>🗑️ Remover</button>
              </Panel>
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}