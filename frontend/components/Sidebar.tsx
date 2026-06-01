import React from 'react';

// Mapeamento das ações disponíveis baseado no seu Python
const ACOES = [
  { label: '⏳ Aguardar', acao: 'aguardar', defaultParams: { tempo: 1 } },
  { label: '🚀 Abrir Programa', acao: 'abrir_programa', defaultParams: { nome_programa: 'calc' } },
  { label: '🖱️ Clicar em Imagem', acao: 'clicar_em_imagem', defaultParams: { caminho_imagem: './images/icone.png' } },
  { label: '⌨️ Apertar Teclas', acao: 'apertar_teclas', defaultParams: { teclas: 'enter', vezes: 1, intervalo: 0.2 } },
  { label: '🪟 Focar Janela', acao: 'focar_janela', defaultParams: { titulo_janela: 'Calculadora' } },
];

export default function Sidebar({ onAddAction }: any) {
  return (
    <aside style={{ width: '250px', background: '#f8fafc', borderRight: '1px solid #cbd5e1', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '16px' }}>Ações do Bot</h3>
      <p style={{ fontSize: '12px', color: '#666', margin: '0 0 10px 0' }}>Clique para adicionar ao fluxo:</p>
      
      {ACOES.map((item) => (
        <button
          key={item.acao}
          onClick={() => onAddAction(item)}
          style={{
            padding: '10px',
            background: 'white',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            textAlign: 'left',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#333',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#e2e8f0'}
          onMouseOut={(e) => e.currentTarget.style.background = 'white'}
        >
          {item.label}
        </button>
      ))}
    </aside>
  );
}