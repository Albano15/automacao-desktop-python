# backend\automation.py
import json
import os
from utils.bot_desktop import BotDesktop

def carregar_fluxo():
    # Caminho absoluto ou relativo subindo uma pasta até a raiz e entrando em database
    caminho_base = os.path.dirname(os.path.abspath(__file__))
    caminho_json = os.path.join(caminho_base, "..", "database", "fluxo.json")
    
    if not os.path.exists(caminho_json):
        print(f"Erro: O arquivo {caminho_json} ainda não foi criado pelo Frontend.")
        return None

    with open(caminho_json, 'r', encoding='utf-8') as f:
        return json.load(f)

def main():
    fluxo = carregar_fluxo()
    if not fluxo:
        return

    bot = BotDesktop(confidence=0.8)
    
    print(f"Executando processo: {fluxo.get('nome_processo', 'Sem Nome')}")
    
    for passo in fluxo.get('passos', []):
        acao = passo['acao']
        params = passo.get('parametros', {})
        
        print(f"Executando: {acao} com {params}")
        
        if acao == "aguardar":
            bot.aguardar(params['tempo'])
        elif acao == "abrir_programa":
            bot.abrir_programa(params['nome_programa'])
        elif acao == "clicar_em_imagem":
            bot.clicar_em_imagem(params['caminho_imagem'])
        elif acao == "apertar_teclas":
            bot.apertar_teclas(params['teclas'], params.get('vezes', 1), params.get('intervalo', 0.2))
        elif acao == "focar_janela":
            bot.focar_janela(params['titulo_janela'])
        else:
            print(f"Ação desconhecida: {acao}")

if __name__ == "__main__":
    main()