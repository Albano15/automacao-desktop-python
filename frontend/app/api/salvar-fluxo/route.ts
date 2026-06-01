import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Caminho para a pasta central 'database' a partir da pasta do frontend
    const dirPath = path.join(process.cwd(), '../database');
    const filePath = path.join(dirPath, 'fluxo.json');
    
    // Garante que a pasta 'database' existe, se não, cria ela
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Grava o JSON formatado
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, message: 'Fluxo salvo com sucesso!' });
  } catch (error: any) {
    console.error("Erro ao salvar fluxo:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}