# 🤖 Projeto de Automação Desktop

Este projeto é um robô criado em Python para automatizar tarefas locais no Windows. Ele utiliza Programação Orientada a Objetos para simplificar o controle do teclado, do mouse, o foco em janelas e a interação com elementos visuais na tela através de reconhecimento de imagens.

---

## 🛠️ Pré-requisitos

* **Linguagem:** Python na versão **3.11.9** (versão utilizada e testada no projeto).
* **Sistema Operacional:** Windows.
* **Aviso:** Certifique-se de marcar a opção **"Add Python to PATH"** durante a instalação do Python no Windows.

---

## ⚙️ Instalação e Configuração

Siga o passo a passo abaixo no seu terminal (PowerShell ou Prompt de Comando) para preparar o ambiente. Recomenda-se o uso de um Ambiente Virtual (venv) para não conflitar com outros projetos na sua máquina.

1. Navegue até a pasta raiz do projeto no seu terminal.
2. Crie o ambiente virtual executando o comando:
   python -m venv venv
3. Ative o ambiente virtual:
   .\venv\Scripts\activate
4. Com o ambiente ativado, instale as bibliotecas necessárias:
   pip install pyautogui opencv-python pillow pygetwindow

---

## 🚀 Como Executar

Antes de rodar o script, garanta que os programas que serão interagidos (como o Spotify, Calculadora, etc.) estejam abertos ou acessíveis, e que as imagens de referência (como idioma.png) estejam salvas na pasta correta com a mesma escala do seu monitor. Ou adicione as imagens de sua preferência e de sua área de trabalho.

Para iniciar a automação, ative o ambiente virtual (se já não estiver ativo) e execute o arquivo principal:

python index.py

---

## 📁 Estrutura do Projeto

* index.py: O arquivo principal que orquestra e executa o fluxo da automação de forma legível.
* utils/bot_desktop.py: A classe principal (BotDesktop) que abstrai a complexidade do PyAutoGUI e contém os métodos como clicar em imagens, focar janelas e apertar teclas.
* images/: Pasta recomendada para armazenar os recortes de tela (ex: idioma.png) que o robô usará como referência de clique.
