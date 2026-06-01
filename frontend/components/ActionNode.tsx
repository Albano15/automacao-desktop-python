import React from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

export default function ActionNode({ id, data, selected }: any) {
  const { updateNodeData } = useReactFlow();

  const handleParamChange = (paramName: string, value: any) => {
    updateNodeData(id, {
      ...data,
      parametros: {
        ...data.parametros,
        [paramName]: value,
      },
    });
  };

  const headerColors: any = {
    aguardar: '#fbbf24',
    abrir_programa: '#60a5fa',
    clicar_em_imagem: '#f472b6',
    apertar_teclas: '#a78bfa',
    focar_janela: '#34d399',
  };

  return (
    <div
      style={{
        background: 'white',
        border: selected ? '2px solid #2563eb' : '1px solid #777',
        borderRadius: '8px',
        width: '240px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        opacity: data.inativo ? 0.4 : 1,
        color: 'black',
        fontSize: '12px',
      }}
    >
      <Handle type="target" position={Position.Top} />
      
      <div style={{ background: headerColors[data.acao] || '#ccc', padding: '8px', borderRadius: '7px 7px 0 0', fontWeight: 'bold', textAlign: 'center' }}>
        {data.label}
      </div>

      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        
        {data.acao === 'aguardar' && (
          <label>
            Tempo (segundos):
            <input 
              type="number" step="0.1"
              value={data.parametros.tempo ?? ''} 
              onChange={(e) => handleParamChange('tempo', e.target.value === '' ? '' : parseFloat(e.target.value))}
              style={{ width: '100%', marginTop: '4px', border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
            />
          </label>
        )}

        {data.acao === 'abrir_programa' && (
          <label>
            Nome do Programa:
            <input 
              type="text" 
              value={data.parametros.nome_programa || ''} 
              onChange={(e) => handleParamChange('nome_programa', e.target.value)}
              style={{ width: '100%', marginTop: '4px', border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
            />
          </label>
        )}

        {data.acao === 'clicar_em_imagem' && (
          <label>
            Caminho da Imagem:
            <input 
              type="text" placeholder="./images/botao.png"
              value={data.parametros.caminho_imagem || ''} 
              onChange={(e) => handleParamChange('caminho_imagem', e.target.value)}
              style={{ width: '100%', marginTop: '4px', border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
            />
          </label>
        )}

        {data.acao === 'apertar_teclas' && (
          <>
            <label>Teclas (ex: enter ou a):
              <input type="text" value={data.parametros.teclas || ''} onChange={(e) => handleParamChange('teclas', e.target.value)} style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }} />
            </label>
            <div style={{ display: 'flex', gap: '4px' }}>
              <label>Vezes:
                <input type="number" value={data.parametros.vezes ?? ''} onChange={(e) => handleParamChange('vezes', e.target.value === '' ? '' : parseInt(e.target.value))} style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }} />
              </label>
              <label>Intervalo(s):
                <input type="number" step="0.1" value={data.parametros.intervalo ?? ''} onChange={(e) => handleParamChange('intervalo', e.target.value === '' ? '' : parseFloat(e.target.value))} style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }} />
              </label>
            </div>
          </>
        )}

        {data.acao === 'focar_janela' && (
          <label>
            Título da Janela:
            <input 
              type="text" 
              value={data.parametros.titulo_janela || ''} 
              onChange={(e) => handleParamChange('titulo_janela', e.target.value)}
              style={{ width: '100%', marginTop: '4px', border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
            />
          </label>
        )}

      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}